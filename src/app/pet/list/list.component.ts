import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PetListComponent implements OnInit {

  @Input() stores: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToStore(id) {
    this.router.navigate([{ outlets: { side: `store/${id}` } }]);
  }
}
