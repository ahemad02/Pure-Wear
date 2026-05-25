<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    public function run(): void
    {
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '28', '30', '32', '34', '36', '38', '40'];

        foreach ($sizes as $size) {
            DB::table('sizes')->insert([
                'name'       => $size,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
