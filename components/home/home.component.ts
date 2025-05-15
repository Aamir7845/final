// import { Component, inject } from '@angular/core';
// import { CustomerService } from '../../services/customer.service';
// import { Product } from '../../types/product';
// import { MatButtonModule } from '@angular/material/button';
// import { ProductCardComponent } from '../product-card/product-card.component';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
// import { RouterLink } from '@angular/router';
// import { WishlistService } from '../../services/wishlist.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [MatButtonModule,ProductCardComponent,CarouselModule,RouterLink ],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
// })
// export class HomeComponent {
//   customOptions: OwlOptions = {
//     loop: true,
//     autoplay:true,
//     autoplaySpeed:20,
//     mouseDrag: false,
//     touchDrag: false,
//     pullDrag: false,
//     dots: false,
//     navSpeed: 700,
//     navText: ['', ''],
//     nav: true
//   }
//   customerService = inject(CustomerService);
//   newProducts: Product[] = [];
//   featuredProducts: Product[] = [];
//   bannerImages:Product[]=[];
//   wishlistService=inject(WishlistService);
//   cartService=inject(CartService);
//   ngOnInit() {
//     this.customerService.getFeaturedProducts().subscribe((result) => {
//       this.featuredProducts = result;
//       console.log(this.featuredProducts)
//       this.bannerImages.push(...result);
//     });
//     this.customerService.getNewProducts().subscribe((result) => {
//       this.newProducts = result;
//       console.log(this.newProducts)
//       this.bannerImages.push(...result);
//     });
    
//   }
// }




// import { Component, inject } from '@angular/core';
// import { CustomerService } from '../../services/customer.service';
// import { Product } from '../../types/product';
// import { MatButtonModule } from '@angular/material/button';
// import { ProductCardComponent } from '../product-card/product-card.component';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
// import { RouterLink } from '@angular/router';
// import { WishlistService } from '../../services/wishlist.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [MatButtonModule, ProductCardComponent, CarouselModule, RouterLink],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
// })
// export class HomeComponent {
//   customerService = inject(CustomerService);
//   wishlistService = inject(WishlistService);
//   cartService = inject(CartService);

//   newProducts: Product[] = [];
//   featuredProducts: Product[] = [];
//   bannerImages: Product[] = [];

//   customOptions: OwlOptions = {
//     loop: true,
//     autoplay: true,
//     autoplayTimeout: 3000,
//     autoplaySpeed: 1000,
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: true,
//     dots: false,
//     navSpeed: 700,
//     navText: ['‹', '›'],
//     nav: true,
//     items: 1,
//     responsive: {
//       0: { items: 1 },
//       600: { items: 1 },
//       1000: { items: 1 }
//     }
//   };

//   ngOnInit() {
//     this.customerService.getFeaturedProducts().subscribe((result) => {
//       this.featuredProducts = result;
//       this.bannerImages.push(...result);
//     });

//     this.customerService.getNewProducts().subscribe((result) => {
//       this.newProducts = result;
//       this.bannerImages.push(...result);
//     });
//   }
// }



import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

// ✅ Define your own lightweight banner type
interface Banner {
  _id: string;
  name: string;
  images: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  customerService = inject(CustomerService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  newProducts: Product[] = [];
  featuredProducts: Product[] = [];

  // ✅ Banners use Banner[] instead of Product[]
  bannerImages: Banner[] = [
    {
      _id: '1',
      name: 'Smartphone Deals',
      images: [
        'https://rukminid2.flixcart.com/fk-p-flap/1620/270/image/a30c1320dc4b2b77.jpeg?q=20',
      ],
    },
    {
      _id: '2',
      name: 'Home Essentials',
      images: [
        'https://rukminid2.flixcart.com/fk-p-flap/1620/270/image/04582568ec2b7d2d.jpg?q=20',
      ],
    },
    {
      _id: '3',
      name: 'Electronics Fest',
      images: [
        'https://images.unsplash.com/photo-1524591431555-cc7876d14adf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww',
      ],
    },
    {
      _id: '4',
      name: 'Fashion Sale',
      images: [
        'https://rukminid2.flixcart.com/fk-p-flap/1620/270/image/14eb0fb178248c58.jpg?q=20',
      ],
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['‹', '›'],
    nav: true,
    items: 1,
  };

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
    });

    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
    });
  }
}
