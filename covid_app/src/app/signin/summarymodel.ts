export class Summary {
    ID: string;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;

    constructor(id: string, newConfirmed: number, newDeaths: number, newRecovered: number,
        totalConfirmed: number, totalDeaths: number, totalRecovered: number){
        this.ID = id ;
        this.NewConfirmed = newConfirmed;
        this.NewDeaths = newDeaths;
        this.NewRecovered = newRecovered;
        this.TotalConfirmed = totalConfirmed;
        this.TotalDeaths = totalDeaths;
        this.TotalRecovered = totalRecovered;

    }
}
