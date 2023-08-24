<?php

use App\Models\Categorie;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id()->unique();
            $table->string('libelle')->unique();
            $table->integer('prix');
            $table->integer('stock');
            $table->foreignIdFor(Categorie::class)->constrained();
            $table->string('photo_path')->nullable();
            // $table->foreignIdFor(Image::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};