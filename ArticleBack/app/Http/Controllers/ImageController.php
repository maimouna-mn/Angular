<?php

namespace App\Http\Controllers;

use App\Models\Image;

use Illuminate\Http\Request;

class ImageController extends Controller
{
  
    public function storeImage(Request $request)
    {
        $this->validate($request, [
            'photo' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);
        
        $image_path = null; 
        
        $image_path = $request->file("photo");
        if ($image_path) {
            $photo_path = $image_path->store('image', 'public');
        }
        $photoPathSans = str_replace('image/', '', $photo_path);
        $image = Image::create([
            'image' => $photoPathSans,
        ]);
        $image->save();

        return $photo_path; 
    }


}