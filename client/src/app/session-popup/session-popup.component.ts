import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'ps-session-popup',
  templateUrl: './session-popup.component.html',
  styleUrls: ['./session-popup.component.scss']
})
export class SessionPopupComponent implements OnInit {

  constructor(
    public dialigRef: MatDialogRef<SessionPopupComponent>,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public confirm(): void{
    this.router.navigate(['/admin/auth']);
  }
}
