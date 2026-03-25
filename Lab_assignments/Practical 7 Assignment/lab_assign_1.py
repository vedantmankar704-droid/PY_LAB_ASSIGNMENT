# Functions

def add(a, b):
    return a + b

def sub(a, b):
    return a - b

def mul(a, b):
    return a * b

def div(a, b):
    return a / b

def mod(a, b):
    return a % b


# Menu
while True:
    print("\n1. Addition")
    print("2. Subtraction")
    print("3. Multiplication")
    print("4. Division")
    print("5. Modulus")
    print("6. Exit")

    choice = int(input("Enter choice: "))

    if choice == 6:
        break

    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))

    if choice == 1:
        print("Answer:", add(a, b))
    elif choice == 2:
        print("Answer:", sub(a, b))
    elif choice == 3:
        print("Answer:", mul(a, b))
    elif choice == 4:
        print("Answer:", div(a, b))
    elif choice == 5:
        print("Answer:", mod(a, b))
    else:
        print("Invalid Choice")