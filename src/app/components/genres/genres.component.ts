import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBooksService } from 'src/app/shared/data-books.service';
import { LocalStoreService } from 'src/app/shared/local-store.service';
import { myValidators } from 'src/app/shared/myValidators';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {
  constructor(private dataBook:DataBooksService, private ls:LocalStoreService) { }
  genres!: Array<string>;
  selfGenres: Array<string> = [];
  form!: FormGroup;
  ngOnInit() {
    this.genres = this.dataBook.getBooksGenresData();
    this.selfGenres = this.ls.getSelfGenres();
    this.setForm();
  }
  setForm() {
    this.form = new FormGroup({
      genreInp:new FormControl('', [Validators.required, myValidators.textValidator])
    })
  }
  
  addGenre(genre: HTMLInputElement) {
    if (genre.value) {
      this.selfGenres.push(genre.value);
      this.ls.setItem('selfGenres', this.selfGenres);
      this.dataBook.setNewGenre(genre.value);
    }  
  }
}
