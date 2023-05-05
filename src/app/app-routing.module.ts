import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AddingAuthorsComponent, AddingbookComponent, AuthorsComponent, EditAuthorComponent, GenresComponent, SerachBookComponent}from './components/index'
const routes: Routes = [
  { path: 'authors', component: AuthorsComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'addAuthor', component: AddingAuthorsComponent },
  {path:'editAuthor', component:EditAuthorComponent},
  { path: 'addBook', component: AddingbookComponent },
  { path: '', component: SerachBookComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
