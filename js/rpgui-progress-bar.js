/**
 * This script generate the rpgui progress-bar class.
 * This will replace automatically every <div> element that has the "rpgui-progress" class.
 */


// class name we will convert to special progress
var _progress_class = "rpgui-progress";

// create a rpgui-progress from a given element.
// note: element must be <input> of type "range" for this to work properly.
RPGUI.__create_funcs["progress"] = function(element)
{
	RPGUI.add_class(element, _progress_class);
	create_progress(element);
};

// set function to set value of the progress bar
// value should be in range of 0 - 1.0
RPGUI.__set_funcs["progress"] = function(elem, value)
{
	// get trackbar and progress bar elements
	var track = RPGUI.get_child_with_class(elem, "rpgui-progress-track");
	var progress = RPGUI.get_child_with_class(track, "rpgui-progress-fill");

	// get the two edges
	var edge_left = RPGUI.get_child_with_class(elem, "rpgui-progress-left-edge");
	var edge_right = RPGUI.get_child_with_class(elem, "rpgui-progress-right-edge");

	// set progress width
	progress.style.left = "0px";
	progress.style.width = (value * 100) + "%";
};

// init all progress elements on page load
RPGUI.on_load(function()
{
	// get all the select elements we need to upgrade
	var elems = document.getElementsByClassName(_progress_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "progress");
	}
});

// upgrade a single "input" element to the beautiful progress class
function create_progress(elem)
{
	// create the containing div for the new progress
	progress_container = elem;

	// insert the progress container
	RPGUI.insert_after(progress_container, elem);

	// create progress parts (edges, track, thumb)

	// track
	var track = RPGUI.create_element("div");
	RPGUI.add_class(track, "rpgui-progress-track");
	progress_container.appendChild(track);

	// left edge
	var left_edge = RPGUI.create_element("div");
	RPGUI.add_class(left_edge, "rpgui-progress-left-edge");
	progress_container.appendChild(left_edge);

	// right edge
	var right_edge = RPGUI.create_element("div");
	RPGUI.add_class(right_edge, "rpgui-progress-right-edge");
	progress_container.appendChild(right_edge);

	// the progress itself
	var progress = RPGUI.create_element("div");
	RPGUI.add_class(progress, "rpgui-progress-fill");
	track.appendChild(progress);

	// set color
	if (RPGUI.has_class(elem, "blue")) {progress.className += " blue";}
	if (RPGUI.has_class(elem, "red")) {progress.className += " red";}
	if (RPGUI.has_class(elem, "green")) {progress.className += " green";}

	// set starting default value
	var starting_val = elem.dataset.value !== undefined ? parseFloat(elem.dataset.value) : 1;
	RPGUI.set_value(elem, starting_val);
}
