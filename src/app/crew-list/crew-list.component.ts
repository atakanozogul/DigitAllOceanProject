import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { CrewCertificate } from '../models/crew-certificate.model';
import { CertificatesComponent } from '../certificates/certificates.component';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-crew-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CertificatesComponent, TranslateModule],
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit {
  @Input() crews: Crew[] = [];
  selectedCrew: Crew = {
    id: 0,
    firstName: '',
    lastName: '',
    nationality: '',
    title: '',
    daysOnBoard: 0,
    dailyRate: 0,
    currency: 'USD',
    totalIncome: 0,
    certificates: []
  };
  certificateTypes: Certificate[] = [];
  newCrewCertificates: CrewCertificate[] = [];
  crewCertificates: CrewCertificate[] = [];
  newCertificateType: Partial<Certificate> = { name: '', desc: '' };
  totalIncomesByCurrency: { [key: string]: number } = {};
  countries: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.crews = this.dataService.getCrews();
    this.certificateTypes = this.dataService.getCertificateTypes();
    this.countries = this.dataService.getCountries();
    this.calculateTotalIncomesByCurrency();
  }

  calculateTotalIncomesByCurrency(): void {
    this.totalIncomesByCurrency = this.crews.reduce((acc, crew) => {
      if (!acc[crew.currency]) {
        acc[crew.currency] = 0;
      }
      acc[crew.currency] += crew.totalIncome;
      return acc;
    }, {} as { [key: string]: number });
  }

  getCurrencies(): string[] {
    return Object.keys(this.totalIncomesByCurrency);
  }

  viewCrewCard(crew: Crew): void {
    this.selectedCrew = crew;
    const viewCrewCardModal = new bootstrap.Modal(document.getElementById('viewCrewCardModal'));
    viewCrewCardModal.show();
  }

  editCrew(crew: Crew): void {
    this.selectedCrew = { ...crew };

    this.selectedCrew.certificates = this.selectedCrew.certificates.map(cert => ({
      ...cert,
      certificateId: Number(cert.certificateId)
    }));

    this.newCrewCertificates = [...this.selectedCrew.certificates];
    const editModal = new bootstrap.Modal(document.getElementById('editCrewModal'));
    editModal.show();
  }

  saveCrew(editCrewForm: NgForm): void {
    if (editCrewForm.invalid) {
      return;
    }

    if (!this.selectedCrew.firstName || !this.selectedCrew.lastName || !this.selectedCrew.nationality || !this.selectedCrew.title) {
      return;
    }

    this.selectedCrew.certificates = [...this.newCrewCertificates];
    this.dataService.updateCrew(this.selectedCrew);
    this.crews = this.dataService.getCrews();
    this.calculateTotalIncomesByCurrency();
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editCrewModal'));
    editModal.hide();
    this.selectedCrew = {
      id: 0,
      firstName: '',
      lastName: '',
      nationality: '',
      title: '',
      daysOnBoard: 0,
      dailyRate: 0,
      currency: 'USD',
      totalIncome: 0,
      certificates: []
    }
  }

  deleteCrew(crew: Crew): void {
    this.dataService.deleteCrew(crew.id);
    this.crews = this.dataService.getCrews();
  }

  viewCertificates(crew: Crew): void {
    const crewData = this.dataService.getCrewById(crew.id);
    if (crewData) {
      this.selectedCrew = crewData;
      this.updateCrewCertificates();
      const crewCertificatesModal = new bootstrap.Modal(document.getElementById('crewCertificatesModal'));
      crewCertificatesModal.show();
    } else {
      console.error('Crew not found');
    }
  }

  addCertificateType(addCertificateForm: NgForm): void {
    if (addCertificateForm.invalid) {
      return;
    }
  
    if (this.newCertificateType.name) {
      const newCertificate: Certificate = {
        id: Date.now(),
        name: this.newCertificateType.name,
        desc: this.newCertificateType.desc || ''
      };
      this.dataService.addCertificateType(newCertificate);
      this.newCertificateType = { name: '', desc: '' };
      this.certificateTypes = this.dataService.getCertificateTypes();
      addCertificateForm.resetForm();
    }
  }

  deleteCertificateType(index: number): void {
    this.dataService.deleteCertificateType(index);
    this.certificateTypes = this.dataService.getCertificateTypes();
  }

  addCrew(addCrewForm: NgForm): void {
    if (addCrewForm.invalid) {
      return;
    }
  
    const newCrew: Crew = {
      id: Date.now(),
      firstName: addCrewForm.value.firstName,
      lastName: addCrewForm.value.lastName,
      nationality: addCrewForm.value.nationality,
      title: addCrewForm.value.title,
      daysOnBoard: addCrewForm.value.daysOnBoard,
      dailyRate: addCrewForm.value.dailyRate,
      currency: addCrewForm.value.currency,
      totalIncome: addCrewForm.value.daysOnBoard * addCrewForm.value.dailyRate,
      certificates: this.newCrewCertificates.map(cert => ({
        certificateId: cert.certificateId,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate
      }))
    };
  
    this.dataService.addCrew(newCrew);
    this.crews = this.dataService.getCrews();
    this.calculateTotalIncomesByCurrency();
    this.newCrewCertificates = [];
    addCrewForm.resetForm();
  }

  addCertificateField(): void {
    this.newCrewCertificates.push({
      certificateId: 0,
      issueDate: '',
      expiryDate: ''
    });
  }

  onCertificateIdChange(event: any, index: number): void {
    this.newCrewCertificates[index].certificateId = parseInt(event, 10);
  }

  getCertificateName(certificateId: number): string {
    const certType = this.certificateTypes.find(cert => cert.id === certificateId);
    return certType ? certType.name : 'Unknown';
  }

  getCertificateDesc(certificateId: number): string {
    const certType = this.certificateTypes.find(cert => cert.id === certificateId);
    return certType ? certType.desc : 'Unknown';
  }

  private updateCrewCertificates(): void {
    if (this.selectedCrew) {
      this.crewCertificates = this.selectedCrew.certificates.map(crewCert => {
        const certType = this.certificateTypes.find(cert => cert.id === crewCert.certificateId);
        return {
          certificateId: crewCert.certificateId,
          issueDate: crewCert.issueDate,
          expiryDate: crewCert.expiryDate,
          name: certType?.name || '',
          desc: certType?.desc || ''
        };
      });
    }
  }
}