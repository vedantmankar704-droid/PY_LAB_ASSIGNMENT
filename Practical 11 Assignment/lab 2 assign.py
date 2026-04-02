import matplotlib.pyplot as plt

companies = ['Microsoft','Google','Amazon','IBM','Deloitte','Capgemini','TCS','Amdocs']
recruitments = [120,150,180,100,90,110,130,95]

plt.bar(companies, recruitments)
plt.show()

plt.pie(recruitments, labels=companies)
plt.show()

plt.pie(recruitments, labels=companies, autopct='%1.1f%%')
plt.show()

plt.pie(recruitments, labels=companies, wedgeprops={'width':0.4})
plt.show()

ibm = 100
amdocs = 95

plt.bar(['IBM','Amdocs'], [ibm, amdocs])
plt.show()