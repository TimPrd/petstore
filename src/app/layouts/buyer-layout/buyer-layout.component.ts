import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buyer-layout',
  templateUrl: './buyer-layout.component.html',
  styleUrls: ['./buyer-layout.component.scss']
})
export class BuyerLayoutComponent implements OnInit {
  private _stores: any;

  constructor(private router: Router, private userService: UserService, private petStore: PetService) { }

  ngOnInit(): void {
    this.getAllStores()
  }

  public get stores() {
    return this._stores;
  }

  getAllStores() {
    this.petStore.getAllStores().subscribe(
      (stores) => this._stores = stores,
      () => console.log("done")
    )
  }

}
