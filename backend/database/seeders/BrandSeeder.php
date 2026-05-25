<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Nike', 'status' => 1],
            ['name' => 'Adidas', 'status' => 1],
            ['name' => 'Puma', 'status' => 1],
            ['name' => 'Levis', 'status' => 1],
            ['name' => 'H&M', 'status' => 1],
            ['name' => 'Zara', 'status' => 1],
            ['name' => 'Reebok', 'status' => 1],
            ['name' => 'Tommy Hilfiger', 'status' => 1],
            ['name' => 'UCB', 'status' => 0],
            ['name' => 'Arrow', 'status' => 1],
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                 ...$brand,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
