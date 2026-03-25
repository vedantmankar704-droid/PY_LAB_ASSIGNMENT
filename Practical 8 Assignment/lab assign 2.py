source = input()
destination = input()

f1 = open(source, "r")
lines = f1.readlines()
f1.close()

f2 = open(destination, "w")

for line in lines:
    line = line.strip()
    if line.startswith("#") or line == "":
        continue
    f2.write(line + "\n")

f2.close()

f3 = open(source, "r")
print(f3.read())
f3.close()

f4 = open(destination, "r")
print(f4.read())
f4.close()