import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from "./registro/registro.component";
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, LoginComponent, RegistroComponent,
    CardModule, FormsModule, InputTextModule, FloatLabelModule, PasswordModule,
    ButtonModule, RippleModule, RouterModule, RegistroComponent, DividerModule,
    RouterLink, AvatarModule, PanelModule, ToolbarModule, MenuModule, BadgeModule,
    HttpClientModule // Adicione esta linha
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
