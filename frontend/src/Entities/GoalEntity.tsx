class GoalEntity {
    id: number;
    title: string;
    summary: string;
    background: string;
    infoText: string;
    infoUrl: string;
    author: string;
    authorUrl: string;
    date: Date;
    constructor(data: any) {
      this.id = data.Id;
      this.title = data.Title;
      this.summary = data.Summary;
      this.background = data.Background;
      this.infoText = data.InfoText;
      this.infoUrl = data.InfoUrl;
      this.author = data.Author;
      this.authorUrl = data.AuthorUrl;
      this.date = data.Date;
    }
  }
  
  export default GoalEntity;