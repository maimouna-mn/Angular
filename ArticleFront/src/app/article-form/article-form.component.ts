import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Article, Categorie, Fournisseur } from '../models/Categorie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})

export class ArticleFormComponent {
  libelle1: string = "";
  @Input() article!: FormGroup;
  @Input() Fournisseurs!: Fournisseur[];
  @Input() Categories!: Categorie[];
  // @Output("update") update: EventEmitter<Article> = new EventEmitter<Article>()
  @Output() update: EventEmitter<Article> = new EventEmitter<Article>()

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.article = this.formBuilder.group({
      libelle: ['', Validators.required],
      libelle1: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categorie: [0, [Validators.required, Validators.min(0)]],
      fournisseur: [[], [Validators.required]],
      photo: ['', Validators.required],
      ref: ''
    });
  }

  onFormChange() {
    const libelleValue = this.article.get('libelle')?.value || '';
    const categorieValue = this.selectedCategoryId || '';
    const libellePrefix = libelleValue.substring(0, 3).toUpperCase();
    const categoriePart = categorieValue.substring(0, 3).toUpperCase();
    const reference = `REF-${libellePrefix}-${categoriePart}-`;
    this.article.get('ref')?.setValue(reference);
  }


  libellesCorrespondants: string[] = [];
  fournisseursSelectionnes: string[] = [];

  rechercheFournisseur() {
    if (this.Fournisseurs && this.article.get('libelle1')!.value) {
      const lowercaseLibelle = this.article.get('libelle1')!.value.toLowerCase();

      this.libellesCorrespondants = this.Fournisseurs
        .filter(fournisseur => fournisseur.libelle.toLowerCase().startsWith(lowercaseLibelle))
        .map(fournisseur => fournisseur.libelle);
      this.libellesCorrespondants = this.libellesCorrespondants.filter(libelle => !this.fournisseursSelectionnes.includes(libelle));
    } else {
      this.libellesCorrespondants = [];
    }
    // this.article!.get('fournisseur')!=this.fournisseursSelectionnes
  }


  ajouterFournisseur(fournisseur: string) {
    if (!this.fournisseursSelectionnes.includes(fournisseur)) {
      this.fournisseursSelectionnes.push(fournisseur);
      this.libelle1 = this.fournisseursSelectionnes.join(', ');
      this.libellesCorrespondants = this.libellesCorrespondants.filter(libelle1 => libelle1 !== fournisseur);
    }
  }

  supprimerFournisseur(fournisseur: string) {
    const index = this.fournisseursSelectionnes.indexOf(fournisseur);
    if (index !== -1) {
      this.fournisseursSelectionnes.splice(index, 1);
      this.libelle1 = this.fournisseursSelectionnes.join(', ');
      this.libellesCorrespondants.push(fournisseur);
    }
  }

  categories: Categorie[] = [];
  photoPreviewUrl: any;

  openFileInput() {
    const fileInput = document.getElementById('photo');
    if (fileInput) {
      fileInput.click();
    }
  }

  photo: string | File = "";

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.photo = file;
      this.photoPreviewUrl = URL.createObjectURL(file);
    }
  }

  selectedCategoryId!: string;

  onCategorySelectionChange() {
    console.log("Catégorie sélectionnée :", this.selectedCategoryId);
  }

  @Output() addArticleRequested = new EventEmitter<FormData>();

  addArticle() {
    const formData = new FormData();
    formData.append('libelle', this.article.get('libelle')!.value);
    formData.append('prix', this.article.get('prix')!.value.toString());
    formData.append('stock', this.article.get('stock')!.value.toString());
    formData.append('libelle3', this.selectedCategoryId.toString());
    formData.append('fournisseurs', this.fournisseursSelectionnes.join(','));
    formData.append('photo', this.photo);

    this.addArticleRequested.emit(formData);
  }

  isEditing: boolean = true;

  addOrEditArticle() {
    if (this.isEditing) {
      this.update.emit()
    } else {
      this.addArticle()
    }
  }


}
