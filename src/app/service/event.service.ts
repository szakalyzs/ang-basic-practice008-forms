import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EventService {

 /*  private list: Event[] = [
    {
      id: 1,
      name: 'Angular Connect',
      date: '9/26/2036',
      time: '10am',
      location: { address: '1 London Rd', city: 'London', country: 'England' }
    },
    {
      id: 2,
      name: 'ng-nl',
      date: '4/15/2037',
      time: '9am',
      location: { address: '127 DT ', city: 'Amsterdam', country: 'NL' }
    },
    {
      id: 3,
      name: 'ng-conf 2037',
      date: '4/15/2037',
      time: '9am',
      location: { address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA' }
    },
    {
      id: 4,
      name: 'UN Angular Summit',
      date: '6/10/2037',
      time: '8am',
      location: { address: 'The UN Angular Center', city: 'New York', country: 'USA' }
    },
  ]; */

  jsonUrl: string = 'http://localhost:3000/events';

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getAll(): void {
    this.http.get<Event[]>(this.jsonUrl).subscribe(
      events => this.list$.next(events)
    );
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Event | undefined = this.list$.value.find( item => item.id === id );
    if (ev) {
      return of(ev);
    }
    return of(new Event());
  }

  update(event: Event): void {
    this.http.patch<Event>(`${this.jsonUrl}/${event.id}`, event).subscribe(
      () => this.getAll()
    )
  }

  create(event: Event): void {
    this.http.post<Event>(this.jsonUrl, event).subscribe(
      () => this.getAll()
    );
  }

  remove(event: Event): void {
    this.http.delete<Event>(`${this.jsonUrl}/${event.id}`).subscribe(
      () => this.getAll()
    );
  }

  showSuccess(text: string, title: string) {
    this.toastr.success(text, title, {timeOut: 3000});
  }

  /* update(event: Event): Observable<Event> {
    const index: number = this.list.findIndex( item => item.id === event.id );
    this.list.splice(index, 1, event);
    this.getAll();
    return of(this.list[index]);
  } */

  /* create(event: Event): Observable<Event> {
    event.id = this.list[this.list.length - 1].id + 1;
    const index: number = this.list.push(event) - 1;
    this.getAll();
    return of(this.list[index]);
  } */
  //The push() method returns the new array length

  /* remove(event: Event): void{
    const index: number = this.list.findIndex( item => item.id === event.id );
    this.list.splice(index, 1);
    this.getAll();
    //return of(this.list);
  } */

}
