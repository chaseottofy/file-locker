import * as vscode from 'vscode';

import * as path from 'node:path';

import { MessageManager } from './utilities/message-manager';

import { StateManager } from './utilities/state-manager';

import { filterUriInput } from './utilities/helpers';

// import { ensureDebugSettings } from './utilities/settings';

import {
	EXTENSION_COMMAND,
	EXTENSION_NAME,
	WORKSPACE_CONFIG,
	WORKSPACE_CONFIG_KEY,
} from './constants';

export type toggledUriInput = {
	uri?: vscode.Uri;
	uris?: vscode.Uri[];
};

export function activate(context: vscode.ExtensionContext): void {
	// const stateManager = new StateManager(context);
	const messageManager = new MessageManager();
	const outputChannel = vscode.window.createOutputChannel(EXTENSION_NAME);
	const disposable = vscode.commands.registerCommand(EXTENSION_COMMAND, (
		uri?: vscode.Uri,
		uris?: vscode.Uri[],
	) => {
		const config = vscode.workspace.getConfiguration(WORKSPACE_CONFIG);
		const editr = vscode.window.activeTextEditor;
		const initCmdUri = editr ? [editr.document.uri] : [];
		const initCtxUri = uris || (uri ? [uri] : []);
		const currentUris = filterUriInput(initCmdUri.length > 0 ? initCmdUri : initCtxUri) || [];
		if (currentUris.length === 0) return false;

		const configImpl = Object.fromEntries(
			Object.entries(
				config.get<Record<string, boolean>>(WORKSPACE_CONFIG_KEY) || {}
			).map(([k]) => [path.normalize(k), true])
		);
		let cnt = 0;
		for (const curi of currentUris) {
			if (configImpl[curi]) (delete configImpl[curi]), cnt++;
			else (configImpl[curi] = true), cnt--;
		}

		config.update(
			WORKSPACE_CONFIG_KEY,
			configImpl,
			vscode.ConfigurationTarget.Workspace,
		)
			.then(() => messageManager.showUpdateMessage(cnt),
				(error) => messageManager.showMessage(`Failed to update configuration: ${error}`)
			);
	});

	outputChannel.show();
	context.subscriptions.push(
		disposable,
		outputChannel,
		messageManager,
	);
}

export async function deactivate() { }
