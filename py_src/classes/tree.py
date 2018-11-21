
from node import Node

class Tree:

    def __init__(self):
        self.root_node = Node('root', 0, {})

    def add_word(self, word):
        if word:
            current_node = self.root_node
            for char in word:
                current_node = current_node.add_child(char)
            current_node.is_end_of_word = True

    def add_words(self, words):
        for word in words:
            self.add_word(word)

    def print_tree(self):
        self.root_node.print_node()

    def is_concatenated(self, word, is_original_word = True):
        current_node = self.root_node
        for char in word:
            try:
                next_node = current_node.child_nodes[char]
            except:
                return False
            if next_node.depth == len(word):
                if is_original_word: return False
                if next_node.is_end_of_word: return True
                return False
            if next_node.is_end_of_word and \
                    self.is_concatenated(word[next_node.depth:], False):
                return True
            current_node = next_node
        return False
