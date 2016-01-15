/**
* This script generate the rpgui slider class.
* This will replace automatically every <input> element that has the "rpgui-slider" class.
*/


// class name we will convert to special slider
var _slider_class = "rpgui-slider";

// create a rpgui-slider from a given element.
// note: element must be <input> of type "range" for this to work properly.
RPGUI.__create_funcs["slider"] = function(element)
{
	RPGUI.add_class(element, _slider_class);
	create_slider(element);
};

// init all slider elements on page load
RPGUI.on_load(function()
{
	// get all the select elements we need to upgrade
	var elems = document.getElementsByClassName(_slider_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "slider");
	}
});

// upgrade a single "input" element to the beautiful slider class
function create_slider(elem)
{
	// check if should do it golden slider
	var golden = RPGUI.has_class(elem, "golden") ? " golden" : "";

	// create the containing div for the new slider
	var slider_container = RPGUI.create_element("div");
	if (elem.id) {slider_container.id = elem.id + "-rpgui-slider"};
	RPGUI.copy_css(elem, slider_container);
	RPGUI.add_class(slider_container, "rpgui-slider-container" + golden);

	// insert the slider container
	RPGUI.insert_after(slider_container, elem);

	// set container width based on element original width
	slider_container.style.width = elem.offsetWidth + "px";

	// create slider parts (edges, track, thumb)

	// track
	var track = RPGUI.create_element("div");
	RPGUI.add_class(track, "rpgui-slider-track" + golden);
	slider_container.appendChild(track);

	// left edge
	var left_edge = RPGUI.create_element("div");
	RPGUI.add_class(left_edge, "rpgui-slider-left-edge" + golden);
	slider_container.appendChild(left_edge);

	// right edge
	var right_edge = RPGUI.create_element("div");
	RPGUI.add_class(right_edge, "rpgui-slider-right-edge" + golden);
	slider_container.appendChild(right_edge);

	// thumb (slider value show)
	var thumb = RPGUI.create_element("div");
	RPGUI.add_class(thumb, "rpgui-slider-thumb" + golden);
	slider_container.appendChild(thumb);

	// hide original slider
	elem.style.display = "none";

	// copy events from original slider to container.
	// this will handle things like click, mouse move, mouse up, etc.
	// it will not handle things like "onchange".
	RPGUI.copy_event_listeners(elem, slider_container);

	// now set events (wrap them in anonymous function to preserve local vars)
	var state = {mouse_down: false};
	(function(elem, slider_container, thumb, track, state, right_edge, left_edge)
	{
		// get the range of the original slider (min and max)
		var min = parseFloat(elem.min);
		var max = parseFloat(elem.max);

		// calculate edges width and track actual width
		var edges_width = right_edge.offsetWidth + left_edge.offsetWidth;
		var track_width = track.offsetWidth - edges_width;

		// set state if moving slider or not
		slider_container.addEventListener('mouseup', function(e)
		{
			state.mouse_down = false;
		});
		window.addEventListener('mouseup', function(e)
		{
			state.mouse_down = false;
		});
		track.addEventListener('mousedown', function(e)
		{
			state.mouse_down = true;
			slide(e.offsetX || e.layerX);
		});
		slider_container.addEventListener('mousedown', function(e)
		{
			state.mouse_down = true;
		});

		// handle clicking on edges (set to min / max)
		left_edge.addEventListener('mousedown', function(e)
		{
			set_value(min);
		});
		right_edge.addEventListener('mousedown', function(e)
		{
			set_value(max);
		});
		left_edge.addEventListener('mousemove', function(e)
		{
			if (state.mouse_down) set_value(min);
		});
		right_edge.addEventListener('mousemove', function(e)
		{
			if (state.mouse_down) set_value(max);
		});

		// handle sliding
		function slide(pos)
		{
			// calc new slider value
			var new_val = min + Math.round((pos / track_width) * (max-min)) - 1;

			// set thumb position
			set_value(new_val);
		}

		// setting value
		function set_value(new_val)
		{
			if (!elem.disabled &&
				elem.value != new_val)
			{
				RPGUI.set_value(elem, new_val);
			}
		}

		// moving the slider
		track.addEventListener('mousemove', function(e)
		{
			if (state.mouse_down && !elem.disabled)
			{
				slide(e.offsetX || e.layerX);
			}
		});


		// when original slider value change update thumb position
		elem.addEventListener("change", function(e)
		{
			_onchange();
		});
		function _onchange()
		{
			// get the range of the original slider (min and max)
			var step = track_width / (max-min);
			var relative_val = Math.round(parseFloat(elem.value) - min);
			thumb.style.left = (Math.floor(edges_width * 0.25) + (relative_val * step)) + "px";
		}

		// call "_onchange()" to init the thumb starting position
		_onchange();

	})(elem, slider_container, thumb, track, state, right_edge, left_edge);

}