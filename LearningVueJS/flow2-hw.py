# Name: Shaffan Msutafa
# Lecture: Flow Control: Loops 
# Date: 9/14 

# Question 1
i = 0
j = 0
while i in range(1, 13):
    print(i * j, end = " ")
    i + 1

    while j in range(1, 13):
        print(i, ": ", end = '')
        print()
        j + 1

# Question 2 
for i in range(1, 13):
    print(i, ": ", end = '')
    print()
    for j in range(1, 13):
        print(i * j, end = " ")
# Question 3 
# while 1 < 2: 
#     print("descend into infinity")

# Question 4
sum = 0
for i in range(1, 101):
    if i % 13 == 0:
        continue
    else:
        sum = sum + i
