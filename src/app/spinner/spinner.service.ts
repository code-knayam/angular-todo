import { Subject } from 'rxjs';

export class SpinnerService {

  spinnerFlag = new Subject<boolean>();

  showSpinner() {
    this.spinnerFlag.next(true);
  }

  hideSpinner() {
    this.spinnerFlag.next(false);
  }
}
