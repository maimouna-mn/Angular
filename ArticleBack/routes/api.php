<?php

use App\Http\Controllers\articleController;
use App\Http\Controllers\categorieController;
use App\Http\Controllers\fournisseurController;
use App\Http\Controllers\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("Categorie/index",[categorieController::class,"index"]);
Route::get("Categorie/all",[categorieController::class,"all"]);
Route::get("Categorie/recherche/libelle/{libelle}",[categorieController::class,"recherche"]);
Route::post("Categorie/store",[categorieController::class,"store"]);
Route::delete("Categorie/delete/{id?}",[categorieController::class,"destroy"]);
Route::put("Categorie/update/{id}",[categorieController::class,"update"]);
Route::put("Article/update/{id}",[articleController::class,"update"]);

Route::delete("Article/delete/{id}",[articleController::class,"destroy"]);
Route::post("Article/store",[articleController::class,"store"]);
Route::get("Article/index",[articleController::class,"all"]);
