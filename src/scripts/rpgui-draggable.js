/**
* This script add the dragging functionality to all elements with "rpgui-draggable" class.
*/


// element currently dragged
var _curr_dragged = null;
var _curr_dragged_point = null;
var _dragged_z = 1000;

// class name we consider as draggable
var _draggable_class = "rpgui-draggable";

// set element as draggable
// note: this also add the "rpgui-draggable" css class to the element.
RPGUI.__create_funcs["draggable"] = function(element)
{
	// prevent forms of default dragging on this element
	element.draggable = false;
	element.ondragstart = function() {return false;}

	// add the mouse down event listener
	RPGUI.add_class(element, _draggable_class);
	element.addEventListener('mousedown', mouseDown);
};

// init all draggable elements (objects with "rpgui-draggable" class)
RPGUI.on_load(function()
{
	// init all draggable elements
	var elems = document.getElementsByClassName(_draggable_class);
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "draggable");
	}

	// add mouseup event on window to stop dragging
	window.addEventListener('mouseup', mouseUp);
});

// stop drag
function mouseUp(e)
{
	_curr_dragged = null;
	window.removeEventListener('mousemove', divMove);
}

// start drag
function mouseDown(e){

	// set dragged object and make sure its really draggable
	var target = e.target || e.srcElement;
	if (!RPGUI.has_class(target, _draggable_class)) {return;}
		
	_curr_dragged = target;
	
	// set holding point
	var rect = _curr_dragged.getBoundingClientRect();
	_curr_dragged_point = {x: rect.left-e.clientX, y: rect.top-e.clientY};

	// add z-index to top this element
	target.style.zIndex = _dragged_z++;
	
	// begin dragging
	window.addEventListener('mousemove', divMove, true);

}

// dragging
function divMove(e){
	if (_curr_dragged)
	{
		_curr_dragged.style.position = 'absolute';
		_curr_dragged.style.left = (e.clientX + _curr_dragged_point.x) + 'px';
		_curr_dragged.style.top = (e.clientY + _curr_dragged_point.y) + 'px';
	}
}
