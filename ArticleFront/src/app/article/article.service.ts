import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';
import { ApiResponse, Article, Categorie, Fournisseur, Response, Response1, dataz } from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private http: HttpClient) {

  }
  all(size: number, page: number): Observable<ApiResponse<{ data1: Categorie[]; data2:Response1<Article[]>; data3: Fournisseur[]; }>> {
    return this.http.get<ApiResponse<{
      data1: Categorie[];
      data2:Response1<Article[]>;
      data3: Fournisseur[];
    }>>(`${environment.apiUrl}/Article/index?page=${page}&size=${size}`);
  }

  store(article: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Article/store`, article);

  }
  delete(id: number): Observable<Response<Article>> {
  
    return this.http.delete<Response<Article>>(`${environment.apiUrl}/Article/delete/${id}`)
  }
  update(article:Article,id:number): Observable<Response<Article>> {
  
    return this.http.put<Response<Article>>(`${environment.apiUrl}/Article/update/${id}`,article)
  }
}
