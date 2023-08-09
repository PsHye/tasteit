import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private postService: PostComponent) {}


  ngOnInit(): void {

    this.getJsonData();

  }

  getJsonData(): void {
    console.log(this.postService.getJsonData())
  }


}
