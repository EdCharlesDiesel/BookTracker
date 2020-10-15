import { OldBook } from './../models/oldBook';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/services/data.service';
import { LoggerService } from 'app/services/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private loggerService: LoggerService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID).subscribe(
      (data: Book) => this.selectedBook = data,
      (err: any) => console.log(err)
    );
    this.dataService.getOldBookById(bookID).subscribe(
      (data: OldBook) => console.log(`'Old book title : ${data.bookTitle}`)
    )
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe(

      (data:void)=> console.log(`${this.selectedBook.title} updated successfully.`),
      (err:any)=> console.log(err)
    );
  }
}
