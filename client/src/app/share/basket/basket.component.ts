import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../../store/card/card.service';

@Component({
  selector: 'ps-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  constructor(
    public cardLineService: CardService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public toCard(): void{
    this.router.navigate(['/card'])
  }

}
