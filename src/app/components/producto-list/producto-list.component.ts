import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { ProductoModel } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Productos</h2>
      
      <!-- Formulario de producto -->
      <div class="form-container">
        <h3>{{ editingProducto?.id ? 'Editar' : 'Nuevo' }} Producto</h3>
        <div class="form-group">
          <input [(ngModel)]="currentProducto.nombre" placeholder="Nombre" class="form-control">
        </div>
        <div class="form-group">
          <input [(ngModel)]="currentProducto.descripcion" placeholder="Descripción" class="form-control">
        </div>
        <div class="form-group">
          <input type="number" [(ngModel)]="currentProducto.precio" placeholder="Precio" class="form-control">
        </div>
        <button (click)="saveProducto()" class="btn-primary">
          {{ editingProducto?.id ? 'Actualizar' : 'Crear' }}
        </button>
      </div>

      <!-- Lista de productos -->
      <div class="products-list">
        <div *ngFor="let producto of productos" class="product-card">
          <h3>{{ producto.nombre }}</h3>
          <p>{{ producto.descripcion }}</p>
          <p class="price">\${{ producto.precio }}</p>
          <div class="actions">
            <button (click)="editProducto(producto)" class="btn-edit">Editar</button>
            <button (click)="deleteProducto(producto.id!)" class="btn-delete">Eliminar</button>
            <button *ngIf="!producto.estado" (click)="restoreProducto(producto.id!)" class="btn-restore">
              Restaurar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .form-container {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .products-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: #ffffff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .price {
      font-size: 1.2em;
      color: #2196F3;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #2196F3;
      color: white;
    }

    .btn-edit {
      background-color: #4CAF50;
      color: white;
    }

    .btn-delete {
      background-color: #f44336;
      color: white;
    }

    .btn-restore {
      background-color: #FF9800;
      color: white;
    }

    button:hover {
      opacity: 0.9;
    }
  `]
})
export class ProductoListComponent implements OnInit {
  productos: ProductoModel[] = [];
  currentProducto: ProductoModel = {};
  editingProducto: ProductoModel | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getAllProductos().subscribe(
      data => this.productos = data
    );
  }

  saveProducto() {
    if (this.editingProducto?.id) {
      this.productoService.updateProducto(this.editingProducto.id, this.currentProducto)
        .subscribe(() => {
          this.resetForm();
          this.loadProductos();
        });
    } else {
      this.productoService.createProducto(this.currentProducto)
        .subscribe(() => {
          this.resetForm();
          this.loadProductos();
        });
    }
  }

  editProducto(producto: ProductoModel) {
    this.editingProducto = producto;
    this.currentProducto = { ...producto };
  }

  deleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.loadProductos();
    });
  }

  restoreProducto(id: number) {
    this.productoService.restoreProducto(id).subscribe(() => {
      this.loadProductos();
    });
  }

  resetForm() {
    this.currentProducto = {};
    this.editingProducto = null;
  }
}