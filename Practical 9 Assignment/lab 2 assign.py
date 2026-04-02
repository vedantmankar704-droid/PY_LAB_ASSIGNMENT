class Book:
    def __init__(self, title):
        self.title = title
        self.available = True


class Member:
    def __init__(self, name):
        self.name = name


class Library:
    def __init__(self):
        self.books = []

    def add_book(self, title):
        self.books.append(Book(title))

    def lend_book(self, title):
        for b in self.books:
            if b.title == title and b.available:
                b.available = False
                print("Lent")
                return
        print("Not Available")

    def return_book(self, title):
        for b in self.books:
            if b.title == title:
                b.available = True
                print("Returned")
                return

    def display(self):
        for b in self.books:
            print(b.title, b.available)


lib = Library()

while True:
    print("1 Add 2 Lend 3 Return 4 Display 5 Exit")
    ch = int(input())

    if ch == 1:
        t = input()
        lib.add_book(t)
    elif ch == 2:
        t = input()
        lib.lend_book(t)
    elif ch == 3:
        t = input()
        lib.return_book(t)
    elif ch == 4:
        lib.display()
    elif ch == 5:
        break