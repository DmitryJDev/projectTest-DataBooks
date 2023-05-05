import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { book, editingBook } from './myInterfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class AddingBookServService {   
  
  books: Array<book> = [];  

  addBook(forms: FormGroup) {  
    if (!this.books) {
        this.books=[]
      }    
    
    let bookName = forms.controls['booksData'].get('bookName')?.value;
    let bookGenre = forms.controls['booksData'].get('bookGenre')?.value;
    let bookLength = forms.controls['booksData'].get('bookLength')?.value;    
    let booId = (this.books.length==0) ? 1 : this.books[this.books.length - 1].id+1;    
    
    let book = {
      id:booId,
      genre:bookGenre,
      name: bookName,
      str:bookLength
    }
    this.books.push(book);   
    forms.controls['booksData'].reset();
    return this.books
  } 
         
  editBook(book: editingBook, id: number) {  
    this.books.forEach((item: book) => {
      if (item.id == id) {
        item.genre = book.bookGenre;
        item.name = book.bookName;
        item.str=book.bookLength
      }
    })
  }

  returnDataBook() {
    return this.books
  }

  deleteBook(id:number) {
    this.books=this.books.filter((n: { id: number; }) => n.id !== id);  
    return this.books
  }
}
