import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { PostService } from "../../services/post.service";
import { Post } from "../../data/post";
import { PostListItemComponent } from "../post-list-item/post-list-item.component";

@Component({
    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrls : ['./post-list.component.css'],
    standalone: false,
    //imports: [CommonModule]
})

export class PostListComponent implements OnInit { 
    posts: Post[] = [];
post: any;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.loadPosts()
    }

    loadPosts(): void {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        });
      }
      
}