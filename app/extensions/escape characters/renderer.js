const { renderer } = require("../helpers.js");

const electron = require('electron');
const ipc = electron.ipcRenderer;
const EditorView = require(renderer + "editorView.js").EditorView;

const ContextMenu = require(renderer + "contextmenu.js");

var TokenIterator = ace.require("ace/token_iterator").TokenIterator;

ipc.on("escape-characters", (event) => 
{
	let editor = ace.edit("editor");
	
	let range = editor.selection.getRange();
	var start = range.start.row;
	var end = range.end.row;
	
	if (start == range) return;
	
	EditorView.saveCursorPos();

	var stream = new TokenIterator(editor.session, 0, 0);

	var lines = ace.edit("editor").getValue().split("\n");	

    for (var i = start; i < end; i++)
    {   		
		if (lines[i].trim())
		{
			lines[i] = lines[i].replace(/([^\s\w\d])/gi, "\\\$1")	
		}
	};

	ace.edit("editor").setValue(lines.join("\n"));

	EditorView.restoreCursorPos();
});

ContextMenu.modify((template) => {
	template.push(
		{
			label: "Escape Characters",
			click(item, window)
			{
				window.webContents.send("escape-characters")
			}
		}
	);
});