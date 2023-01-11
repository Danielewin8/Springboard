def extract_full_names(people):
    """Return list of names, extracting from first+last keys in people dicts.

    - people: list of dictionaries, each with 'first' and 'last' keys for
              first and last names

    Returns list of space-separated first and last names.

        >>> names = [
        ...     {'first': 'Ada', 'last': 'Lovelace'},
        ...     {'first': 'Grace', 'last': 'Hopper'},
        ... ]

        >>> extract_full_names(names)
        ['Ada Lovelace', 'Grace Hopper']
    """
    return [f"{person['first']} {person['last']}"for person in people]

# extract_full_names([{'first': 'Ada', 'last': 'Lovelace'},{'first': 'Grace', 'last': 'Hopper'}])

# With this I originally formatted this like below..but this only return one instance of the full names not both. Why?
    for person in people:
        return [f"{person['first']} {person['last']}"]