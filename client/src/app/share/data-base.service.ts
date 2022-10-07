import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from './models/category.model';
import { Order } from './models/order.model';
import { Product } from './models/product.model';

@Injectable()
export class DataBaseService {

  constructor(private http: HttpClient) { }

  public addProduct(product: Product, image: File | null): Observable<Product>{
    const formData = new FormData();
    console.log(image);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);

    if(image){
      console.log('send', image);
      formData.append('image', image, image.name);
    }

    return this.http.post<Product>('http://localhost:5000/api/products', formData)
  }

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:5000/api/products')
  }

  public updateProduct(product: Product, image: File | null): Observable<Product>{
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('imageSrc', product.imageSrc);

    if(image){
      formData.append('image', image, image.name);
    }

    return this.http.put<Product>(`http://localhost:5000/api/products/${product._id}`, formData)
  }

  public deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(`http://localhost:5000/api/products/${id}`)
  }

  public addOrder(order: Order): Observable<Order>{
    return this.http.post<Order>('http://localhost:5000/api/orders', order)
  }

  public getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:5000/api/orders');
  }

  public updateOrder(order: Order): Observable<Order>{
    return this.http.put<Order>('http://localhost:5000/api/orders/' + order._id, order)
  }

  public addCategory(category: CategoryModel): Observable<CategoryModel>{
    return this.http.post<CategoryModel>('http://localhost:5000/api/categories', category)
  }

  public getCategories(): Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>('http://localhost:5000/api/categories')
  }

  public updateCategory(category: CategoryModel): Observable<void>{
    return this.http.put<void>(`http://localhost:5000/api/categories/${category._id}`, category)
  }

  public deleteCategory(id: string): Observable<CategoryModel>{
    return this.http.delete<CategoryModel>(`http://localhost:5000/api/categories/${id}`)
  } 

 

}
