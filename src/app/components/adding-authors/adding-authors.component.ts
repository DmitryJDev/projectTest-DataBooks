import { Component } from '@angular/core';
import{FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import {  Router } from '@angular/router';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { ChangeDetectorRef } from '@angular/core';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { myValidators } from 'src/app/shared/myValidators';
import { book } from 'src/app/shared/myInterfaces.interface';
@Component({
  selector: 'app-adding-authors',
  templateUrl: './adding-authors.component.html',
  styleUrls: ['./adding-authors.component.css']
})
export class AddingAuthorsComponent {
  constructor(private dataBook: DataBooksService, private fb: FormBuilder, private router: Router,
    private cd: ChangeDetectorRef, private addBookServ:AddingBookServService) { }
   ngOnInit() {      
    this.setBookControls();
     this.setForm();
     this.getGenresData();
   }
  
  
  ngDoCheck() {    
    this.books = this.addBookServ.returnDataBook()    
  }
  registrForm!: FormGroup;
  bookNameControl!: FormControl;
  bookLengthControl!: FormControl;
  bookGenreControl!:FormControl;
  
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
  addAuthorToDataBook(forma: FormGroup) {  
    this.books = [];
    this.addBookServ.books = [];   
    this.dataBook.setNewAuthor(forma);
    this.registrForm.reset();
    forma.reset();
    this.router.navigate(['authors']);
  }
  books!:Array<book>;
  addBookCheck: boolean = false;
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
    this.books = this.addBookServ.addBook(forms);  
    this.dataBook.booksArr = this.books;
    
  }

  
  genresBooks!: Array<string>;
  getGenresData() {
    this.genresBooks = this.dataBook.getBooksGenresData()       
  }
  deleteBook(e: Event, id: number) {    
    e.preventDefault();  
    this.books=this.addBookServ.deleteBook(id) 
  }
  
  changeBook(e: Event, book: book) {
    e.preventDefault();
      this.router.navigate(['addBook'],{queryParams:{id:book.id, genre:book.genre, name:book.name, str:book.str}})
     }
  
}
