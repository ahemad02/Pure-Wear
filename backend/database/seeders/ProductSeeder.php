<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // category IDs  : 1=T-Shirts, 2=Shirts, 3=Jeans, 4=Trousers, 5=Jackets,
        //                  6=Hoodies,  7=Sneakers, 8=Formal Shoes, 9=Accessories
        // brand IDs     : 1=Nike, 2=Adidas, 3=Puma, 4=Levis, 5=H&M,
        //                  6=Zara, 7=Reebok, 8=Tommy Hilfiger, 10=Arrow
        // size IDs      : 1=XS, 2=S, 3=M, 4=L, 5=XL, 6=XXL

        $products = [
            [
                'title'             => 'Nike Dri-FIT Classic T-Shirt',
                'price'             => 1299.00,
                'compare_price'     => 1799.00,
                'description'       => 'Stay cool and comfortable in the Nike Dri-FIT Classic T-Shirt. Engineered with sweat-wicking technology to keep you dry during intense workouts.',
                'short_description' => 'Lightweight Dri-FIT fabric for all-day comfort.',
                'image'             => null,
                'category_id'       => 1,
                'brand_id'          => 1,
                'qty'               => 150,
                'sku'               => 'NK-TSHRT-001',
                'barcode'           => '8901234560001',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [2, 3, 4, 5, 6],
            ],
            [
                'title'             => 'Adidas Essentials Polo Shirt',
                'price'             => 1599.00,
                'compare_price'     => 2199.00,
                'description'       => 'A timeless polo shirt from Adidas crafted from soft cotton blend fabric. Perfect for casual and semi-formal occasions.',
                'short_description' => 'Classic polo with Adidas branding.',
                'image'             => null,
                'category_id'       => 2,
                'brand_id'          => 2,
                'qty'               => 100,
                'sku'               => 'AD-SHIRT-002',
                'barcode'           => '8901234560002',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [2, 3, 4, 5],
            ],
            [
                'title'             => "Levi's 511 Slim Fit Jeans",
                'price'             => 2999.00,
                'compare_price'     => 3999.00,
                'description'       => "Levi's iconic 511 Slim Fit jeans made from premium stretch denim. Sits below the waist with a slim leg from hip to ankle.",
                'short_description' => 'Slim fit stretch denim in classic blue.',
                'image'             => null,
                'category_id'       => 3,
                'brand_id'          => 4,
                'qty'               => 80,
                'sku'               => 'LV-JEAN-003',
                'barcode'           => '8901234560003',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [8, 9, 10, 11, 12], // 28,30,32,34,36
            ],
            [
                'title'             => 'Puma Training Jogger Trousers',
                'price'             => 1899.00,
                'compare_price'     => 2499.00,
                'description'       => 'Lightweight and breathable jogger trousers from Puma. Elastic waistband with drawstring for a secure fit during any activity.',
                'short_description' => 'Comfortable training trousers for gym and casual wear.',
                'image'             => null,
                'category_id'       => 4,
                'brand_id'          => 3,
                'qty'               => 120,
                'sku'               => 'PM-TRSR-004',
                'barcode'           => '8901234560004',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [3, 4, 5, 6],
            ],
            [
                'title'             => 'H&M Water-Resistant Puffer Jacket',
                'price'             => 3499.00,
                'compare_price'     => 4999.00,
                'description'       => 'Stay warm in style with H&M\'s water-resistant puffer jacket. Insulated with recycled fill for sustainable warmth on chilly days.',
                'short_description' => 'Insulated puffer jacket for winter and travel.',
                'image'             => null,
                'category_id'       => 5,
                'brand_id'          => 5,
                'qty'               => 60,
                'sku'               => 'HM-JCKT-005',
                'barcode'           => '8901234560005',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [3, 4, 5, 6],
            ],
            [
                'title'             => 'Zara Men Fleece Hoodie',
                'price'             => 2199.00,
                'compare_price'     => 2999.00,
                'description'       => 'A cozy fleece hoodie from Zara with a kangaroo front pocket and adjustable drawstring hood. Great for layering in cooler months.',
                'short_description' => 'Soft fleece hoodie with kangaroo pocket.',
                'image'             => null,
                'category_id'       => 6,
                'brand_id'          => 6,
                'qty'               => 90,
                'sku'               => 'ZR-HOOD-006',
                'barcode'           => '8901234560006',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [2, 3, 4, 5, 6],
            ],
            [
                'title'             => 'Nike Air Max 270 Sneakers',
                'price'             => 8999.00,
                'compare_price'     => 11999.00,
                'description'       => 'The Nike Air Max 270 features Nike\'s biggest heel Air unit yet for a super-soft ride. Breathable mesh upper with a foam midsole for all-day cushioning.',
                'short_description' => 'Iconic Air Max cushioning for everyday wear.',
                'image'             => null,
                'category_id'       => 7,
                'brand_id'          => 1,
                'qty'               => 45,
                'sku'               => 'NK-SNKR-007',
                'barcode'           => '8901234560007',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [],
            ],
            [
                'title'             => 'Arrow Oxford Formal Shirt',
                'price'             => 1799.00,
                'compare_price'     => 2599.00,
                'description'       => 'Arrow\'s Oxford formal shirt crafted from 100% premium cotton. Wrinkle-resistant finish makes it perfect for long office days.',
                'short_description' => 'Premium cotton formal shirt for the office.',
                'image'             => null,
                'category_id'       => 2,
                'brand_id'          => 10,
                'qty'               => 70,
                'sku'               => 'AR-SHRT-008',
                'barcode'           => '8901234560008',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [2, 3, 4, 5],
            ],
            [
                'title'             => 'Tommy Hilfiger Leather Belt',
                'price'             => 1499.00,
                'compare_price'     => 1999.00,
                'description'       => 'Genuine leather belt from Tommy Hilfiger with polished buckle. A wardrobe staple that completes any smart-casual or formal look.',
                'short_description' => 'Genuine leather belt with signature buckle.',
                'image'             => null,
                'category_id'       => 9,
                'brand_id'          => 8,
                'qty'               => 200,
                'sku'               => 'TH-BELT-009',
                'barcode'           => '8901234560009',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [],
            ],
            [
                'title'             => 'Reebok Classic Leather Sneakers',
                'price'             => 5999.00,
                'compare_price'     => 7499.00,
                'description'       => 'The Reebok Classic Leather sneaker is a timeless icon. Soft leather upper and EVA foam midsole provide superior cushioning and a clean silhouette.',
                'short_description' => 'Timeless leather sneaker with EVA cushioning.',
                'image'             => null,
                'category_id'       => 7,
                'brand_id'          => 7,
                'qty'               => 55,
                'sku'               => 'RB-SNKR-010',
                'barcode'           => '8901234560010',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [],
            ],
            [
                'title'             => 'Adidas Ultraboost 22 Running Shoes',
                'price'             => 12999.00,
                'compare_price'     => 15999.00,
                'description'       => 'Engineered for high-performance running, the Adidas Ultraboost 22 features responsive BOOST cushioning and a Primeknit+ upper that adapts to every step.',
                'short_description' => 'High-performance BOOST running shoes.',
                'image'             => null,
                'category_id'       => 7,
                'brand_id'          => 2,
                'qty'               => 30,
                'sku'               => 'AD-SHOE-011',
                'barcode'           => '8901234560011',
                'status'            => 1,
                'is_featured'       => 'yes',
                'sizes'             => [],
            ],
            [
                'title'             => "Levi's 501 Original Straight Jeans",
                'price'             => 3499.00,
                'compare_price'     => null,
                'description'       => "The original jeans since 1873. Levi's 501 straight-leg jeans with signature button fly and a relaxed fit through the seat and thigh.",
                'short_description' => 'The original straight-leg button-fly jeans.',
                'image'             => null,
                'category_id'       => 3,
                'brand_id'          => 4,
                'qty'               => 65,
                'sku'               => 'LV-JEAN-012',
                'barcode'           => '8901234560012',
                'status'            => 1,
                'is_featured'       => 'no',
                'sizes'             => [9, 10, 11, 12, 13], // 30,32,34,36,38
            ],
        ];

        foreach ($products as $productData) {
            $sizes = $productData['sizes'];
            unset($productData['sizes']);

            $productId = DB::table('products')->insertGetId([
                 ...$productData,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // product_sizes pivot
            foreach ($sizes as $sizeId) {
                DB::table('product_sizes')->insert([
                    'product_id' => $productId,
                    'size_id'    => $sizeId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
