import { Component, Input } from '@angular/core';
import { Post } from '../../data/post';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
  standalone: false
})
export class PostListItemComponent {
  private _post!: Post;

  @Input()
  set post(value: Post) {
    if (typeof value.createdDate === 'string') {
      value.createdDate = new Date(value.createdDate); // format ISO ok
    }
    this._post = value;
  }
  

  get post(): Post {
    return this._post;
  }
}
