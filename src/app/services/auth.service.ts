import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { tap } from 'rxjs/operators'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users' // Replace with your backend API URL

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          console.log('usr', users)
          if (users.length) {
            const user = users[0]
            if (user.email === email && user.password === password) {
              localStorage.setItem('currentUser', JSON.stringify(user))
              return user
            } else {
              return throwError(() => new Error(`User not register`))
            }
          }
          return null
        }),
        catchError((error) => {
          console.error('Error fetching users', error)
          return of(null)
        }),
      )
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }
}
