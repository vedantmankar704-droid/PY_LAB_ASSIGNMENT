source = input()
destination = input()

f1 = open(source, "r")
data = f1.read()
f1.close()

f2 = open(destination, "w")
f2.write(data.upper())
f2.close()

f3 = open(destination, "r")
print(f3.read())
f3.close()