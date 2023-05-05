import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { Location } from '@angular/common';
import { myValidators } from 'src/app/shared/myValidators';
@Component({
  selector: 'app-addingbook',
  templateUrl: './addingbook.component.html',
  styleUrls: ['./addingbook.component.css']
})
export class AddingbookComponent {
  constructor(private dataBook: DataBooksService, private fb: FormBuilder, private router: Router, private cd: ChangeDetectorRef,
  private activatedRoute:ActivatedRoute, private editingBook:AddingBookServService,private location: Location) { }

genresBooks!: Array<string>;
  getGenresData() {
    this.genresBooks = this.dataBook.getBooksGenresData()
  }
  id!: number;
  genre!: string;
  name!: string;
  str!: string;

  ngOnInit() {    
    this.activatedRoute.queryParams.subscribe(par => {      
      this.id = par['id'],
      this.genre = par['genre'],
      this.name = par['name'],
        this.str = par['str']       
    })           
    this.setBookControls();
    this.setForm()
    this.getGenresData();    
  }

  booksData!: FormGroup;
  bookNameControl!: FormControl;
  bookLengthControl!: FormControl;
  bookGenreControl!:FormControl;
  
  setBookControls() {
    this.bookNameControl = this.fb.control(`${this.name}`, [Validators.required, myValidators.textValidator]);
    this.bookLengthControl = this.fb.control(`${this.str}`,[Validators.required, myValidators.strValidator]);
    this.bookGenreControl = this.fb.control(`${this.genre}`,Validators.required);

  }
  setForm() {   
       this.booksData = this.fb.group({
        bookName: this.bookNameControl,              
        bookGenre: this.bookGenreControl,        
        bookLength: this.bookLengthControl        
      })      
  }
  addBook(book: FormGroup) {      
    this.editingBook.editBook(book.value, this.id);    
    this.location.back();
  }
}
