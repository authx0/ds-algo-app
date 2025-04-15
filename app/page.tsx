"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Card from "@/components/Card";
import PseudocodeModal from "@/components/PseudocodeModal";
import LanguageSelector from "@/components/LanguageSelector";

// Define type for items with codeExamples
interface Item {
  title: string;
  type: 'Data Structure' | 'Algorithm';
  codeExamples: { [key: string]: string; }; // Changed from pseudocode
}

const items: Item[] = [
  // Data Structures
  { title: "Array", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Access element at index i
FUNCTION getElement(array, i)
  RETURN array[i]

// Set element at index i
FUNCTION setElement(array, i, value)
  array[i] = value`,
      javascript: `// Example for JavaScript Array
function getElement(arr, i) {
  return arr[i];
}
function setElement(arr, i, value) {
  arr[i] = value;
}` 
    }
  },
  { title: "Linked List", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Node structure
NODE { data, next }

// Add node to end
FUNCTION addNode(head, newData)
  newNode = NEW NODE(newData, null)
  IF head IS null THEN
    head = newNode
  ELSE
    current = head
    WHILE current.next IS NOT null
      current = current.next
    current.next = newNode
  RETURN head` 
    }
  },
  { title: "Stack", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Push item onto stack
FUNCTION push(stack, item)
  ADD item TO TOP of stack

// Pop item from stack
FUNCTION pop(stack)
  IF stack IS EMPTY THEN ERROR
  REMOVE item FROM TOP of stack
  RETURN item

// Peek top item
FUNCTION peek(stack)
  IF stack IS EMPTY THEN ERROR
  RETURN item AT TOP of stack` 
    }
  },
  { title: "Queue", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Enqueue item
FUNCTION enqueue(queue, item)
  ADD item TO END of queue

// Dequeue item
FUNCTION dequeue(queue)
  IF queue IS EMPTY THEN ERROR
  REMOVE item FROM FRONT of queue
  RETURN item

// Peek front item
FUNCTION peek(queue)
  IF queue IS EMPTY THEN ERROR
  RETURN item AT FRONT of queue` 
    }
  },
  { title: "Binary Search Tree", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Node structure
NODE { key, value, left, right }

// Insert node
FUNCTION insert(node, key, value)
  IF node IS null THEN RETURN NEW NODE(key, value)
  IF key < node.key THEN
    node.left = insert(node.left, key, value)
  ELSE IF key > node.key THEN
    node.right = insert(node.right, key, value)
  ELSE
    node.value = value // Update existing
  RETURN node` 
    }
  },
  { title: "Graph", type: "Data Structure" as const, codeExamples: { 
      pseudocode: `// Adjacency List Representation
GRAPH { vertices: MAP<VERTEX, LIST<EDGE>> }

// Breadth-First Search (BFS)
FUNCTION BFS(graph, startVertex)
  queue = NEW QUEUE()
  visited = NEW SET()
  ADD startVertex TO queue
  ADD startVertex TO visited
  WHILE queue IS NOT EMPTY
    vertex = queue.dequeue()
    PROCESS vertex
    FOR EACH neighbor OF vertex
      IF neighbor IS NOT IN visited THEN
        ADD neighbor TO visited
        ADD neighbor TO queue` 
    }
  },
  // Algorithms
  { title: "Bubble Sort", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION bubbleSort(array)
  n = LENGTH of array
  REPEAT n-1 TIMES
    swapped = false
    FOR i FROM 0 TO n-2
      IF array[i] > array[i+1] THEN
        SWAP array[i] AND array[i+1]
        swapped = true
    IF NOT swapped THEN BREAK
  RETURN array` 
    }
  },
  { title: "Merge Sort", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION mergeSort(array)
  IF LENGTH of array <= 1 THEN RETURN array
  mid = FLOOR(LENGTH of array / 2)
  left = mergeSort(SUBARRAY from 0 to mid-1)
  right = mergeSort(SUBARRAY from mid to end)
  RETURN merge(left, right)

FUNCTION merge(left, right)
  result = NEW ARRAY()
  WHILE left IS NOT EMPTY AND right IS NOT EMPTY
    IF left[0] <= right[0] THEN
      ADD left.removeFirst() TO result
    ELSE
      ADD right.removeFirst() TO result
  ADD remaining elements OF left TO result
  ADD remaining elements OF right TO result
  RETURN result` 
    }
  },
  { title: "Quick Sort", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION quickSort(array, low, high)
  IF low < high THEN
    pivotIndex = partition(array, low, high)
    quickSort(array, low, pivotIndex - 1)
    quickSort(array, pivotIndex + 1, high)

FUNCTION partition(array, low, high)
  pivot = array[high]
  i = low - 1
  FOR j FROM low TO high - 1
    IF array[j] < pivot THEN
      i = i + 1
      SWAP array[i] AND array[j]
  SWAP array[i+1] AND array[high]
  RETURN i + 1` 
    }
  },
  { title: "Linear Search", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION linearSearch(array, target)
  FOR i FROM 0 TO LENGTH of array - 1
    IF array[i] == target THEN
      RETURN i // Found at index i
  RETURN -1 // Not found` 
    }
  },
  { title: "Binary Search", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `// Requires sorted array
FUNCTION binarySearch(sortedArray, target)
  low = 0
  high = LENGTH of sortedArray - 1
  WHILE low <= high
    mid = FLOOR((low + high) / 2)
    IF sortedArray[mid] == target THEN
      RETURN mid // Found at index mid
    ELSE IF sortedArray[mid] < target THEN
      low = mid + 1
    ELSE
      high = mid - 1
  RETURN -1 // Not found` 
    }
  },
  { title: "Dijkstra's Algorithm", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION dijkstra(graph, startNode)
  distances = MAP // Store shortest distance found so far for each node
  priorityQueue = NEW PRIORITY QUEUE // Stores {node, distance}
  SET all distances to INFINITY, except startNode to 0
  ADD {startNode, 0} TO priorityQueue

  WHILE priorityQueue IS NOT EMPTY
    {currentNode, currentDistance} = priorityQueue.extractMin()
    IF currentDistance > distances[currentNode] THEN CONTINUE

    FOR EACH neighbor, weight OF currentNode
      distance = currentDistance + weight
      IF distance < distances[neighbor] THEN
        distances[neighbor] = distance
        ADD {neighbor, distance} TO priorityQueue
  RETURN distances` 
    }
  },
  { title: "A* Search", type: "Algorithm" as const, codeExamples: { 
      pseudocode: `FUNCTION aStarSearch(graph, startNode, goalNode, heuristic)
  openSet = NEW PRIORITY QUEUE // Nodes to visit {node, fScore}
  cameFrom = MAP // Path reconstruction
  gScore = MAP // Cost from start to node (Default: Infinity)
  fScore = MAP // Estimated total cost (gScore + heuristic) (Default: Infinity)

  gScore[startNode] = 0
  fScore[startNode] = heuristic(startNode, goalNode)
  ADD {startNode, fScore[startNode]} TO openSet

  WHILE openSet IS NOT EMPTY
    {currentNode, currentFScore} = openSet.extractMin()
    IF currentNode == goalNode THEN RETURN reconstructPath(cameFrom, currentNode)

    FOR EACH neighbor, weight OF currentNode
      tentativeGScore = gScore[currentNode] + weight
      IF tentativeGScore < gScore[neighbor] THEN // Found a better path
        cameFrom[neighbor] = currentNode
        gScore[neighbor] = tentativeGScore
        fScore[neighbor] = tentativeGScore + heuristic(neighbor, goalNode)
        IF neighbor IS NOT IN openSet THEN
          ADD {neighbor, fScore[neighbor]} TO openSet
  RETURN FAILURE // No path found` 
    }
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('pseudocode');

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); 
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const getCodeContent = () => {
    if (!selectedItem) return '';
    return selectedItem.codeExamples[selectedLanguage] ?? selectedItem.codeExamples['pseudocode'] ?? 'Code example not available.';
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-20">
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <h1 className="text-4xl font-bold mb-12">Data Structures & Algorithms Visualizer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {items.map((item) => (
          <Card 
            key={item.title} 
            title={item.title} 
            type={item.type} 
            onClick={() => handleCardClick(item)} 
            codeExamples={item.codeExamples}
          />
        ))}
      </div>

      {selectedItem && (
        <PseudocodeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`${selectedItem.title} (${selectedLanguage})`}
          codeContent={getCodeContent()}
        />
      )}
    </main>
  );
}
