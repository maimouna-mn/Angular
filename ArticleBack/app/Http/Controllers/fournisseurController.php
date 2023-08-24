<?php

namespace App\Http\Controllers;

use App\Models\Fournisseurs;
use Illuminate\Http\Request;

class fournisseurController extends Controller
{
    function recherche1($libelle)
    {

        $fournisseur = Fournisseurs::where('libelle', 'like', $libelle . '%')
            ->get();
        return response()->json(["data" => $fournisseur]);
    }
}