import { Component, Inject, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataBaseService } from 'src/app/share/data-base.service';
import { Product } from 'src/app/share/models/product.model';
import { productI } from 'src/interfaces/productI';
import { CreateCategoryFormComponent } from '../create-category-form/create-category-form.component';
import { CategoryModel } from 'src/app/share/models/category.model';

@Component({
  selector: 'ps-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})

export class ProductFormComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  categories: CategoryModel[] = [];
  public image: File | null = null;
  public imagePreview: string = '';
  public formNewProduct: FormGroup =  new FormGroup({
    'name': new FormControl(null, Validators.required),
    'category': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'price': new FormControl(null, Validators.required)
  })
  
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dataBaseService: DataBaseService,
    private snackBar: MatSnackBar
    ) {
    }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.formNewProduct.patchValue(this.product);
      this.imagePreview = this.product.imageSrc;
    }
    this.getCategories();
    


    
  }

  public cancel(): void{
    this.dialogRef.close(null);
  }

  public complete(): void{
    if(this.isEditMode()){
      
      const prod: productI = new Product(
        this.formNewProduct.value.name,
        this.formNewProduct.value.description,
        this.formNewProduct.value.price,
        this.formNewProduct.value.category,
        this.product._id,
        this.product.imageSrc,
      );
      this.dataBaseService.updateProduct(prod, this.image).subscribe((product: Product) => {
        this.snackBar.open(`Product - ${this.formNewProduct.value.name} edited successfully!`, 'x', {
          duration: 500
        });
        this.dialogRef.close(product)
  
      })
    } else {
      this.dataBaseService.addProduct(this.formNewProduct.value, this.image).subscribe((product: Product) => {
        console.log(this.image)
        this.snackBar.open(`Product - ${this.formNewProduct.value.name} added successfully!`, 'x', {
          duration: 500
        });
        this.dialogRef.close(product)
  
      })
    }
  }

  public isEditMode(): boolean{
    return !!this.product;
  }


  public openCategoryForm(): void{
    const dialogRef = this.dialog.open(CreateCategoryFormComponent, {
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .subscribe(() => this.getCategories()); 


  }

  private getCategories(): void{
    this.dataBaseService
    .getCategories()
    .subscribe((categories: CategoryModel[]) => {
      this.categories = categories;
    });
  }

  public triggerInput(): void{
    this.inputFile.nativeElement.click();
  }

  public onFileUpload(e: Event): void{
    let cur = e.target as any;

    const file = cur.files[0];


    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }

    reader.readAsDataURL(file);
  }
}
