// ===================================
// INKYBRIDGE.JS
// ===================================

// an API layer to communicate between inky and an ink-y html engine. 
// functions are called upon certain events in inky. to communicate
// with your code, you should fill these functions 

// -----------------------------------
// Story Functions
// -----------------------------------

// functions called once the story reaches certain content
// e.g. if a choice is reached, inky will call addChoice()
// or if regular text passage is added, it'll fire addText()

// handle text
function addText(text)
{

}

// handle tags 
function addTags(tags)
{

}

// handle choices
function addChoice(choice, callback)
{

}

// -----------------------------------
// Flow Functions
// -----------------------------------

// functions called once certain events are triggered in inky

// called once the story has run out of new content to progress,
// either by reaching a choice, or by reaching the end of the story
function onEndOfPassage() 
{

}

// called once the story has finished, by reaching -> END or a final -> DONE, 
// or just by running out of content and choices
function onStoryFinished()
{

}

// called after story is restarted 
// or after your story is edited and recompiled, via inky
function onStoryRestart() 
{

}

// after inky recompiles the story, it tries to recreate its prior 
// state by choosing the choices you took last time. this is called 
// once that's done, usually to show the new story content
function afterRecompileFinished() 
{

}



