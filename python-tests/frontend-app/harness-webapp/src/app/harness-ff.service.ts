import { Injectable } from '@angular/core';
import { initialize, Event, Options, VariationValue } from '@harnessio/ff-javascript-client-sdk'
import { Target, Result } from '@harnessio/ff-javascript-client-sdk';
import { FF } from './_types/features';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService } from './_services/config.service';
const fakeWindow: any = {};


@Injectable({
  providedIn: 'root'
})
export class HarnessFfService {

  target!:Target;
  options!: Options
  cf!: Result;
  groupCF!: Result;
  groupFlags!: Record<string, VariationValue>;
  groupCFVariation: VariationValue = false;
  sdk = '52eb02d3-e930-420e-a1b3-69df03fa9b4c';
  flags!: Record<string, VariationValue>;
  flagVariation: VariationValue = false;

  
  private ffSDK: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private configService: ConfigService) {
    this.ffSDK = configService.getSDKKey();





if(isPlatformBrowser(this.platformId)){

  this.initialiseSDK();
}




   }

  async initialiseSDK(){
    const windowObject = isPlatformBrowser(this.platformId) ? window : fakeWindow;
    const { default: HarnessSDK } = await import('@harnessio/ff-javascript-client-sdk');
    this.target={
      identifier: "webinar",
      name: "webinar",
      attributes: {
        lastUpdated: Date(),

      }
    }

    this.cf = initialize(
      this.ffSDK,
      this.target
    )

    this.cf.on(Event.READY, flags => {
      this.flags=flags
    })


    this.cf.on(Event.CHANGED, flagInfo =>{
      console.log(flagInfo)
      if (flagInfo.flag ==="webinarff"){
        this.flagVariation = flagInfo.value
        console.log(this.flagVariation?.toString())
      }
    })
  }
    variationFF(){
      return this.flagVariation?.toString()
    }

   checkCycle(flag:string){
    console.log(this.cf.variation(flag, false))
   }

  }


