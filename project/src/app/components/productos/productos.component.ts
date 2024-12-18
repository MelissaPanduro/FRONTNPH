import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { ProductoModel } from '../../models/producto.model';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoTableComponent } from './producto-table/producto-table.component';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoFormComponent, ProductoTableComponent, ModalComponent],
  template: `
    <div class="productos-container">
      <div class="header">
        <div class="header-left">
          <h1>Gestión de Productos</h1>
          <div class="status-toggle">
            <button 
              [class.active]="!showInactive"
              (click)="toggleStatus(false)"
              class="toggle-btn">
              <i class="fas fa-check-circle"></i> Activos
            </button>
            <button 
              [class.active]="showInactive"
              (click)="toggleStatus(true)"
              class="toggle-btn">
              <i class="fas fa-times-circle"></i> Inactivos
            </button>
          </div>
        </div>
        <button class="btn-add" (click)="showAddModal()">
          <i class="fas fa-plus"></i> Agregar Producto
        </button>
      </div>
      
      <app-producto-table
        [productos]="productos"
        [showInactive]="showInactive"
        (edit)="onEditProducto($event)"
        (delete)="onDeleteProducto($event)"
        (restore)="onRestoreProducto($event)">
      </app-producto-table>

      <app-modal 
        [isOpen]="isModalOpen" 
        [title]="selectedProducto?.id ? 'Editar Producto' : 'Nuevo Producto'"
        (close)="closeModal()">
        <app-producto-form
          [producto]="selectedProducto"
          (save)="onSaveProducto($event)">
        </app-producto-form>
      </app-modal>
    </div>
  `,
  styles: [`
    .productos-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    h1 {
      color: #1976D2;
      font-size: 2rem;
      margin: 0;
    }

    .status-toggle {
      display: flex;
      gap: 0.5rem;
      background-color: #f5f5f5;
      padding: 0.25rem;
      border-radius: 6px;
    }

    .toggle-btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      color: #666;
      transition: all 0.2s;
    }

    .toggle-btn.active {
      background-color: white;
      color: #1976D2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-add {
      background-color: #1976D2;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .btn-add:hover {
      background-color: #1565C0;
    }
  `]
})
export class ProductosComponent implements OnInit {
  productos: ProductoModel[] = [];
  selectedProducto: ProductoModel | null = null;
  isModalOpen = false;
  showInactive = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getAllProductos(this.showInactive).subscribe(
      data => this.productos = data
    );
  }

  toggleStatus(showInactive: boolean) {
    this.showInactive = showInactive;
    this.loadProductos();
  }

  showAddModal() {
    this.selectedProducto = null;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProducto = null;
  }

  onSaveProducto(producto: ProductoModel) {
    if (this.selectedProducto?.id) {
      this.productoService.updateProducto(this.selectedProducto.id, producto)
        .subscribe(() => {
          this.closeModal();
          this.loadProductos();
        });
    } else {
      this.productoService.createProducto(producto)
        .subscribe(() => {
          this.closeModal();
          this.loadProductos();
        });
    }
  }

  onEditProducto(producto: ProductoModel) {
    this.selectedProducto = producto;
    this.isModalOpen = true;
  }

  onDeleteProducto(id: number) {
    this.productoService.deleteProducto(id).subscribe(() => {
      this.loadProductos();
    });
  }

  onRestoreProducto(id: number) {
    this.productoService.restoreProducto(id).subscribe(() => {
      this.loadProductos();
    });
  }
}