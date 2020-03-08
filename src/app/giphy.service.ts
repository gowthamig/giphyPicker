import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  key = 'NVW9Fmxg1tWDIZ8paN7n375Sslv7guok';
  constructor(private http:HttpClient) { }

  searchGiphy(searchKey)
  {
    return this.http.get('https://api.giphy.com/v1/gifs/search?api_key=NVW9Fmxg1tWDIZ8paN7n375Sslv7guok&q='+searchKey+'&limit=20&offset=0&rating=G&lang=en');
  }

  getGiphy()
  {
    return this.http.get('https://api.giphy.com/v1/gifs/trending?api_key=NVW9Fmxg1tWDIZ8paN7n375Sslv7guok&limit=25&rating=G');
  }

  //random 3 gifs on page load
  getDefaultGiphy()
  {
    return this.http.get('https://api.giphy.com/v1/gifs/search?api_key=NVW9Fmxg1tWDIZ8paN7n375Sslv7guok&q=random&limit=3&offset=0&rating=G&lang=en');
  }
  
}
