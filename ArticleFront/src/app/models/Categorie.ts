
export interface Categorie {
    id: number,
    libelle: string,
    checked:boolean,

}

export interface Response<T> {
    message?: string,
    data: tab<T>
}
export interface Response1<T> {
    data: T
    last_page: number,  

}

export interface tab<T> {
    data: T[],
    last_page: number,  
}

export interface dataz{
    data: Article[],
    last_page: number, 
}

export interface Article {
    id: number,
    libelle: string,
    prix:number,
    stock:number,
    categorie_id:number,
    fournisseur:string,
    photo?:File ,
    photo_path?:string ,
    categorie?:string,
    libelle3?:string

}

export interface Fournisseur {
    id: number,
    libelle: string,
}

export interface ApiResponse<T> {
    message?: string;
    data: T;
    data2:Response1<T>
  }