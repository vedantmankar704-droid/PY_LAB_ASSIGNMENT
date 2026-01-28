name = input("Enter Employee Name: ")
empId = int(input("Enter Employee ID: "))
department = input("Enter Department: ")
basicSalary = float(input("Enter Basic Salary: "))
da = 0.92 * basicSalary
hra = 0.58 * basicSalary
ta = 0.30 * basicSalary
grossSalary = basicSalary + da + hra + ta
netSalary = grossSalary - 500
print("Employee Name:", name)
print("Employee ID:", empId)
print("Department:", department)
print("Net Salary:", netSalary)
