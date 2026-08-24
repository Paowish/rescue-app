import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-guest-report',
    templateUrl: './guest-report.page.html',
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class GuestReportPage {
    constructor(private router: Router) { }

    goBack() {
        this.router.navigate(['/login']);
    }
}