import * as vscode from 'vscode';
import {
  fileChangeNotificationValue,
} from './helpers';
import {
  NOTIFICATION_TIMEOUT
} from '../constants';

export class MessageManager implements vscode.Disposable {
  subscriptions: vscode.Disposable[] = [];
  private isDisposed: boolean = false;
  private lastTime: number | null = null;
  private notiTimeout: NodeJS.Timeout | undefined;
  private currMsgRef: vscode.Disposable | undefined;

  private clearTimer() {
    if (this.notiTimeout !== undefined) {
      clearTimeout(this.notiTimeout);
      this.notiTimeout = undefined;
      this.lastTime = null;
    }
    if (this.currMsgRef !== undefined) {
      this.currMsgRef.dispose();
      this.currMsgRef = undefined;
    }
  }

  private canShowNotification(): boolean {
    if (this.lastTime === null) {
      this.lastTime = Date.now();
      return true;
    }
    if ((Date.now() - this.lastTime) > NOTIFICATION_TIMEOUT) {
      this.lastTime = Date.now();
      return true;
    }
    return false;
  }

  private handleShow(message: string): void {
    if (this.isDisposed) return;
    const msg = vscode.window.setStatusBarMessage(message);
    this.currMsgRef = msg;
    this.lastTime = Date.now();
    this.notiTimeout = setTimeout(() => {
      this.clearTimer();
    }, NOTIFICATION_TIMEOUT);
  }

  public showMessage(message: string): void {
    if (this.lastTime === null || this.canShowNotification()) this.handleShow(message);
  }

  public showUpdateMessage(diff: number): void {
    this.showMessage(fileChangeNotificationValue(diff));
  }

  public dispose() {
    this.isDisposed = true;
    if (this.currMsgRef !== undefined) {
      this.currMsgRef.dispose();
    }
    if (this.notiTimeout !== undefined) {
      clearTimeout(this.notiTimeout);
    }
    this.notiTimeout = undefined;
    this.lastTime = null;
  }
}