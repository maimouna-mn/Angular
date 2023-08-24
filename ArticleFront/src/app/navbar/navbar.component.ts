import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article, Fournisseur } from '../models/Categorie';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(nom: ArticleComponent) {


    // console.log(nom.value + 115);
  }

  @Input() Fournisseurs!: Fournisseur[]
  Fournisseur!: Fournisseur
  @Input() singleArticle!: Article
  @Input() Article1!: Article[]

  @Output() test: EventEmitter<any> = new EventEmitter<any>()
 
  testChild() {
    this.test.emit()
  }
 
@Output() envoyerNumero=new EventEmitter<string>()

envoiFils(){
  const a:string="Je suis le fils";
  this.envoyerNumero.emit(a)
}
}
