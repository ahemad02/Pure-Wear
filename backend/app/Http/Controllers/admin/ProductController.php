<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')->with(['product_images', 'product_sizes'])->get();
        return response()->json([
            'status' => 200,
            'data'   => $products,
        ], 200);
    }

    public function store(Request $request)
    {
        if (Product::where('sku', $request->sku)->orWhere('title', $request->title)->exists()) {
            return response()->json([
                "status"  => 400,
                "message" => "Product already exists",
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required',
            'price'       => 'required | numeric',
            'category'    => 'required | numeric',
            'sku'         => 'required | unique:products,sku',
            'is_featured' => 'required',
            'status'      => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors(),
            ], 400);
        }

        $product                    = new Product();
        $product->title             = $request->title;
        $product->price             = $request->price;
        $product->compare_price     = $request->compare_price;
        $product->category_id       = $request->category;
        $product->brand_id          = $request->brand;
        $product->sku               = $request->sku;
        $product->qty               = $request->qty;
        $product->description       = $request->description;
        $product->short_description = $request->short_description;
        $product->status            = $request->status;
        $product->is_featured       = $request->is_featured;
        $product->barcode           = $request->barcode;
        $product->save();

        if (! empty($request->sizes)) {

            foreach ($request->sizes as $size) {
                $productSize             = new ProductSize();
                $productSize->product_id = $product->id;
                $productSize->size_id    = $size;
                $productSize->save();
            }
        }

        if (! empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                $extArray = explode('.', $tempImage->image);
                $ext      = end($extArray);
                $rand     = rand(1000, 9999);

                $imageName = $product->id . '-' . $rand . time() . '.' . $ext;

                $manager = new ImageManager(Driver::class);

                $img = $manager->read(public_path('uploads/temp/' . $tempImage->image));

                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                $manager = new ImageManager(Driver::class);
                $img     = $manager->read(public_path('uploads/temp/' . $tempImage->image));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                $productImage             = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image      = $imageName;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status'  => 200,
            'data'    => $product,
            'message' => 'Product created successfully',
        ], 200);

    }

    public function show($id)
    {
        $product = Product::with(['product_images', 'product_sizes'])->find($id);

        if ($product == null) {
            return response()->json([
                "status"  => 404,
                "message" => "Product not found",
            ], 404);
        }

        $productSizes = $product->product_sizes()->pluck('size_id');

        return response()->json([
            'status'       => 200,
            'data'         => $product,
            'productSizes' => $productSizes,
        ], 200);

    }

    public function update($id, Request $request)
    {
        $product = Product::find($id);
        if (! $product) {
            return response()->json([
                "status"  => 400,
                "message" => "Product not found",
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required',
            'price'       => 'required | numeric',
            'category'    => 'required | numeric',
            'sku'         => 'required | unique:products,sku,' . $id . ',id',
            'is_featured' => 'required',
            'status'      => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors(),
            ], 400);
        }

        $product->title             = $request->title;
        $product->price             = $request->price;
        $product->compare_price     = $request->compare_price;
        $product->category_id       = $request->category;
        $product->brand_id          = $request->brand;
        $product->sku               = $request->sku;
        $product->qty               = $request->qty;
        $product->description       = $request->description;
        $product->short_description = $request->short_description;
        $product->status            = $request->status;
        $product->is_featured       = $request->is_featured;
        $product->barcode           = $request->barcode;
        $product->save();

        if (! empty($request->sizes)) {

            ProductSize::where('product_id', $product->id)->delete();

            foreach ($request->sizes as $size) {
                $productSize             = new ProductSize();
                $productSize->product_id = $product->id;
                $productSize->size_id    = $size;
                $productSize->save();
            }
        }

        return response()->json([
            'status'  => 200,
            'data'    => $product,
            'message' => 'Product updated successfully',
        ], 200);

    }

    public function destroy($id)
    {
        $product = Product::with('product_images')->find($id);
        if (! $product) {
            return response()->json([
                "status"  => 400,
                "message" => "Product not found",
            ]);
        }
        $product->delete();

        if ($product->product_images) {
            foreach ($product->product_images as $image) {
                File::delete(public_path('uploads/products/large/' . $image->image));
                File::delete(public_path('uploads/products/small/' . $image->image));
            }
        }

        return response()->json([
            'status'  => 200,
            'message' => 'Product deleted successfully',
        ], 200);

    }

    public function saveProductImage(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'image' => 'required | image | mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors(),
            ], 400);
        }

        $image     = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();

        $manager = new ImageManager(Driver::class);

        $img = $manager->read($image->getPathName());

        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        $manager = new ImageManager(Driver::class);
        $img     = $manager->read($image->getPathName());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        $productImage             = new ProductImage();
        $productImage->image      = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return response()->json([
            'status'  => 200,
            'message' => 'Image uploaded successfully',
            'data'    => $productImage,
        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        $product        = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();
        return response()->json([
            'status'  => 200,
            'message' => 'Product Default Image changed successfully',
            'data'    => $product,
        ], 200);
    }

    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);
        if (! $productImage) {
            return response()->json([
                "status"  => 400,
                "message" => "Product Image not found",
            ], 400);
        }

        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();
        return response()->json([
            'status'  => 200,
            'message' => 'Product Image deleted successfully',
        ], 200);
    }

}
