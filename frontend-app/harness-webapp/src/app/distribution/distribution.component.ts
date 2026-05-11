import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ApiserviceService } from '../_services/apiservice.service';
import { ColorHelper } from '@swimlane/ngx-charts'; // Import ColorHelper from ngx-charts

@Component({
  selector: 'app-distribution',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.css',
})
export class DistributionComponent {
  data: any[] = []; // Your data from backend
  distribution: any[] = [];
  normalThumbnail: string = 'path/to/normal-thumbnail.png';
  nonNormalThumbnail: string = 'path/to/non-normal-thumbnail.png';
  viewpie: [number, number] = [300, 300];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  barChartData: any[] = [];

  distributionData: any[]=[];


  constructor(private apiService: ApiserviceService) {}

  barData: any;

  ngOnInit(): void {
    

  }


  run(){
    this.autoRefreshGraph(10)
    this.performApiCallRepeatedly(10)
  }

  refreshDistribution() {
    // Calculate the start and end timestamps for the last 1 hour
    const now = new Date();
    const startTimestamp = new Date(now.getTime() - 400000); // 1 hour in milliseconds
    const endTimestamp = now;
    const groupedData = this.groupDataByTime(this.distributionData);
    this.data = this.transformDataForChart(groupedData);
    console.log(this.distributionData)

  //  this.apiService
  //    .getDistribution(startTimestamp, endTimestamp)
  //    .subscribe((data) => {
   //     const groupedData = this.groupDataByTime(data);

    //    this.data = this.transformDataForChart(groupedData);

    //  });


  }

  name = 'Angular';
  view: [number, number] = [600, 400];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  customColor: Color = {
    name: 'legend',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#FFFFFFF'],
  };


  customColorFunction = (name: string)=> {
    return name === 'canary' ? '#FF7F50' : '#9370DB'; // If series name is 'canary', return yellow, otherwise return dodgerblue
  };


  groupByBucket(data: any[]) {
    // Initialize groupedData
    const groupedData: {
      [bucket: string]: { [name: string]: { value: number }[] };
    } = {};

    // Group data by bucket
    data.forEach((item) => {
      const bucket = item.extra.bucket;
      const name = item.name;
      const value = item.value;

      if (!groupedData[bucket]) {
        groupedData[bucket] = {};
      }

      if (!groupedData[bucket][name]) {
        groupedData[bucket][name] = [];
      }

      groupedData[bucket][name].push({ value });
    });

      console.log(groupedData)

  }

  // Function to group data by time with 1-minute resolution
  groupDataByTime(data: any[]) {
    const groupedData: { [key: string]: { [key: number]: number } } = {};
    data.forEach((entry) => {
      const timestamp = Math.floor(entry.created_at / 5) * 10; // Round to the nearest minute
      if (!groupedData[entry.name]) {
        groupedData[entry.name] = {};
      }
      if (!groupedData[entry.name][timestamp]) {
        groupedData[entry.name][timestamp] = 0;
      }
      groupedData[entry.name][timestamp]++;
    });
    console.log(groupedData)
    return groupedData;
  }


    // Function to group data by time with 1-minute resolution
    groupDataByTimeBarChart(data: any[]) {
      const groupedData: { [key: string]: { [key: number]: number } } = {};
      data.forEach((entry) => {
        const timestamp = Math.floor(entry.created_at / 30) * 30; // Round to the nearest minute
        if (!groupedData[entry.name]) {
          groupedData[entry.name] = {};
        }
        if (!groupedData[entry.name][timestamp]) {
          groupedData[entry.name][timestamp] = 0;
        }
        groupedData[entry.name][timestamp]++;
      });
      console.log(groupedData)
      return groupedData;
    }

  transformBarData(groupedData:any)
  {
// Step 1: Determine the timestamps
const timestamps = Object.keys(groupedData.normal);

// Step 2: Iterate through the timestamps and aggregate the values for each category
const dataArray = timestamps.map(timestamp => {
  const normalValue = groupedData.normal[timestamp] || 0;
  const canaryValue = groupedData.canary[timestamp] || 0;
  return {
    name: new Date(parseInt(timestamp) * 1000).toISOString(), // Convert timestamp to ISO string
    series: [
      { name: "canary", value: canaryValue },
      { name: "normal", value: normalValue }
    ]
  };
});

console.log(dataArray)
return dataArray

  }
  transformDataForChart(groupedData: {
    [key: string]: { [key: number]: number };
  }) {
    const chartData = [];
    for (const name in groupedData) {
      if (groupedData.hasOwnProperty(name)) {
        const seriesData = [];
        for (const [timestamp, count] of Object.entries(groupedData[name])) {
          seriesData.push({
            name: new Date(parseInt(timestamp) * 1000), // Convert timestamp to JavaScript Date object
            value: count, // Number of entries at this timestamp
          });
        }
        chartData.push({ name, series: seriesData });
      }
    }
    console.log(chartData)
    return chartData;
  }

  autoRefreshGraph(duration: number): void {
    const interval = 30 * 1000; // Interval in milliseconds (1 second)
    const endTime = Date.now() + duration * 60 * 1000; // Convert minutes to milliseconds

    const apiCall = () => {
      // Your API call logic here
      this.refreshDistribution();
    };

    const intervalId = setInterval(apiCall, interval);

    // Stop the interval after the specified duration
    setTimeout(() => {
      clearInterval(intervalId);

    }, duration * 20 * 1000);
  }



  performApiCallRepeatedly(duration: number): void {
    const interval = 1000; // Interval in milliseconds (1 second)
    const endTime = Date.now() + duration * 60 * 1000; // Convert minutes to milliseconds

    const apiCall = () => {
      // Your API call logic here
      this.apiService.generateEntry('normal').subscribe((data) => {
        this.distributionData.push(data)
        console.log('API call executed at', new Date().toISOString());
        
      });
    };

    const intervalId = setInterval(apiCall, interval);

    // Stop the interval after the specified duration
    setTimeout(() => {
      clearInterval(intervalId);
      console.log('API calls stopped after 10 minutes');
    }, duration * 60 * 1000);
  }

}
