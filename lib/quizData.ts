export type QuestionType = 'multiple-choice' | 'true-false' | 'code-completion' | 'matching'

export interface Question {
  id: string
  type: QuestionType
  topic: 'data-structure' | 'algorithm'
  subtopic: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
  code?: string
  matchingPairs?: { left: string; right: string }[]
}

export const quizQuestions: Question[] = [
  // Arrays
  {
    id: 'arr-1',
    type: 'multiple-choice',
    topic: 'data-structure',
    subtopic: 'Array',
    difficulty: 'easy',
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    correctAnswer: 'O(1)',
    explanation: 'Arrays provide constant-time access to elements by index because elements are stored contiguously in memory.',
    points: 10
  },
  {
    id: 'arr-2',
    type: 'true-false',
    topic: 'data-structure',
    subtopic: 'Array',
    difficulty: 'easy',
    question: 'Arrays have a fixed size that must be specified when they are created.',
    correctAnswer: 'true',
    explanation: 'Traditional arrays have a fixed size. Dynamic arrays (like ArrayList in Java or vector in C++) can grow, but they\'re built on top of fixed-size arrays.',
    points: 10
  },
  {
    id: 'arr-3',
    type: 'code-completion',
    topic: 'data-structure',
    subtopic: 'Array',
    difficulty: 'medium',
    question: 'Complete the code to insert an element at index i in an array:',
    code: `function insertAt(arr, index, value) {
  // Shift elements to the right
  for (let i = arr.length; i > index; i--) {
    arr[i] = ___________
  }
  arr[index] = value
}`,
    correctAnswer: 'arr[i-1]',
    explanation: 'To insert at a specific index, we need to shift all elements from that index onwards one position to the right.',
    points: 20
  },

  // Linked Lists
  {
    id: 'll-1',
    type: 'multiple-choice',
    topic: 'data-structure',
    subtopic: 'Linked List',
    difficulty: 'easy',
    question: 'What is the main advantage of a linked list over an array?',
    options: [
      'Faster access to elements',
      'Dynamic size and efficient insertion/deletion',
      'Less memory usage',
      'Better cache locality'
    ],
    correctAnswer: 'Dynamic size and efficient insertion/deletion',
    explanation: 'Linked lists can grow/shrink dynamically and provide O(1) insertion/deletion at known positions.',
    points: 10
  },
  {
    id: 'll-2',
    type: 'matching',
    topic: 'data-structure',
    subtopic: 'Linked List',
    difficulty: 'medium',
    question: 'Match the linked list operations with their time complexities:',
    matchingPairs: [
      { left: 'Insert at head', right: 'O(1)' },
      { left: 'Insert at tail (with tail pointer)', right: 'O(1)' },
      { left: 'Search for element', right: 'O(n)' },
      { left: 'Delete at position', right: 'O(n)' }
    ],
    correctAnswer: ['Insert at head:O(1)', 'Insert at tail (with tail pointer):O(1)', 'Search for element:O(n)', 'Delete at position:O(n)'],
    explanation: 'Linked lists provide O(1) insertion at known positions but O(n) for search and positional access.',
    points: 20
  },

  // Stacks
  {
    id: 'stack-1',
    type: 'multiple-choice',
    topic: 'data-structure',
    subtopic: 'Stack',
    difficulty: 'easy',
    question: 'Which principle does a Stack follow?',
    options: ['FIFO', 'LIFO', 'Random Access', 'Priority Based'],
    correctAnswer: 'LIFO',
    explanation: 'Stack follows Last In First Out (LIFO) principle - the last element added is the first one removed.',
    points: 10
  },
  {
    id: 'stack-2',
    type: 'code-completion',
    topic: 'data-structure',
    subtopic: 'Stack',
    difficulty: 'medium',
    question: 'Complete the push operation for a stack implemented with an array:',
    code: `class Stack {
  constructor() {
    this.items = []
    this.top = -1
  }
  
  push(element) {
    this.top++
    ___________
  }
}`,
    correctAnswer: 'this.items[this.top] = element',
    explanation: 'In array-based stack implementation, we increment top and then add the element at that position.',
    points: 20
  },

  // Queues
  {
    id: 'queue-1',
    type: 'true-false',
    topic: 'data-structure',
    subtopic: 'Queue',
    difficulty: 'easy',
    question: 'A queue follows the First In First Out (FIFO) principle.',
    correctAnswer: 'true',
    explanation: 'Queues follow FIFO - elements are removed in the same order they were added.',
    points: 10
  },
  {
    id: 'queue-2',
    type: 'multiple-choice',
    topic: 'data-structure',
    subtopic: 'Queue',
    difficulty: 'medium',
    question: 'Which data structure would be best for implementing a print spooler?',
    options: ['Stack', 'Queue', 'Array', 'Binary Tree'],
    correctAnswer: 'Queue',
    explanation: 'A print spooler should process jobs in the order they arrive, making a queue the ideal choice.',
    points: 15
  },

  // Binary Trees
  {
    id: 'tree-1',
    type: 'multiple-choice',
    topic: 'data-structure',
    subtopic: 'Binary Search Tree',
    difficulty: 'medium',
    question: 'In a Binary Search Tree, where are values less than the root stored?',
    options: ['Left subtree', 'Right subtree', 'Parent node', 'Random position'],
    correctAnswer: 'Left subtree',
    explanation: 'In a BST, all values in the left subtree are less than the root, and all values in the right subtree are greater.',
    points: 15
  },
  {
    id: 'tree-2',
    type: 'code-completion',
    topic: 'data-structure',
    subtopic: 'Binary Search Tree',
    difficulty: 'hard',
    question: 'Complete the BST search function:',
    code: `function search(node, key) {
  if (node === null || node.key === key) {
    return node
  }
  
  if (key < node.key) {
    return search(_________, key)
  }
  
  return search(_________, key)
}`,
    correctAnswer: 'node.left,node.right',
    explanation: 'In BST search, we go left if the key is smaller than current node, right if larger.',
    points: 25
  },

  // Sorting Algorithms
  {
    id: 'sort-1',
    type: 'matching',
    topic: 'algorithm',
    subtopic: 'Sorting',
    difficulty: 'medium',
    question: 'Match sorting algorithms with their average time complexities:',
    matchingPairs: [
      { left: 'Bubble Sort', right: 'O(n²)' },
      { left: 'Merge Sort', right: 'O(n log n)' },
      { left: 'Quick Sort', right: 'O(n log n)' },
      { left: 'Insertion Sort', right: 'O(n²)' }
    ],
    correctAnswer: ['Bubble Sort:O(n²)', 'Merge Sort:O(n log n)', 'Quick Sort:O(n log n)', 'Insertion Sort:O(n²)'],
    explanation: 'Merge Sort and Quick Sort are efficient O(n log n) algorithms, while Bubble and Insertion Sort are simpler O(n²) algorithms.',
    points: 20
  },
  {
    id: 'sort-2',
    type: 'true-false',
    topic: 'algorithm',
    subtopic: 'Sorting',
    difficulty: 'easy',
    question: 'Merge Sort is a stable sorting algorithm.',
    correctAnswer: 'true',
    explanation: 'Merge Sort maintains the relative order of equal elements, making it stable.',
    points: 10
  },

  // Searching Algorithms
  {
    id: 'search-1',
    type: 'multiple-choice',
    topic: 'algorithm',
    subtopic: 'Searching',
    difficulty: 'easy',
    question: 'What is the prerequisite for Binary Search?',
    options: [
      'Array must be sorted',
      'Array must have unique elements',
      'Array must be of even length',
      'No prerequisites'
    ],
    correctAnswer: 'Array must be sorted',
    explanation: 'Binary Search requires the array to be sorted to work correctly.',
    points: 10
  },
  {
    id: 'search-2',
    type: 'code-completion',
    topic: 'algorithm',
    subtopic: 'Searching',
    difficulty: 'medium',
    question: 'Complete the binary search midpoint calculation:',
    code: `function binarySearch(arr, target) {
  let low = 0
  let high = arr.length - 1
  
  while (low <= high) {
    let mid = ___________
    
    if (arr[mid] === target) return mid
    else if (arr[mid] < target) low = mid + 1
    else high = mid - 1
  }
  return -1
}`,
    correctAnswer: 'Math.floor((low + high) / 2)',
    explanation: 'The midpoint in binary search is calculated as the floor of (low + high) / 2.',
    points: 20
  },

  // Graph Algorithms
  {
    id: 'graph-1',
    type: 'multiple-choice',
    topic: 'algorithm',
    subtopic: 'Graph',
    difficulty: 'medium',
    question: 'Which data structure is typically used to implement BFS?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Hash Table'],
    correctAnswer: 'Queue',
    explanation: 'BFS uses a queue to explore nodes level by level.',
    points: 15
  },
  {
    id: 'graph-2',
    type: 'true-false',
    topic: 'algorithm',
    subtopic: 'Graph',
    difficulty: 'medium',
    question: "Dijkstra's algorithm can handle negative edge weights.",
    correctAnswer: 'false',
    explanation: "Dijkstra's algorithm doesn't work correctly with negative edge weights. Use Bellman-Ford for graphs with negative weights.",
    points: 15
  },

  // Advanced Questions
  {
    id: 'adv-1',
    type: 'multiple-choice',
    topic: 'algorithm',
    subtopic: 'Dynamic Programming',
    difficulty: 'hard',
    question: 'What is the key principle behind Dynamic Programming?',
    options: [
      'Divide and Conquer',
      'Optimal Substructure and Overlapping Subproblems',
      'Greedy Choice',
      'Backtracking'
    ],
    correctAnswer: 'Optimal Substructure and Overlapping Subproblems',
    explanation: 'DP works when a problem has optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems.',
    points: 25
  },
  {
    id: 'adv-2',
    type: 'matching',
    topic: 'data-structure',
    subtopic: 'Advanced',
    difficulty: 'hard',
    question: 'Match data structures with their typical use cases:',
    matchingPairs: [
      { left: 'Heap', right: 'Priority Queue' },
      { left: 'Trie', right: 'Autocomplete' },
      { left: 'Hash Table', right: 'Fast Lookups' },
      { left: 'Union-Find', right: 'Connected Components' }
    ],
    correctAnswer: ['Heap:Priority Queue', 'Trie:Autocomplete', 'Hash Table:Fast Lookups', 'Union-Find:Connected Components'],
    explanation: 'Each data structure is optimized for specific use cases based on their properties.',
    points: 30
  }
]

export function getQuestionsByTopic(topic: string): Question[] {
  return quizQuestions.filter(q => q.subtopic === topic)
}

export function getQuestionsByDifficulty(difficulty: string): Question[] {
  return quizQuestions.filter(q => q.difficulty === difficulty)
}

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
} 