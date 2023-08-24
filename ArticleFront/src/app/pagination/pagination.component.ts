import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  constructor(){}
ngOnInit(): void {
  
}

  getPaginationArray() {
    const paginationArray = [];
    for (let i = 2; i < this.totalPage; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }
  
  @Input() currentPage!: number;
  @Input() totalPage!: number;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPage) {
      this.pageChanged.emit(newPage);
    }
  }


}
