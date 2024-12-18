import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './app/components/layout/header/header.component';
import { SidebarComponent } from './app/components/layout/sidebar/sidebar.component';
import { ProductosComponent } from './app/components/productos/productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ProductosComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <app-productos></app-productos>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      background-color: #F5F6FA;
    }
  `]
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});