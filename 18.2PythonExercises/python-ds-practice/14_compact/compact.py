def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    true_list = []
    for i in lst:
        if(bool(i)):
            true_list.append(i)
    return true_list

    # Another method the solution did involving list comprehension does not make sense to me. How does this work?
    
    # return [i for i in lst if i]
