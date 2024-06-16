import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent {
  eventId: any;
  eventData: any;

  banner : any = {
		pagetitle: "Event Details",
		bg_image: "assets/images/banner/bnr4.jpg",
		title: "Event Details",
	}
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService){}

    ngOnInit(): void {
      this.eventId = Number(this.route.snapshot.paramMap.get('id'));
      this.eventService.getEventById(this.eventId).subscribe((data:any) => {
        this.eventData = data;
      });     
    }

}
