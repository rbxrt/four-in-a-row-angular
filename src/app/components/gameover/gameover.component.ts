import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent {

  winner$: Observable<string>;

  constructor(public dialogRef: MatDialogRef<GameoverComponent>,
    private store: Store<{ activePlayer: number }>,
  ) { 
    this.winner$ = store.select('activePlayer').pipe(map(p => p % 2 === 0 ? "RED" : "YELLOW"));
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

}
