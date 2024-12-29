export const IGNORE_ARR = [
  '.vscode',
];
export const EXTENSION_NAME = 'fileLocker';
// export const SETTINGS_PATH = 'settings.json';
export const SETTINGS_PATH = 'settings.json';
export const WORKSPACE_DIR = '.vscode';
export const WORKSPACE_CONFIG = 'files';
export const WORKSPACE_CONFIG_KEY = 'readonlyInclude';
export const WORKSPACE_FULL_CONFIG = `${WORKSPACE_CONFIG}.${WORKSPACE_CONFIG_KEY}`;
export const EXTENSION_COMMAND = 'fileLocker.toggleLock';
export const STATE_KEY = 'fileLocker.state';
export const NOTIFICATION_TIMEOUT = 2000;
// export const RELOAD_STATE = (function () {
//   let on: (true | false | undefined) = undefined;
//   let count = 0;
//   return function () {
//     count++;
//     if (on === undefined) {
//       on = true;
//       return true;
//     }
//     on = true;
//     return count;
//   };
// }());
