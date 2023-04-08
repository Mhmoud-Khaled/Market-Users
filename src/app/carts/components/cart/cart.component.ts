import { Component, OnInit } from '@angular/core';
import { CartServicesService } from '../../services/cart-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products: any[]=[];
  index:number = 0
  total:number = 0
  success:boolean = false

  constructor(private service:CartServicesService){
  }

  ngOnInit(): void {
    this.getProduct()
  }

  // plus(){
  //   this.products.quantity++
  // }


  getProduct(){
    if("cart" in localStorage){
      this.products = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getTotal()
  }



  plusQuantitiy(index:any){
    this.products[index].quantity++
    localStorage.setItem('cart',JSON.stringify(this.products))
    this.getTotal()
  }

  minsQuantitiy(index:any){
    if(this.products[index].quantity > 1){
      this.products[index].quantity--
      localStorage.setItem('cart',JSON.stringify(this.products))
      this.getTotal()
    }
  }

  getTotal(){
    this.total = 0
    for(let item in this.products){
      this.total += this.products[item].data.price * this.products[item].quantity
    }
  }

  deleteProduct(index:any){
    this.products.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(this.products))
    this.getTotal()
  }

  clearDate(){
    this.products = []
    localStorage.setItem('cart',JSON.stringify(this.products))
    this.getTotal()
  }

  detectChange(){
    this.getTotal()
    localStorage.setItem('cart',JSON.stringify(this.products))
  }

  submitOrder(){
    // console.log(this.products)
    let product: any[] = []
    if("cart" in localStorage){
      console.log(this.products)
      for (let item in this.products) {
        product.push({productId:this.products[item].data.id, quantity:this.products[item].quantity})
      }
        let body = {
          userId: 5,
          date: new Date(),
          products: [product],
        }
        // console.log(body)
        this.service.postProduct(body).subscribe(res=>{
          this.success = true
        })
    }
  }
}
