import { Injectable } from '@angular/core';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private crews: Crew[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      title: 'Captain',
      daysOnBoard: 120,
      dailyRate: 200,
      currency: 'USD',
      totalIncome: 24000,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      nationality: 'British',
      title: 'Engineer',
      daysOnBoard: 90,
      dailyRate: 180,
      currency: 'EUR',
      totalIncome: 16200,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      nationality: 'Canadian',
      title: 'Cooker',
      daysOnBoard: 60,
      dailyRate: 150,
      currency: 'USD',
      totalIncome: 9000,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      nationality: 'Australian',
      title: 'Mechanic',
      daysOnBoard: 45,
      dailyRate: 170,
      currency: 'EUR',
      totalIncome: 7650,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Davis',
      nationality: 'New Zealander',
      title: 'Deckhand',
      daysOnBoard: 30,
      dailyRate: 140,
      currency: 'USD',
      totalIncome: 4200,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    }
  ];

  private certificateTypes: Certificate[] = [
    { id: 1, name: 'Type A', desc: 'Description for Type A' },
    { id: 2, name: 'Type B', desc: 'Description for Type B' },
    { id: 3, name: 'Type C', desc: 'Description for Type C' },
    { id: 4, name: 'Type D', desc: 'Description for Type D' },
    { id: 5, name: 'Type E', desc: 'Description for Type E' },
    { id: 6, name: 'Type F', desc: 'Description for Type F' },
    { id: 7, name: 'Type G', desc: 'Description for Type G' }
  ];

  private countries: string[] = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'Germany', 'France', 'Italy', 'Spain', 'Japan'
  ];

  getCrews(): Crew[] {
    return this.crews;
  }

  getCrewById(id: number): Crew | null {
    const crew = this.crews.find(c => c.id === id);
    return crew ? crew : null;
  }

  addCrew(crew: Crew): void {
    this.crews.push(crew);
  }

  updateCrew(updatedCrew: Crew): void {
    const index = this.crews.findIndex(c => c.id === updatedCrew.id);
    if (index !== -1) {
      this.crews[index] = updatedCrew;
    }
  }

  deleteCrew(id: number): void {
    const index = this.crews.findIndex(c => c.id === id);
    if (index !== -1) {
      this.crews.splice(index, 1);
    }
  }

  getCertificateTypes(): Certificate[] {
    return this.certificateTypes;
  }

  addCertificateType(certificate: Certificate): void {
    this.certificateTypes.push(certificate);
  }

  deleteCertificateType(index: number): void {
    this.certificateTypes.splice(index, 1);
  }

  getCountries(): string[] {
    return this.countries;
  }
}