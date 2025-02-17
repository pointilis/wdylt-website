import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatIcon,
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteConfirmationComponent>);
  
  onDialogClose(action: string) {
    this.dialogRef.close(action);
  }

}
