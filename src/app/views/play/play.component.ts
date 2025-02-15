import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameoverComponent } from '@components/gameover/gameover.component';
import { Store } from '@ngrx/store';
import { BoardService, FieldProps } from '@services/board.service';
import { resetGame } from '@store/gameState.action';
import { AppState, selectIsGameover } from '@store/store.selectors';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, firstValueFrom } from 'rxjs';
import { ColorEnum } from 'types';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
  providers: [DialogService],
})
export class PlayComponent implements OnInit, OnDestroy {
  private dialog = inject(DialogService);
  private destroyRef = inject(DestroyRef);
  private boardService = inject(BoardService);
  private store = inject<Store<AppState>>(Store);

  board: FieldProps[][] | undefined;
  ref: DynamicDialogRef<GameoverComponent> | undefined;
  ColorEnum = ColorEnum;

  ngOnInit(): void {
    this.store.select(selectIsGameover)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((s) => {
        if(s) {
          this.openDialog()
        } else {
          this.board = this.boardService.initialize();
        }
      });
  }

  ngOnDestroy() {
    this.ref?.close();
  }

  openDialog() {
    this.ref = this.dialog.open(GameoverComponent, {
      header: 'Gameover!',
      width: '40rem',
      modal: true,
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.onReset();
      }
    });
  }

  async addToken(i: number) {
    if (await firstValueFrom(this.store.select(selectIsGameover))) {
      return;
    }
    this.boardService.addToBoard(i);
  }

  onReset() {
    this.store.dispatch(resetGame());
  }
}
