import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-audio',
  imports: [],
  templateUrl: './content-audio.component.html',
  styleUrl: './content-audio.component.scss'
})
export class ContentAudioComponent {

  @Input('content') content!: any;
  @Input('isLast') isLast: boolean = false;
  
}
