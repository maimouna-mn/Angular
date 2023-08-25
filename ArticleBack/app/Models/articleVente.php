<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class articleVente extends Model
{
    use HasFactory;
    protected $fillable = [
        'id' ,
        'libelle',
        'photo' ,
        'categorie_id' ,
        'promo' ,
        'coutFabric',
        'prixVente',
        'marge' ,
        'reference',
        'qteStock',
        'categorie_id'
    ];

    public function articlesConfection()
    {
        return $this->belongsToMany(Articles::class, 'article_confection_ventes', 'article_vente_id', 'articles_id')
            ->withPivot(['Qte'])
            ->withTimestamps();
    }

}