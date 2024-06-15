import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachersUrl = 'assets/data/teacher.json'
  private teacherDetailsUrl = 'assets/data/teacher-detail.json';

  constructor(private http: HttpClient) { }

  getAllTeacherData(): Observable<any> {
    const teachers$ = this.http.get<any[]>(this.teachersUrl);
    const teacherDetails$ = this.http.get<any[]>(this.teacherDetailsUrl);

    return forkJoin([teachers$, teacherDetails$]).pipe(
      map(([teachers, teacherDetails]) => {
        return teachers.map(teacher => {
          const details = teacherDetails.find(detail => detail.teacherId === teacher.teacherId);
          return { ...teacher, ...details };
        });
      })
    );
  }
}
