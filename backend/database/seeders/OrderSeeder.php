<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        // user IDs: 2=Ravi, 3=Priya, 4=Amit, 5=Sneha (user 1 is admin)
        $orders = [
            [
                'user_id'        => 2,
                'subtotal'       => 4298.00,
                'shipping'       => 99.00,
                'discount'       => 0.00,
                'grand_total'    => 4397.00,
                'payment_status' => 'paid',
                'status'         => 'delivered',
                'name'           => 'Ravi Sharma',
                'email'          => 'ravi@example.com',
                'mobile'         => '9000000001',
                'address'        => '12, MG Road',
                'city'           => 'Bangalore',
                'state'          => 'Karnataka',
                'zip'            => '560001',
                'items'          => [
                    [
                        'product_id' => 1,
                        'name'       => 'Nike Dri-FIT Classic T-Shirt',
                        'size'       => 'L',
                        'qty'        => 2,
                        'unit_price' => 1299.00,
                        'price'      => 2598.00,
                    ],
                    [
                        'product_id' => 6,
                        'name'       => 'Zara Men Fleece Hoodie',
                        'size'       => 'M',
                        'qty'        => 1,
                        'unit_price' => 2199.00,
                        'price'      => 2199.00,
                    ],
                ],
            ],
            [
                'user_id'        => 3,
                'subtotal'       => 8999.00,
                'shipping'       => 99.00,
                'discount'       => 500.00,
                'grand_total'    => 8598.00,
                'payment_status' => 'paid',
                'status'         => 'shipped',
                'name'           => 'Priya Patel',
                'email'          => 'priya@example.com',
                'mobile'         => '9000000002',
                'address'        => '5, CG Road',
                'city'           => 'Ahmedabad',
                'state'          => 'Gujarat',
                'zip'            => '380009',
                'items'          => [
                    [
                        'product_id' => 7,
                        'name'       => 'Nike Air Max 270 Sneakers',
                        'size'       => 'M',
                        'qty'        => 1,
                        'unit_price' => 8999.00,
                        'price'      => 8999.00,
                    ],
                ],
            ],
            [
                'user_id'        => 4,
                'subtotal'       => 6498.00,
                'shipping'       => 99.00,
                'discount'       => 0.00,
                'grand_total'    => 6597.00,
                'payment_status' => 'unpaid',
                'status'         => 'pending',
                'name'           => 'Amit Verma',
                'email'          => 'amit@example.com',
                'mobile'         => '9000000003',
                'address'        => '88, Connaught Place',
                'city'           => 'Delhi',
                'state'          => 'Delhi',
                'zip'            => '110001',
                'items'          => [
                    [
                        'product_id' => 3,
                        'name'       => "Levi's 511 Slim Fit Jeans",
                        'size'       => '32',
                        'qty'        => 1,
                        'unit_price' => 2999.00,
                        'price'      => 2999.00,
                    ],
                    [
                        'product_id' => 5,
                        'name'       => 'H&M Water-Resistant Puffer Jacket',
                        'size'       => 'L',
                        'qty'        => 1,
                        'unit_price' => 3499.00,
                        'price'      => 3499.00,
                    ],
                ],
            ],
            [
                'user_id'        => 5,
                'subtotal'       => 7498.00,
                'shipping'       => 0.00,
                'discount'       => 0.00,
                'grand_total'    => 7498.00,
                'payment_status' => 'paid',
                'status'         => 'delivered',
                'name'           => 'Sneha Iyer',
                'email'          => 'sneha@example.com',
                'mobile'         => '9000000004',
                'address'        => '22, Anna Salai',
                'city'           => 'Chennai',
                'state'          => 'Tamil Nadu',
                'zip'            => '600002',
                'items'          => [
                    [
                        'product_id' => 10,
                        'name'       => 'Reebok Classic Leather Sneakers',
                        'size'       => 'M',
                        'qty'        => 1,
                        'unit_price' => 5999.00,
                        'price'      => 5999.00,
                    ],
                    [
                        'product_id' => 9,
                        'name'       => 'Tommy Hilfiger Leather Belt',
                        'size'       => 'M',
                        'qty'        => 1,
                        'unit_price' => 1499.00,
                        'price'      => 1499.00,
                    ],
                ],
            ],
            [
                'user_id'        => 2,
                'subtotal'       => 12999.00,
                'shipping'       => 99.00,
                'discount'       => 1000.00,
                'grand_total'    => 12098.00,
                'payment_status' => 'paid',
                'status'         => 'cancelled',
                'name'           => 'Ravi Sharma',
                'email'          => 'ravi@example.com',
                'mobile'         => '9000000001',
                'address'        => '12, MG Road',
                'city'           => 'Bangalore',
                'state'          => 'Karnataka',
                'zip'            => '560001',
                'items'          => [
                    [
                        'product_id' => 11,
                        'name'       => 'Adidas Ultraboost 22 Running Shoes',
                        'size'       => 'L',
                        'qty'        => 1,
                        'unit_price' => 12999.00,
                        'price'      => 12999.00,
                    ],
                ],
            ],
        ];

        foreach ($orders as $orderData) {
            $items = $orderData['items'];
            unset($orderData['items']);

            $orderId = DB::table('orders')->insertGetId([
                 ...$orderData,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($items as $item) {
                DB::table('order_items')->insert([
                    'order_id'   => $orderId,
                    'product_id' => $item['product_id'],
                    'name'       => $item['name'],
                    'size'       => $item['size'],
                    'qty'        => $item['qty'],
                    'unit_price' => $item['unit_price'],
                    'price'      => $item['price'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
