import os
os.chdir("css")
os.system("python build.py")
os.chdir("..")
os.chdir("js")
os.system("python build.py")
os.chdir("..")
