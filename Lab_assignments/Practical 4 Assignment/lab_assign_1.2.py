import numpy as np

a = np.random.randint(1,10,(3,3))
b = np.random.randint(1,10,(3,3))

print("Matrix A")
print(a)

print("Matrix B")
print(b)

print("Addition")
print(a+b)

print("Multiplication")
print(np.dot(a,b))