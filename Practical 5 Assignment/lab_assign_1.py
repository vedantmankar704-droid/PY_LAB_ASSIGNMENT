# Take integers from user and store in tuple

nums = tuple(map(int, input("Enter numbers separated by space: ").split()))

# a) Total number of items
print("Total items:", len(nums))

# b) Last item
print("Last item:", nums[-1])

# c) Reverse order
print("Reverse order:", nums[::-1])

# d) Check if 5 is present
if 5 in nums:
    print("Yes")
else:
    print("No")

# e) Remove first and last item, sort remaining
new_nums = nums[1:-1]
sorted_nums = tuple(sorted(new_nums))
print("After removing first and last and sorting:", sorted_nums)