import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrewListComponent } from '../crew-list/crew-list.component';
import { DataService } from '../services/data.service';
import { Crew } from '../models/crew.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CrewListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  crews: Crew[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.crews = this.dataService.getCrews();
  }

  onCrewAdded(newCrew: Crew): void {
    this.crews.push(newCrew);
  }
}