import pandas as pd

data = {
    "State": ["Maharashtra", "Gujarat", "Rajasthan", "Karnataka", "Punjab"],
    "Area": [307713, 196244, 342239, 191791, 50362],
    "Population": [124000000, 70000000, 81000000, 68000000, 30000000]
}

df = pd.DataFrame(data)

print(df)

print(df.loc[df["Area"].idxmax(), "State"])

print(df.loc[df["Population"].idxmax(), "State"])

df["Density"] = df["Population"] / df["Area"]

print(df.loc[df["Density"].idxmax(), "State"])