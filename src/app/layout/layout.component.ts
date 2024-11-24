import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router
  ){
  }

  username: string | null = '';

  ngOnInit(): void {
    // Recupera el nombre de usuario desde el localStorage
    this.username = localStorage.getItem('username');
  }

  logout(): void {
    // Elimina el token y otros datos del localStorage cuando el usuario cierre sesión
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
