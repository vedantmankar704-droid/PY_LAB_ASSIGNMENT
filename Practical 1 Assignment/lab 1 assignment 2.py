name = input("Enter vendor name: ")
year = int(input("Enter year of association: "))
contact = input("Enter contact number: ")
email = input("Enter email id: ")
total = 0
print("Enter monthly purchase amount")

for i in range(12):
    amt = float(input())
    total = total + amt

print("Name:", name)
print("Year of association:", year)
print("Contact number:", contact)
print("Email id:", email)
print("Annual purchase amount:", total)
