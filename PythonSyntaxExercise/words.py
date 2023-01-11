def print_upper_words(words):
    """prints out uppercased versions of each word!"""
    for word in words:
        print(word.upper())

def print_upper_words_e(words):
    """prints out uppercased words that start with 'e' or 'E'!"""
    for word in words:
        if word.startswith('e') or word.startswith("E"):
            print(word.upper())

def print_upper_words_any_letter(words, starts_with):
    """prints out uppercased words that start with any letter(given as a parameter)!"""
    for word in words:
        for letter in starts_with:
            if word.startswith(letter):
                print(word.upper())