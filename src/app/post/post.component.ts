import { Component, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
  items$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    // Replace 'items' with the path to the node you want to retrieve
    this.items$ = db.list('posts').valueChanges();
  }


}
