import csv, os

os.chdir(os.path.expanduser("~"))

with open('ex01-002a.csv'):
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
