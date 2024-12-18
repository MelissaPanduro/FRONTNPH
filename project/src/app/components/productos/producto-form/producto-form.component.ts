import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="form-grid">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input id="nombre"
               [(ngModel)]="productoForm.nombre" 
               name="nombre"
               placeholder="Nombre del producto" 
               class="form-control"
               required>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion"
                  [(ngModel)]="productoForm.descripcion" 
                  name="descripcion"
                  placeholder="Descripción del producto" 
                  class="form-control"
                  rows="3"></textarea>
      </div>
      <div class="form-group">
      <label for="unidadMedida">Unidad de Medida</label>
      <select id="unidadMedida"
          [(ngModel)]="productoForm.unidadMedida"
          name="unidadMedida"
          class="form-control">
        <option value="" disabled [selected]="!productoForm.unidadMedida">Seleccione una unidad</option>
        <option value="Plancha">Plancha</option>
        <option value="Kg">Kg</option>
        <option value="Saco">Saco</option>
      </select>
    </div>

      <div class="form-group">
        <label for="precioUnitario">Precio</label>
        <input id="precioUnitario"
               type="number" 
               [(ngModel)]="productoForm.precioUnitario" 
               name="precioUnitario"
               placeholder="0.00" 
               class="form-control"
               min="0"
               step="0.01"
               required>
      </div>
        <div class="form-group">
        <label for="categoria">Categoría</label>
        <select id="categoria"
            [(ngModel)]="productoForm.categoria"
            name="categoria"
            class="form-control">
      <option value="" disabled [selected]="!productoForm.categoria">Seleccione una categoría</option>
      <option value="Huevos">Huevos</option>
      <option value="Carne">Carne</option>
      <option value="Abono">Abono</option>
    </select>
  </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">
          {{ producto?.id ? 'Actualizar' : 'Guardar' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #1976D2;
    }
    
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .form-actions {
      grid-column: 1 / -1;
      text-align: right;
      padding-top: 1rem;
    }
    
    .btn-primary {
      background-color: #1976D2;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-primary:hover {
      background-color: #1565C0;
    }
  `]
})
export class ProductoFormComponent {
  @Input() producto: ProductoModel | null = null;
  @Output() save = new EventEmitter<ProductoModel>();

  productoForm: ProductoModel = {};

  ngOnInit() {
    if (this.producto) {
      this.productoForm = { ...this.producto };
    }
  }

  onSubmit() {
    this.save.emit(this.productoForm);
  }
}