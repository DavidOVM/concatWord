
class Node:

    def __init__(self, value, depth, child_nodes = {}, is_end_of_word = False):
        self.value = value
        self.depth = depth
        self.child_nodes = child_nodes
        self.is_end_of_word = is_end_of_word

    def add_child(self, value):
        try:
            child_node = self.child_nodes[value]
        except:
            child_node = Node(value, self.depth + 1, {})
            self.child_nodes[value] = child_node
        return child_node

    def print_node(self, tab = '  '):
        print tab, self.value, '---', self.depth, '---', self.is_end_of_word
        for child_node_key in self.child_nodes:
            self.child_nodes[child_node_key].print_node(tab + '  ')
