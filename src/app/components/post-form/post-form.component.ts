import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService, PostRequest } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../data/category';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../data/post';

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
      category_uuid: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]],
    });

    this.categoryService.getAll().subscribe({
      next: (data) => {
        console.log('✅ Catégories chargées :', data);
        this.categories = data;
      },
      error: (err) => console.error('❌ Erreur chargement catégories', err),
    });

    this.editingPostId = this.route.snapshot.paramMap.get('id');
    console.log('📝 Mode édition ID :', this.editingPostId);

    if (this.editingPostId) {
      this.postService.getById(this.editingPostId).subscribe({
        next: (post: Post) => {
          console.log('🗂️ Données du post chargé :', post);
          this.postForm.patchValue({
            title: post.title,
            content: post.content,
            category_id: post.category.uuid,
          });
        },
        error: () => {
          console.error('❌ ID de post invalide, retour à la liste');
          this.router.navigate(['/']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      console.warn('⚠️ Formulaire invalide, données :', this.postForm.value);
      return;
    }
  
    // 🛠️ Si aucune catégorie sélectionnée, on en met une par défaut (la première)
    if (!this.postForm.value.category_id && this.categories.length > 0) {
      this.postForm.patchValue({ category_id: this.categories[0].uuid });
    }
  
    this.isSubmitting = true;
  
    const postData: PostRequest = this.postForm.value;
    console.log('📤 Données envoyées au backend :', postData);
  
    const request$ = this.editingPostId
      ? this.postService.update(this.editingPostId, postData)
      : this.postService.create(postData);
  
    request$.subscribe({
      next: () => {
        console.log('✅ Post envoyé avec succès');
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Erreur lors de l\'envoi du post', err);
        this.isSubmitting = false;
      },
    });
  }
}
