<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('mobile')->after('email')->nullable();
            $table->string('address')->after('mobile')->nullable();
            $table->string('city')->after('address')->nullable();
            $table->string('zip')->after('city')->nullable();
            $table->string('state')->after('zip')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['mobile', 'address', 'city', 'zip', 'state']);
        });
    }
};
