import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStoreService } from './local-store.service';
import { Author, Book, DataBook } from '../interfaces/myInterfaces.interface';

@Injectable({
  providedIn: 'root'
})
  
export class DataBooksService {  

  constructor(private ls: LocalStoreService) { 
    this.tempBookData = this.ls.getDataBooks();
    this.booksGenre = this.ls.getDataGenres();
  }  
  
  tempBookData: Array<DataBook>;
  booksArr!: Array<Book>;
  booksGenre!: Array<string>;

  booksArray() {
    return this.tempBookData;
  }
  
  setNewAuthor(author:Author) {        
    this.tempBookData.push(author);
    this.ls.setItem('tempData', this.tempBookData);
    this.booksArr = [];
  }

  getBooksGenresData() {
    return this.booksGenre;
  }

  setNewGenre(genre:string) {    
    this.booksGenre.push(genre);
    this.ls.setItem('dataGenre', this.booksGenre);
  }

  deleteGenre(genreDEL: string) {
    this.booksGenre = this.booksGenre.filter((genre: string) => genre != genreDEL);
  }

  deletingAuthor(id: number) {    
    this.tempBookData=this.tempBookData.filter((n: { id: number; }) => n.id !== id);      
    this.ls.setItem('tempData', this.tempBookData);
  }

  getAuthor(id:number) {
    return this.tempBookData.filter((n: { id: number; }) => n.id == id)
  }

  setEditingAuthor() { 
    this.ls.setItem('tempData', this.tempBookData);  
    this.booksArr = [];
  }
}
