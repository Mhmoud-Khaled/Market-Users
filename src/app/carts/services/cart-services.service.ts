import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServicesService {

  constructor(private http:HttpClient) { }

  postProduct(body:any){
    return this.http.post("https://fakestoreapi.com/carts",body)
  }
}
