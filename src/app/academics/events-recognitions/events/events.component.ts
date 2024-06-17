import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
interface type{
  img: string;
  title: string;
  loction: string;
}
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  eventData: any;

  banner: any = {
    pagetitle: "Event 1",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Event 1",
  }
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data:any) => {
      this.eventData = data;
    });
  }
}
