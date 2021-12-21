data = [['A', 'O', 'T', 'D', 'L', 'R', 'O', 'W'],
        ['L', 'C', 'B', 'M', 'U', 'M', 'L', 'U'],
        ['D', 'R', 'U', 'J', 'D', 'B', 'L', 'J'],
        ['P', 'A', 'Z', 'H', 'Z', 'Z', 'E', 'F'],
        ['B', 'C', 'Z', 'E', 'L', 'F', 'H', 'W'],
        ['R', 'K', 'U', 'L', 'V', 'P', 'P', 'G'],
        ['A', 'L', 'B', 'L', 'P', 'O', 'P', 'Q'],
        ['B', 'E', 'M', 'O', 'P', 'P', 'J', 'Y']]

def letter_column(letter_idx, matrix=data):
    """ Get a column of letters, then return a list of the letters we care about
        e.g 'H' is 4 down and 6 to the right counting from 0"""
    return [row[letter_idx] for row in matrix]


def above_or_below_letter(letter_idx, above=True, matrix=data):
    """ Return the letters above and below our letter, including the letter,
        we are assuming letter_col comes from a call to letter_column"""
    col = letter_column(letter_idx)
    if above:
        return col[0:letter_idx]
    return col[letter_idx:len(matrix)]


def check_surrounding_words(row, letter_idx, word):
    """ If we find th first letter of our word, look up, down, left, and right,
        increment matched_words by 1 if found """
    possible_words = {"up": above_or_below_letter(letter_idx - 1),
                      "down": above_or_below_letter(letter_idx - 1, above=False),
                      "left": row[0:letter_idx],
                      "right": row[letter_idx - 1:len(row)]}

    for val in possible_words.values():
        if word_matches(word, val):
            return True


def word_matches(word, letter_list):
    """If we find our word with the letters in the right order or in reverse order,
        return TRUE """
    return "".join(letter_list).__contains__(word) or "".join(letter_list)[::-1].__contains__(word)


def find_word(word, matrix=data):
    """Go through every letter in our data and find how many times the word occurs
        either in normal order or reversed """
    matched_words = 0
    row_num = 0

    first_letter = word[0]
    # keeping track of which letters are around our target letter

    for row in data:
        letter_idx = 0
        row_num += 1
        for letter in row:
            letter_idx += 1
            if letter == first_letter and check_surrounding_words(row, letter_idx, word):
                matched_words += 1

    return matched_words


found_hello_count = str(find_word("HELLO"))
found_buzz_count = str(find_word("BUZZ"))
found_world_count = str(find_word("WORLD"))

print(f"'HELLO' found {found_hello_count} times")
print(f"'WORLD' found {found_world_count} times")
print(f"'BUZZ' found {found_buzz_count} times")
