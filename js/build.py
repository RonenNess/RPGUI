import os
out = open("../rpgui.js", "w")
for i in os.walk("."):

	# make sure global_methods are first (have to be first)
        i[2].remove("global_methods.js")
        i[2].insert(0, "global_methods.js")

	for file in i[2]:
		if file.endswith(".js"):
			with open(file, "r") as input:
                            out.write("\r\n\r\n// " + file + "\r\n\r\n")
                            out.write(input.read())
out.close()

