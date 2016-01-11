/**
* Some helpers and utils.
*/


// create and return html element for rpgui internal mechanisms
// element is string, element type (like "div" or "p")
RPGUI.create_element = function(element)
{
    // create element
    element = document.createElement(element);

    // return element
    return element;
};

// set cursor for given element
// element is element to set.
// cursor is string, what cursor to use (default / point / .. see cursor.css for more info ).
RPGUI.set_cursor = function(element, cursor)
{
    RPGUI.add_class(element, "rpgui-cursor-" + cursor);
};

// prevent element dragging
RPGUI.prevent_drag = function(element)
{
    /*
    // this code was removed because I found a cross-browser way to cover it all via css.
    element.draggable=false;
    element.ondrop=function(){return false;}
    element.ondragstart=function(){return false;}
    */
};

// copy the style of one element into another
RPGUI.copy_css = function(from, to)
{
    to.style.cssText = from.style.cssText;
};

// check if element have class
RPGUI.has_class = function(element, cls)
{
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

// add class to element (but only if don't already have it)
RPGUI.add_class = function(element, cls)
{
    if (!RPGUI.has_class(element, cls))
    {
        element.className += " " + cls;
    }
};

// get child element with classname
RPGUI.get_child_with_class = function(elem, cls)
{
    for (var i = 0; i < elem.childNodes.length; i++)
    {
        if (RPGUI.has_class(elem.childNodes[i], cls))
        {
          return elem.childNodes[i];
        }
    }
};

// remove a class from an element
RPGUI.remove_class = function(element, cls)
{
    element.className = (' ' + element.className + ' ').replace(cls, "");
    element.className = element.className.substring(1, element.className.length-1);
};

// fire event from element
// type should be string like "change", "click", "mouseup", etc.
RPGUI.fire_event = function(element, type)
{
    // firing the event properly according to StackOverflow
    // http://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(type, false, true);
        element.dispatchEvent(evt);
    }
    else {
        element.fireEvent("on" + type);
    }
};

// copy all event listeners from one element to the other
RPGUI.copy_event_listeners = function(from, to)
{
    // copy all event listeners
    if (typeof getEventListeners == "function")
    {
        var events = getEventListeners(from);
        for(var p in events) {
            events[p].forEach(function(ev) {
                // {listener: Function, useCapture: Boolean}
                to.addEventListener(p, ev.listener, ev.useCapture);
            });
        }
    }

    // now copy all attributes that start with "on"
    for (attr in from)
    {
        if (attr.indexOf("on") === 0)
        {
            to[attr] = from[attr];
        }
    }
};

// insert one html element after another given element
RPGUI.insert_after = function(to_insert, after_element)
{
    after_element.parentNode.insertBefore(to_insert, after_element.nextSibling);
};