import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { Article } from '../models/Categorie';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  constructor(par: ArticleComponent) {
    // console.log(par.value);

  }
  ngOnInit(): void {

  }
  @Input() Articles!: Article[];
  @Input() singleArticle!: Article;

  @Output() deleteArticleClicked = new EventEmitter<number>();
  @Output() editArticleClicked = new EventEmitter<Article>;
  @Output() editButton = new EventEmitter;

  articleToDelete: number | null = null;
  isConfirming: boolean = false;
  countdown: number = 3;
  countdownTimer: any;

  editArticle(article: Article) {
    console.log(article);

    const data = {
      id: article.id,
      libelle: article.libelle,
      prix: article.prix,
      stock: article.stock,
      categorie_id: article.categorie_id,
      fournisseur: article.fournisseur,
      photo_path: article.photo_path,
      categorie:article.categorie

    }
    this.editArticleClicked.emit(data);
  }


  deleteArticle(articleId: number) {
    if (this.isConfirming && this.articleToDelete === articleId) {
      clearInterval(this.countdownTimer);
      this.isConfirming = false;
      this.articleToDelete = null;
      this.countdown = 3;
    } else {
      this.articleToDelete = articleId;
      this.isConfirming = true;

      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.countdownTimer);
          this.isConfirming = false;
          this.articleToDelete = null;
          this.countdown = 3;
          this.deleteArticleClicked.emit(articleId);
        }
      }, 1000);
    }
  }

}
