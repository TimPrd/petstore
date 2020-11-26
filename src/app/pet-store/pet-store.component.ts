import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.scss']
})
export class PetStoreComponent implements OnInit {
  sub: any;
  id: any;
  pets: any;

  constructor(private route: ActivatedRoute, private petStoreService: PetService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getPetInStore(this.id)
      }
    });
  }


  private getPetInStore(id) {
    this.petStoreService.getPetInStore(id).subscribe(
      (pets) => this.pets = pets
    )
  }
}
