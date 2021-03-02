import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipes-frontend-public';

  updateAvailable = false;

  constructor(
    private updates: SwUpdate,
    private snackBar: MatSnackBar,
  ) {
    this.checkUpdates();
  }

  checkUpdates() {
    if (!this.updates.isEnabled) {
      return;
    }
    this.updates.available.subscribe(event => {
      this.openSnackBar();
    });
  }

  openSnackBar() {
    const snackBarRef = this.snackBar.open(
      "Доступно обновление!",
      "Обновить",
      { duration: 10000 }
    );

    snackBarRef.onAction().subscribe(
      () => { this.updates.activateUpdate().then(() => document.location.reload()) }
    )
  }
}
