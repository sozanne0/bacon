import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

//  private vendorsUrl = 'api/vendors';  // URL to web api
  private usersUrl = `${environment.baseUrl}/users`;  // URL to web api
  private currentUser: User;

  updateCurrentUser(aUser: User) {
    this.currentUser = aUser;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  /** get all users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(() => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
    );
  }


  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** POST: add a new User to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((aUser: User) => this.log(`added user w/ id=${aUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** PUT: update the User on the server */
  updateUser (user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.patch(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated vendor id=${user.id}`)),
      catchError(this.handleError<any>(`updateUser id=${user.id}`))
    );
  }

  /** DELETE: delete the User from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }
}
