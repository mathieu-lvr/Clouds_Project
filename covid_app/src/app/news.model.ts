

export class News{
    username: string;
    date: Date;
    title: string;
    description : string;
    

    constructor(username: string, date : Date, title : string, description: string){
        this.username = username;
        this.date = date;
        this.description= description;
        this.title= title;
    }
    
}