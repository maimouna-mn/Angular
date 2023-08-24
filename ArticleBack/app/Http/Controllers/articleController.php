<?php

namespace App\Http\Controllers;

use App\Http\Resources\articleResource;
use App\Models\ArticleFournisseur;
use App\Models\Articles;
use App\Models\Categorie;
use App\Models\Fournisseurs;
use Illuminate\Http\Request;
use Ramsey\Collection\Collection;

class articleController extends Controller
{

   

    public function all(Request $request)
    {
        $page = $request->input('page', 1);
        $size = $request->input('size', 5);

        $categories = Categorie::all();
        // $articles = Articles::all();
        $articles = Articles::orderBy("id",'desc')->paginate($page, ['*'], 'size', $size);
        $fournisseurs = Fournisseurs::all();

        $data = [
            "data1" => $categories,
            // "data2" => articleResource::collection($articles),
            "data2" => $articles,
            "data3" => $fournisseurs,
        ];
        return response()->json([
            "message" => "les donnees",
            "data" => $data
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'libelle' => 'required|unique:articles',
            'prix' => 'required|numeric',
            'stock' => 'required|numeric',
            'libelle3' => 'required',
            // 'categorie_id' => 'required|exists:categories,id',
            'fournisseurs' => 'string',
            'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);

        $imageController = new ImageController();
        $imagePath = $imageController->storeImage($request);

        $imagePathSansImage = str_replace('image/', '', $imagePath);
        $categorie = Categorie::where('libelle', $validatedData['libelle3'])->first();

        $article = Articles::create([
            'libelle' => $validatedData['libelle'],
            'prix' => $validatedData['prix'],
            'stock' => $validatedData['stock'],
            // 'categorie_id' => $validatedData['categorie_id'],
            'categorie_id' => $categorie->id,
            'photo_path' => $imagePathSansImage
        ]);

        $fourExplode = explode(",", ($validatedData['fournisseurs']));

        if (isset($fourExplode) && is_array($fourExplode)) {
            foreach ($fourExplode as $fournisseurLibelle) {
                $fournisseur = Fournisseurs::where('libelle', $fournisseurLibelle)->first();

                if ($fournisseur) {
                    $articleFournisseur = ArticleFournisseur::create([
                        'article_id' => $article->id,
                        'fournisseur_id' => $fournisseur->id,
                    ]);

                    $articleFournisseur->save();
                }
            }
        }

        return response()->json([
            "message" => "Insertion Réussie",
            "data" => $article
        ]);
    }
    public function update(Request $request, $id)
    {
        $article = Articles::find($id);

        if (!$article) {
            return response()->json([
                "message" => "Article non trouvé"
            ], 404);
        }

        $validatedData = $request->validate([
            'libelle' => 'required|unique:articles,libelle,' . $id,
            'prix' => 'required|numeric',
            'stock' => 'required|numeric',
            'categorie_id' => 'required|exists:categories,id',
            'fournisseurs' => 'string',
            'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('photo')) {
            $imageController = new ImageController();
            $imagePath = $imageController->storeImage($request);
            $imagePathSansImage = str_replace('image/', '', $imagePath);
            $article->photo_path = $imagePathSansImage;
        }

        $article->libelle = $validatedData['libelle'];
        $article->prix = $validatedData['prix'];
        $article->stock = $validatedData['stock'];
        $article->categorie_id = $validatedData['categorie_id'];
        $article->save();


        return response()->json([
            "message" => "Mise à jour réussie",
            "data" => $article
        ]);
    }

    public function destroy($id)
    {
        $article = Articles::find($id);
    
        if (!$article) {
            return response()->json([
                "message" => "Article non trouvé"
            ], 404);
        }
    
        $article->fournisseurs()->detach(); 
    
        $article->delete();
    
        return response()->json([
            "data"=>$article,
            "message" => "Suppression réussie"
        ]);
    }
    

}


































































































































// public function store(Request $request)
// {
//     $validatedData = $request->validate([
//         'libelle' => 'required|unique:articles',
//         'prix' => 'required|numeric',
//         'stock' => 'required|numeric',
//         'categorie_id' => 'required|exists:categories,id',
//         'fournisseurs' => 'array', 
//         // 'photo_path' =>'string'
//     ]);

//     $article = Articles::create([
//         'libelle' => $validatedData['libelle'],
//         'prix' => $validatedData['prix'],
//         'stock' => $validatedData['stock'],
//         'categorie_id' => $validatedData['categorie_id'],
//         'photo_path' =>$request->photo_path,
//     ]);

//     if (isset($validatedData['fournisseurs']) && is_array($validatedData['fournisseurs'])) {
//         foreach ($validatedData['fournisseurs'] as $fournisseurId) {

//             $articleFournisseur =ArticleFournisseur::create([
//                 'article_id' => $article->id,
//                 'fournisseur_id' =>$fournisseurId,

//             ]);


//             $articleFournisseur->save();
//         }
//     }
//     return response()->json("L'article a été ajouté avec succès.");

// }