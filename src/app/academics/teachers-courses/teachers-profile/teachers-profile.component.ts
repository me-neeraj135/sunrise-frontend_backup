import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
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
  teacherData: any;
  teacherId: any;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService){}

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.paramMap.get('id');
    this.teacherService.getBackendTeacherById(this.teacherId).subscribe((data:any) => {
      this.teacherData = data;
    });
  }
	
}
