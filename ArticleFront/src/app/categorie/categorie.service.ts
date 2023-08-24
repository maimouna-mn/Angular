import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';
import { Categorie, Response } from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  // data!: any;
  constructor(private http: HttpClient) {

  }
  
  
  getCategories(size: number, page: number): Observable<Response<Categorie>> {
    return this.http.get<Response<Categorie>>(`${environment.apiUrl}/Categorie/index?page=${page}&size=${size}`);
  }

  addCategorie(libelle: string): Observable<Response<Categorie>>{
    const body = { libelle: libelle };
    return this.http.post<Response<Categorie>>(`${environment.apiUrl}/Categorie/store`, body);

  }
  updateCategorie(libelle: string, id: number): Observable<Response<Categorie>> {
    const body = { libelle: libelle };
    return this.http.put<Response<Categorie>>(`${environment.apiUrl}/Categorie/update/${id}`, body)
  }
  rechercheCategorie(libelle: string): Observable<Response<Categorie>>{
    return this.http.get<Response<Categorie>>(`${environment.apiUrl}/Categorie/recherche/libelle/${libelle}`)
  }
  deleteCategorie(ids: any): Observable<Response<Categorie>> {
    let options = {
      Headers: new HttpHeaders({
        'accept': 'application/json',
        'contentType': 'application/json'
      }),
      body: ids
    }
    return this.http.delete<Response<Categorie>>(`${environment.apiUrl}/Categorie/delete`, options)
  }

}
