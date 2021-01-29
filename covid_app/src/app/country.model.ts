export class Country{
    country: string;
    totalConfirmed: number;
    totalDeaths: number;
    totalRecovered: number;
    newDeaths : number;
    newRecovered: number;
    newConfirmed: number;
    

    constructor(country: string,
        totalConfirmed: number,
        totalDeaths: number,
        totalRecovered: number,
        newDeaths : number,
        newRecovered: number,
        newConfirmed: number,
        ){
        this.country = country;
        this.totalConfirmed = totalConfirmed;
        this.totalDeaths = totalDeaths;
        this.totalRecovered=  totalRecovered;
        this.newDeaths= newDeaths;
        this.newRecovered =newRecovered;
        this.newConfirmed =newConfirmed;
    }
    
}