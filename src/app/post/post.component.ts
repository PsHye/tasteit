import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  private jsonUrl = '/docs/template-data.json';
  jsonData: any = [];

  constructor(private httpClient: HttpClient) { }

  getJsonData() {
    this.httpClient.get(this.jsonUrl).subscribe(data =>{
      console.log(data);
      this.jsonData = data;
    })
  }
}
