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
  giphyData : any;
  gifLoading : any;

  faSearch = faSearch;
  
  constructor(public giphyService : GiphyService, public toastr: ToastrService) {}
  
  getGifs(){
    this.gifLoading = true;
    this.giphyService.getGiphy().subscribe((response: any)=> {this.gifLoading = false; this.giphyData = response.data})
  }

  clipCopy() {
    let copyText: any = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    this.toastr.success("URL Copied");
  }

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

  ngOnInit(){
    this.getGifs();
  }
}
