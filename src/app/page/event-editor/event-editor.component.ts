import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params.id) )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onUpdate(event: Event): void {
    if (event.id === 0) {
      this.eventService.create(event);
      this.router.navigate(['']);
    } else {
      this.eventService.update(event);
      this.router.navigate(['']);
    }
  }

  /* onUpdate(event: Event): void {
    if (event.id === 0) {
      this.eventService.create(event).subscribe(
        ev => this.router.navigate([''])
      );
    } else {
      this.eventService.update(event).subscribe(
        ev => this.router.navigate([''])
      );
    }
  } */
}
