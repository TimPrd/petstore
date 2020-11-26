import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PetService } from '../../services/pet.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-seller-layout',
  templateUrl: './seller-layout.component.html',
  styleUrls: ['./seller-layout.component.scss']
})
export class SellerLayoutComponent implements OnInit {

  private _stores: any;
  private _user: User;

  constructor(private userService: UserService, private petStore: PetService,

  ) { }

  ngOnInit(): void {
    this._user = this.userService.currentUserValue;
    this.getOwnerStores(this._user.id)
  }

  public get stores() {
    return this._stores;
  }

  private getOwnerStores(id) {
    this.petStore.getStoreByOwner(id).subscribe(
      (stores) => this._stores = stores,
      () => console.log("done")
    )
  }

  public createStore(){

  }

}
