<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class categorieController extends Controller
{

    // return Categorie::paginate(3);
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $size = $request->input('size', 5);

        $categories = Categorie::orderBy('id','desc')->paginate($page, ['*'], 'size', $size);

        // return response()->json($categories);
        return response()->json([
                    "message" => "Insertion réussie",
                    "data" => $categories
                ], 201);
    }
    public function all()
    {
        $categories = Categorie::all();

        return response()->json($categories);
    }

    function recherche($libelle)
    {
        $categorie = Categorie::where('libelle', $libelle)->first();

        if ($categorie) {
            if ($categorie->trashed()) {
                return response()->json(["message" => false]);
            }

            return response()->json([
                "message" => "Insertion réussie",
                "data" => $categorie
            ], 201);
            // return response()->json(["message" => true]);
        }
        // return response()->json(["message" => false]);
        return response()->json([
            "message" => "Non inseree",
            "data" => []
        ], 201);
    }
   

    // function store(Request $request)
    // {

    //     $request->validate(
    //         [
    //             'libelle' => 'required|string|min:3'
    //         ]
    //     );
    //     $existCategorie = Categorie::where('libelle', $request->libelle)->first();

    //     if ($existCategorie) {
    //         return response()->json([
    //             "message" => "Le libellé existe déjà",
    //             "data" => $existCategorie
    //         ]);
    //     }

    //     $categorie = Categorie::create([
    //         "libelle" => $request->libelle,
    //     ]);

    //     return response()->json([
    //         "message" => "Insertion réussie",
    //         "data" => $categorie
    //     ], 201);
    // }

    function store(Request $request)
    {
        $request->validate(
            [
                'libelle' => 'required|string|min:3'
            ]
        );

        $existCategorie = Categorie::withTrashed()->where('libelle', $request->libelle)->first();

        if ($existCategorie) {
        //a été supprimée (soft deleted), la réinsérer
            if ($existCategorie->trashed()) {
                $existCategorie->restore();
                return response()->json([
                    "message" => "Insertion réussie",
                    "data" => $existCategorie
                ], 201);
            } else {
                return response()->json([
                    "message" => "Le libellé existe déjà",
                    "data" => $existCategorie
                ]);
            }
        }

        $categorie = Categorie::create([
            "libelle" => $request->libelle,
        ]);

        return response()->json([
            "message" => "Insertion réussie",
            "data" => $categorie
        ], 201);
    }

    public function destroy(Request $request, $id = 0)
    {

        if ($id) {
            Categorie::where("id", $id)->delete();
            return response()->json([
                "message" => "Suppression effectuée",
                // "data" => $categories
            ]);
        }
        $ids = $request->input('ids', []);
        $categories = Categorie::whereIn("id", $ids)->get();

        if ($categories->isEmpty()) {
            return response()->json([
                "message" => "Aucune catégorie correspondante"
            ]);
        }

        Categorie::whereIn("id", $ids)->delete();

        return response()->json([
            "message" => "Suppression effectuée",
            "data" => $categories
        ]);
    }

    function update(Request $request, $id)
    {
        $categorie = Categorie::find($id);

        if (!$categorie) {
            return response()->json([
                "message" => "Catégorie introuvable",
            ], 404);
        }

        $validate = $request->validate([
            'libelle' => 'required|string|max:255',
        ]);

        $libelle1 = $validate['libelle'];
        $categorie->update(['libelle' => $libelle1]);

        return response()->json([
            "message" => "Modification effectuée",
            "data" => $categorie
        ]);
    }

}