<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Seller',
            'email' => 'seller@seller.com',
            'password' => bcrypt('password')  
        ]);
    }
}
