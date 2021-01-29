import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service';
import { User } from '../user.model';
import { News } from '../news.model';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.css']
})
export class CovidDataComponent implements OnInit {

  user! : User;
  news! : any;

  constructor(public covidDataService : CovidDataService) { }

  ngOnInit(): void {
    this.user = this.covidDataService.getUser();
    this.covidDataService.getNews().subscribe((data)=>{
      this.news = data;
    });
  }

}
