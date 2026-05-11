import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ApiserviceService } from '../_services/apiservice.service';
import { HarnessFfService } from '../harness-ff.service';
import { HarnessOfferComponent } from '../harness-offer/harness-offer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HarnessOfferComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private apiService: ApiserviceService, private ffService: HarnessFfService) { }

  serviceName= "Harness Webinar"
  productDeveloper= "Nikp"
  deploymentStatus="Complete"
  lastExecution="12.3"
  deploymentType="Canary"
  applicationVersion="v1.0"
  executionDetails=""
  placeholder=" "
  isCanary:boolean = false
  isModalOpen = false;

  ngOnInit(): void {
    this.refreshExecutionDetails();
  }


  refreshExecutionDetails(){
    this.apiService.getDetails()
    .subscribe((data) => {
      this.serviceName = data.service_name
      this.lastExecution = data.last_execution_id
      this.applicationVersion = data.application_version
      this.deploymentType = data.deployment_type
    });

  }


  distribution(){
    this.router.navigateByUrl('/distribution')
  }

  checkValue(){
    console.log(this.ffService.variationFF())
    if (this.ffService.variationFF()=="true"){
      return true;
    }
    return false;
  }



  changeGroup(){
    this.ffService.checkCycle("Beta")

  }


  
  checkRelase(){
    const isCanary=false;
    this.apiService.checkRelease()
    .subscribe((data) => {
      if (data.deployment_type == 'canary'){
       this.isCanary= true;

      }
      else{
        this.isCanary= false;
      }

    });
  }


  

}
