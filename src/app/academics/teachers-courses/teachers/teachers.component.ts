import { Component } from '@angular/core'
import { TeacherService } from 'src/app/services/teacher.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  banner: any = {
    pagetitle: 'Teachers',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Teachers',
  }
  user: any
  teachersData: any
  showTeacherForm = false

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((data: any) => {
      this.teachersData = data
    })
    const userData = localStorage.getItem('currentUser')

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }

  addNewTeacher(event: Event): void {
    console.log('Button was clicked!', event)
    this.showTeacherForm = true
    this.router.navigate(['/addTeacher'])
    console.log('form', this.showTeacherForm)
  }
}
