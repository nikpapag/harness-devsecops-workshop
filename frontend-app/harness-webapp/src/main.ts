import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
