import { DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'content-text',
  imports: [
    MatCardModule,
    MatCard,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './content-text.component.html',
  styleUrl: './content-text.component.scss'
})
export class ContentTextComponent {

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
