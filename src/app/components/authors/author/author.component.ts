import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { book, dataBook } from 'src/app/shared/myInterfaces.interface';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  constructor(private dataserv:DataBooksService, private router:Router, private addBookServ:AddingBookServService){}
  @Input() bookArray!:dataBook;
 
  deleteAuthor(e: Event) {
    e.preventDefault();
    this.dataserv.deletingAuthor(this.bookArray.id);
    this.router.navigate(['authors'],{queryParams:{obj :null}})

    this.addBookServ.books = [];
    this.dataserv.booksArr = [];
  }
  details(e: Event) {
    e.preventDefault();
    this.router.navigate(['authors'],{queryParams:{obj :this.bookArray.id}})
  }
  editingAuthor(e:Event) {
    e.preventDefault();
    this.router.navigate(['editAuthor'],{queryParams:{id :this.bookArray.id}})
  }
}
 