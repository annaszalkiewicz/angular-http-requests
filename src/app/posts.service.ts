import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Post } from './post.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient ) { }

  addPost(title: string, content: string ) {
    const postData: Post = { title, content };
    return this.http
      .post<{ name: string }>(
        'https://angular-hhtp-requests.firebaseio.com/posts.json',
        postData
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://angular-hhtp-requests.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty')
      })
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
      );
  }

  deletePosts() {
    return this.http
      .delete<{ [key: string]: Post }>('https://angular-hhtp-requests.firebaseio.com/posts.json',
      {
        observe: 'events'
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log('Event type: Sent');
          } else if (event.type === HttpEventType.Response) {
            console.log(event.status);
          }
        })
      );
  }
}
