import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddingBookServService } from 'src/app/shared/adding-book-serv.service';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { Location } from '@angular/common';
import { myValidators } from 'src/app/validators/myValidators';

@Component({
  selector: 'app-addingbook',
  templateUrl: './addingbook.component.html',
  styleUrls: ['./addingbook.component.css']
})
  
export class AddingbookComponent {
  constructor(private dataBook: DataBooksService, private fb: FormBuilder, private router: Router, private cd: ChangeDetectorRef,
  private activatedRoute:ActivatedRoute, private editingBook:AddingBookServService,private location: Location) { }

  genresBooks!: Array<string>;
  id!: number;
  genre!: string;
  name!: string;
  str!: string;
  booksData!: FormGroup;
  bookName!: FormControl;
  bookLength!: FormControl;
  bookGenre!: FormControl;
  
  getGenresData() {
    this.genresBooks = this.dataBook.getBooksGenresData()
  }  

  ngOnInit() {    
    this.activatedRoute.queryParams.subscribe(par => {      
      this.id = par['id'],
      this.genre = par['genre'],
      this.name = par['name'],
      this.str = par['str']       
    })    
    
    this.setBookControls();
    this.setForm();
    this.getGenresData();    
  }  
  
  setBookControls() {
    this.bookName = this.fb.control(`${this.name}`, [Validators.required, myValidators.textValidator]);
    this.bookLength = this.fb.control(`${this.str}`,[Validators.required, myValidators.strValidator]);
    this.bookGenre = this.fb.control(`${this.genre}`,Validators.required);
  }

  setForm() {   
    this.booksData = this.fb.group({
      bookName: this.bookName,              
      bookGenre: this.bookGenre,        
      bookLength: this.bookLength        
    })      
  }

  addBook(book: FormGroup) {  
    if (this.booksData.valid) {
      this.editingBook.editBook(book.value, this.id);    
    this.location.back();
  }
    }
    
}
