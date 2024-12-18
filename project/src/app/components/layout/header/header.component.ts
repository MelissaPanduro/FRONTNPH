import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gSYQOYHzOn13EJdsb3SYdGGYUp2-0AVTWA&s" alt="Logo Empresa" class="logo">
          <span class="app-name">Sistema de NPH</span>
        </div>
        <div class="user-section">
          <span class="user-name">Usuario</span>
          <div class="user-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Usuario" />
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #1976D2;
      color: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logo {
      height: 40px;
      width: auto;
    }
    
    .app-name {
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
    }
  `]
})
export class HeaderComponent {}