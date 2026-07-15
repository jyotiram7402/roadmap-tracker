// data/quiz.js — Quick Practice MCQ bank.
// Each question: { q, code?: string[], options: [4 strings], answer: index, explain, tag? }
// Content is original. Coding questions carry a `code` block to render.

export const QUIZ_SUBJECTS = [
  { id: "dsa", name: "DSA", icon: "🧩", accent: "from-blue-500 to-cyan-500" },
  { id: "sql", name: "SQL / MySQL", icon: "🗄️", accent: "from-emerald-500 to-teal-500" },
  { id: "java", name: "Java Full Stack", icon: "☕", accent: "from-amber-500 to-orange-500" },
  { id: "mern", name: "MERN Stack", icon: "🟢", accent: "from-green-500 to-emerald-500" },
];

export const QUIZ = {
  dsa: [
    { q: "What is the time complexity of binary search on a sorted array of n elements?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1, explain: "Each step halves the search space, so it takes at most log₂(n) comparisons → O(log n).", tag: "Searching" },
    { q: "Which data structure follows Last-In-First-Out (LIFO) order?", options: ["Queue", "Stack", "Linked List", "Heap"], answer: 1, explain: "A stack pushes and pops from the same end, so the last element added is the first removed (LIFO).", tag: "Stack" },
    { q: "An inorder traversal of a Binary Search Tree visits nodes in what order?", options: ["Random order", "Descending order", "Ascending (sorted) order", "Level by level"], answer: 2, explain: "Inorder (left → node → right) on a BST always yields keys in ascending sorted order.", tag: "Trees" },
    { q: "Which technique detects a cycle in a singly linked list in O(1) space?", options: ["Hashing every node", "Floyd's fast & slow pointers", "Reversing the list", "Sorting the nodes"], answer: 1, explain: "Floyd's algorithm moves one pointer 1 step and another 2 steps; if they meet, there is a cycle — O(1) extra space.", tag: "Linked List" },
    { q: "What is the worst-case time complexity of QuickSort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 2, explain: "With a poor pivot (e.g. already-sorted input picking the smallest element), partitions are lopsided → O(n²). Average is O(n log n).", tag: "Sorting" },
    { q: "The root of a min-heap always contains:", options: ["The maximum element", "The minimum element", "The median", "A random element"], answer: 1, explain: "A min-heap maintains the heap property so the smallest element is always at the root.", tag: "Heap" },
    { q: "Which algorithm finds the shortest path from a source in a graph with non-negative weights?", options: ["Bellman-Ford", "Dijkstra's algorithm", "Kruskal's algorithm", "DFS"], answer: 1, explain: "Dijkstra greedily expands the closest unvisited node; it requires non-negative edge weights.", tag: "Graphs" },
    { q: "Kadane's algorithm is used to find:", options: ["The longest palindrome", "The maximum subarray sum", "The shortest path", "A cycle in a graph"], answer: 1, explain: "Kadane's keeps a running max ending at each index and the best seen so far — maximum contiguous subarray sum in O(n).", tag: "Arrays" },
    { q: "Average-case lookup time in a well-designed hash table is:", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 0, explain: "With a good hash function and load factor, lookups average O(1); worst case degrades to O(n) on heavy collisions.", tag: "Hashing" },
    { q: "What does this Java snippet print?", code: ["int[] a = {1, 2, 3, 4};", "int l = 0, r = a.length - 1;", "while (l < r) {", "    int t = a[l]; a[l++] = a[r]; a[r--] = t;", "}", "System.out.println(Arrays.toString(a));"], options: ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 1, 4, 3]", "[4, 2, 3, 1]"], answer: 1, explain: "Two pointers swap from both ends inward, reversing the array → [4, 3, 2, 1].", tag: "Two Pointers" },
    { q: "What is the output?", code: ["Deque<Integer> st = new ArrayDeque<>();", "st.push(1); st.push(2); st.push(3);", "st.pop();", "System.out.println(st.peek());"], options: ["1", "2", "3", "null"], answer: 1, explain: "push adds to the front; after pushing 1,2,3 the top is 3, pop() removes it, so peek() returns 2.", tag: "Stack" },
    { q: "Which sorting algorithm is stable and runs in guaranteed O(n log n)?", options: ["QuickSort", "Merge Sort", "Selection Sort", "Bubble Sort"], answer: 1, explain: "Merge Sort is stable and always O(n log n); QuickSort is O(n log n) only on average and is not stable by default.", tag: "Sorting" },
    { q: "The space complexity of the naive recursive Fibonacci (fib(n)) is:", options: ["O(1)", "O(n) due to the call stack", "O(2ⁿ)", "O(log n)"], answer: 1, explain: "Though it makes ~2ⁿ calls (time), the recursion depth is at most n, so stack space is O(n).", tag: "Recursion" },
    { q: "A binary heap is typically implemented using:", options: ["A doubly linked list", "An array", "A hash map", "A balanced BST"], answer: 1, explain: "A complete binary heap maps cleanly to an array: children of index i are at 2i+1 and 2i+2.", tag: "Heap" },
  ],

  sql: [
    { q: "Which clause filters rows AFTER grouping with GROUP BY?", options: ["WHERE", "HAVING", "FILTER", "GROUP FILTER"], answer: 1, explain: "WHERE filters rows before aggregation; HAVING filters the grouped/aggregated results.", tag: "Aggregation" },
    { q: "Which keyword removes duplicate rows from a result set?", options: ["UNIQUE", "DISTINCT", "DEDUPE", "ONLY"], answer: 1, explain: "SELECT DISTINCT returns only unique combinations of the selected columns.", tag: "Basics" },
    { q: "An INNER JOIN returns:", options: ["All rows from both tables", "Only rows with matching keys in both tables", "All rows from the left table", "Rows with no match"], answer: 1, explain: "INNER JOIN keeps only rows where the join condition matches in both tables.", tag: "Joins" },
    { q: "Which statement is DDL (Data Definition Language)?", options: ["INSERT", "UPDATE", "CREATE TABLE", "SELECT"], answer: 2, explain: "CREATE/ALTER/DROP are DDL (define schema). INSERT/UPDATE/DELETE are DML.", tag: "Concepts" },
    { q: "How do you correctly test a column for NULL?", options: ["col = NULL", "col == NULL", "col IS NULL", "col EQUALS NULL"], answer: 2, explain: "NULL is unknown, so equality never matches. Use IS NULL / IS NOT NULL.", tag: "Basics" },
    { q: "Which normal form eliminates partial dependency on part of a composite key?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 1, explain: "2NF requires that non-key columns depend on the whole primary key, removing partial dependencies.", tag: "Normalization" },
    { q: "TRUNCATE differs from DELETE because TRUNCATE:", options: ["Can use a WHERE clause", "Removes all rows and can't be filtered", "Is slower than DELETE", "Only marks rows as deleted"], answer: 1, explain: "TRUNCATE removes all rows quickly without a WHERE clause and usually resets identity counters; DELETE can filter rows.", tag: "Concepts" },
    { q: "An index on a column primarily improves:", options: ["Insert speed", "Read/lookup speed", "Disk space usage", "Backup speed"], answer: 1, explain: "Indexes speed up reads/lookups and sorting but add overhead to writes and use extra storage.", tag: "Performance" },
    { q: "Given a table emp(dept), what does this return?", code: ["SELECT dept, COUNT(*) AS c", "FROM emp", "GROUP BY dept;"], options: ["Total number of employees", "One row per department with its employee count", "All employee rows", "The largest department only"], answer: 1, explain: "GROUP BY dept collapses rows per department; COUNT(*) counts employees in each.", tag: "Aggregation" },
    { q: "Which JOIN keeps ALL rows from the left table, with NULLs where the right has no match?", options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], answer: 1, explain: "LEFT (OUTER) JOIN returns every left row; unmatched right columns are NULL.", tag: "Joins" },
    { q: "What is the default sort direction of ORDER BY?", options: ["DESC", "ASC", "Random", "By primary key"], answer: 1, explain: "ORDER BY sorts ascending (ASC) unless DESC is specified.", tag: "Basics" },
    { q: "Which function returns the number of rows including duplicates and NULL-containing rows?", options: ["COUNT(column)", "COUNT(*)", "COUNT(DISTINCT column)", "SUM(1)"], answer: 1, explain: "COUNT(*) counts all rows; COUNT(column) skips NULLs in that column.", tag: "Aggregation" },
    { q: "A PRIMARY KEY constraint guarantees the column(s) are:", options: ["Nullable and unique", "Unique and NOT NULL", "Indexed but can repeat", "Foreign to another table"], answer: 1, explain: "A primary key is unique and NOT NULL, uniquely identifying each row.", tag: "Concepts" },
  ],

  java: [
    { q: "What does JVM stand for?", options: ["Java Verified Module", "Java Virtual Machine", "Java Variable Manager", "Just-in-time Virtual Method"], answer: 1, explain: "The Java Virtual Machine executes compiled bytecode, giving Java its 'write once, run anywhere' portability.", tag: "Core" },
    { q: "For String comparison, what's the difference between == and .equals()?", options: ["No difference", "== compares references; .equals() compares content", "== compares content; .equals() compares references", "Both compare content"], answer: 1, explain: "== checks if two references point to the same object; .equals() compares the actual character content.", tag: "Strings" },
    { q: "Which Spring annotation marks a class as a REST endpoint returning data (not views)?", options: ["@Controller", "@RestController", "@Service", "@Component"], answer: 1, explain: "@RestController = @Controller + @ResponseBody, so return values are serialized (e.g. to JSON) as the response body.", tag: "Spring" },
    { q: "Which of these is a CHECKED exception?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"], answer: 2, explain: "IOException extends Exception (checked) — the compiler forces you to handle or declare it. The others are unchecked RuntimeExceptions.", tag: "Exceptions" },
    { q: "What is the default value of an uninitialized int instance field in Java?", options: ["null", "0", "undefined", "-1"], answer: 1, explain: "Numeric instance fields default to 0 (0.0 for floating point), boolean to false, objects to null.", tag: "Core" },
    { q: "The 'final' keyword on a class means:", options: ["It can't be instantiated", "It can't be subclassed (extended)", "Its methods are abstract", "It's a singleton"], answer: 1, explain: "A final class cannot be extended (e.g. String is final). final on a method blocks overriding; on a variable blocks reassignment.", tag: "OOP" },
    { q: "Java String objects are:", options: ["Mutable", "Immutable", "Thread-unsafe by design", "Primitive types"], answer: 1, explain: "Strings are immutable — any 'modification' creates a new String. Use StringBuilder for heavy concatenation.", tag: "Strings" },
    { q: "Which HTTP status code indicates a resource was successfully created?", options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"], answer: 1, explain: "201 Created signals a new resource was created, typically returned by a successful POST.", tag: "REST" },
    { q: "What does this print?", code: ["String a = \"hi\";", "String b = \"hi\";", "System.out.println(a == b);"], options: ["true", "false", "Compilation error", "null"], answer: 0, explain: "String literals are interned in the string pool, so a and b reference the same object → == is true.", tag: "Strings" },
    { q: "What is the output?", code: ["List<Integer> list = new ArrayList<>();", "list.add(10); list.add(20); list.add(30);", "list.remove(1);", "System.out.println(list);"], options: ["[10, 20, 30]", "[10, 30]", "[20, 30]", "[10, 20]"], answer: 1, explain: "remove(1) removes the element at index 1 (the value 20), leaving [10, 30]. (remove(Integer) would remove by value.)", tag: "Collections" },
    { q: "Which collection does NOT allow duplicate elements?", options: ["ArrayList", "LinkedList", "HashSet", "ArrayDeque"], answer: 2, explain: "A Set (e.g. HashSet) stores only unique elements; Lists allow duplicates.", tag: "Collections" },
    { q: "Which annotation injects a Spring bean by type?", options: ["@Inject only", "@Autowired", "@Bean", "@Value"], answer: 1, explain: "@Autowired tells Spring to resolve and inject a matching bean from the application context.", tag: "Spring" },
    { q: "What is method overloading?", options: ["Same method name, different parameter lists", "Redefining a parent method in a child class", "A method calling itself", "Two classes with the same method"], answer: 0, explain: "Overloading = multiple methods with the same name but different parameter types/counts (compile-time polymorphism). Overriding is the runtime one.", tag: "OOP" },
  ],

  mern: [
    { q: "What does the 'MERN' stack stand for?", options: ["MySQL, Express, React, Node", "MongoDB, Express, React, Node", "MongoDB, Ember, Redux, Node", "MongoDB, Express, Redux, Nginx"], answer: 1, explain: "MERN = MongoDB (DB), Express (server framework), React (frontend), Node.js (runtime).", tag: "Core" },
    { q: "Which React hook runs side effects (like data fetching) after render?", options: ["useState", "useEffect", "useMemo", "useRef"], answer: 1, explain: "useEffect runs after the DOM is painted and re-runs when its dependency array changes.", tag: "React" },
    { q: "MongoDB stores documents internally as:", options: ["Plain JSON text", "BSON (binary JSON)", "CSV rows", "XML"], answer: 1, explain: "MongoDB uses BSON — a binary-encoded superset of JSON supporting more types (e.g. ObjectId, Date).", tag: "MongoDB" },
    { q: "Which React hook declares local component state?", options: ["useContext", "useState", "useReducer only", "useCallback"], answer: 1, explain: "useState returns a [value, setter] pair; calling the setter re-renders the component.", tag: "React" },
    { q: "In Express, which method sends a JSON response?", options: ["res.write()", "res.json()", "res.sendFile()", "res.end()"], answer: 1, explain: "res.json(obj) sets the Content-Type to application/json and serializes the object.", tag: "Express" },
    { q: "What is Mongoose?", options: ["A React state library", "An ODM (Object Data Modeling) library for MongoDB", "A CSS framework", "A Node test runner"], answer: 1, explain: "Mongoose provides schemas, models, and validation as an ODM layer over MongoDB.", tag: "MongoDB" },
    { q: "Why does React need a 'key' prop when rendering a list?", options: ["For CSS styling", "To help React efficiently identify which items changed", "It's required by JSX syntax", "To sort the list"], answer: 1, explain: "Keys give list items a stable identity so React can reconcile changes without re-rendering everything.", tag: "React" },
    { q: "Which HTTP method is idempotent and typically used to fully replace a resource?", options: ["POST", "PUT", "PATCH", "CONNECT"], answer: 1, explain: "PUT replaces a resource and is idempotent — repeating it yields the same state. POST is not idempotent.", tag: "REST" },
    { q: "What does this JavaScript print?", code: ["const arr = [1, 2, 3];", "const doubled = arr.map(x => x * 2);", "console.log(doubled);"], options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"], answer: 1, explain: ".map() returns a new array applying the function to each element → [2, 4, 6].", tag: "JavaScript" },
    { q: "What is logged?", code: ["console.log(typeof null);"], options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""], answer: 1, explain: "A long-standing JavaScript quirk: typeof null returns \"object\".", tag: "JavaScript" },
    { q: "JSX is ultimately compiled into:", options: ["Plain HTML strings", "React.createElement() calls", "Web Components", "Template literals"], answer: 1, explain: "Babel transforms JSX into React.createElement(type, props, ...children) calls that produce the virtual DOM.", tag: "React" },
    { q: "Which command installs a dependency and saves it to package.json?", options: ["node install pkg", "npm install pkg", "npm run pkg", "npm get pkg"], answer: 1, explain: "npm install <pkg> downloads the package and records it under dependencies in package.json.", tag: "Node" },
    { q: "What does the '===' operator check in JavaScript?", options: ["Value only, with type coercion", "Value and type, without coercion", "Reference only", "Type only"], answer: 1, explain: "=== is strict equality: it compares value AND type with no coercion, unlike ==.", tag: "JavaScript" },
  ],
};

// Build a flat, shuffled pool for a subject ("all" = every subject mixed).
export function buildQuizPool(subjectId) {
  let items = [];
  if (subjectId === "all") {
    for (const s of QUIZ_SUBJECTS) items = items.concat(QUIZ[s.id].map((x) => ({ ...x, subject: s.id })));
  } else {
    items = (QUIZ[subjectId] || []).map((x) => ({ ...x, subject: subjectId }));
  }
  return items;
}

export function subjectMeta(id) {
  return QUIZ_SUBJECTS.find((s) => s.id === id) || { id, name: id, icon: "•", accent: "from-slate-500 to-slate-600" };
}
