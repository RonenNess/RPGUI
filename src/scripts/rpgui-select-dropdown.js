/**
* This script generate the rpgui dropdown <select>.
* This will replace automatically every <select> element that has the "rpgui-dropdown" class.
*/


// class name we will convert to dropdown
var _dropdown_class = "rpgui-dropdown";

// create a rpgui-dropdown from a given element.
// note: element must be <select> with <option> tags that will turn into the items
RPGUI.__create_funcs["dropdown"] = function(element)
{
	RPGUI.add_class(element, _dropdown_class);
	create_dropdown(element);
};

// init all dropdown elements on page load
RPGUI.on_load(function()
{
	// get all the select elements we need to upgrade
	var elems = document.getElementsByClassName(_dropdown_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "dropdown");
	}
});

// upgrade a single "select" element to the beautiful dropdown
function create_dropdown(elem)
{
	// prefix to add arrow down next to selection header
	var arrow_down_prefix = "<label>&#9660;</label> ";

	// create the paragraph that will display the select_header option
	var select_header = RPGUI.create_element("p");
	if (elem.id) {select_header.id = elem.id + "-rpgui-dropdown-head"};
	RPGUI.add_class(select_header, "rpgui-dropdown-imp rpgui-dropdown-imp-header");
	RPGUI.insert_after(select_header, elem);

	// create the list to hold all the options
	var list = RPGUI.create_element("ul");
	if (elem.id) {list.id = elem.id + "-rpgui-dropdown"};
	RPGUI.add_class(list, "rpgui-dropdown-imp");
	RPGUI.insert_after(list, select_header);

	// set list top to be right under the select header
	var header_rect = select_header.getBoundingClientRect();
	list.style.position = "absolute";

	// set list width (-14 is to compensate borders)
	list.style.width = (header_rect.right - header_rect.left - 14) + "px";
	list.style.display = "none";

	// now hide the original select
	elem.style.display = "none";

	// iterate over all the options in this select
	for (var i = 0; i < elem.children.length; ++ i)
	{
		// if this child is not option, skip
		var option = elem.children[i];
		if (option.tagName != "OPTION") continue;

		// add the new option as list item
		var item = RPGUI.create_element("li");
		item.innerHTML = option.innerHTML;
		list.appendChild(item);

		// copy all event listeners from original option to the new item
		RPGUI.copy_event_listeners(option, item);

		// set option callback (note: wrapped inside namespace to preserve vars)
		(function(elem, option, item, select_header, list)
		{
			// when clicking the customized option
			item.addEventListener('click', function()
			{
				// set the header html and hide the list
				select_header.innerHTML = arrow_down_prefix + option.innerHTML;
				list.style.display = "none";

				// select the option in the original selection
				option.selected = true;
				RPGUI.fire_event(elem, "change");
			});

		})(elem, option, item, select_header, list);
	}

	// now set list and header callbacks
	// create a namespace to preserve variables
	(function(elem, list, select_header)
	{
		// when clicking the selected header show / hide the options list
		select_header.onclick = function()
		{
			if (!elem.disabled)
			{
				var prev = list.style.display;
				list.style.display = prev == "none" ? "block" : "none";
			}
		}

		// when mouse leave the options list, hide it
		list.onmouseleave = function()
		{
			list.style.display = "none";
		}

	})(elem, list, select_header);

	// lastly, listen to when the original select changes and update the customized list
	(function(elem, select_header, list)
	{
		// the function to update dropdown
		_on_change = function()
		{
			// set the header html and hide the list
			if (elem.selectedIndex != -1)
			{
				select_header.innerHTML = arrow_down_prefix + elem.options[elem.selectedIndex].text;
			}
			else
			{
				select_header.innerHTML = arrow_down_prefix;
			}
			list.style.display = "none";
		}

		// register the update function and call it to set initial state
		elem.addEventListener('change', _on_change);
		_on_change();
		
	})(elem, select_header, list);
}
