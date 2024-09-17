import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, FormsModule, InputTextModule, FloatLabelModule, PasswordModule, ButtonModule, RippleModule, RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: any;
  senha: any;

  constructor(private router: Router) {}

  irParaRegistro() {
    this.router.navigate(['app-registro']);
  }

  irParaHome(){
    this.router.navigate(['app-home'])
  }

}
