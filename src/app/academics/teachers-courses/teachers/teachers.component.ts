import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  banner: any = {
    pagetitle: "Teachers",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Teachers",
  }

  teachersData: any;
  //teachersDetailsUrl: any = "/teachers-profile, teacher.teacherId"

  constructor(private teacherService: TeacherService){}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((data:any) => {
      this.teachersData = data;
    });
  }
}
