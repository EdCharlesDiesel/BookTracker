import { OldBook } from './../models/oldBook';
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { allReaders, allBooks } from 'app/data';
import { Book } from 'app/models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private httpClient: HttpClient) { }

  getAllReaders(): Reader[] {

    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    console.log('Getting all books from the server');
    return this.httpClient.get<Book[]>('http://localhost:3000/api/books', {
      headers: getHeaders
    });
  }

  getBookById(id: number): Observable<Book> {

    let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.httpClient.get<Book>(`http://localhost:3000/api/books/${id}`, {
      headers: getHeaders
    })
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.httpClient.get<Book>(`http://localhost:3000/api/books/${id}`).pipe(map(b => <OldBook>{
      bookTitle: b.title,
      year: b.publicationYear
    }), tap(
      classicBook => console.log(classicBook)
    ));
  }

addBook(newBook:Book):Observable<Book>{
  return this.httpClient.post<Book>(`http://localhost:3000/api/books/`,newBook,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

updateBook(updateBook:Book):Observable<void>{
  return this.httpClient.put<void>(`http://localhost:3000/api/books/${updateBook.bookID}`,updateBook,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

deleteBook(bookID:number): Observable<void>{
  return this.httpClient.delete<void>(`http://localhost:3000/api/books/${bookID}`,)
}



  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }
}
