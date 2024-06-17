import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ClassServiceService {
  private classUrl = 'assets/data/class.json'
  private classDetailsUrl = 'assets/data/class-detail.json'

  constructor(private http: HttpClient) {}

  getClass(): Observable<any> {
    return this.http.get(this.classUrl)
  }

  getClassDetail(): Observable<any> {
    return this.http.get(this.classDetailsUrl)
  }

  getClassAndClassDetail(): Observable<any[]> {
    const classes$ = this.http.get<any[]>(this.classUrl)
    const classDetails$ = this.http.get<any[]>(this.classDetailsUrl)

    return forkJoin([classes$, classDetails$]).pipe(
      map(([classes, classDetails]) => {
        return classes.map((classElement) => {
          const details = classDetails.find(
            (detail) => detail.classId === classElement.classId,
          )

          return { ...classElement, ...details }
        })
      }),
    )
  }

  getClassById(id: number): Observable<any> {
    return forkJoin([this.getClass(), this.getClassDetail()]).pipe(
      map(([classes, classDetails]) => {
        const cls = classes.find((c: { classId: number }) => c.classId === id)
        const details = classDetails.find((d: any) => d.classId === id)
        return { ...cls, ...details }
      }),
    )
  }
  getClassDetailById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.classDetailsUrl)
      .pipe(
        map((details) => details.find((detail) => detail.classDetailId === id)),
      )
  }
}
