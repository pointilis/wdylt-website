import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'content-audio',
  imports: [
    MatCardModule,
    MatCard,
    MatButtonModule,
    MatIconModule,
    MatIcon,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './content-audio.component.html',
  styleUrl: './content-audio.component.scss'
})
export class ContentAudioComponent {

  sanitizer = inject(DomSanitizer);
  
  @Input('content') content!: any;
  @Input('isLast') isLast: boolean = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  presentHTMLContent(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  onDeleteHandler(content: any) {
    this.onDelete.emit(content);
  }
  
}
