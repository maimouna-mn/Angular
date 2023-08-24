<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Articles extends Model
{
    use HasFactory;
    protected $fillable=[
        'libelle' ,
        'prix',
        'stock' ,
        'categorie_id',
        'fournisseurs', 
        'photo_path',
    ];
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function fournisseurs()
{
    return $this->belongsToMany(Fournisseurs::class, 'article_fournisseurs', 'article_id', 'fournisseur_id');
}

}
