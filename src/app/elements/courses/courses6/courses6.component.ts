import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ClassServiceService } from 'src/app/services/class-service.service'

@Component({
  selector: 'app-courses6',
  templateUrl: './courses6.component.html',
  styleUrls: ['./courses6.component.css'],
})
export class Courses6Component {
  classDetails: any
  classId: any

  constructor(
    private route: ActivatedRoute,
    private classService: ClassServiceService,
  ) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'))
    this.classService
      .getClassDetailById(this.classId)
      .subscribe((data: any) => {
        this.classDetails = data
      })
  }
}
