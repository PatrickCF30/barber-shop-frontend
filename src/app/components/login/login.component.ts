import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['patrick30al@gmail.com', [Validators.required, Validators.email]],
      password: ['patrick', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('email')?.invalid) {
        this.showValidationError('Correo es requerido y debe ser válido');
      } else if (this.loginForm.get('password')?.invalid) {
        this.showValidationError('Contraseña es requerida (mínimo 6 caracteres)');
      }
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);

         // Guardar el token y otros detalles en el localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('role', response.authorities[0].authority);


        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido a la plataforma.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  private showValidationError(message: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Validación de formulario',
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }
}
