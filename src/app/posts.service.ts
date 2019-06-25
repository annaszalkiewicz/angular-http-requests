import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://angular-hhtp-requests.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        console.log(posts);
      });
  }
}