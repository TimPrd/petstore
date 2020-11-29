import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-petstore-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PetStoreListComponent implements OnInit {

  @Input() stores: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToStore(id) {
    this.router.navigate([{ outlets: { side: `store/${id}` } }]);
  }

}
