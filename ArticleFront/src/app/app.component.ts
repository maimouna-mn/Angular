import { Component, OnInit } from '@angular/core';
// import {}
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  ngOnInit(): void {
  }
  constructor( private toastr: ToastrService) {
  }



}
