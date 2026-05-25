<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'T-Shirts', 'status' => 1],
            ['name' => 'Shirts', 'status' => 1],
            ['name' => 'Jeans', 'status' => 1],
            ['name' => 'Trousers', 'status' => 1],
            ['name' => 'Jackets', 'status' => 1],
            ['name' => 'Hoodies', 'status' => 1],
            ['name' => 'Sneakers', 'status' => 1],
            ['name' => 'Formal Shoes', 'status' => 1],
            ['name' => 'Accessories', 'status' => 1],
            ['name' => 'Ethnic Wear', 'status' => 0],
        ];

        foreach ($categories as $cat) {
            DB::table('categories')->insert([
                 ...$cat,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
