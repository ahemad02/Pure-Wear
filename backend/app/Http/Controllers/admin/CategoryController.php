<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::orderBy("created_at", "DESC")->get();
        return response()->json([
            "status" => 200,
            "data"   => $category,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name"   => "required",
            "status" => "required",

        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors(),
            ], 400);
        }

        if (Category::where("name", $request->name)->exists()) {
            return response()->json([
                "status"  => 400,
                "message" => "Category already exists",
            ], 400);
        }

        $category         = new Category();
        $category->name   = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            "status"  => 200,
            "message" => "Category created successfully",
            "data"    => $category,
        ], 200);

    }

    public function update($id, Request $request)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                "status"  => 404,
                "message" => "Category not found",
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "name" => "required",

        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 400,
                "errors" => $validator->errors(),
            ], 400);
        }

        $category->name   = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            "status"  => 200,
            "message" => "Category updated successfully",
            "data"    => $category,
        ], 200);

    }

    public function show($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                "status"  => 404,
                "message" => "Category not found",
            ], 404);
        }

        return response()->json([
            "status" => 200,
            "data"   => $category,
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
                "status"  => 404,
                "message" => "Category not found",
            ], 404);
        }

        $category->delete();
        return response()->json([
            "status"  => 200,
            "message" => "Category deleted successfully",
        ], 200);

    }
}
