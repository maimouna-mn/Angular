import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categorie, Response } from '../models/Categorie';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from './categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private appService: CategorieService, private toastr: ToastrService,private cdRef: ChangeDetectorRef) {
  }
  button: boolean = true;
  button1: boolean = true;
  isAvailable = false;
  categories: Categorie[] = [];
  cat!: Categorie;
  categoryModif: Categorie | null = null;
  currentPage: number = 1;
  totalPage: number = 0;
  libelle: string = "";
  id: number = 3;
  idsdelete: [] = [];

  ngOnInit(): void {
    this.getCategorie(1, 5);
  }

  getCategorie(page: number, size: number) {
    this.appService.getCategories(page, size).subscribe((result: Response<Categorie>) => {
      this.categories = result.data.data;
      this.totalPage = result.data.last_page;
      this.currentPage = page;
    });
  }

  ajouterCategorie() {
    this.appService.addCategorie(this.libelle).subscribe((response: Response<Categorie>) => {

      if (response.message === "Insertion réussie") {
        this.toastr.success("Insertion reussie");
        this.getCategorie(1, 5);
      } else if (response.message === "Le libellé existe déjà") {
        this.isAvailable = true;
        setTimeout(() => {
          this.isAvailable = false;
        }, 5000);
      }
    },
      (error) => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
      }
    );
  }
  // ajouterCategorie() {
  //   this.appService.addCategorie(this.libelle).subscribe(
  //     (response: Response<Categorie>) => {
  //       if (response.message === "Insertion réussie") {
  //         this.toastr.success("Insertion réussie");
  
  //         // Ajouter la nouvelle catégorie au tableau categories
  //         const newCategory: Categorie = {
  //           id: response.data.data[0].id,
  //           libelle: response.data.data[0].libelle,
  //           checked: false,
  //         };
  //         this.categories.push(newCategory);
  
  //         // Marquer le composant comme dirty pour déclencher la détection des modifications
  //         this.cdRef.markForCheck();
  
  //         // Mettre à jour l'état des boutons
  //         this.updateButtonState();
  //       } else if (response.message === "Le libellé existe déjà") {
  //         this.isAvailable = true;
  //         setTimeout(() => {
  //           this.isAvailable = false;
  //         }, 5000);
  //       }
  //     },m
  //     (error) => {
  //       console.error('Erreur lors de l\'ajout de la catégorie', error);
  //     }
  //   );
  // }

  modeAjout: boolean = true;

  basculerMode() {
    this.modeAjout = !this.modeAjout;
    if (!this.modeAjout) {
      // this.button1 = false;
      this.input1 = false
      this.inputRec = true

    } else if (this.modeAjout) {
      // this.selectAll=true
      this.button1 = true;
      this.inputRec = false

    }
  }

  clickTd(category: Categorie) {
    if (this.modeAjout) {
      return;
    }
    this.inputRec = false
    this.button = false;
    this.libelle = category.libelle;
    this.categoryModif = category;
    if (this.libelle === category.libelle) {
      this.button = true;

    }
  }


  updateCategorie() {
    this.appService.updateCategorie(this.libelle, this.categoryModif?.id as number).subscribe(
      (response: Response<Categorie>) => {

        this.toastr.success("Modification effectué");
        this.getCategorie(1, 5);
      },
      (error) => {
        console.error('Erreur lors de la modification de la catégorie', error);
      }
    );

  }
  
  


  Categorie() {
    if (this.modeAjout) {
      this.ajouterCategorie()
      this.getCategorie(1, 5);
    } else {
      this.updateCategorie()
      this.getCategorie(1, 5);
    }

  }

  tabe: number[] = [];
  selectAll: boolean = false;

  handleCheckboxChange(event: Event, categoryId: number): void {
    const target = event.target as HTMLInputElement;
  
    if (target.checked) {
      this.tabe.push(categoryId);
    } else {
      this.tabe = this.tabe.filter(item => item !== categoryId);
    }
  
    this.updateButtonState();
  }

  updateButtonState(): void {
    if (this.tabe.length > 0) {
      this.button1 = false;
    } else {
      this.button1 = true;
    }
  }

  toggleSelectAll(): void {
    if (this.selectAll) {
      this.tabe = this.categories.map(cat => cat.id);
    } else {
      this.tabe = [];
    }
  
    this.categories.forEach(cat => cat.checked = this.selectAll || cat.checked);
  
    this.updateButtonState();
  }

  input1: boolean = true;
  inputRec: boolean = false

  // delCategorie() {
  //   this.appService.deleteCategorie({ ids: this.tabe }).subscribe(
  //     (response) => {

  //       this.toastr.success("Supression effectué");
  //       this.getCategorie(1, 5);
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la suppression de la catégorie', error);
  //     }
  //   );

  // }




  // delCategorie() {
  //   this.appService.deleteCategorie({ ids: this.tabe }).subscribe(
  //     (response) => {
  //       this.toastr.success("Suppression effectuée");
  
  //       for (const categoryId of this.tabe) {
  //         const index = this.categories.findIndex(cat => cat.id === categoryId);
  //         if (index !== -1) {
  //           this.categories.splice(index, 1);
  //         }
  //       }
  
  //       this.tabe = [];
  
  //       this.updateButtonState();
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la suppression de la catégorie', error);
  //     }
  //   );
  // }
  delCategorie() {
    this.appService.deleteCategorie({ ids: this.tabe }).subscribe(
      (response) => {
        this.toastr.success("Suppression effectuée");
  
        this.categories = this.categories.filter(cat => !this.tabe.includes(cat.id));
  
        this.tabe = [];
  
        this.updateButtonState();
  
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
        }
  
        this.getCategorie(this.currentPage, 5);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la catégorie', error);
      }
    );
  }
  
  





  rechercheCategorie() {
    this.appService.rechercheCategorie(this.libelle).subscribe((response: Response<Categorie>) => {
      if (response.message === "Non inseree") {
        if (this.libelle.length >= 3) {
          this.button = false

        } else {
          this.isAvailable = true;
          setTimeout(() => {
            this.isAvailable = false;
          }, 5000);
          this.button = true

        }
      }
      else {
        if (this.libelle.length > 3) {
          // if (this.libelle.toLowerCase().trim() === response.data.toLowerCase().trim()) {
          //   this.button = true;
          //   return;
          // }
          console.log(response.data);

          this.button = false;
        }
      }
    },
      (error) => {
        console.error('Erreur lors de la recherche(insertion) de la catégorie', error);
      }
    );

  }


}

