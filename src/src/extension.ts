import * as vscode from 'vscode';

import data from './cunit/cunit.json';

export function activate(context: vscode.ExtensionContext) {
	type Key = keyof typeof data;
	let key: Key;

	vscode.languages.registerHoverProvider('epscript', {
		provideHover(document, position) {
			const range = document.getWordRangeAtPosition(position);
			const word = document.getText(range);

			for (key in data) {
				if (word === key) {
					let num: number = +key;
					num = num % 4;
					return new vscode.Hover(new vscode.MarkdownString(
						'# ' + data[key].prefix + '(value * ' + Math.pow(256, num) + ')' + '\n --- \n' + data[key].description,
						false
					));
				}
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}