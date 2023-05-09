import { Component } from '@angular/core';
import{FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import {  Router } from '@angular/router';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { ChangeDetectorRef } from '@angular/core';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { myValidators } from 'src/app/validators/myValidators';
import { Book } from 'src/app/interfaces/myInterfaces.interface';
@Component({
  selector: 'app-adding-authors',
  templateUrl: './adding-authors.component.html',
  styleUrls: ['./adding-authors.component.css']
})
  
export class AddingAuthorsComponent {
  constructor(private dataBook: DataBooksService, private fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef, private addBookServ: AddingBookServService) { }
  
  registrForm!: FormGroup;
  bookNameControl!: FormControl;
  bookLengthControl!: FormControl;
  bookGenreControl!: FormControl;
  books!:Array<Book>;
  addBookCheck: boolean = false;
  genresBooks!: Array<string>;
  
  ngOnInit() {      
    this.setBookControls();
    this.setForm();
    this.getGenresData();
  } 
  
  ngDoCheck() {    
    this.books = this.addBookServ.returnDataBook()    
  }  
  
  setBookControls() {
    this.bookNameControl = this.fb.control('');
    this.bookLengthControl = this.fb.control('');
    this.bookGenreControl = this.fb.control('');
  }
  
  setForm() {
    this.registrForm = new FormGroup({
      firstName: this.fb.control('', [Validators.minLength(2), Validators.required, myValidators.textValidator]),
      secondName: this.fb.control('', [Validators.minLength(2), Validators.required, myValidators.textValidator]),
      thirdName: this.fb.control('',  myValidators.thirdNameValidator),
      birthDay: this.fb.control('', myValidators.birthDayValidator),
      booksData: this.fb.group({
        bookName: this.bookNameControl,
        bookGenre: this.bookGenreControl,
        bookLength:this.bookLengthControl
      })
    })
  }

  addAuthorToDataBook(form: FormGroup) {  
    this.books = [];
    this.addBookServ.books = []; 
    
    let newAuthor = this.createAuthor(form);
    this.dataBook.setNewAuthor(newAuthor);

    this.registrForm.reset();
    form.reset();

    this.router.navigate(['authors']);
  }

  createAuthor(form:FormGroup) {
    let tempId: number = -Infinity;
    this.dataBook.tempBookData.forEach(item => {
      if (item.id > tempId) {tempId = item.id}
    })

    let authorId = (tempId != -Infinity) ? tempId + 1 : 1;  
    
    let authorname = this.authorNameSetting(form);

      let newAuthor = {
        id: authorId,
        author: authorname,
        books: this.dataBook.booksArr,
        author_firstName: form.controls['firstName'].value,
        author_secondName: form.controls['secondName'].value,
        author_thirdName: form.controls['thirdName'].value,
        author_birthDay:form.controls['birthDay'].value
      }
    
    return newAuthor
  }

  authorNameSetting(form: FormGroup) {
    let thirdName = (form.controls['thirdName']?.value[0]?.toUpperCase()) ?
      form.controls['thirdName']?.value[0]?.toUpperCase() + '.' : '';
    
    let name = form.controls['firstName'].value.charAt(0).toUpperCase() +
        form.controls['firstName'].value.substr(1).toLowerCase() +  " " +
        form.controls['secondName'].value[0].toUpperCase() + '. ' +
        thirdName;
    
    return name;
  }
  
  ngAfterViewChecked() {    
    this.cd.detectChanges()    
  }

  addBookToDataBooks(e:Event) {
    e.preventDefault()
    
    this.addBookCheck = !this.addBookCheck
    this.bookNameControl.addValidators([Validators.required, myValidators.textValidator]);
    this.bookLengthControl.addValidators([Validators.required, myValidators.strValidator]);
    this.bookGenreControl.addValidators(Validators.required);
  }

  addBook(forms: FormGroup) {    
    this.bookNameControl.clearValidators();
    this.bookLengthControl.clearValidators();
    this.bookGenreControl.clearValidators();

    this.addBookCheck = !this.addBookCheck; 

    let book = this.createNewBook(forms);
    this.books = this.addBookServ.addBook(book);     
    this.dataBook.booksArr = this.books;    
  }

  createNewBook(forms:FormGroup) {
    let bookName = forms.controls['booksData'].get('bookName')?.value;
    let bookGenre = forms.controls['booksData'].get('bookGenre')?.value;
    let bookLength = forms.controls['booksData'].get('bookLength')?.value;  
    
    let tempId: number = -Infinity;
    this.addBookServ.books.forEach(item => {
      if (item.id > tempId) {tempId = item.id}
    })

    let bookId = (tempId != -Infinity) ? tempId + 1 : 1; 

    let book = {
      id:bookId,
      genre:bookGenre,
      name: bookName,
      str:bookLength
    }
    forms.controls['booksData'].reset();

    return book
  }
  
  getGenresData() {
    this.genresBooks = this.dataBook.getBooksGenresData()       
  }

  deleteBook(e: Event, id: number) {    
    e.preventDefault();  

    this.books=this.addBookServ.deleteBook(id) 
  }
  
  changeBook(e: Event, book: Book) {    
    e.preventDefault();

    this.router.navigate(['addBook'],{queryParams:{id:book.id, genre:book.genre, name:book.name, str:book.str}})
  }
  
}
