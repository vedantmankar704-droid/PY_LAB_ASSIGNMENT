# Store prices of sold items in tuple

prices = tuple(map(int, input("Enter prices separated by space: ").split()))

# a) Total items sold
print("Total items sold:", len(prices))

# b) Cheapest item
print("Cheapest price:", min(prices))

# c) Costliest item
print("Costliest price:", max(prices))

# d) Prices in ascending order
print("Prices in ascending order:", tuple(sorted(prices)))

# e) Number of costliest items sold
costliest = max(prices)
count = prices.count(costliest)
print("Number of costliest items sold:", count)