import { Injectable } from '@angular/core';
import { Book, EditingBook } from '../interfaces/myInterfaces.interface';

@Injectable({
  providedIn: 'root'
})
  
export class AddingBookServService {  
  
  books: Array<Book> = [];  

  addBook(book:Book) {  
    if (!this.books) {
      this.books = [];
    }    
    this.books.push(book);   
    
    return this.books
  } 
         
  editBook(book: EditingBook, id: number) {  
    this.books.forEach((item: Book) => {

      if (item.id == id) {
        item.genre = book.bookGenre;
        item.name = book.bookName;
        item.str = book.bookLength;
      }
    })
  }

  returnDataBook() {
    return this.books
  }

  deleteBook(id:number) {
    this.books = this.books.filter((n: { id: number; }) => n.id !== id);  
    
    return this.books
  }
}
