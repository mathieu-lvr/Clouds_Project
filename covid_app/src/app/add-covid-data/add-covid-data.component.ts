import { Component, OnInit } from '@angular/core';

import { CovidDataService } from '../covid-data.service';
import { News } from '../news.model';

@Component({
  selector: 'app-add-covid-data',
  templateUrl: './add-covid-data.component.html',
  styleUrls: ['./add-covid-data.component.css']
})
export class AddCovidDataComponent implements OnInit {

  date: any;
  description! :string;
  title! : string;
  username! : string;

  constructor(private covidDataService: CovidDataService ) { }

  ngOnInit(): void {
  }

addNews(){
  let news: News = {
    date: new Date(this.date),
    title: this.title,
    description: this.description,
    username: this.username
    };
    this.covidDataService.addNews(news);
    
}

}
