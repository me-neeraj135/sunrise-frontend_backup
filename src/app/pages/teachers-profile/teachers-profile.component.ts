import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers-profile',
  templateUrl: './teachers-profile.component.html',
  styleUrls: ['./teachers-profile.component.css']
})
export class TeachersProfileComponent {
  banner : any = {
		pagetitle: "Teachers Profile",
		bg_image: "assets/images/banner/bnr4.jpg",
		title: "Teachers Profile",
	}
  allTeacherData: any;

  constructor(private teacherService: TeacherService){}

  ngOnInit(): void {
    this.teacherService.getAllTeacherData().subscribe((data:any) => {
      this.allTeacherData = data;
    });
  }
	
}
