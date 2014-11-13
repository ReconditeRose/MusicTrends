#!/usr/bin/python
import sys
import string
import os

print "** Making Directory **"
os.system("hadoop fs -rmr /tmp/project_data")
os.system("hadoop fs -mkdir /tmp/project_data")

keyArray = []

lLetters = string.lowercase
uLetters = string.uppercase


if "All" in sys.argv:
	keyArray = []
	i = 0
	for l in lLetters:
		for u in uLetters:
			if(i <10):
				keyArray.append("{0}.tsv.{1}".format(u,l))
				i+=1
else:
	keyArray.append("A.tsv.a")

for i in keyArray:

	getCommand ="wget http://tbmmsd.s3.amazonaws.com/{0}".format(i)
	putCommand = "hadoop fs -put {0} /tmp/project_data".format(i)
	deleteCommand = "rm {0} -f".format(i)

	if "Debug" in sys.argv:
		print(getCommand)
		print(putCommand)
		print(deleteCommand)
	else:
		os.system(getCommand)
		os.system(putCommand)
		os.system(deleteCommand)
