import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside class="sidebar">
      <div class="user-info">
        <div class="user-avatar">
          <img src="assets/user-avatar.png" alt="Usuario" />
        </div>
        <div class="user-details">
          <p class="welcome">Bienvenido de nuevo,</p>
          <p class="user-name">Melissa Panduro</p>
        </div>
      </div>
      
      <nav class="navigation">
        <a href="#" class="nav-item">
          <span class="nav-text">Dashboard</span>
          <span class="nav-subtitle">dashboard-nph</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-text">Proveedor</span>
          <span class="nav-subtitle">change-detection</span>
        </a>
        <a href="#" class="nav-item active">
          <span class="nav-text">Galpon</span>
          <span class="nav-subtitle">control-flow</span>
        </a>
        <a href="#" class="nav-item">
          <span class="nav-text">Alimento</span>
          <span class="nav-subtitle">defer-options</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #1B1E2B;
      color: white;
      height: 100vh;
      padding: 1rem;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    
    .welcome {
      color: #8B8D93;
      font-size: 0.8rem;
    }
    
    .user-name {
      color: white;
      font-weight: bold;
    }
    
    .navigation {
      margin-top: 1rem;
    }
    
    .nav-item {
      display: block;
      padding: 0.8rem;
      color: #8B8D93;
      text-decoration: none;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    
    .nav-item.active {
      background-color: rgba(255,255,255,0.1);
      color: white;
    }
    
    .nav-text {
      display: block;
      font-weight: bold;
    }
    
    .nav-subtitle {
      display: block;
      font-size: 0.8rem;
      opacity: 0.7;
    }
  `]
})
export class SidebarComponent {}