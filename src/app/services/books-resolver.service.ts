import { BookTrackerError } from './../models/book-tracker-error';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Book } from 'app/models/book';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataServices:DataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book[] | BookTrackerError | Observable<Book[] | BookTrackerError> | Promise<Book[] | BookTrackerError> {
    
return this.dataServices.getAllBooks().pipe(
  catchError(err=>of(err))
);

  }

}

