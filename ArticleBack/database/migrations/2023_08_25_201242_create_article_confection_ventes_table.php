<?php

use App\Models\articleConfection;
use App\Models\Articles;
use App\Models\articleVente;
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
        Schema::create('article_confection_ventes', function (Blueprint $table) {
            $table->id()->unique();
            $table->integer('Qte');
            $table->foreignIdFor(articleVente::class)->constrained();
            $table->foreignIdFor(Articles::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_confection_ventes');
    }
};
