import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service';
import { GetApiService } from '../get-api.service';
import { AngularFirestore} from '@angular/fire/firestore';


import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color} from 'ng2-charts';
import { Summary } from './summarymodel'
import { News } from '../news.model';





@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public global : any ; 
  public news_table : any;
  check = false;
  summary! : Summary;
  public historic : any;
  public keys!: any;
  public keys2!: any;
  public total_30 : any;
  public list_cases_value = [0,0,0,0,0,0,0,0];
  public list_recovered_value = [0,0,0,0,0,0,0,0];
  public list_deaths_value = [0,0,0,0,0,0,0,0];
  public list_cases_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public list_deaths_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public list_recovered_total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public news1! : News;
  public news2! : News;
  public news3! : News;
  public news4! : News;
  public news5! : News;
  
 
  constructor(public covidDataService: CovidDataService, private api: GetApiService, 
    private firestore : AngularFirestore) { monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();}
  
    
  
  ngOnInit() {
    //create a date to compare with the one stored in the firebase to see if it is up to date.
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var day = time.getDate();
    if (month <= 9){var final_date = year+"-0"+month+"-"+day}
    else {var final_date = year+"-"+month+"-"+day};
    // select the date from the firebase 
    this.firestore.collection("Global").doc('CovidDataWorld').valueChanges().subscribe((data)=>{
      this.global=data as Object;
      var str = this.global.Date as string;
      str = str.slice(0, 10);
      
      
      
      // compare the 2 dates, if they are different we want to upload a new version of the data on the Firebase
      if (str!=final_date){
    
      this.api.apiCall().subscribe((data)=>{
      console.warn('global data', data);
      this.global=data as Object;
      this.firestore.collection("Global").doc('CovidDataWorld').set(
          data ,{ merge: true});
      var list_countries = this.global.Countries;
      alert(list_countries);
    
      this.firestore.collection("Global").doc('Summary').set(
      this.global.Global ,{ merge: true});
      
      list_countries.forEach( (element:{Country:string}) => {
      this.firestore.collection("Countries").doc(element.Country).set(
      element,{ merge: true});
      });
      
      }) };
    })
    this.getHomeData() ;
    this.api.apiCall2().subscribe((data)=>{
      this.historic = data as Object
      console.warn('7 last days data', data)
      
      this.firestore.collection("Global").doc('Historic').set(
        this.historic ,{ merge: true});
        var cases_object = this.historic.cases;
        var deaths_object = this.historic.deaths;
        var recovered_object = this.historic.recovered;
        var cases_value = Object.values(cases_object);
        var deaths_value = Object.values(deaths_object);
        var recovered_value = Object.values(recovered_object);
        this.keys = Object.keys(cases_object);
        
        
        for(let pas = 0; pas < 7; pas++) {
          var a1 = deaths_value[pas] as number;
          var a2 = deaths_value[pas+1] as number;
          this.list_deaths_value[pas]=a2 - a1;
          var b1 = recovered_value[pas] as number;
          var b2 = recovered_value[pas+1] as number;
          this.list_recovered_value[pas]=b2 - b1;
          var c1 = cases_value[pas] as number;
          var c2 = cases_value[pas+1] as number;
          this.list_cases_value[pas]=c2 - c1;
          
        }
        this.barChartLabels = this.keys;
      })  
        

        this.api.apiCall3().subscribe((data)=>{
          this.total_30 = data as Object
          console.warn('30 last days data', data)
          this.firestore.collection("Global").doc('LastDays').set(
            this.total_30 ,{ merge: true});
            var total_cases_object = this.total_30.cases;
            var total_deaths_object = this.total_30.deaths;
            var total_recovered_object = this.total_30.recovered;
            var total_cases_value = Object.values(total_cases_object);
            var total_deaths_value = Object.values(total_deaths_object);
            var total_recovered_value = Object.values(total_recovered_object);
            this.keys2 = Object.keys(total_cases_object);
            
            for(let pas2 = 0; pas2 < 30; pas2++) {
              var a3 = total_deaths_value[pas2] as number;
              this.list_deaths_total[pas2]=a3;
              var b3 = total_recovered_value[pas2] as number;
              this.list_recovered_total[pas2]=b3;
              var c3 = total_cases_value[pas2] as number;
              this.list_cases_total[pas2]=c3;
            }
            this.lineChartLabels = this.keys2;
        })
         
  
  this.printNews()  ;



  }
  getHomeData(){
    this.firestore.collection("Global").doc('Summary').valueChanges().subscribe((data)=>{
     this.summary = data as any
     this.pieChartData = [this.summary.TotalDeaths, this.summary.TotalRecovered, this.summary.TotalConfirmed - this.summary.TotalDeaths - this.summary.TotalRecovered]
      
    })
    

  }
  
  


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Total Deaths'], ['Total Recovered'], ['Active Cases']];
  public pieChartType: ChartType = 'pie';
  public pieChartData!: SingleDataSet ;
  public pieChartLegend = true;
  public pieChartPlugins = [];
 
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels!: Label[] ;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.list_deaths_value, label: 'Daily Deaths' },
    { data: this.list_recovered_value, label: 'Daily Recovered' },
    { data: this.list_cases_value, label: 'Daily New Cases' }
  ];

  lineChartData: ChartDataSets[] = [
    { data: this.list_deaths_total, label: 'Total Deaths' },
    { data: this.list_recovered_total, label: 'Total Recovered' },
    { data: this.list_cases_total, label: 'Total Cases' }
  ];

  lineChartLabels!: Label[] ;

  lineChartOptions = {
    responsive: true,
  };

  
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType : ChartType ='line';
  
 printNews(){
  this.firestore.collection("News").valueChanges().subscribe((data)=>{
    this.news_table=data;
    
    function compare( a: { date: number; }, b: { date: number; } ) {
      if ( a.date > b.date ){
        return -1;
      }
      if ( a.date < b.date ){
        return 1;
      }
      return 0;
    }
    this.news_table.sort(compare);
    
    
    this.news1 = this.news_table[0];
    this.news2 = this.news_table[1];
    this.news3 = this.news_table[2];
    this.news4 = this.news_table[3];
    this.news5 = this.news_table[4];
    
    this.check=true
    

  }
    
  );
  

 } 
 showCountry(){



 }
  } 
   
  



