import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: BehaviorSubject<Event[]> = this.eventService.list$;
  testEvent: Observable<Event> = this.eventService.get(1);

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventService.getAll();
  }

  onDelete(event: Event): void {
    if (confirm(`Are you sure to delete ${event.name}?`)) {
      const ev: string = event.name;
      this.eventService.remove(event);
      this.eventService.showSuccess('deleted successfuly.', ev);
    }
  }
}
