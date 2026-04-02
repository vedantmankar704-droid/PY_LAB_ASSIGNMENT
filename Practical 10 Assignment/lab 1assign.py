import pandas as pd

df = pd.read_csv("books.csv")

print(df)

author = input("Enter author name: ")
print(df[df["author"] == author])

publisher = input("Enter publishing house: ")
print(df[df["publishing house"] == publisher])

print(df[df["price"] == df["price"].min()][["title"]])
print(df[df["price"] == df["price"].max()][["title"]])

print(df.sort_values(by="publication year"))