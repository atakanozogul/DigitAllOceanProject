import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Certificate } from '../models/certificate.model';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  certificateTypes: Certificate[] = [];
  newCertificateType: Partial<Certificate> = { name: '', desc: '' };

  constructor(private dataService: DataService) {
    this.certificateTypes = this.dataService.getCertificateTypes();
  }

  addCertificateType() {
    if (this.newCertificateType.name && this.newCertificateType.desc) {
      this.dataService.addCertificateType({ ...this.newCertificateType } as Certificate);
      this.newCertificateType = { name: '', desc: '' };
    }
  }

  deleteCertificateType(index: number) {
    this.dataService.deleteCertificateType(index);
    this.certificateTypes = this.dataService.getCertificateTypes();
  }
}