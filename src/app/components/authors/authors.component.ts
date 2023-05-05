import { Component } from '@angular/core';
import { ActivatedRoute, Router, withHashLocation } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { dataBook } from 'src/app/shared/myInterfaces.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  constructor(private dataBook:DataBooksService,  private router:Router, private activateRoute:ActivatedRoute, private addBook:AddingBookServService) {    
  }
  bookFilterSpan: boolean = false;
  authorFilterSpan: boolean = false;
  detailArray!: Array<dataBook>;
  booksArray!: Array<dataBook>;
  fullDetailId!: number;
  
  
  ngOnInit() {    
    this.getBooks()
    this.activateRoute.queryParams.subscribe(data => {
      this.fullDetailId = data['obj'];     
    })
  }
  ngDoCheck() {    
    this.getBooks() 
    this.detailArray = this.booksArray.filter((item: { id: number; }) => item.id == this.fullDetailId) 
  }
  getBooks() {
    this.booksArray = this.dataBook.booksArray();
  }
  filterBook() {    
    if (this.bookFilterSpan) {
      this.bookFilterSpan = false;
      return this.booksArray.sort((a: dataBook, b: dataBook) =>a?.books?.length - b?.books?.length)      
    } else {
      this.bookFilterSpan =true;
    return this.booksArray.sort((a:dataBook,b:dataBook)=>b?.books?.length-a?.books?.length)        
    }    
  }

  authorFilter() {       
    if (this.authorFilterSpan) {
      this.authorFilterSpan = false;
      return this.booksArray.sort((a: dataBook, b: dataBook) => {
        if (a['author'] < b['author']) {
        return -1
        }
        if (a.author > b.author) {
        return 1
        }
        return 0
    })      
    } else {
      this.authorFilterSpan =true;
    return this.booksArray.sort((a:dataBook,b:dataBook)=>{
        if (a['author'] > b['author']) {
        return -1
        }
        if (a.author < b.author) {
        return 1
        }
        return 0
    })        
    }
  }
 

  addAuthorChecking(e: Event) {
    e.preventDefault();
    this.dataBook.booksArr = [];
    this.addBook.books = [];
    this.router.navigate(['addAuthor']);
  }
}
