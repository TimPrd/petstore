import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { PetService } from '../services/pet.service';
import { UserService } from '../services/user.service';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateStoreComponent } from '../pet-store/create/create-store.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private petStore: PetService,
    private modalService: NgbModal,
    private userService: UserService,
    private config: NgbModalConfig) {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    this.config.size = 'xl';
    this.config.scrollable = true;
  }

  private _user: User;

  private _stores: any;

  ngOnInit(): void {
    this.userService.getUserById().subscribe(
      (user) => {
        this._user = user
      },
      (error) => console.log(error),
      () => console.log("done"),
    );
  }



  public createStore() {
    this.modalService.open(CreateStoreComponent);
  }

  public get stores() {
    return this._stores;
  }



  ///
  public get user() {
    return this._user;
  }



}
