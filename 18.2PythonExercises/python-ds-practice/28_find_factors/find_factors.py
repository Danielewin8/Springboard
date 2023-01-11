def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    results = []
    x = 0

    while (x <= num):
        x += 1
        if num % x == 0:
            results.append(x)

    return results


find_factors(10)

# Am curious about the comprehension version below, having a hard time making sense of comprehensions.

    # n_list = [n for n in range(1, num // 2 + 1) if num % n == 0]
    
    # n_list.append(num)
    
    # return n_list
