import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://fictional-funicular-7vrx775qp965hxw6g-8085.app.github.dev/api/productos';

  constructor(private http: HttpClient) { }

  getAllProductos(showInactive: boolean = false): Observable<ProductoModel[]> {
    const url = showInactive ? `${this.apiUrl}?estado=false` : `${this.apiUrl}?estado=true`;
    return this.http.get<ProductoModel[]>(url);
  }

  getProductoById(id: number): Observable<ProductoModel> {
    return this.http.get<ProductoModel>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: ProductoModel): Observable<ProductoModel> {
    return this.http.post<ProductoModel>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: ProductoModel): Observable<ProductoModel> {
    return this.http.put<ProductoModel>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<ProductoModel> {
    return this.http.delete<ProductoModel>(`${this.apiUrl}/${id}`);
  }

  restoreProducto(id: number): Observable<ProductoModel> {
    return this.http.put<ProductoModel>(`${this.apiUrl}/restaurar/${id}`, {});
  }
}