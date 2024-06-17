import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { TeacherService } from './teacher.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl = 'assets/data/event.json';
  private eventDetailUrl = "assets/data/event-detail.json";
  private eventContentUrl = "assets/data/event-content.json";

  constructor(private http: HttpClient, private teacherService: TeacherService) { }
  
  getEvents(): Observable<any> {
    return this.http.get<any>(this.eventUrl);
  }

  getEventDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.eventDetailUrl);
  }

  getEventContents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventContentUrl);
  }

  getEventById(eventId: number): Observable<any> {
    return forkJoin([
      this.getEvents(),
      this.getEventDetails(),
      this.getEventContents()
    ]).pipe(
      catchError(error => throwError('Failed to fetch event data')),
      map(([events, eventDetails, eventContents]) => {
        const event = events.find((e: {eventId:number}) => e.eventId === eventId);
        const eventDetail = eventDetails.find(ed => ed.eventId === eventId);
        const eventContentsFiltered = eventContents.filter(ec => ec.eventId === eventId);

        if (event && eventDetail && eventContentsFiltered.length > 0) {
          return {
            ...event,
            about: eventDetail.about,
            highlight: eventDetail.highlight,
            contents: eventContentsFiltered.map((ec: any) => ec.label)
          };
        } else {
          throw new Error('Event data not found');
        }
      })
    );
  }
}
