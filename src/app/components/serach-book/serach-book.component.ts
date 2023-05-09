import { Component } from '@angular/core';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { Book, BookForSearch, DataBook,  SearchingBook } from 'src/app/interfaces/myInterfaces.interface';

@Component({
  selector: 'app-serach-book',
  templateUrl: './serach-book.component.html',
  styleUrls: ['./serach-book.component.css']
})
  
export class SerachBookComponent {
  constructor(private dataBookServ:DataBooksService) {    
  }

  dataBook!:Array<DataBook>;
  tempArr: Array<BookForSearch> = [];
  tempAuthor: string = '';
  
  ngOnInit() {
    this.dataBook = this.dataBookServ.booksArray();    
  }
  
  searchBook(inp: string) {
    if (inp!='') {
      this.tempArr = [];
      this.tempAuthor = '';

      this.dataBook.forEach((element: DataBook) => {
       element.books.filter((books:SearchingBook) => {
          if (books.name.toLocaleLowerCase().includes(inp.toLocaleLowerCase())) {
            books.authorBook = element.author;
            this.tempArr.push(books);     
          }                
        })      
      });

    } else {
      this.tempArr = [];
      this.tempAuthor = '';
    }
  }
}
