import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiserviceService } from './_services/apiservice.service';
import { HttpClient } from '@angular/common/http';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ConfigService } from './_services/config.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SideBarComponent]
})
export class AppComponent {
  apiUrl!: string;
  constructor(private configService: ConfigService,private apiService: ApiserviceService){}

  ngOnInit() {
    this.apiUrl = this.configService.getApiUrl();
    console.log('API URL in AppComponent:', this.apiUrl);  

  }
  title = 'harness-webapp';
}
