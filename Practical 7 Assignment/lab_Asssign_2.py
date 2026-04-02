balance = 0

def show_balance():
    print("Current Balance:", balance)

def deposit():
    global balance
    amount = int(input("Enter amount to deposit: "))
    balance = balance + amount
    print("Amount Deposited")

def withdraw():
    global balance
    amount = int(input("Enter amount to withdraw: "))
    if amount <= balance:
        balance = balance - amount
        print("Amount Withdrawn")
    else:
        print("Insufficient Balance")


while True:
    print("\n1. Show Balance")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Exit")

    choice = int(input("Enter choice: "))

    if choice == 4:
        break
    elif choice == 1:
        show_balance()
    elif choice == 2:
        deposit()
    elif choice == 3:
        withdraw()
    else:
        print("Invalid Choice")