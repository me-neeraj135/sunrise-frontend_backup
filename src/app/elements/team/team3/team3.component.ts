import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-team3',
  templateUrl: './team3.component.html',
  styleUrls: ['./team3.component.css']
})
export class Team3Component {
  teachersData: any;

  constructor(private teacherService: TeacherService){}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((data:any) => {
      this.teachersData = data;
    });
  }
}
