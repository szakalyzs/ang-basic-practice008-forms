import { Location } from './location';

export class Event {
  id: number = 0;
  name: string = '';
  date: string = '';
  time: string = '';
  location: Location = new Location();
}
