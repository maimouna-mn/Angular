<?php

namespace App\Http\Controllers;

use App\Models\articleConfection;
use App\Models\Articles;
use App\Models\articleVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class articleVenteController extends Controller
{

    public function all(Request $request)
    {
        $page = $request->input('page', 1);
        $size = $request->input('size', 5);

        $articles = ArticleVente::orderBy("id",'desc')->paginate($page, ['*'], 'size', $size);

        return response()->json([
            'message' => 'liste des Article .',
            'data' => $articles
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'categorie_id' => 'required|exists:categories,id',
            'coutFabric' => 'required|numeric',
            'qteStock' => 'required|numeric',
            'marge' => 'required|numeric',
            'libelle1' => 'required',
            // 'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);



        $articleConfection = Articles::where("libelle", $request->libelle2)->first();

        if (!$articleConfection) {
            return response()->json(['error' => 'Article de confection introuvable.'], 404);
        }
        $coutFabric = $articleConfection->prix * $request->qteStock;
        $prixVente = $coutFabric + $request->marge;

        $articleVente = articleVente::create([
            'libelle' => $request->libelle1,
            'photo' => $request->photo,
            'categorie_id' => $request->categorie_id,
            'promo' => $request->promo,
            'coutFabric' => $coutFabric,
            'prixVente' => $prixVente,
            'qteStock' => $request->qteStock,
            'marge' => $request->marge,
            'reference' => "ref",
        ]);

        $articleVente->articlesConfection()->attach($articleConfection->id, [
            'Qte' => $request->qteStock,
        ]);


        return response()->json([
            'message' => 'Article ajouté avec succès.',
            'data' => $articleVente
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'categorie_id' => 'required|exists:categories,id',
            'coutFabric' => 'required|numeric',
            'qteStock' => 'required|numeric',
            'marge' => 'required|numeric',
            'libelle1' => 'required',
            // 'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);

        $articleVente = ArticleVente::findOrFail($id);

        $articleConfection = Articles::where("libelle", $request->libelle2)->first();

        if (!$articleConfection) {
            return response()->json(['error' => 'Article de confection introuvable.'], 404);
        }

        $coutFabric = $articleConfection->prix * $request->qteStock;
        $prixVente = $coutFabric + $request->marge;

        $articleVente->update([
            'libelle' => $request->libelle1,
            'photo' => $request->photo,
            'categorie_id' => $request->categorie_id,
            'promo' => $request->promo,
            'coutFabric' => $coutFabric,
            'prixVente' => $prixVente,
            'qteStock' => $request->qteStock,
            'marge' => $request->marge,
            'reference' => "ref",
        ]);

        $articleVente->articlesConfection()->sync([$articleConfection->id => ['Qte' => $request->qteStock]]);

        return response()->json([
            'message' => 'Article mis à jour avec succès.',
            'data' => $articleVente
        ]);
    }

}