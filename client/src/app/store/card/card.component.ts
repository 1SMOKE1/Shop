import { Component, Input, OnInit } from '@angular/core';
import { productI } from 'src/interfaces/productI';
import { CardService } from './card.service';

@Component({
  selector: 'ps-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() products: productI[] = [];
  constructor(public cardService: CardService) { }

  ngOnInit(): void {
  }

}
