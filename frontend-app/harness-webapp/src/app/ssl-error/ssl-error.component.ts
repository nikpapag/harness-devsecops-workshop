import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ssl-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ssl-error.component.html',
  styleUrls: ['./ssl-error.component.css']
})
export class SslErrorComponent {
  errorCode = 'NET::ERR_CERT_AUTHORITY_INVALID';

  reloadPage(): void {
    window.location.reload();
  }

  goBack(): void {
    window.history.back();
  }

  getCurrentDate(): string {
    return new Date().toLocaleString();
  }
}
