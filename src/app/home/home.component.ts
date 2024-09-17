import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarModule, PanelModule, AvatarModule, ButtonModule, MenuModule, BadgeModule, RippleModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  irParaHome(){
    this.router.navigate(['app-home'])
  }

  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  ngOnInit() {
    console.log('HomeComponent Initialized');
    this.items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
  }
  
}
