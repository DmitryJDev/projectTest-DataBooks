import { Component } from '@angular/core';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { book, bookForSearch, dataBook,  searchingBook } from 'src/app/shared/myInterfaces.interface';

@Component({
  selector: 'app-serach-book',
  templateUrl: './serach-book.component.html',
  styleUrls: ['./serach-book.component.css']
})
export class SerachBookComponent {
  constructor(private dataBookServ:DataBooksService) {    
  }
  ngOnInit() {
    this.dataBook = this.dataBookServ.booksArray()
    
  }
  dataBook!:Array<dataBook>;
  tempArr: Array<bookForSearch> = [];
  tempAuthor: string='';
  searchBook(inp: string) {
    if (inp!='') {
      this.tempArr = []
      this.tempAuthor=''
     this.dataBook.forEach((element: dataBook) => {
       element.books.filter((books:searchingBook) => {
          if (books.name.toLocaleLowerCase().includes(inp.toLocaleLowerCase())) {
            books.authorBook=element.author
            this.tempArr.push(books)          
            
        }                
    })
      
    });
    } else {
      this.tempArr = []
      this.tempAuthor=''
    }
  }
}
