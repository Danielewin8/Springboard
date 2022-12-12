def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    swapper = to_swap.upper()
    new = ""

    for letter in phrase:
        if letter.upper() == swapper:
            letter = letter.swapcase()
        new += letter

    return new


