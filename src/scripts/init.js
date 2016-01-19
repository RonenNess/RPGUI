/**
* init rpgui.
* this is the first file included in the compiled js.
*/

// rpgui global namespace
var RPGUI = RPGUI || {};

// lib version
RPGUI.version = 1.04;

// author
RPGUI.author = "Ronen Ness";

// if true, will init rpgui as soon as page loads
// if you set to false you need to call RPGUI.init(); yourself.
RPGUI.init_on_load = true;
window.addEventListener("load", function()
{
	if (RPGUI.init_on_load) {RPGUI.init();}
});

// init RPGUI and everything related
RPGUI.init = function()
{
	if (RPGUI._was_init) {throw "RPGUI was already init!";}
	for (var i = 0; i < RPGUI.__init_list.length; ++i)
	{
		RPGUI.__init_list[i]();
	}
	RPGUI._was_init = true;
}

// list of functions to run as part of the init process
RPGUI.__init_list = [];

// add a function to be called as part of the init process.
// note: order is preserve. you may use this function to init things after RPGUI is fully loaded, since
// all RPGUI will have its init functions during the inclusion of the script.
RPGUI.on_load = function(callback)
{
	// if was already init call immediately
	if (RPGUI._was_init) {callback();}
	
	// add to init list
	RPGUI.__init_list.push(callback);
}