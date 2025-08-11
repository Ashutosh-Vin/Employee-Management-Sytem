import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Auth } from './services/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,MatButtonModule,MatSidenavModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'web-app';

  authService = inject(Auth);
  logout(){
    this.authService.logout();
  }
}
