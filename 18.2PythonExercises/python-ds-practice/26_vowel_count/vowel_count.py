def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowels = 'aeiou'
    
    phrase = phrase.lower()
    count = {}

    for letter in phrase:
        if letter in vowels:
            count[letter] = count.get(letter, 0) + 1

    return count

vowel_count('rithm school')

# if the letter that was iterated on is a vowel, (on line 17)it is assigned as a key in the count dict, then given a default value of 0, and has 1 added to it for each time it appears?