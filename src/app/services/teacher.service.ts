import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachersUrl = 'assets/data/teacher.json'
  private teacherDetailsUrl = 'assets/data/teacher-detail.json'
  private backendUrl = 'http://localhost:5000/api'
  private apiUrl = 'http://localhost:5000/api/teachers'
  teacher: any

  constructor(private http: HttpClient) {}

  getAllTeacherAndDetails(): Observable<any> {
    const teachers$ = this.http.get<any[]>(this.teachersUrl)
    const teacherDetails$ = this.http.get<any[]>(this.teacherDetailsUrl)

    return forkJoin([teachers$, teacherDetails$]).pipe(
      map(([teachers, teacherDetails]) => {
        return teachers.map((teacher) => {
          const details = teacherDetails.find(
            (detail) => detail.teacherId === teacher.teacherId,
          )
          return { ...teacher, ...details }
        })
      }),
    )
  }

  getTeachers(): Observable<any> {
    return this.http.get<any>(this.teachersUrl)
  }

  addTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, teacher)
  }

  getBackendTeachers(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/teachers`)
  }

  getBackendTeacherById(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.backendUrl}/teachers`)
      .pipe(
        map((teachers) =>
          teachers.find(
            (teacher: { _id: string; teacherId: any }) => teacher._id === id,
          ),
        ),
      )
  }

  getTeacherDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.teacherDetailsUrl)
  }

  getTeacherById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.teachersUrl)
      .pipe(
        map((teachers) => teachers.find((teacher) => teacher.teacherId === id)),
      )
  }

  getTeacherDetailsById(id: number): Observable<any> {
    return this.http
      .get<any[]>(this.teacherDetailsUrl)
      .pipe(map((details) => details.find((detail) => detail.teacherId === id)))
  }

  getTeacherAndDetailsById(id: number): Observable<any> {
    return forkJoin([this.getTeachers(), this.getTeacherDetails()]).pipe(
      map(([teachers, teacherDetails]) => {
        const teacher = teachers.find(
          (t: { teacherId: number }) => t.teacherId === id,
        )
        const details = teacherDetails.find((d) => d.teacherId === id)
        return { ...teacher, ...details }
      }),
    )
  }
}
