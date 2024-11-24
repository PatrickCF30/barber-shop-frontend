import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '', component: WelcomeComponent
},
{ path: 'login', component: LoginComponent },
{ path: 'registrar', component: RegistrarClienteComponent },
{ path: 'home', component: LayoutComponent,canActivate: [AuthGuard]},


];
