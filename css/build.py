import os
out = open("../rpgui.css", "w")
for i in os.walk("."):

        # make sure imports are first (have to be first)
        i[2].remove("imports.css")
        i[2].insert(0, "imports.css")

        # compile files
	for file in i[2]:
		if file.endswith(".css"):
			with open(file, "r") as input:
                            out.write("\r\n\r\n/* " + file + " */\r\n\r\n")
                            out.write(input.read())
out.close()

