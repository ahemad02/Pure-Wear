<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingChargeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('shipping_charges')->insert([
            [
                'shipping_charge' => 99.00,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
