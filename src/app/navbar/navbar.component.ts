import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [TranslateModule]
})
export class NavbarComponent {
  languages = ['en', 'fr', 'pt'];
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    const defaultLanguage = 'en';
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);
  }

  constructor() {}

  changeLanguage(language: string): void {
    console.log('Changing language to', language);
    this.translateService.use(language);
  }
}