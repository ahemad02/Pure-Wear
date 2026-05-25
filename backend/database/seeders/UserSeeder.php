<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            // --- Admin ---
            [
                'name'              => 'Admin User',
                'email'             => 'admin@shop.com',
                'role'              => 'admin',
                'password'          => Hash::make('password'),
                'mobile'            => '9876543210',
                'address'           => '1st Floor, Business Hub',
                'city'              => 'Mumbai',
                'state'             => 'Maharashtra',
                'zip'               => '400001',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],

            // --- Customers ---
            [
                'name'              => 'Ravi Sharma',
                'email'             => 'ravi@example.com',
                'role'              => 'customer',
                'password'          => Hash::make('password'),
                'mobile'            => '9000000001',
                'address'           => '12, MG Road',
                'city'              => 'Bangalore',
                'state'             => 'Karnataka',
                'zip'               => '560001',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => 'Priya Patel',
                'email'             => 'priya@example.com',
                'role'              => 'customer',
                'password'          => Hash::make('password'),
                'mobile'            => '9000000002',
                'address'           => '5, CG Road',
                'city'              => 'Ahmedabad',
                'state'             => 'Gujarat',
                'zip'               => '380009',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => 'Amit Verma',
                'email'             => 'amit@example.com',
                'role'              => 'customer',
                'password'          => Hash::make('password'),
                'mobile'            => '9000000003',
                'address'           => '88, Connaught Place',
                'city'              => 'Delhi',
                'state'             => 'Delhi',
                'zip'               => '110001',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'name'              => 'Sneha Iyer',
                'email'             => 'sneha@example.com',
                'role'              => 'customer',
                'password'          => Hash::make('password'),
                'mobile'            => '9000000004',
                'address'           => '22, Anna Salai',
                'city'              => 'Chennai',
                'state'             => 'Tamil Nadu',
                'zip'               => '600002',
                'email_verified_at' => now(),
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ]);
    }
}
