import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductServiceService } from 'src/app/products/services/product-service.service'

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit{
  products:any[]=[]
  categories:any[] = []
  spinner:boolean =false
  cartProduct:any [] =[]
  addButton:boolean = true
  // @Output() id = new EventEmitter()

  constructor(private service:ProductServiceService){ }
  ngOnInit(): void {
    this.getproduct(),
    this.getcategory()
  }

  getproduct(){
    this.spinner = false
    this.service.getAllProducts().subscribe((res:any)=>{
      // console.log(res.slice(0,50))
      this.products = res.slice(0,50)
      this.spinner = true
    }, error =>{
      alert(error.message)
    })
  }
  getcategory(){
    this.service.getAllcategory().subscribe((res:any)=>{
      this.categories=res//.slice(0,5)
      // console.log(this.categories)
    }, error =>{
      alert(error.message)
    })
  }

  filterByCategory(event:any){
    let value = event.target.value
    if(value !='all'){
      this.filterproductbyCategory(value)
      console.log(value)
    }else{
      this.getproduct()
    }
    // console.log(value)
  }



  filterproductbyCategory(keyword: string){
    this.spinner = false
      this.service.getProductByCategoryApi(keyword).subscribe((res:any)=>{
        // console.log("filter"+res)
        this.products=res
        this.spinner = true
      }, error =>{
        alert(error.message)
      })
  }


  addToCart(value:any){
    if('cart' in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem('cart')!);
      let cart:any = this.cartProduct.find(element => {
        if (element.data.id === value.data.id) {
          return true;
        }
        return false;
      })
      if(cart){
        alert("product aleardy in cart")
      }else{

        this.cartProduct.push(value)
        localStorage.setItem('cart',JSON.stringify(this.cartProduct))
      }
    }else{
      this.cartProduct.push(value)
      localStorage.setItem('cart',JSON.stringify(this.cartProduct))
    }
  }

  veiwDetails(event:any){
    console.log(event.id)
    // this.id.emit(event.id)
  }
}
