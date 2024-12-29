import * as vscode from 'vscode';
import * as path from 'path';

import {
  STATE_KEY
} from '../constants';

export interface FileLockerState {
  readonlyFiles: Record<string, boolean>;
}

export class StateManager {
  // private static instance: StateManager;
  // private globalState: vscode.Memento;
  private workspaceState: vscode.Memento;
  private readonly stateKey = STATE_KEY;

  constructor(context: vscode.ExtensionContext) {
    // this.globalState = context.globalState;
    this.workspaceState = context.workspaceState;
  }

  async getState(): Promise<FileLockerState> {
    return this.workspaceState.get<FileLockerState>(this.stateKey, { readonlyFiles: {} });
  }

  async updateState(state: FileLockerState): Promise<void> {
    await this.workspaceState.update(this.stateKey, state);
  }

  async clearState(): Promise<void> {
    await this.workspaceState.update(this.stateKey, { readonlyFiles: {} });
  }

  async toggleReadonly(uri: vscode.Uri): Promise<boolean> {
    const state = await this.getState();
    const key = uri.fsPath;

    state.readonlyFiles[key] = !state.readonlyFiles[key];
    await this.updateState(state);

    return state.readonlyFiles[key];
  }
}
