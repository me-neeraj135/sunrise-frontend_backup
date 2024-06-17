import { Component } from '@angular/core'
import { ClassServiceService } from 'src/app/class-service/class-service.service'
interface type {
  img: string
  title: string
  desc: string
  use_student: string
  price: number
}
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent {
  banner: any = {
    pagetitle: 'Classes',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Classes',
  }

  classes: any[] = []

  constructor(private classService: ClassServiceService) {}

  ngOnInit(): void {
    this.classService.getClass().subscribe((data: any) => {
      this.classes = data
      console.log('d', data)
    })
  }
}
