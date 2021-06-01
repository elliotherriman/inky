const { renderer } = require("../helpers.js");

const electron = require('electron');
const ipc = electron.ipcRenderer;
const EditorView = require(renderer + "editorView.js").EditorView;

const ContextMenu = require(renderer + "contextmenu.js");

var player = "ch-pl";
var them = "ch-them";

var TokenIterator = ace.require("ace/token_iterator").TokenIterator;

const charTest = /ch-\S+/;

const taggable = [
	"choice", 
	"text",
	"gather.innerContent",
	"logic.inline.innerContent",
	"logic.sequence.innerContent",
	"logic.multiline.innerContent",
	"glue"
];

const conditionalOnPrefix = {
	"logic.punctuation" : ["logic.inline", "logic.sequence.punctuation"].concat(taggable),
	"choice.weaveBracket" : ["logic.punctuation", "choice.weaveInsideBrackets"].concat(taggable)
}

const rewindPast = [
	"tag", 
	"tag.innercontent",
	"punctuation.definition.comment.json", 
	"comment.line.double-slash.js",
	"comment.block.json",
	"comment.block.documentation.json",
]

ipc.on("dialogue-tagger", (event, selection) => 
{
    EditorView.saveCursorPos();
	
	let editor = ace.edit("editor");

	var stream = new TokenIterator(editor.session, 0, 0);
		
	if (!selection)
	{
		var start = 0;
		var end = editor.session.getLength();
	}
	else
	{
		let range = editor.selection.getRange();
		var start = range.start.row;
		var end = range.end.row;
	}

	var lines = ace.edit("editor").getValue().split("\n");	

    for (var i = start; i < end; i++)
    {   		
		let tokens = editor.session.getTokens(i);

		for (var j = tokens.length - 1; j >= 0; j--)
		{
			console.log(tokens[j]);
			let value = tokens[j].value.trim();

			console.log(tokens[j].type, charTest.test(value))
			if (tokens[j].type == "tag.innerContent")
			{
				if (charTest.test(value))
				{
					tokens[j].value = "";
					tokens[j-1].value = "";
					j -= 1;
				}
			}

			if (rewindPast.includes(tokens[j].type)) continue;

			if (value) break;
		}

		if (j >= 0) 
		{
			if (taggable.includes(tokens[j].type) || 
				(j > 0 && conditionalOnPrefix[tokens[j].type] && tokens[j-1].value.trim()
					&& conditionalOnPrefix[tokens[j].type].includes(tokens[j-1].type)))
			{
				let tag = " #"
				if (tokens.map((token) => token.type).includes("choice")) tag += player;
				else tag += them;
				
				tokens[j].value = tokens[j].value.trimEnd() + tag;
			}
		}
		
		lines[i] = tokens.map((token) => token.value).join("");
    };

	ace.edit("editor").setValue(lines.join("\n"));

	EditorView.restoreCursorPos();
});

ContextMenu.modify((template) => {
	template.push(
		{
			label: "Tag Dialogue",
			submenu:
			[
			{
				label: "Tag Everything",
				click(item, window)
				{
					window.webContents.send("char-tagger", false)
				}
			},	
			{
				label: "Tag Selection",
				click: function(item, window)
				{
					window.webContents.send("char-tagger", true)
				}		
			}				
			]
		}
	);
});