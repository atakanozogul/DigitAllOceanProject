import { CrewCertificate } from './crew-certificate.model';

export interface Crew {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;
  totalIncome: number;
  certificates: CrewCertificate[];
}