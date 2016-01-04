/**
* Init rpgui content and what's inside.
*/

// init all the rpgui containers and their children
RPGUI.on_load(function()
{
	// get all containers and iterate them
	var contents = document.getElementsByClassName("rpgui-content");
	for (var i = 0; i < contents.length; ++i)
	{
		// get current container and init it
		var content = contents[i];

		// prevent dragging
		RPGUI.prevent_drag(content);

		// set default cursor
		RPGUI.set_cursor(content, "default");
	}
});
