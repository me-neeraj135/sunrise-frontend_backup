import { Component } from '@angular/core'
import { EventService } from 'src/app/services/event.service'
import { Router } from '@angular/router'
interface type {
  img: string
  title: string
  loction: string
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  eventData: any
  user: any

  showEventForm = false

  banner: any = {
    pagetitle: 'Event 1',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Event 1',
  }
  constructor(private eventService: EventService, private router: Router) {}

  addEvent(event: any): void {
    console.log('Button was clicked!', event)
    this.showEventForm = true
    this.router.navigate(['/addEvent'])
    console.log('form', this.showEventForm)
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')

    this.eventService.getEvents().subscribe((data: any) => {
      this.eventData = data
    })

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }
}
