class Employee:
    def __init__(self, name, age, salary, address):
        self.name = name
        self.age = age
        self.salary = salary
        self.address = address

    def display(self):
        print(self.name, self.age, self.salary, self.address)


class Manager(Employee):
    pass


managers = []

for i in range(10):
    name = input()
    age = int(input())
    salary = float(input())
    address = input()
    m = Manager(name, age, salary, address)
    managers.append(m)

for m in managers:
    m.display()