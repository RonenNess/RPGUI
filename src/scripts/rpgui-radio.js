/**
* This script generate the rpgui radio class.
* This will replace automatically every <input> element that has the "rpgui-radio" class.
*/


// class name we will convert to special radio
var _radio_class = "rpgui-radio";

// create a rpgui-radio from a given element.
// note: element must be <input> of type "radio" for this to work properly.
RPGUI.__create_funcs["radio"] = function(element)
{
	RPGUI.add_class(element, _radio_class);
	create_radio(element);
};

// set function to set value of the radio
RPGUI.__set_funcs["radio"] = function(elem, value)
{
	elem.checked = value;
};

// set function to get value of the radio button
RPGUI.__get_funcs["radio"] = function(elem)
{
	return elem.checked;
};

// init all radio elements on page load
RPGUI.on_load(function()
{
	// get all the input elements we need to upgrade
	var elems = document.getElementsByClassName(_radio_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "radio");
	}
});

// upgrade a single "input" element to the beautiful radio class
function create_radio(elem)
{
	// get next sibling, assuming its the radio label.
	// this object will be turned into the new radio.
	var new_radio = elem.nextSibling;

	// validate
	if (!new_radio || new_radio.tagName !== "LABEL")
	{
		throw "After a '" + _radio_class + "' there must be a label!";
	}

	// copy all event listeners and events
	RPGUI.copy_event_listeners(elem, new_radio);

	// do the click event for the new radio
	(function(elem, new_radio)
	{
		new_radio.addEventListener("click", function()
		{
			if (!elem.disabled)
			{
				RPGUI.set_value(elem, true);
			}
		});
	})(elem, new_radio);
}
