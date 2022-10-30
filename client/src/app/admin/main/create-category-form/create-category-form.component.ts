import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/share/data-base.service';
import { CategoryModel } from 'src/app/share/models/category.model';
import { mergeMap} from 'rxjs';

@Component({
  selector: 'ps-create-category-form',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss']
})
export class CreateCategoryFormComponent implements OnInit {

  public categoryForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
      
  })

  public categories: CategoryModel[] = [];
  constructor(
    private dataBaseService: DataBaseService,
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }


  

  complete(): void{
    if(!!this.categoryForm.get('_id')?.value){
      this.update()
    } else {
      this.add()
    }

  }



  
  

  edit(category: CategoryModel): void{
    this.categoryForm.patchValue(category);
  }

  delete(id: string): void{
    this.dataBaseService
      .deleteCategory(id)
      .subscribe(() => {  
        this.getCategories()
      });
  }
  private add(): void{
    this.dataBaseService
      .addCategory({name: this.categoryForm.value.name})
      .subscribe((category) => {
        this.categories.push(category);
        this.categoryForm.reset();
      });
  }

  private update(): void{
    this.dataBaseService
      .updateCategory(this.categoryForm.value).pipe(
        mergeMap(() => this.dataBaseService.getCategories())
      )
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories;
        this.categoryForm.reset();
      });
  }
  
  private getCategories(): void{
    this.dataBaseService
      .getCategories()
      .subscribe((categories: CategoryModel[]) => {
        this.categories = categories
      });
  }
}
