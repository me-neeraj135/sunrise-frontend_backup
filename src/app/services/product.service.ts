import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, forkJoin, map, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'assets/data/product.json'
  private productDetailUrl = 'assets/data/product-detail.json'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any[]>(this.productUrl)
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http
      .get<any[]>(this.productUrl)
      .pipe(
        map((products) =>
          products.filter(
            (product: { category: string }) => product.category === category,
          ),
        ),
      )
  }

  getProductDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.productDetailUrl)
  }

  getProductById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.productUrl)
      .pipe(
        map((products) => products.find((product) => product.productId === id)),
      )
  }

  getProductAndDetailsById(productId: number): Observable<any[]> {
    return forkJoin([this.getProducts(), this.getProductDetails()]).pipe(
      map(([products, productDetails]) => {
        const product = products.find(
          (t: { productId: number }) => t.productId === productId,
        )
        const details = productDetails.find((d) => d.productId === productId)
        return { ...product, ...details }
      }),
    )
  }
}
