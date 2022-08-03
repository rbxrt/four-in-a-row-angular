import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent {

  constructor(public dialogRef: MatDialogRef<GameoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { winner: string },
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
