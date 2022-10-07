import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ps-product-modal-delete',
  templateUrl: './product-modal-delete.component.html',
  styleUrls: ['./product-modal-delete.component.scss']
})
export class ProductModalDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductModalDeleteComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void{
    this.dialogRef.close(false)

  }

  public confirm(): void{
    this.dialogRef.close(true);
    this.snackBar.open(`Product was successfully delete`, 'x')
  }



}
