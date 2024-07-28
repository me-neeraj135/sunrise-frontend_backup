import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ClassServiceService } from 'src/app/services/class-service.service'

@Component({
  selector: 'app-classes-details',
  templateUrl: './classes-details.component.html',
  styleUrls: ['./classes-details.component.css'],
})
export class classesDetailsComponent {
  banner: any = {
    pagetitle: 'Classes Details',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Classes Details',
  }
}
