import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'content-text',
  imports: [
    MatCardModule,
    MatCard,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './content-text.component.html',
  styleUrl: './content-text.component.scss'
})
export class ContentTextComponent {

  sanitizer = inject(DomSanitizer);

  @Input('content') content!: any;
  @Input('isLast') isLast: boolean = false;

  presentHTMLContent(content: any) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  
}
