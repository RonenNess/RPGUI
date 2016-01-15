/**
* This script generate the rpgui list <select>.
* This will replace automatically every <select> element that has the "rpgui-list" class.
*/


// class name we will convert to list
var _list_class = "rpgui-list";

// create a rpgui-list from a given element.
// note: element must be <select> with <option> tags that will turn into the items
RPGUI.__create_funcs["list"] = function(element)
{
	RPGUI.add_class(element, _list_class);
	create_list(element);
};

// init all list elements on page load
RPGUI.on_load(function()
{
	// get all the select elements we need to upgrade
	var elems = document.getElementsByClassName(_list_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "list");
	}
});

// upgrade a single "select" element to the beautiful list
function create_list(elem)
{
	// default list size is 3
	if (!elem.size) elem.size = 3;

	// create the list to hold all the options
	var list = RPGUI.create_element("ul");
	if (elem.id) {list.id = elem.id + "-rpgui-list"};
	RPGUI.add_class(list, "rpgui-list-imp");
	elem.parentNode.insertBefore(list, elem.nextSibling);

	// now hide the original select
	elem.style.display = "none";

	// iterate over all the options in this select
	var all_items = [];
	for (var i = 0; i < elem.children.length; ++ i)
	{
		// if this child is not option, skip
		var option = elem.children[i];
		if (option.tagName != "OPTION") continue;

		// add the new option as list item
		var item = RPGUI.create_element("li");
		item.innerHTML = option.innerHTML;
		list.appendChild(item);

		// set dataset value
		item.dataset['rpguivalue'] = option.value;

		// add to list of all items
		all_items.push(item);

		// copy all event listeners from original option to the new item
		RPGUI.copy_event_listeners(option, item);

		// set option callback (note: wrapped inside namespace to preserve vars)
		(function(elem, option, item, list, all_items)
		{
			// when clicking the customized option
			item.addEventListener('click', function()
			{
				// select the option in the original selection
				if (!elem.disabled)
				{
					option.selected = true;
					RPGUI.fire_event(elem, "change");
				}
			});

		})(elem, option, item, list, all_items);
	}

	// if got any items set list height based on the size param
	if (all_items.length && elem.size)
	{
		
		// get the actual height of a single item in list
		var height = all_items[0].offsetHeight;

		// set list height based on size
		list.style.height = (height * elem.size) + "px";
		
	}
	
	// lastly, listen to when the original select changes and update the customized list
	(function(elem, all_items)
	{
		// handle value change
		elem.addEventListener('change', function()
		{
			_on_change(this);
		});
		function _on_change(elem)
		{
			for (var i = 0; i < all_items.length; ++i)
			{
				var item = all_items[i];
				if (item.dataset['rpguivalue'] == elem.value)
				{
					RPGUI.add_class(item, "rpgui-selected");
				}
				else
				{
					RPGUI.remove_class(item, "rpgui-selected");
				}
			}
		}

		// call the on-change on init to set initial state
		_on_change(elem);

	})(elem, all_items);
}
