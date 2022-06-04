import { Component, OnInit } from '@angular/core';
import { BggSearchService, MostActive } from '../../shared/services/bgg-search/bgg-search.service';

@Component({
  selector: 'board-game-companion-app-create-scripts',
  templateUrl: './create-scripts.component.html',
  styleUrls: ['./create-scripts.component.scss'],
  
})
export class CreateScriptComponent implements OnInit {

  scriptFiles:string[] = ["main"];
  scriptfile = "";
  maxfiles = 3;
  errorMessage = "";
  warningMessage = "";
  error = false;
  warning = false;
  boardgames:string[] = [];
  boardgamesMap:Map<string,string> = new Map();
  boardgame = "";
  scriptname = "";

  constructor(private readonly searchService:BggSearchService){}

  ngOnInit(): void {

    console.log("create script");      
  }

  validateAndSave(): void{
    const fileinput:HTMLInputElement = <HTMLInputElement>document.getElementById("image-input") || new HTMLInputElement;

    if(this.scriptname === "")
      this.errorOccured("Script name missing.");
    else if(this.boardgame === "")
      this.errorOccured("Board game missing.");
    else if(fileinput.files?.length == 0)
      this.errorOccured("Select script icon.");
    else{
      const temp = this.getboardGameId();
      if(temp === "")

        this.searchService.getBoardGameByName(this.boardgame,true).subscribe({
          next:(value)=>{
            console.log(value.toString());
            const response:MostActive[] = this.searchService.parseGetBoardGameByName(value.toString());
            
            if(response.length !== 1)
              this.errorOccured("Could not find board game '" + this.boardgame + "'.");
            else{
              alert("save 1");
            }
          },
          error:(e)=>{
            console.log(e)
          },
          complete:()=>{
            console.log("complete")
          }          
        });

      else{
        alert("save 2");
      } 
    }
  }

  save(boardGameId:string): void{
    const formData:FormData = new FormData();
    const fileinput:HTMLInputElement = <HTMLInputElement>document.getElementById("image-input") || new HTMLInputElement;
    const files = fileinput.files || [];

    formData.append("user",localStorage.getItem("user") || "Joseph");
    formData.append("name",this.scriptname);
    formData.append("boardGameId",boardGameId);
    formData.append("files",JSON.stringify(this.scriptFiles));
    formData.append("icon",files[0]);
  }

  getboardGameId():string{
    let result = "";
    const temp = this.boardgamesMap.get(this.boardgame);

    if(temp !== undefined){
      result = this.boardgame;
    }

    return result;
  }

  getBoardGameSuggestions():void{

    this.searchService.getBoardGameByName(this.boardgame,false).subscribe({
      next:(value)=>{
        console.log(value.toString());
        const temp:MostActive[] = this.searchService.parseGetBoardGameByName(value.toString());
        this.loadBoardGameSuggestions(temp,this.boardgame);
      },
      error:(e)=>{
        console.log(e)
      },
      complete:()=>{
        console.log("complete")
      }
    })
  }

  loadBoardGameSuggestions(values:MostActive[],name:string):void{
    this.boardgamesMap.clear();
    this.boardgames = [];
    

    for(let count = 0; count < values.length; count++){
      if(values[count].name.indexOf(name) !== -1){
        this.boardgamesMap.set(values[count].name,values[count].id);
        this.boardgames.push(values[count].name);
      }
    }

    console.log(this.boardgames);
  }

  checkKeyPress(event:KeyboardEvent){
    if(event.key === "Enter"){
      event.preventDefault();
      this.addScriptFile();
    }
  }

  errorOccured(message:string): void{
    this.errorMessage = message;
    this.error = true;

    setInterval(()=>{
      this.error = false;
    },5000);
  
  }

  warningOccured(message:string): void{
    this.warningMessage = message;
    this.warning = true;

    setInterval(()=>{
      this.warning = false;
    },5000);
  
  }

  addScriptFile(): void{

    if(this.scriptfile === "")
      this.errorOccured("Empty script file name.");
    else if(this.containsScriptFile(this.scriptfile))
      this.errorOccured("File already created.");
    else if(this.scriptFiles.length == this.maxfiles)
      this.warningOccured("A maximum " + this.maxfiles + " initial files allowed.")
    else  
      this.scriptFiles.push(this.scriptfile);
    
    this.scriptfile = "";
  }

  containsScriptFile(name:string): boolean{
    let result = false;

    for(let count = 0; count < this.scriptFiles.length && !result; count++){
      if(this.scriptFiles[count] === name){
        result = true;
      }
    }
    
    return result;
  }

  removeScriptFile(name:string): void{
    if(name === "main")
      this.errorOccured("You are not allowed to remove main file.");
    else if(name !== ""){
      const temp:string[] = [];
      
      for(let count = 0; count < this.scriptFiles.length; count++){
        if(this.scriptFiles[count] !== name){
          temp.push(this.scriptFiles[count]);
        }
      }

      this.scriptFiles = temp;
    }
  }

  loadImage(event:any): void{
    const files = event.target.files;

    if(!files || files.length == 0)
      return;
    
    const file = files[0];
    const filereader = new FileReader();

    const display = document.getElementById("icon");
    
    if(display){
      filereader.readAsDataURL(file);

      filereader.onloadend = ()=>{
        display.setAttribute('src',<string>filereader.result);
      };
    }
  }

  
}
