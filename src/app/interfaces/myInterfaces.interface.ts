
export interface Book{
    genre: string;
    id: number;
    name: string;
    str: string;
}

export interface BookForSearch{
    name: string;
    str: string|number;
    genre: string;
    authorBook?: string;
}

export interface SearchingBook{
    name: string;
    str: number|string;
    genre: string;
    authorBook?: string;
    id: number;
}

export interface DataBook{
    id: number;
    author: string;
    author_birthDay: string;
    author_firstName: string;
    author_secondName: string;
    author_thirdName: string;
    books: Array<Book>    
}

export interface DataBookForSearch{ 

    id: number;
    author: string;
    author_birthDay: string;
    author_firstName: string;
    author_secondName: string;
    author_thirdName: string;
    books: Array<SearchingBook>    
}

export interface EditingBook{
    bookGenre: string;
    bookLength: string;
    bookName: string;
}

export interface Author {
    id: number;
    author: string;
    author_birthDay: string;
    author_firstName: string;
    author_secondName: string;
    author_thirdName: string;
    books: Array<Book>
 }

