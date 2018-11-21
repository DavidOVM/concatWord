from classes.tree import Tree

def compute_concatenated_words(words):

    tree = Tree()
    tree.add_words(words)

    concatenated_word_count = 0
    max_concat_length = 0
    second_max_concat_length = 0
    max_length_concat_words = []
    second_max_length_concat_words = []

    for word in words:

        if tree.is_concatenated(word):
            concatenated_word_count += 1

            if len(word) > max_concat_length:
                second_max_concat_length = max_concat_length
                second_max_length_concat_words = max_length_concat_words
                max_concat_length = len(word)
                max_length_concat_words = [word]

            elif len(word) == max_concat_length:
                max_length_concat_words.append(word)

            elif len(word) > second_max_concat_length:
                second_max_concat_length = len(word)
                second_max_length_concat_words = [word]

            elif len(word) == second_max_concat_length:
                second_max_length_concat_words.append(word)

    return concatenated_word_count, \
        max_length_concat_words, \
        second_max_length_concat_words


