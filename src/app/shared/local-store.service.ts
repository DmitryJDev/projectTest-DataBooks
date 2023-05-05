import { Injectable } from '@angular/core';
const BOOKS = [{
  id:1, author:'Пушкин А.С.',  books:[{id:1,genre:'Поэзия', name:'Стрекозы', str:
'310'},{id:2, genre:'Экшен', name:'Букашки', str:
'200'},{id:3,genre:'Фантастика', name:'Зимний Рай', str:
'350'},{id:4,genre:'Проза', name:'Стихи в прозе', str:
'400'},{id:5,genre:'Поэзия', name:'Кукушки', str:
'500'}], author_firstName:'Пушкин',author_secondName:'Александр',author_thirdName:'Сергеевич',author_birthDay:'06.06.1799'
},{
  id:2, author:'Тургенев И.С.',  books:[{id:1,genre:'Поэзия', name:'Береза', str:
'150'},{id:2,genre:'Проза', name:'Стихи на сене', str:
'250'}],author_firstName:'Тургенев',author_secondName:'Иван',author_thirdName:'Сергеевич',author_birthDay:'09.11.1818'
},{
  id:3, author:'Шевченко Т.Г.',  books:[{id:1,genre:'Поэзия', name:'Кобзарь', str:
'200'},{id:2,genre:'Проза', name:'Души', str:
'250'},{id:3,genre:'Стихи', name:'Паращее солнце', str:
'350'}],author_firstName:'Шевченко',author_secondName:'Тарас',author_thirdName:'Григорьевич',author_birthDay:'09.03.1814'
  }]
const GENRES = ["Экшен",'Проза', "Поэзия", "Любовь", "Стихи", "Фантастика", "Животные", "Ужасы", "Приключения"]

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }
  dataSelfGenre:Array<string>=[]
  getSelfGenres() {
    if (this.getItem('selfGenres')) {
      return this.getItem('selfGenres')
     } else {
      this.setItem('selfGenres', this.dataSelfGenre)       
      return this.dataSelfGenre;
    }
  }
  getDataBooks() {
     if (this.getItem('tempData')) {
      return this.getItem('tempData')
     } else {
      this.setItem('tempData', BOOKS)       
      return BOOKS;
    }
    
  }
  getDataGenres() {
    if (this.getItem('dataGenre')) {
      return this.getItem('dataGenre')
    } else {
      this.setItem('dataGenre', GENRES)
      return GENRES;
    }
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    }
  
    getItem(key: string): any {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }

    removeItem(key: string): void {
     localStorage.removeItem(key);
    }
  
    
}
