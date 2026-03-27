import matplotlib.pyplot as plt

months = [1,2,3,4,5,6,7,8,9,10,11,12]
profit = [100,120,130,90,150,170,160,180,200,210,190,220]

plt.plot(months, profit)
plt.show()

facecream = [50,60,70,65,80,90,85,95,100,110,105,115]
facewash = [40,50,60,55,70,80,75,85,90,95,100,105]

plt.plot(months, facecream)
plt.plot(months, facewash)
plt.show()

plt.bar(months, facecream)
plt.show()

products = ['Facecream','Facewash','Toothpaste','Bathsoap']
sales = [sum(facecream), sum(facewash), 500, 600]

plt.pie(sales, labels=products)
plt.show()