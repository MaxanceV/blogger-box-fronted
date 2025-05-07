import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../data/category';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../data/post';
import { PostRequest } from '../../data/post';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  standalone: false,
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  categories: Category[] = [];
  isSubmitting = false;
  editingPostId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
      categoryUuid: ['', Validators.required],
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('❌ Error loading categories', err),
    });

    this.editingPostId = this.route.snapshot.paramMap.get('id');

    if (this.editingPostId) {
      this.postService.getById(this.editingPostId).subscribe({
        next: (post: Post) => {
          this.postForm.patchValue({
            title: post.title,
            content: post.content,
            categoryUuid: post.category.uuid,
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Invalid post ID',
            text: 'Redirecting...',
            timer: 1500,
            showConfirmButton: false,
          });
          this.router.navigate(['/']);
        },
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/']);
  }
  
  onSubmit(): void {
    if (this.postForm.invalid) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Please review your post',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    this.isSubmitting = true;

    const postData: PostRequest = this.postForm.value;

    const request$ = this.editingPostId
      ? this.postService.update(this.editingPostId, postData)
      : this.postService.create(postData);

    request$.subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Post Submitted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong when submitting the post.',
        });
        console.error(err);
        this.isSubmitting = false;
      },
    });
  }
}
