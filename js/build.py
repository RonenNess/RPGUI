import os

# open the output file and write the first line to create the namespace
out = open("../rpgui.js", "w")
out.write("RPGUI = (function() {\r\n\r\n")

# compile all js files
for i in os.walk("."):

	# make sure init and global_methods are first (they have to be first)
        i[2].remove("global_methods.js")
        i[2].remove("init.js")
        i[2].insert(0, "global_methods.js")
        i[2].insert(0, "init.js")

	for file in i[2]:
		if file.endswith(".js"):
			with open(file, "r") as input:
                            out.write("\r\n\r\n// " + file + "\r\n\r\n")
                            out.write(input.read())

# write the closing lines and close the output file
out.write("\r\n\r\nreturn RPGUI;})();")
out.close()

