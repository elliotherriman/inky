const $ = window.jQuery = require('./jquery-2.2.3.min.js');

events = {}

$('#iframe').attr("src", "file://" + __dirname + "/inkyjs/index.html");
var player = $('#iframe')[0].contentWindow;


function showSessionView(sessionId)
{

}

function fadeIn($jqueryElement)
{

}

function contentReady()
{
	player.onReplayFinished();
}

function prepareForNewPlaythrough(sessionId) 
{
	player.onStoryRestart();
}

function addTextSection(text)
{
	player.onTextAdded(text);
}

function addTags(tags)
{
	player.onTagsAdded(tags);
}

function addChoice(choice, callback)
{
	player.onChoiceAdded(choice, callback);
}

function addTerminatingMessage(message, cssClass)
{

}

function addLongMessage(message, cssClass)
{

}

function addHorizontalDivider()
{

}

function addLineError(error, callback)
{

}

function addEvaluationResult(result, error)
{   

}

function previewStepBack()
{

}

exports.PlayerView = {
    setEvents: (e) => { events = e; },
    contentReady: contentReady,
    prepareForNewPlaythrough: prepareForNewPlaythrough,
    addTextSection: addTextSection,
    addTags: addTags,
    addChoice: addChoice,
    addTerminatingMessage: addTerminatingMessage,
    addLongMessage: addLongMessage,
    addHorizontalDivider: addHorizontalDivider,
    addLineError: addLineError,
    addEvaluationResult: addEvaluationResult,
    showSessionView: showSessionView,
    previewStepBack: previewStepBack
};  