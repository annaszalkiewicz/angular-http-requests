import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient ) { }

  addPost(title: string, content: string ) {
    const postData: Post = { title, content }
    this.http
      .post<{ name: string }>(
        'https://angular-hhtp-requests.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
