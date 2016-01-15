/**
* Used to provide unified, easy javascript access to customized elements.
*/


// different callbacks for different methods and types
RPGUI.__update_funcs = {};
RPGUI.__create_funcs = {};
RPGUI.__get_funcs = {}
RPGUI.__set_funcs = {};

// create a customized rpgui element ("list", "dropbox", etc.)
// note: this function expect the original html element.
RPGUI.create = function(element, rpgui_type)
{
    // call the creation func and set type
    if (RPGUI.__create_funcs[rpgui_type])
    {
        element.dataset['rpguitype'] = rpgui_type;
        RPGUI.__create_funcs[rpgui_type](element);
    }
    // not a valid type? exception.
    else
    {
        throw "Not a valid rpgui type! options: " + Object.keys(RPGUI.__create_funcs);
    }
}

// update an element after you changed it manually via javascript.
// note: this function expect the original html element.
RPGUI.update = function(element)
{
    // if have update callback for this type, use it
    var type = element.dataset['rpguitype']
    if (RPGUI.__update_funcs[type])
    {
        RPGUI.__update_funcs[type](element);
    }
    // if not, use the default (firing update event)
    else
    {
        RPGUI.fire_event(element, "change");
    }
}


// set & update the value of an element.
// note: this function expect the original html element.
RPGUI.set_value = function(element, value)
{
    // if have set value callback for this type, use it
    var type = element.dataset['rpguitype'];
    if (RPGUI.__set_funcs[type])
    {
        RPGUI.__set_funcs[type](element, value);
    }
    // if not, use the default (setting "value" member)
    else
    {
        element.value = value;
    }

    // trigger update
    RPGUI.update(element);
}



// get the value of an element.
// note: this function expect the original html element.
RPGUI.get_value = function(element)
{
    // if have get value callback for this type, use it
    var type = element.dataset['rpguitype'];
    if (RPGUI.__get_funcs[type])
    {
        return RPGUI.__get_funcs[type](element);
    }
    // if not, use the default (getting the "value" member)
    else
    {
        return element.value;
    }
}