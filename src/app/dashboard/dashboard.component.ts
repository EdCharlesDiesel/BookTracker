import { ActivatedRoute } from '@angular/router';
import { BookTrackerError } from './../models/book-tracker-error';
import { Component, OnInit } from '@angular/core';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/services/logger.service';
import { DataService } from 'app/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
    private dataService: DataService,private title:Title,private route:ActivatedRoute) {

  }

  ngOnInit() {
    // this.dataService.getAllBooks().subscribe(
    //   (data: Book[]) => this.allBooks = data,
    //   (err: BookTrackerError) => console.log(err.friendlyMessage),
    //   () => console.log('All done getting books.')
    // );

    let resolvedData:Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks']

    if(resolvedData instanceof BookTrackerError){
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`)
    }else{
      this.allBooks = resolvedData;
    }
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      (data:void)=>{
        let index: number = this.allBooks.findIndex(book=>book.bookID===bookID);
        this.allBooks.splice(index,1);
      },
      (err:any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
