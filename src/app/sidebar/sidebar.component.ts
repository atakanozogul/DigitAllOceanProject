import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor() {}

  ngOnInit(): void {}

  openCertificatesModal(): void {
    const certificatesModal = new bootstrap.Modal(document.getElementById('certificatesModal'));
    certificatesModal.show();
  }

  openAddCrewModal(): void {
    const addCrewModal = new bootstrap.Modal(document.getElementById('addCrewModal'));
    addCrewModal.show();
  }
}