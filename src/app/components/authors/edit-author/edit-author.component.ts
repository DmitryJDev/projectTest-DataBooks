import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { Book, DataBook } from 'src/app/interfaces/myInterfaces.interface';
import { myValidators } from 'src/app/validators/myValidators';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
  
export class EditAuthorComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private dataBookServ: DataBooksService, private fb: FormBuilder, private addBookServ: AddingBookServService, private cd: ChangeDetectorRef,) { }
  
  dataAutor!: Array<DataBook>;
  dataAutorFirstName: string = '';
  dataAutorSecondName: string = '';
  dataAutorThirdName: string = '';
  dataAutorBirthaDay: string = '';
  dataAutorBooks!:Array<Book>;
  mainForm!: FormGroup;
  bookNameControl!: FormControl;
  bookLengthControl!: FormControl;
  bookGenreControl!: FormControl;
  genresBooks!: Array<string>;
  addBookCheck: boolean = false;
  books!: Array<Book>;
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.dataAutor = this.getInfoAboutAuthor(data['id']);

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

  ngAfterViewChecked() {
    this.cd.detectChanges();
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
    this.editAuthor(forma, this.dataAutor[0].id)
    this.dataBookServ.setEditingAuthor();
    this.mainForm.reset();
    forma.reset();
    this.router.navigate(['authors']);
  }
  
  editAuthor(form: FormGroup, id: number) {
    this.dataBookServ.tempBookData.filter((authorEdit: DataBook) => {
      if (authorEdit.id == id) {
        authorEdit.author=this.authorNameSetting(form);
        authorEdit.books = this.dataBookServ.booksArr;
        authorEdit.author_firstName = form.controls['firstName'].value;
        authorEdit.author_secondName = form.controls['secondName'].value;
        authorEdit.author_thirdName = form.controls['thirdName'].value;
        authorEdit.author_birthDay=form.controls['birthDay'].value
      }
    })
  }

  authorNameSetting(form: FormGroup) {
    let thirdName = (form.controls['thirdName']?.value[0]?.toUpperCase()) ?
      form.controls['thirdName']?.value[0]?.toUpperCase() + '.' : '';
    
    let name = form.controls['firstName'].value.charAt(0).toUpperCase() +
      form.controls['firstName'].value.substr(1).toLowerCase() +  " " +
      form.controls['secondName'].value[0].toUpperCase() + '. ' + thirdName;
    
    return name;
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

    let book = this.createNewBook(forms);
    this.books = this.addBookServ.addBook(book);  
    this.dataBookServ.booksArr = this.books;
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
    this.genresBooks = this.dataBookServ.getBooksGenresData();
  }

  deleteBook(e: Event, id: number) {    
    e.preventDefault();  

    this.books = this.addBookServ.deleteBook(id);
    this.dataBookServ.booksArr = this.books;    
  }
  
  changeBook(e: Event, book:Book) {   
    e.preventDefault();

    this.router.navigate(['addBook'],{queryParams:{id:book.id, genre:book.genre, name:book.name, str:book.str}})   
  }
}
