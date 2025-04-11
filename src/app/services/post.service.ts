import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../data/post';
import { environment } from '../environments/environment';

export interface PostRequest {
  title: string;
  content: string;
  category_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  create(post: PostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  update(id: string, post: PostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLatest(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/latest`);
  }

  getByCategory(categoryId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/category/${categoryId}`);
  }
}
