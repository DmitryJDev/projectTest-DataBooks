export interface book{
    genre: string;
    id: number;
    name: string;
    str: string;
}
export interface bookForSearch{
    name: string;
    str: string|number;
    genre: string;
    authorBook?: string;
}
export interface searchingBook{
    name: string;
    str: number|string;
    genre: string;
    authorBook?: string;
    id: number
}


export interface dataBook{
    id: number;
    author: string;
    author_birthDay: string;
    author_firstName: string;
    author_secondName: string;
    author_thirdName: string;
    books: Array<book>    
}
export interface dataBookForSearch{
    id: number;
    author: string;
    author_birthDay: string;
    author_firstName: string;
    author_secondName: string;
    author_thirdName: string;
    books: Array<searchingBook>    
}
export interface editingBook{
    bookGenre: string;
bookLength: string;
bookName: string;
}