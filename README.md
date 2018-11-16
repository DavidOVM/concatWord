# CONCATENATED WORD CHALLENGE

## The challenge

We have provided a file called "words.txt" which contains a sorted list of approximately 173,000 words. The words are listed one word per line, do not contain spaces, and are all lowercase.

Your task is to write a program that reads the file and provides the following:
- the longest concatenated word (that is, the longest word that is comprised entirely of
shorter words in the file)
- the 2nd longest concatenated word
- the total count of all the concatenated words in the file

For example, if the file contained: 
    - cat
    - cats 
    - catsdogcats
    - dog
    - dogcatsdog
    - hippopotamuses
    - rat
    - ratcatdogcat

the longest concatenated word would be 'ratcatdogcat' with 12 characters. 'hippopotamuses' is a longer word, however it is not comprised entirely of shorter words in the list. The 2nd longest concatenated word is 'catsdogcats' with 11 characters. The total number of concatenated words is 3. Note that 'cats' is not a concatenated word because there is no word 's' in the list.

## Solution

- Latest node.js and npm required

- Clone repo and run `npm start`. 

- File called `words.txt` is required in /src

- Average Execution Time for 173k words: `500ms` 

#### How does it work?

Words are added to an ad-hoc tree, each tree node will be one character and will have a flag indicating if it's an end of word node.

For example, this list of words: 'ah', 'ahead', 'ead', 'ad' Will provide the following tree:

```
|
|_ 'a'
|    |_ 'h' <- endOfWord
|    |    |_ 'e'
|    |        |_ 'a'
|    |            |_ 'd' <- endOfWord
|    |
|    |_ 'd' <- endOfWord    
|
|_ 'e'
    |_ 'a' 
        |_ 'd' <- endOfWord
```

You can use `tree.print()` for visibility (it will affect execution time)

The algorithm will take a word and traverse the tree. First it will find the original word and all the endOfWords within it and then it will recursively check if the different parts of the word are concatenated.

Let's take 'ahead', we would have 'ah' as the only endOfWord within our word, now we remove 'ah' from 'ahead' and apply the same algorithm to it finding 'ead' and returning true. 
