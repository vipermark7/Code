import os
import re

def sales_tax_exempt(item: str):
    """Books, food, and medical products are exempt from taxes"""
    item.lower()
    return "book" in item or "chocolate" in item or "pill" in item

def round_to_five(price):
    return round(0.05 * round(price/0.05), 2)

def sales_tax_round(price, tax_rate):
    tax_rate = tax_rate * 100
    return round_to_five((price * tax_rate)/ 100)

def output(cart_list: list):
    for cart in cart_list:
        total_tax_for_cart = 0
        subtotal = 0
        order_total = 0
        output = 1
        should_round = False
        print(f"Output {output}:")
        for item in cart:
            price_with_tax = 0
            tax = 0
            atsplit = item.split(" at ")
            name = atsplit[0]
            price = float(atsplit[1]) 
            item = item.lower()
            if "import" in item:
                tax += (price * .05)
                should_round = True
            elif sales_tax_exempt(item): 
                tax += 0.0
            else:
                tax += (price * .1)
                should_round = True    
            price_with_tax = (price + tax)
            # make sure to round to nearest .05, and that price is
            # only two decimal places
            if should_round:
                price_with_tax = round_to_five(price_with_tax)
            print(f"{name}: {price_with_tax:.2f}")
            total_tax_for_cart += tax
        subtotal += price
        order_total += price_with_tax
        output += 1
        print(f"Sales Taxes: {total_tax_for_cart:.2f}")
        print(f"Total: {order_total:.2f}")

input_file_path = "/home/spacey/Desktop/input.txt"
# keep prompting user until a valid file path is entered
while not os.path.exists(input_file_path):
    input_file_path = input(
        "Type in the complete path to the input file: ")

# reading the file and putting each line into a list
input_items = open(input_file_path, "r").read().splitlines()
items_to_str = ""
for i in input_items:
    items_to_str += i + "*"
carts = re.split(r'Input ([0-9]*):', items_to_str)
trimmed_carts = [i.strip() for i in carts if len(i) > 3]
orders = [i.split("*") for i in trimmed_carts]

for i in orders:
    # delete first and last items, which are empty spaces 
    # due to the results of split()
    del i[0]
    del i[len(i) - 1]
    
print(orders)
output(orders)
