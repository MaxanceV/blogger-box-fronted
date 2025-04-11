import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { provideHttpClient } from '@angular/common/http';
import { PostService } from './services/post.service';

import { PostListComponent } from './components/post-list/post-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    PostService,
    PostListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
