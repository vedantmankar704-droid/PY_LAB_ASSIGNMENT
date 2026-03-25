volt = float(input("Enter voltage: "))
res = float(input("Enter resistance: "))
i = volt / res
print("Current:", i)
if i < 0.5:
    print("Low current")
elif i >= 0.5 and i <= 2:
    print("Normal current")
else:
    print("High current")
