import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../data/post';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
  standalone : false
})

export class PostListItemComponent {
  @Input() post!: Post;

}