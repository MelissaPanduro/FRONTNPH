import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoModel } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table class="producto-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Unidad Medida</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let producto of productos" [class.inactive]="!producto.estado">
            <td>{{ producto.id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.unidadMedida }}</td>
            <td>{{ producto.precio | currency }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.fecha | date }}</td>
            <td class="actions">
              <button (click)="onEdit(producto)" class="btn-edit" *ngIf="!showInactive">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button (click)="onDelete(producto.id!)" class="btn-delete" *ngIf="!showInactive">
                <i class="fas fa-trash"></i> Eliminar
              </button>
              <button *ngIf="showInactive" 
                      (click)="onRestore(producto.id!)" 
                      class="btn-restore">
                <i class="fas fa-undo"></i> Restaurar
              </button>
            </td>
          </tr>
          <tr *ngIf="productos.length === 0">
            <td colspan="8" class="no-data">
              No hay productos {{ showInactive ? 'inactivos' : 'activos' }} para mostrar
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }
    
    .producto-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
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
    
    button {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .inactive {
      background-color: #f8f9fa;
    }

    .no-data {
      text-align: center;
      color: #666;
      font-style: italic;
    }
  `]
})
export class ProductoTableComponent {
  @Input() productos: ProductoModel[] = [];
  @Input() showInactive = false;
  @Output() edit = new EventEmitter<ProductoModel>();
  @Output() delete = new EventEmitter<number>();
  @Output() restore = new EventEmitter<number>();
  
  onEdit(producto: ProductoModel) {
    this.edit.emit(producto);
  }
  
  onDelete(id: number) {
    this.delete.emit(id);
  }
  
  onRestore(id: number) {
    this.restore.emit(id);
  }
}