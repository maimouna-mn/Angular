import { Component ,EventEmitter,Input,OnInit, Output} from '@angular/core';
import { Article } from '../models/Categorie';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  constructor(){

  }
ngOnInit(): void {
  
}
 @Input() Articles!:Article[];
 @Input() singleArticle!: Article;
 @Input() test!: boolean;

 @Output() deleteArticleClicked = new EventEmitter<number>();
 @Output() editArticleClicked = new EventEmitter<Article>();

 onDeleteArticle(articleId: number) {
     this.deleteArticleClicked.emit(articleId);
 }

 editArticles(article: Article) {
  this.editArticleClicked.emit(article);
}

}
