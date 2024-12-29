import * as vscode from 'vscode';
import * as path from 'node:path';
import { IGNORE_ARR } from '../constants';

export const filterUriConstants = (uri: string): boolean => {
  return IGNORE_ARR.some((ignore) => uri.includes(ignore));
};

export const fileChangeNotificationValue = (diff: number): string => {
  return diff < 0 ? 'No change' : `${diff} files(s) ${['unlocked', 'locked'][+(diff > 0)]}`;
};

export const filterUriInput = (uris: vscode.Uri[]): string[] => {
  if (uris.length === 0) return [];
  return uris.map((u) => path.normalize(u.fsPath))
    .filter((u) => {
      if (u.length < 3) return false;
      if (!path.isAbsolute(u)) return false;
      if (filterUriConstants(u)) return false;
      return true;
    });
};
