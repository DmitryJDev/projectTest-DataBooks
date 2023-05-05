import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStoreService } from './local-store.service';
import { book, dataBook } from './myInterfaces.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBooksService {
  tempBookData: Array<dataBook>;
  booksArr!: Array<book>;
  booksGenre!: Array<string>;

  constructor(private ls: LocalStoreService) { 
    this.tempBookData = this.ls.getDataBooks();
    this.booksGenre = this.ls.getDataGenres();
   }  
  
    booksArray() {
        return this.tempBookData;
    }
  authorNameSetting(form: FormGroup) {
    let thirdName = (form.controls['thirdName']?.value[0]?.toUpperCase()) ?
      form.controls['thirdName']?.value[0]?.toUpperCase()+'.':''
    let name = form.controls['firstName'].value.charAt(0).toUpperCase() +
        form.controls['firstName'].value.substr(1).toLowerCase() +  " " +
        form.controls['secondName'].value[0].toUpperCase() + '. ' +
        thirdName ;
    return name;
  }
  setNewAuthor(form: FormGroup) {    
    let tempId: number = -Infinity;
    this.tempBookData.forEach(item => {
      if (item.id > tempId) {tempId = item.id}
    })
    let authorId = (tempId != -Infinity) ? tempId + 1 : 1;    
    let authorname = this.authorNameSetting(form);
      let newAuthor = {
        id: authorId,
        author: authorname,
        books: this.booksArr,
        author_firstName: form.controls['firstName'].value,
        author_secondName: form.controls['secondName'].value,
        author_thirdName: form.controls['thirdName'].value,
        author_birthDay:form.controls['birthDay'].value
        }
      this.tempBookData.push(newAuthor);
      this.ls.setItem('tempData', this.tempBookData)    
      this.booksArr=[]
   }
  getBooksGenresData() {
    return this.booksGenre;
  }
  setNewGenre(genre:string) {    
    this.booksGenre.push(genre)
      this.ls.setItem('dataGenre', this.booksGenre)

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
  editingAuthor(form: FormGroup, id: number) {    
    
    this.tempBookData.filter((authorEdit: dataBook) => {
      if (authorEdit.id == id) {
        authorEdit.author=this.authorNameSetting(form);
        authorEdit.books = this.booksArr;
        authorEdit.author_firstName = form.controls['firstName'].value;
        authorEdit.author_secondName = form.controls['secondName'].value;
        authorEdit.author_thirdName = form.controls['thirdName'].value;
        authorEdit.author_birthDay=form.controls['birthDay'].value
      }
    })
      this.ls.setItem('tempData', this.tempBookData)    
      this.booksArr=[]
  }
}
