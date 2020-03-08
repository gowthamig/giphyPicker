import { Component, Directive, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GiphyService} from './giphy.service';
import {fromEvent} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'giphy-picker';
  giphyData : any; // api response data
  gifLoading : any; //loading message

  faSearch = faSearch; //search icon 
  
  constructor(public giphyService : GiphyService, public toastr: ToastrService) {}
 
  
  //default gifs shown using following when page is initialized
  getGifs(){
    this.gifLoading = true;
    this.giphyService.getGiphy().subscribe((response: any)=> {this.gifLoading = false; this.giphyData = response.data});
  }

  //this funtion allows user to copy URL to any chat program
  clipCopy() {
    let copyText :any;
    copyText = document.getElementById("myInput");
    copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    this.toastr.success("URL Copied");
  }

  //this function allows user to search
  searchGIF(searchText) {
    if(searchText.length > 0) {
      this.gifLoading = true;

       this.giphyService.searchGiphy(searchText).subscribe((response:any) => {
         this.gifLoading = false;
         this.giphyData = response.data;
       })
    } else {
      this.getGifs();
    }
  }

  //on page load
  ngOnInit(){
    this.getGifs();
  }
}
