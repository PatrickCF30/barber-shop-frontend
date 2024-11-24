import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const payload = this.registerForm.value;

    this.http.post('http://localhost:8190/api/usuario/register?role=Customer', payload)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El usuario ha sido registrado correctamente.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.registerForm.reset();
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          const mensaje = err.error.mensaje || 'Ocurrió un error inesperado.';
          const status = err.error.status || 'ERROR';

          Swal.fire({
            icon: 'error',
            title: `Error: ${status}`,
            text: mensaje,
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }
}
