import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{AuthorsComponent, GenresComponent,AuthorComponent,AddingAuthorsComponent,AddingbookComponent,EditAuthorComponent,SerachBookComponent} from './index';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AuthorsComponent,
    GenresComponent,
    AuthorComponent,
    AddingAuthorsComponent,
    AddingbookComponent,
    EditAuthorComponent,
    SerachBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GeneralWorkerModule { }
