"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """Used for finding random words in a dictionary
    
    >>> random_word = WordFinder("18.3PythonExercises/words.txt")
    3 words read
    
    >>> random_word.random() in ["cat", "dog", "bird"]
    True

    >>> random_word.random() in ["car", "truck", "bike"]
    True
    """

    def __init__(self, path):
        """Reads dict and returns number of read items"""
        dict_file = open(path)

        self.words = self.parse(dict_file)

        print(f"{len(self.words)} read words")

    def parse(self, dict_file):
        """Parse dict_item to list of words"""

        return [word.strip() for word in dict_file]

    def random(self):
        """Random word"""

        return random.choice(self.words)


