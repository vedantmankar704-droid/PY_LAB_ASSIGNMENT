import numpy as np

print("Enter 5x3 matrix")
m1 = []
for i in range(5):
    row = list(map(int,input().split()))
    m1.append(row)

print("Enter 3x2 matrix")
m2 = []
for i in range(3):
    row = list(map(int,input().split()))
    m2.append(row)

m1 = np.array(m1)
m2 = np.array(m2)

result = np.dot(m1,m2)

print("Product Matrix")
print(result)