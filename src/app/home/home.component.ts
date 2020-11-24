import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pet: PetService) { }

  ngOnInit(): void {
    // this.pet.getById().subscribe(
    //   (data) => console.log(data),
    //   () => console.log("done")
    // )
  }

}
