var storyContainer = document.querySelector('#story');
var outerScrollContainer = document.querySelector('.outerContainer');

function addText(text)
{
	var paragraphElement = document.createElement('p');			
	paragraphElement.innerHTML = text;
	paragraphElement.classList.add("storyText");
    storyContainer.appendChild(paragraphElement);
}

// handle tags 
function addTags(tags)
{
    var tagsStr = tags.join(", ");
    var $tags = $(`<p class='tags'># ${tagsStr}</p>`);

    $textBuffer.append($tags);
}

// handle choices
function addChoice(choice, callback)
{
	var choiceParagraphElement = document.createElement('p');
	choiceParagraphElement.classList.add("choice");
    // Append the choice
	choiceParagraphElement.innerHTML = "<a href='#'>"+choice.text+"</a>"
    storyContainer.appendChild(choiceParagraphElement);

    // When this choice is clicked...
	var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
	choiceAnchorEl.addEventListener("click", function(event) 
	{			
		choiceAnchorEl.removeEventListener('click',arguments.callee,false);
		// Don't follow <a> link
		event.preventDefault();

		// Tell the story where to go next
		callback(choice.index);
		// Remove all existing choices
// 		removeAll("p.choice", continueStory(firstTime));
	});
}

// -----------------------------------
// Event Functions
// -----------------------------------

// functions called once certain events are triggered
// story is finished, or waiting for input : onEndOfPassage();
// story restarted or recompiled : onStoryRestarted();
// story restarted and onReplayComplete();

// called once the story has run out of new content to progress,
// either by reaching a choice, or by reaching the end of the story
function onEndOfPassage() 
{

    var $scrollContainer = $("#player .scrollContainer");
    $scrollContainer.stop();

    // Need to save these ones because we are reseting height, so these are lost
    var savedScrollTop = $scrollContainer.scrollTop();
    var prevHeight = $textBuffer.height();

    // Need to reset first, otherwise ($textBuffer[0].scrollHeight) is always not less than $textBuffer.height() and it only expands (bad when story has huge list of choises)
    $textBuffer.height(0);
    var newHeight = $textBuffer[0].scrollHeight;

    // Expand to fit or keep same (we will shrink it later, after animating scroll, this way scroll animation is prettier)
    if( prevHeight < newHeight )
	{
        $textBuffer.height(newHeight);
    } 
    else 
    {
        $textBuffer.height(prevHeight);
    }

    // Scroll?
    if( shouldAnimate() )
	{
        
        var offset = newHeight + 60 - $scrollContainer.outerHeight(); // +60 because: ("#player .innerText { padding: 10px 0 50px 0; }")

        // Need to set previous, as it was reset when we reset height
        $scrollContainer.animate({scrollTop: savedScrollTop}, 0);

        $scrollContainer.animate(
        {
            scrollTop: (offset)
        }, 500, function()
        {
            // Shrink, if needed
            if( prevHeight > newHeight )
			{
                $textBuffer.height(newHeight);
            }
        });

    }
}

// called after story is restarted 
// or after your story is edited and recompiled, via inky
function onStoryRestart() 
{

    $textBuffer = $("#player .hiddenBuffer .innerText");
    $textBuffer.text("");
    $textBuffer.height(0);
}

// called after inky recompiles the story, if 
function onReplayComplete() 
{

	// somewhat seamlessly update content without flickering by
	// appending new content to a hidden div, and then swapping
	// it with the visible one. 

    var $player = $("#player");

    var $hiddenContainer = $player.find(".hiddenBuffer");
    var $hidden = $hiddenContainer.find(".innerText");

    var $active = $("#player .innerText.active");

	// Swap buffers
	$active.removeClass ("active");
	$hiddenContainer.append($active);
	$hidden.insertBefore($hiddenContainer);
	$hidden.addClass("active");

	// Also make this the active buffer
	$textBuffer = $hidden;
}

