import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() pet: any;
  @Input() isBuyer: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
