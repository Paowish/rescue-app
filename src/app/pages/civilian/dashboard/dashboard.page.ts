import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  homeOutline,
  alertCircleOutline,
  timeOutline,
  checkmarkCircleOutline,
  logOutOutline,
  personOutline,
  mapOutline,
  notificationsOutline,
  newspaperOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class DashboardPage implements OnInit {
  private router = inject(Router);

  readonly isLoading = signal(true);
  readonly stats = signal({
    total: 42,
    active: 12,
    pending: 8,
    resolved: 22
  });
  readonly recentIncidents = signal([
    { id: 1, type: 'Fire', location: 'Barangay 1, Santa Rosa', status: 'Active', date: '2024-01-15' },
    { id: 2, type: 'Flood', location: 'Barangay 2, Santa Rosa', status: 'Pending', date: '2024-01-14' },
    { id: 3, type: 'Medical', location: 'Barangay 3, Santa Rosa', status: 'Resolved', date: '2024-01-13' }
  ]);

  constructor() {
    addIcons({
      homeOutline,
      alertCircleOutline,
      timeOutline,
      checkmarkCircleOutline,
      logOutOutline,
      personOutline,
      mapOutline,
      notificationsOutline,
      newspaperOutline
    });
  }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Resolved': return 'success';
      case 'Active': return 'danger';
      case 'Dispatched': return 'primary';
      case 'Pending': return 'warning';
      default: return 'medium';
    }
  }

  navigateToReport() {
    this.router.navigate(['/report']);
  }

  navigateToTrack() {
    this.router.navigate(['/track-reports']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}