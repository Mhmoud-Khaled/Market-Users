// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
// import { HeaderComponent } from "./shared/components/header/header.component";
// import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ProductsModule,
        CartsModule
        // CommonModule
        ,
        // HeaderComponent,
        // SpinnerComponent
    ]
})
export class AppModule { }
