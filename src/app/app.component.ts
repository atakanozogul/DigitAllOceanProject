import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrewListComponent } from './crew-list/crew-list.component';
import { DataService } from './services/data.service';
import { Crew } from './models/crew.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent, SidebarComponent, CrewListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languages = ['en', 'fr', 'pt'];
  private translateService = inject(TranslateService);

  crews: Crew[] = [];

  ngOnInit(): void {
    const defaultLanguage = 'en';
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
  }

  constructor(private dataService: DataService) {}

  changeLanguage(language: string): void {
    this.translateService.use(language);
    this.crews = this.dataService.getCrews();
  }
}