// Interview Preparation track. Track: interview-prep
export const ROADMAP = [
  {
    id: "ip-1",
    title: "Stage 1: DSA — Data Structures",
    duration: "5-6 weeks",
    description: "The backbone of coding interviews: arrays, strings, hashing, linked lists, stacks, queues, trees, and graphs — theory plus the classic problems asked on them.",
    sections: [
      {
        id: "1.1",
        title: "Array",
        items: [
          "Static vs dynamic arrays, contiguous memory, and O(1) random access",
          "In-place reversal, rotation, and two-pointer patterns",
          "Kadane's maximum subarray and prefix-sum techniques",
          "Sliding window for subarray/substring problems",
          "Dutch National Flag, merge intervals, and duplicate detection"
        ]
      },
      {
        id: "1.2",
        title: "String",
        items: [
          "Immutability, character arrays, and encoding (ASCII vs Unicode)",
          "Palindrome checks and anagram grouping",
          "Pattern matching (naive vs KMP) and substring search",
          "Longest substring without repeating characters",
          "String builders and the cost of concatenation"
        ]
      },
      {
        id: "1.3",
        title: "Hashing",
        items: [
          "Hash tables, hash functions, and load factor",
          "Collision resolution: chaining vs open addressing",
          "HashMap vs HashSet vs TreeMap trade-offs",
          "Two-sum, frequency counting, and first-unique problems",
          "Amortized O(1) lookups and worst-case degradation"
        ]
      },
      {
        id: "1.4",
        title: "Linked List",
        items: [
          "Singly vs doubly vs circular linked lists",
          "Reversing a list iteratively and recursively",
          "Fast/slow pointers: cycle detection and finding the middle",
          "Merging two sorted lists and removing the Nth node from end",
          "Linked list vs array trade-offs (insertion, cache locality)"
        ]
      },
      {
        id: "1.5",
        title: "Stack",
        items: [
          "LIFO semantics; array-backed vs linked implementation",
          "Balanced parentheses and expression evaluation",
          "Infix to postfix conversion",
          "Next greater element and monotonic stacks",
          "Min stack in O(1) and using stacks to emulate recursion"
        ]
      },
      {
        id: "1.6",
        title: "Queue",
        items: [
          "FIFO semantics, circular queues, and deques",
          "Implementing a queue with two stacks",
          "Priority queues and heaps (binary heap, heapify)",
          "Sliding window maximum with a deque",
          "Queue applications: BFS, scheduling, buffering"
        ]
      },
      {
        id: "1.7",
        title: "Tree",
        items: [
          "Binary trees, BSTs, height, and balance",
          "Traversals: inorder, preorder, postorder, level-order",
          "Height, diameter, and lowest common ancestor",
          "BST insert/search/delete and validation",
          "Balanced trees (AVL, Red-Black) and tries at a high level"
        ]
      },
      {
        id: "1.8",
        title: "Graph",
        items: [
          "Representations: adjacency list vs adjacency matrix",
          "BFS and DFS traversal and their uses",
          "Detecting cycles in directed and undirected graphs",
          "Topological sort and connected components",
          "Weighted graphs and the intro to shortest-path thinking"
        ]
      }
    ]
  },
  {
    id: "ip-2",
    title: "Stage 2: Algorithms",
    duration: "5-6 weeks",
    description: "Problem-solving paradigms and the algorithms interviewers love: searching, sorting, recursion, greedy, graph algorithms, dynamic programming, and bit manipulation.",
    sections: [
      {
        id: "2.1",
        title: "Searching",
        items: [
          "Linear vs binary search and preconditions",
          "Binary search on answer / on a monotonic predicate",
          "Search in rotated sorted array",
          "First/last occurrence and lower/upper bound",
          "Ternary search and interpolation search (awareness)"
        ]
      },
      {
        id: "2.2",
        title: "Sorting",
        items: [
          "Comparison sorts: quicksort, mergesort, heapsort",
          "Stability, in-place, and best/avg/worst complexity",
          "Non-comparison sorts: counting, radix, bucket",
          "Partitioning (Lomuto/Hoare) and pivot choice",
          "When to use which sort in practice"
        ]
      },
      {
        id: "2.3",
        title: "Recursion",
        items: [
          "Base case, recursive case, and the call stack",
          "Recursion vs iteration and stack overflow",
          "Backtracking: subsets, permutations, N-Queens",
          "Divide and conquer and the recursion tree",
          "Memoization to remove overlapping subproblems"
        ]
      },
      {
        id: "2.4",
        title: "Greedy",
        items: [
          "Greedy-choice property and optimal substructure",
          "Activity selection and interval scheduling",
          "Huffman coding and fractional knapsack",
          "When greedy fails vs when it is provably optimal",
          "Exchange-argument style correctness proofs"
        ]
      },
      {
        id: "2.5",
        title: "Graph Algorithms",
        items: [
          "Dijkstra's shortest path and its assumptions",
          "Bellman-Ford and negative edges",
          "Minimum spanning trees: Prim vs Kruskal",
          "Union-Find (DSU) with path compression",
          "Floyd-Warshall all-pairs shortest paths"
        ]
      },
      {
        id: "2.6",
        title: "Dynamic Programming",
        items: [
          "Overlapping subproblems and optimal substructure",
          "Top-down memoization vs bottom-up tabulation",
          "Knapsack, coin change, and subset-sum",
          "Longest common subsequence and edit distance",
          "Longest increasing subsequence and DP on grids/intervals"
        ]
      },
      {
        id: "2.7",
        title: "Bitwise",
        items: [
          "AND, OR, XOR, NOT, and shift operators",
          "Check/set/clear/toggle a bit and count set bits",
          "XOR tricks: single number, swap without temp",
          "Power-of-two checks and lowest set bit (n & -n)",
          "Bitmasking for subsets and DP state compression"
        ]
      }
    ]
  },
  {
    id: "ip-3",
    title: "Stage 3: Database (DBMS & SQL)",
    duration: "3-4 weeks",
    description: "Writing correct queries and understanding the engine underneath: joins, aggregation, normalization, ACID transactions, isolation levels, and indexing.",
    sections: [
      {
        id: "3.1",
        title: "SQL Queries",
        items: [
          "SELECT, WHERE, GROUP BY, HAVING, ORDER BY order of evaluation",
          "INNER, LEFT, RIGHT, FULL, and self joins",
          "Aggregates, subqueries, and correlated subqueries",
          "Window functions and second-highest-salary problems",
          "UNION vs UNION ALL and set operations"
        ]
      },
      {
        id: "3.2",
        title: "DBMS Concepts",
        items: [
          "Keys: primary, foreign, candidate, composite",
          "Normalization 1NF/2NF/3NF/BCNF and denormalization",
          "ER modeling and cardinality",
          "SQL vs NoSQL and when to choose each",
          "Views, stored procedures, and triggers"
        ]
      },
      {
        id: "3.3",
        title: "Transactions & Indexing",
        items: [
          "ACID properties explained",
          "Isolation levels and read anomalies",
          "Locking, deadlocks, and MVCC",
          "B-tree vs hash indexes and covering indexes",
          "When indexes help vs hurt (writes, selectivity)"
        ]
      }
    ]
  },
  {
    id: "ip-4",
    title: "Stage 4: System Design (HLD & LLD)",
    duration: "4-5 weeks",
    description: "Designing scalable systems at a high level and clean object models at a low level, including the core design patterns.",
    sections: [
      {
        id: "4.1",
        title: "HLD",
        items: [
          "Scalability: vertical vs horizontal, stateless services",
          "Load balancing, caching, and CDNs",
          "Database scaling: replication, sharding, partitioning",
          "CAP theorem and consistency models",
          "Message queues, rate limiting, and back-of-envelope estimation"
        ]
      },
      {
        id: "4.2",
        title: "LLD & Design Patterns",
        items: [
          "SOLID principles and clean class design",
          "Creational patterns: Singleton, Factory, Builder",
          "Structural patterns: Adapter, Decorator, Facade",
          "Behavioral patterns: Observer, Strategy, State",
          "UML class diagrams and modeling a real system (e.g., parking lot)"
        ]
      }
    ]
  },
  {
    id: "ip-5",
    title: "Stage 5: Aptitude & Puzzles",
    duration: "2-3 weeks",
    description: "Quantitative aptitude, logical reasoning, and the classic interview brain-teasers used in first-round screens.",
    sections: [
      {
        id: "5.1",
        title: "Quantitative",
        items: [
          "Percentages, ratios, and proportions",
          "Time, speed, and distance; time and work",
          "Profit, loss, and simple/compound interest",
          "Permutations, combinations, and probability",
          "Averages, ages, and number systems"
        ]
      },
      {
        id: "5.2",
        title: "Logical",
        items: [
          "Series, analogies, and coding-decoding",
          "Syllogisms and logical deduction",
          "Blood relations and directions",
          "Seating arrangement and puzzles",
          "Clocks, calendars, and Venn diagrams"
        ]
      },
      {
        id: "5.3",
        title: "Puzzles",
        items: [
          "Weighing and measuring puzzles",
          "River-crossing and bridge-crossing",
          "Probability and expected-value puzzles",
          "Lateral-thinking and estimation puzzles",
          "Explaining your reasoning out loud"
        ]
      }
    ]
  },
  {
    id: "ip-6",
    title: "Stage 6: Computer Science Subjects",
    duration: "4-5 weeks",
    description: "Core CS fundamentals that appear in every fresher and SDE interview: operating systems, computer networks, object-oriented programming, and DBMS theory.",
    sections: [
      {
        id: "6.1",
        title: "Operating Systems",
        items: [
          "Process vs thread and context switching",
          "CPU scheduling algorithms",
          "Deadlock: conditions, prevention, avoidance",
          "Memory management, paging, and virtual memory",
          "Synchronization: mutex, semaphore, race conditions"
        ]
      },
      {
        id: "6.2",
        title: "Computer Networks",
        items: [
          "OSI vs TCP/IP model",
          "TCP vs UDP and the three-way handshake",
          "DNS, HTTP/HTTPS, and what happens when you type a URL",
          "IP addressing, subnetting, and NAT",
          "Switches, routers, and the ARP protocol"
        ]
      },
      {
        id: "6.3",
        title: "OOP",
        items: [
          "Encapsulation, abstraction, inheritance, polymorphism",
          "Class vs object and constructors",
          "Overloading vs overriding",
          "Abstract classes vs interfaces",
          "Composition over inheritance"
        ]
      },
      {
        id: "6.4",
        title: "DBMS Theory",
        items: [
          "Relational model and relational algebra basics",
          "Functional dependencies and normal forms",
          "Transactions and concurrency control theory",
          "Indexing structures and query processing",
          "Storage: heap files, B+ trees, and the buffer pool"
        ]
      }
    ]
  },
  {
    id: "ip-7",
    title: "Stage 7: Web Development",
    duration: "3-4 weeks",
    description: "Frontend, backend, and the HTTP/API layer that connects them — the questions asked of full-stack and web-focused candidates.",
    sections: [
      {
        id: "7.1",
        title: "Frontend",
        items: [
          "HTML semantics and the DOM",
          "CSS box model, flexbox, and grid",
          "JavaScript event loop, closures, and this",
          "SPA frameworks (React) and component state",
          "Rendering: CSR vs SSR vs SSG and performance"
        ]
      },
      {
        id: "7.2",
        title: "Backend",
        items: [
          "Client-server model and the request lifecycle",
          "MVC and layered architecture",
          "Authentication vs authorization (JWT, sessions, OAuth)",
          "Middleware, routing, and error handling",
          "ORMs, connection pooling, and N+1 queries"
        ]
      },
      {
        id: "7.3",
        title: "HTTP & APIs",
        items: [
          "HTTP methods, status codes, and idempotency",
          "REST principles and resource design",
          "REST vs GraphQL vs gRPC",
          "CORS, cookies, and the same-origin policy",
          "Caching headers, ETags, and rate limiting"
        ]
      }
    ]
  },
  {
    id: "ip-8",
    title: "Stage 8: DevOps",
    duration: "3-4 weeks",
    description: "Containers, orchestration, delivery pipelines, and the cloud/observability layer used to run modern services.",
    sections: [
      {
        id: "8.1",
        title: "Docker & K8s",
        items: [
          "Containers vs virtual machines",
          "Dockerfile, images, layers, and multi-stage builds",
          "Docker networking and volumes",
          "Kubernetes pods, deployments, and services",
          "Scaling, self-healing, and rolling updates"
        ]
      },
      {
        id: "8.2",
        title: "CI/CD",
        items: [
          "Continuous integration vs delivery vs deployment",
          "Pipeline stages: build, test, scan, deploy",
          "Artifact registries and versioning",
          "Blue-green and canary deployments",
          "Infrastructure as Code (Terraform, Ansible)"
        ]
      },
      {
        id: "8.3",
        title: "Cloud & Monitoring",
        items: [
          "IaaS vs PaaS vs SaaS",
          "Compute, storage, and networking primitives",
          "Autoscaling and high availability",
          "Logging, metrics, and tracing (the three pillars)",
          "Alerting, SLIs/SLOs, and incident response"
        ]
      }
    ]
  },
  {
    id: "ip-9",
    title: "Stage 9: Data Science & Machine Learning",
    duration: "4-5 weeks",
    description: "ML fundamentals, the common models, and the practical workflow of building, evaluating, and deploying models.",
    sections: [
      {
        id: "9.1",
        title: "ML Fundamentals",
        items: [
          "Supervised vs unsupervised vs reinforcement learning",
          "Bias-variance trade-off and overfitting",
          "Train/validation/test splits and cross-validation",
          "Feature engineering, scaling, and encoding",
          "Loss functions and gradient descent"
        ]
      },
      {
        id: "9.2",
        title: "Models",
        items: [
          "Linear and logistic regression",
          "Decision trees, random forests, and gradient boosting",
          "SVM, KNN, and Naive Bayes",
          "K-means and PCA",
          "Neural networks and the basics of deep learning"
        ]
      },
      {
        id: "9.3",
        title: "Practical",
        items: [
          "Handling missing data and imbalanced classes",
          "Evaluation metrics: precision, recall, F1, ROC-AUC",
          "Regularization (L1/L2) and hyperparameter tuning",
          "Data leakage and reproducibility",
          "Model deployment and monitoring/drift"
        ]
      }
    ]
  },
  {
    id: "ip-10",
    title: "Stage 10: Data Analytics",
    duration: "2-3 weeks",
    description: "Turning data into insight: SQL and spreadsheet analysis, statistics for decisions, and clear visualization.",
    sections: [
      {
        id: "10.1",
        title: "SQL & Excel",
        items: [
          "Aggregations, joins, and window functions for analysis",
          "Pivoting and unpivoting data",
          "Excel: VLOOKUP/XLOOKUP, INDEX-MATCH, pivot tables",
          "Cleaning and deduplicating datasets",
          "Cohort and funnel analysis"
        ]
      },
      {
        id: "10.2",
        title: "Statistics",
        items: [
          "Descriptive stats: mean, median, variance, std dev",
          "Distributions and the central limit theorem",
          "Hypothesis testing and p-values",
          "Correlation vs causation",
          "A/B testing and confidence intervals"
        ]
      },
      {
        id: "10.3",
        title: "Visualization",
        items: [
          "Choosing the right chart for the data",
          "Dashboards and KPIs (Tableau/Power BI)",
          "Avoiding misleading charts",
          "Storytelling with data",
          "Color, labeling, and accessibility"
        ]
      }
    ]
  },
  {
    id: "ip-11",
    title: "Stage 11: Software Testing",
    duration: "2-3 weeks",
    description: "Fundamentals of quality, test automation, and API/performance testing.",
    sections: [
      {
        id: "11.1",
        title: "Fundamentals",
        items: [
          "Verification vs validation and the V-model",
          "Levels: unit, integration, system, acceptance",
          "Black-box vs white-box; boundary and equivalence",
          "Test case design and coverage metrics",
          "Bug life cycle and severity vs priority"
        ]
      },
      {
        id: "11.2",
        title: "Automation",
        items: [
          "When to automate vs test manually",
          "Selenium/Playwright and the page object model",
          "The test pyramid",
          "Flaky tests and stable selectors/waits",
          "Test data management and mocking"
        ]
      },
      {
        id: "11.3",
        title: "API/Performance",
        items: [
          "API testing with Postman/REST assured",
          "Status codes, schema, and contract testing",
          "Load, stress, and soak testing",
          "Throughput, latency, and percentiles",
          "Tools: JMeter/k6 and reading results"
        ]
      }
    ]
  },
  {
    id: "ip-12",
    title: "Stage 12: Mobile (Android)",
    duration: "3-4 weeks",
    description: "Android development interview essentials: Kotlin/Java language basics, the framework components, and Jetpack libraries.",
    sections: [
      {
        id: "12.1",
        title: "Kotlin/Java basics",
        items: [
          "val vs var, null safety, and data classes",
          "Kotlin coroutines vs Java threads",
          "Extension functions and higher-order functions",
          "Collections and lambdas",
          "Interoperability between Kotlin and Java"
        ]
      },
      {
        id: "12.2",
        title: "Android Components",
        items: [
          "Activity and Fragment lifecycles",
          "Intents, Services, and BroadcastReceivers",
          "ContentProviders and the manifest",
          "Handling configuration changes",
          "Context and memory-leak pitfalls"
        ]
      },
      {
        id: "12.3",
        title: "Jetpack",
        items: [
          "ViewModel and LiveData/StateFlow",
          "Room persistence library",
          "Navigation component and single-Activity apps",
          "Jetpack Compose vs XML views",
          "WorkManager and dependency injection (Hilt)"
        ]
      }
    ]
  },
  {
    id: "ip-13",
    title: "Stage 13: Programming Languages",
    duration: "5-6 weeks",
    description: "Language-specific interview questions across ten languages, each covering basics, OOP/interfaces, collections, exception handling, an advanced topic, and a practice snippet.",
    sections: [
      {
        id: "13.1",
        title: "C",
        items: [
          "Pointers, arrays, and pointer arithmetic",
          "Memory: stack vs heap, malloc/free",
          "Structs, unions, and typedef",
          "Function pointers and the preprocessor",
          "Undefined behavior and common pitfalls"
        ]
      },
      {
        id: "13.2",
        title: "C++",
        items: [
          "Classes, RAII, and the rule of three/five",
          "References vs pointers and const-correctness",
          "Templates and the STL",
          "Virtual functions, vtables, and polymorphism",
          "Smart pointers and move semantics"
        ]
      },
      {
        id: "13.3",
        title: "Java",
        items: [
          "JVM, JRE, JDK, and bytecode",
          "OOP, interfaces, and abstract classes",
          "Collections framework and generics",
          "Checked vs unchecked exceptions",
          "Garbage collection, equals/hashCode, and concurrency"
        ]
      },
      {
        id: "13.4",
        title: "Python",
        items: [
          "Dynamic typing, mutability, and duck typing",
          "Lists, dicts, sets, tuples, and comprehensions",
          "Classes, dunder methods, and the GIL",
          "Exceptions and context managers",
          "Decorators, generators, and iterators"
        ]
      },
      {
        id: "13.5",
        title: "JavaScript",
        items: [
          "var/let/const, hoisting, and scope",
          "Closures, this, and prototypes",
          "Event loop, callbacks, promises, async/await",
          "== vs ===, coercion, and truthiness",
          "Arrays, objects, and functional methods"
        ]
      },
      {
        id: "13.6",
        title: "TypeScript",
        items: [
          "Static typing on top of JavaScript",
          "Interfaces vs type aliases",
          "Generics and utility types",
          "Union, intersection, and narrowing",
          "strict mode, enums, and tsconfig"
        ]
      },
      {
        id: "13.7",
        title: "PHP",
        items: [
          "Variables, types, and superglobals",
          "Classes, traits, and interfaces",
          "Arrays (associative) and array functions",
          "Exceptions and error handling",
          "Composer, PDO, and modern PHP practices"
        ]
      },
      {
        id: "13.8",
        title: "R",
        items: [
          "Vectors, factors, and data frames",
          "Vectorized operations and recycling",
          "apply family and functional style",
          "S3 vs S4 object systems",
          "Packages: dplyr, ggplot2, and the tidyverse"
        ]
      },
      {
        id: "13.9",
        title: "Ruby",
        items: [
          "Everything is an object; symbols vs strings",
          "Blocks, procs, and lambdas",
          "Classes, modules, and mixins",
          "Exceptions with begin/rescue/ensure",
          "Metaprogramming and duck typing"
        ]
      },
      {
        id: "13.10",
        title: "CUDA",
        items: [
          "GPU vs CPU architecture and SIMT",
          "Kernels, threads, blocks, and grids",
          "Memory hierarchy: global, shared, registers",
          "Host-device transfers and synchronization",
          "Warps, coalescing, and occupancy"
        ]
      }
    ]
  }
];
