import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { PetService } from '../services/pet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.scss']
})
export class PetStoreComponent implements OnInit {
  sub: any;
  id: any;
  pets: any;
  user: User;

  constructor(private route: ActivatedRoute, private petStoreService: PetService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUserValue;
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }
}
