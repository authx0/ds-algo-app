import Image from "next/image";
import Card from "@/components/Card";

const items = [
  // Data Structures
  { title: "Array", type: "Data Structure" as const },
  { title: "Linked List", type: "Data Structure" as const },
  { title: "Stack", type: "Data Structure" as const },
  { title: "Queue", type: "Data Structure" as const },
  { title: "Binary Search Tree", type: "Data Structure" as const },
  { title: "Graph", type: "Data Structure" as const },
  // Algorithms
  { title: "Bubble Sort", type: "Algorithm" as const },
  { title: "Merge Sort", type: "Algorithm" as const },
  { title: "Quick Sort", type: "Algorithm" as const },
  { title: "Linear Search", type: "Algorithm" as const },
  { title: "Binary Search", type: "Algorithm" as const },
  { title: "Dijkstra's Algorithm", type: "Algorithm" as const },
  { title: "A* Search", type: "Algorithm" as const },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <h1 className="text-4xl font-bold mb-12">Data Structures & Algorithms Visualizer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {items.map((item) => (
          <Card key={item.title} title={item.title} type={item.type} />
        ))}
      </div>
    </main>
  );
}
