import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PetService } from '../services/pet.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pet: PetService, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById().subscribe(
      (data) => console.log("user", data),
      (error) => console.log(error),
      () => console.log("done"),
    );

    // this.pet.getById().subscribe(
    //   (data) => console.log(data),
    //   () => console.log("done")
    // )
  }

  logout() {
    this.auth.logout()
  }

}
