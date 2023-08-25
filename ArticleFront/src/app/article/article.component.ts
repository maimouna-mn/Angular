import { Component, OnInit, NgZone, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ArticleService } from './article.service';
import { ApiResponse, Article, Categorie, Fournisseur, Response, Response1 } from '../models/Categorie';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService, private toastr: ToastrService, private ngZone: NgZone) { }
  public article!: FormGroup

  @ViewChild(ArticleFormComponent) ArticleFormComponent!: ArticleFormComponent

  ngOnInit(): void {
    this.all(1, 5)
  }
  
  value: number = 110;
  Fournisseurs!: Fournisseur[];
  Categories!: Categorie[];
  Articles!: Article[];
  singleArticle!: Article
  currentPage: number = 1;
  totalPage: number = 0;

  all(page: number, size: number) {
    this.articleService.all(page, size).subscribe((result: ApiResponse<{ data1: Categorie[]; data2: Response1<Article[]>; data3: Fournisseur[]; }>) => {
      this.Fournisseurs = result.data.data3
      this.Categories = result.data.data1
      this.Articles = result.data.data2.data;
      this.totalPage = result.data.data2.last_page;
      this.currentPage = page;

    });
  }

  store(newArticle: FormData) {
    this.articleService.store(newArticle).subscribe((result: any) => {
      if (result.message === 'Insertion Réussie') {
        this.toastr.success('Insertion réussie');
        const newArticle: Article = result.data;
        this.Articles.unshift(newArticle);
        console.log(newArticle);
      }
    });
  }

  onDeleteArticle(articleId: number) {
    this.articleService.delete(articleId).subscribe(result => {
      this.Articles = this.Articles.filter(article => article.id !== articleId);
    });
  }


  editArticles(article: Article) {
    console.log(article);
    
    this.ArticleFormComponent.article.patchValue({
      libelle: article.libelle,
      prix: article.prix,
      stock: article.stock,
      categorie_id: article.categorie_id,
      categorie: article.categorie,
      fournisseur: article.fournisseur,
      photo_path: article.photo_path,
      libelle3: article.libelle3
    })

    this.ArticleFormComponent.photoPreviewUrl = `http://localhost:8000/storage/image/${article.photo_path}`
  }

  update() { }

  test() {
    alert("Parent testez");
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
    this.all(newPage, 5);
  }
  
  envoiParent(a:string){
    console.log(a);
  }
}



