import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { book, dataBook } from 'src/app/shared/myInterfaces.interface';
import { myValidators } from 'src/app/shared/myValidators';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private dataBookServ: DataBooksService, private fb: FormBuilder, private addBookServ: AddingBookServService, private cd: ChangeDetectorRef,) { }
  
  dataAutor!: Array<dataBook>;
  dataAutorFirstName: string = '';
  dataAutorSecondName: string = '';
  dataAutorThirdName: string = '';
  dataAutorBirthaDay: string = '';
  dataAutorBooks!:Array<book>;
  mainForm!: FormGroup;
  bookNameControl!: FormControl;
  bookLengthControl!: FormControl;
  bookGenreControl!: FormControl;
  genresBooks!: Array<string>;
  addBookCheck: boolean = false;
  books!:Array<book>;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.dataAutor = this.getInfoAboutAuthor(data['id'])
      if (this.dataAutor[0]) {
          this.dataAutorFirstName=this.dataAutor[0]?.author_firstName
          this.dataAutorSecondName=this.dataAutor[0]?.author_secondName;
          this.dataAutorThirdName=this.dataAutor[0]?.author_thirdName;
          this.dataAutorBirthaDay = this.dataAutor[0]?.author_birthDay;
          this.dataAutorBooks=this.dataAutor[0]?.books
       }
      this.addBookServ.books = this.dataAutorBooks
      this.dataBookServ.booksArr = this.dataAutorBooks;
    })
    
    this.setBookControls();
     this.setForm();
     this.getGenresData();
  }
  ngDoCheck() {    
    this.books = this.addBookServ.returnDataBook();      
  }
  getInfoAboutAuthor(id: number) {      
    return this.dataBookServ.getAuthor(id);
  }  
  
  setBookControls() {
    this.bookNameControl = this.fb.control('');
    this.bookLengthControl = this.fb.control('');
    this.bookGenreControl = this.fb.control('');
  }

  setForm() {
    this.mainForm= new FormGroup({
      firstName: this.fb.control(`${this.dataAutorFirstName}`, [Validators.minLength(2), Validators.required, myValidators.textValidator]),
      secondName: this.fb.control(`${this.dataAutorSecondName}`, [Validators.minLength(2), Validators.required, myValidators.textValidator]),
      thirdName: this.fb.control(`${this.dataAutorThirdName}`, myValidators.thirdNameValidator),
      birthDay: this.fb.control(`${this.dataAutorBirthaDay}`, myValidators.birthDayValidator),
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
   this.dataBookServ.editingAuthor(forma, this.dataAutor[0].id);
   this.mainForm.reset();
    forma.reset();
   this.router.navigate(['authors']);
  }
  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
  addBookToDataBooks(e:Event) {
    e.preventDefault();
    
    this.addBookCheck = !this.addBookCheck;
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
    this.dataBookServ.booksArr = this.books;
  }  
  
  getGenresData() {
    this.genresBooks = this.dataBookServ.getBooksGenresData();
  }

  deleteBook(e: Event, id: number) {    
    e.preventDefault();  

    this.books = this.addBookServ.deleteBook(id);
    this.dataBookServ.booksArr = this.books;
    
  }
  
  changeBook(e: Event, book:book) {   
    e.preventDefault();
      this.router.navigate(['addBook'],{queryParams:{id:book.id, genre:book.genre, name:book.name, str:book.str}})   
  }










}
