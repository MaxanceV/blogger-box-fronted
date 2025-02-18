import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { provideHttpClient } from '@angular/common/http';
import { PostService } from './services/post.service';


import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: PostListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
