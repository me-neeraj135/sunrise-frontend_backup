import { Component } from '@angular/core'
import { ClassServiceService } from 'src/app/class-service/class-service.service'
import { AddClassComponent } from 'src/app/add-class/add-class.component'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
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
  user: any
  showClassForm = false
  constructor(
    private classService: ClassServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')
    this.classService.getClass().subscribe((data: any) => {
      this.classes = data
    })

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }
  handleAddClassForm(event: Event): void {
    this.showClassForm = true
    this.router.navigate(['/addClass'])
  }
}
