import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service';
import firebase from 'firebase/app';
import { AngularFirestore} from '@angular/fire/firestore';
import { GetApiService } from '../get-api.service';
import { Country } from '../country.model';


@Component({
  selector: 'app-country-data',
  templateUrl: './country-data.component.html',
  styleUrls: ['./country-data.component.css']
})
export class CountryDataComponent implements OnInit {

  public all_countries : any;
  public pays1 : any;
  test = false;

  constructor( private firestore : AngularFirestore, public covidDataService: CovidDataService, private getApiService: GetApiService)
  {}

  ngOnInit() {
    
    
  }
  
  showCountry(){
  this.firestore.collection("Countries").valueChanges().subscribe((data)=>{
    this.all_countries = data;
    
    this.test = true
  })

  }

}

