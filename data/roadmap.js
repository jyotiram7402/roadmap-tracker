// data/roadmap.js - the full 12-stage roadmap as structured data
// Each stage has sub-sections; each sub-section has checklist items

export const ROADMAP = [
  {
    id: "stage-1",
    title: "Stage 1: Foundations",
    duration: "1-2 months",
    description: "Computer science basics every developer must know",
    sections: [
      {
        id: "1.1",
        title: "How the Web Works",
        items: [
          "What happens when you type a URL and press enter (DNS, TCP, HTTPS, server, response)",
          "Client-server architecture",
          "Request-response cycle",
          "HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          "HTTP status codes: 1xx, 2xx, 3xx, 4xx, 5xx",
          "Headers: Content-Type, Authorization, Cache-Control, CORS",
          "Stateless protocol concept",
          "HTTPS / TLS handshake basics",
          "Browser caching, cookies, localStorage, sessionStorage",
          "REST vs SOAP vs GraphQL vs gRPC (just awareness)",
        ]
      },
      {
        id: "1.2",
        title: "Networking & Internet",
        items: [
          "OSI 7-layer model",
          "TCP vs UDP (and when each is used)",
          "DNS resolution",
          "Ports and sockets",
          "Proxies, reverse proxies, load balancers",
          "CDN basics",
          "Public IP vs private IP",
          "NAT basics",
        ]
      },
      {
        id: "1.3",
        title: "Operating System Basics",
        items: [
          "Processes vs threads",
          "Memory: stack vs heap",
          "File system basics (Linux)",
          "Common Linux commands: ls, cd, grep, find, awk, sed, ps, top, kill, chmod, chown",
          "Bash scripting basics",
          "SSH and key pairs",
          "Environment variables",
          "Cron jobs",
        ]
      },
      {
        id: "1.4",
        title: "Version Control with Git",
        items: [
          "Install Git, configure name/email",
          "git init, clone, add, commit, push, pull",
          "Branches: create, switch, merge, delete",
          "Merge vs rebase",
          "Resolve conflicts",
          "git stash, cherry-pick, reset, revert",
          "GitHub workflow: fork, PR, code review",
          "Tags and releases",
          "Conventional commit messages",
          ".gitignore best practices",
        ]
      },
    ]
  },
  {
    id: "stage-2",
    title: "Stage 2: Java Mastery",
    duration: "3-6 months",
    description: "From Java 8 to Java 25 — the foundation of your career",
    sections: [
      {
        id: "2.1",
        title: "Java Core Fundamentals",
        items: [
          "Install JDK 21+ (LTS), set JAVA_HOME and PATH",
          "Variables, primitive types, operators",
          "Control flow: if-else, switch (and switch expressions), loops",
          "Arrays and array operations",
          "Methods, parameters, return types, method overloading",
          "Classes, objects, constructors",
          "Encapsulation, inheritance, polymorphism, abstraction",
          "Access modifiers: public, private, protected, default",
          "static keyword (variables, methods, blocks)",
          "final keyword (variables, methods, classes)",
          "this and super keywords",
          "Interfaces and abstract classes (and when to use each)",
          "Object class methods: equals, hashCode, toString, clone",
          "Wrapper classes and autoboxing",
          "String, StringBuilder, StringBuffer",
          "Exception handling: try-catch-finally, throw, throws",
          "Checked vs unchecked exceptions",
          "try-with-resources",
          "Custom exceptions",
        ]
      },
      {
        id: "2.2",
        title: "Collections Framework",
        items: [
          "List: ArrayList, LinkedList, Vector",
          "Set: HashSet, LinkedHashSet, TreeSet",
          "Map: HashMap (internals!), LinkedHashMap, TreeMap, ConcurrentHashMap",
          "Queue and Deque: ArrayDeque, PriorityQueue, LinkedList as queue",
          "Iterator, ListIterator, Iterable",
          "Comparable vs Comparator",
          "Collections.sort, Collections.unmodifiableXxx",
          "When to choose which collection (by access pattern, thread safety, ordering)",
          "How HashMap works internally (hashing, buckets, treeification at 8 entries)",
          "ConcurrentHashMap segments and lock striping",
        ]
      },
      {
        id: "2.3",
        title: "Java 8+ Features (CRITICAL)",
        items: [
          "Lambda expressions",
          "Functional interfaces: Function, Predicate, Consumer, Supplier, BiFunction",
          "Method references (Class::method)",
          "Stream API: filter, map, flatMap, reduce, collect",
          "Stream collectors: toList, toMap, groupingBy, partitioningBy, joining",
          "Optional and how to avoid NullPointerException",
          "Default and static methods in interfaces",
          "Date/Time API: LocalDate, LocalDateTime, ZonedDateTime, Duration, Period",
          "Parallel streams (and when NOT to use them)",
        ]
      },
      {
        id: "2.4",
        title: "Java 9-25 Evolution",
        items: [
          "Java 9: modules, JShell, factory methods for collections (List.of, Map.of)",
          "Java 10: var (local variable type inference)",
          "Java 11 (LTS): HTTP Client API, String methods (isBlank, lines, strip)",
          "Java 12-13: switch expressions",
          "Java 14: records (preview)",
          "Java 15: text blocks, sealed classes (preview)",
          "Java 16: records and pattern matching for instanceof",
          "Java 17 (LTS): sealed classes finalized",
          "Java 18-20: incubating Project Loom",
          "Java 21 (LTS): virtual threads finalized, pattern matching for switch, sequenced collections",
          "Java 22-24: unnamed patterns, stream gatherers, statements before super()",
          "Java 25 (LTS): structured concurrency, scoped values, compact source files",
        ]
      },
      {
        id: "2.5",
        title: "Concurrency & Multithreading",
        items: [
          "Thread class and Runnable",
          "Thread states and lifecycle",
          "synchronized keyword and intrinsic locks",
          "volatile keyword",
          "wait, notify, notifyAll",
          "Executor framework, ExecutorService, ThreadPoolExecutor",
          "Future and CompletableFuture",
          "ReentrantLock, ReadWriteLock, StampedLock",
          "Atomic classes (AtomicInteger, AtomicReference, LongAdder)",
          "ConcurrentHashMap, CopyOnWriteArrayList",
          "ForkJoinPool basics",
          "Thread-safety patterns: immutability, ThreadLocal",
          "Deadlock, livelock, starvation",
          "Virtual threads (Java 21+) — game changer!",
          "Structured concurrency (Java 25)",
        ]
      },
      {
        id: "2.6",
        title: "JVM Internals & Performance",
        items: [
          "JVM memory areas: heap, stack, metaspace, code cache",
          "Young gen, old gen, eden, survivor",
          "Garbage collectors: Serial, Parallel, G1 (default), ZGC, Shenandoah",
          "GC tuning basics",
          "Heap dumps and analysis (MAT, VisualVM)",
          "Thread dumps and analysis",
          "JIT compilation: C1 vs C2 compilers",
          "JVM flags: -Xmx, -Xms, -XX:+UseG1GC",
          "Memory leak detection",
          "Profiling: JFR + JMC, async-profiler",
        ]
      },
    ]
  },
  {
    id: "stage-3",
    title: "Stage 3: Data Structures & Algorithms",
    duration: "3-6 months",
    description: "Get good at DSA — the gate to every product company",
    sections: [
      {
        id: "3.1",
        title: "DSA Foundations",
        items: [
          "Big O notation (time and space complexity)",
          "Best, average, worst case",
          "Recursion vs iteration",
          "Recursion call stack",
          "Memoization basics",
        ]
      },
      {
        id: "3.2",
        title: "Arrays & Strings",
        items: [
          "Two Sum (HashMap O(n))",
          "Best Time to Buy and Sell Stock",
          "Maximum Subarray (Kadane's)",
          "Container With Most Water (two pointers)",
          "3Sum (sort + two pointers)",
          "Trapping Rain Water (two pointers)",
          "Product of Array Except Self",
          "Rotate Array",
          "Longest Substring Without Repeating (sliding window)",
          "Group Anagrams",
          "Valid Palindrome",
          "Longest Palindromic Substring",
          "String Compression",
        ]
      },
      {
        id: "3.3",
        title: "Linked Lists",
        items: [
          "Reverse Linked List (iterative + recursive)",
          "Linked List Cycle Detection (Floyd's)",
          "Merge Two Sorted Lists",
          "Add Two Numbers (LL representation)",
          "Remove Nth Node from End",
          "Reorder List",
          "Copy List with Random Pointer",
        ]
      },
      {
        id: "3.4",
        title: "Stack & Queue",
        items: [
          "Valid Parentheses",
          "Min Stack",
          "Daily Temperatures (monotonic stack)",
          "Largest Rectangle in Histogram",
          "Implement Queue using Stacks",
          "Sliding Window Maximum",
        ]
      },
      {
        id: "3.5",
        title: "Trees & Binary Search",
        items: [
          "Binary Tree Traversals (preorder, inorder, postorder, level)",
          "Maximum Depth of Binary Tree",
          "Validate BST",
          "Lowest Common Ancestor (BST and general tree)",
          "Serialize/Deserialize Binary Tree",
          "Binary Tree Right Side View",
          "Binary Search and variants",
          "Search in Rotated Sorted Array",
          "Find First and Last Position",
        ]
      },
      {
        id: "3.6",
        title: "Heaps & Priority Queue",
        items: [
          "Kth Largest Element",
          "Top K Frequent Elements",
          "Find Median from Data Stream (two heaps)",
          "Merge K Sorted Lists",
        ]
      },
      {
        id: "3.7",
        title: "Graphs",
        items: [
          "BFS and DFS",
          "Number of Islands",
          "Course Schedule (topological sort)",
          "Clone Graph",
          "Word Ladder",
          "Pacific Atlantic Water Flow",
          "Dijkstra's algorithm",
          "Union-Find",
        ]
      },
      {
        id: "3.8",
        title: "Dynamic Programming",
        items: [
          "Climbing Stairs",
          "House Robber",
          "Coin Change",
          "Longest Increasing Subsequence",
          "Edit Distance",
          "0/1 Knapsack",
          "Longest Common Subsequence",
          "Word Break",
          "Decode Ways",
        ]
      },
      {
        id: "3.9",
        title: "Advanced",
        items: [
          "Implement Trie (Prefix Tree)",
          "LRU Cache (HashMap + Doubly Linked List)",
          "LFU Cache",
          "Backtracking: Permutations, Subsets, N-Queens",
          "Bit manipulation basics",
        ]
      },
    ]
  },
  {
    id: "stage-4",
    title: "Stage 4: Build Tools & Workflow",
    duration: "1 month",
    description: "Maven, Gradle, IntelliJ — your daily drivers",
    sections: [
      {
        id: "4.1",
        title: "Build Tools",
        items: [
          "Maven: pom.xml, dependencies, plugins, lifecycle",
          "Maven phases: compile, test, package, install, deploy",
          "Maven Wrapper",
          "Gradle basics (Kotlin DSL)",
          "Dependency management and version conflicts",
          "Maven profiles",
        ]
      },
      {
        id: "4.2",
        title: "IDE & Productivity",
        items: [
          "IntelliJ IDEA shortcuts mastery",
          "Live templates",
          "Debugger: breakpoints, watches, evaluate expression",
          "Refactoring tools (rename, extract method, etc.)",
          "Plugins: Lombok, SonarLint, GitToolBox, Database Tools",
          "Run configurations",
          "VCS integration",
        ]
      },
      {
        id: "4.3",
        title: "Logging & Debugging",
        items: [
          "SLF4J + Logback configuration",
          "Log levels: TRACE, DEBUG, INFO, WARN, ERROR",
          "Structured logging (JSON)",
          "MDC for request context",
          "Reading stack traces effectively",
          "Remote debugging",
        ]
      },
    ]
  },
  {
    id: "stage-5",
    title: "Stage 5: Front-End Foundation",
    duration: "2-3 months",
    description: "HTML, CSS, JavaScript, TypeScript",
    sections: [
      {
        id: "5.1",
        title: "HTML & CSS",
        items: [
          "Semantic HTML elements",
          "Forms and validation",
          "Accessibility (a11y) basics, ARIA",
          "CSS box model",
          "Flexbox (master this!)",
          "Grid",
          "Responsive design with media queries",
          "Mobile-first approach",
          "CSS variables (custom properties)",
          "Tailwind CSS basics",
        ]
      },
      {
        id: "5.2",
        title: "JavaScript Deep",
        items: [
          "Variables: var, let, const",
          "Data types and type coercion (== vs ===)",
          "Functions, arrow functions",
          "Closures (CRITICAL)",
          "this keyword and binding",
          "Prototypes and prototype chain",
          "Classes (ES6+)",
          "Destructuring, spread, rest",
          "Promises and async/await",
          "Event loop, macrotasks, microtasks",
          "Modules (ESM)",
          "Map, Set, WeakMap, WeakSet",
          "Generators",
          "Debounce and throttle",
          "Deep clone, shallow clone",
          "Event delegation",
          "Hoisting and TDZ",
        ]
      },
      {
        id: "5.3",
        title: "TypeScript",
        items: [
          "Basic types: string, number, boolean, array, tuple",
          "Interfaces vs type aliases",
          "Union and intersection types",
          "Generics",
          "Utility types: Partial, Pick, Omit, Record, ReturnType",
          "Type guards and narrowing",
          "Discriminated unions",
          "tsconfig.json essentials",
          "Strict mode",
        ]
      },
    ]
  },
  {
    id: "stage-6",
    title: "Stage 6: React Mastery",
    duration: "3-4 months",
    description: "Modern React with hooks, state management, and Next.js",
    sections: [
      {
        id: "6.1",
        title: "React Fundamentals",
        items: [
          "JSX syntax and rules",
          "Functional components",
          "Props and prop types",
          "useState hook",
          "useEffect hook (and cleanup)",
          "useRef and DOM access",
          "Conditional rendering",
          "Lists and keys",
          "Event handling",
          "Forms (controlled vs uncontrolled)",
          "Lifting state up",
          "Composition over inheritance",
        ]
      },
      {
        id: "6.2",
        title: "Advanced React",
        items: [
          "useContext for global state",
          "useReducer for complex state",
          "useMemo and useCallback (when to use)",
          "Custom hooks",
          "React.memo for component memoization",
          "Error Boundaries",
          "Portals",
          "React.lazy + Suspense (code splitting)",
          "React 18 concurrent features",
          "Server Components (React 19 / Next.js 14+)",
          "Form libraries: React Hook Form + Zod",
        ]
      },
      {
        id: "6.3",
        title: "State Management",
        items: [
          "Context API (built-in)",
          "Redux Toolkit",
          "Zustand (modern, minimal)",
          "Jotai or Recoil (atomic state)",
          "TanStack Query (React Query) for server state",
          "SWR",
        ]
      },
      {
        id: "6.4",
        title: "Routing & Frameworks",
        items: [
          "React Router v6+",
          "Next.js 14+ App Router",
          "Server Components vs Client Components",
          "Server Actions",
          "Data fetching patterns",
          "Dynamic routes and params",
          "Middleware",
          "Image and font optimization",
        ]
      },
      {
        id: "6.5",
        title: "Styling & UI",
        items: [
          "Tailwind CSS deep",
          "shadcn/ui components",
          "CSS Modules",
          "Styled Components / Emotion",
          "Framer Motion for animations",
        ]
      },
      {
        id: "6.6",
        title: "Testing",
        items: [
          "Jest basics",
          "React Testing Library (NOT Enzyme)",
          "Mock fetches and timers",
          "Playwright or Cypress for E2E",
          "MSW for API mocking",
        ]
      },
    ]
  },
  {
    id: "stage-7",
    title: "Stage 7: Databases",
    duration: "2-3 months",
    description: "SQL, NoSQL, Redis — the data layer",
    sections: [
      {
        id: "7.1",
        title: "SQL & RDBMS (MySQL/PostgreSQL)",
        items: [
          "Install MySQL/PostgreSQL locally",
          "SELECT, INSERT, UPDATE, DELETE",
          "WHERE, ORDER BY, GROUP BY, HAVING",
          "JOINs: INNER, LEFT, RIGHT, FULL, CROSS, SELF",
          "Subqueries and CTEs (WITH)",
          "Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD",
          "Indexes: B-tree, composite, covering, partial",
          "EXPLAIN / EXPLAIN ANALYZE to read query plans",
          "Transactions and ACID",
          "Isolation levels (read uncommitted to serializable)",
          "Locking: row-level, table-level, SELECT FOR UPDATE",
          "Normalization (1NF, 2NF, 3NF) and denormalization",
          "Stored procedures and functions",
          "Triggers",
          "Schema design for e-commerce, social app, etc.",
          "Database design interview problems",
        ]
      },
      {
        id: "7.2",
        title: "MongoDB",
        items: [
          "Documents and collections",
          "CRUD operations",
          "Query operators ($eq, $gt, $in, $regex)",
          "Aggregation pipeline ($match, $group, $project, $lookup, $unwind)",
          "Indexes: single, compound, text, TTL, geospatial",
          "Embedding vs referencing",
          "Replica sets",
          "Sharding",
          "Multi-document transactions",
          "Spring Boot integration with Spring Data MongoDB",
        ]
      },
      {
        id: "7.3",
        title: "Redis",
        items: [
          "Data structures: String, List, Hash, Set, Sorted Set, Stream",
          "TTL and expiration",
          "Pub/Sub",
          "Persistence: RDB vs AOF",
          "Eviction policies (LRU, LFU)",
          "Spring Boot integration",
          "Cache-aside pattern",
          "Distributed rate limiter (with Lua)",
          "Distributed lock (with Lua)",
          "Session storage",
          "Leaderboards with sorted sets",
        ]
      },
    ]
  },
  {
    id: "stage-8",
    title: "Stage 8: Spring Boot & Backend",
    duration: "4-6 months",
    description: "The framework that pays the rent",
    sections: [
      {
        id: "8.1",
        title: "Spring Core",
        items: [
          "Spring Boot project setup (start.spring.io)",
          "Auto-configuration",
          "Dependency Injection (@Autowired, constructor injection)",
          "Bean lifecycle and scopes",
          "@Component, @Service, @Repository, @Controller",
          "@Configuration and @Bean",
          "Profiles (@Profile, application-{profile}.yml)",
          "Externalized configuration",
          "@ConfigurationProperties",
        ]
      },
      {
        id: "8.2",
        title: "Spring Web (REST APIs)",
        items: [
          "@RestController, @RequestMapping",
          "@GetMapping, @PostMapping, etc.",
          "@PathVariable, @RequestParam, @RequestBody",
          "ResponseEntity",
          "@Valid with Bean Validation (JSR-380)",
          "Global exception handler (@RestControllerAdvice)",
          "Standardized error responses",
          "Pagination with Pageable",
          "Filtering with Specification API",
          "CORS configuration",
          "OpenAPI / Swagger (springdoc-openapi)",
          "File upload/download",
        ]
      },
      {
        id: "8.3",
        title: "Spring Data JPA",
        items: [
          "Entities and @Entity",
          "Relationships: @OneToMany, @ManyToOne, @ManyToMany",
          "Fetch types: LAZY vs EAGER",
          "JpaRepository methods",
          "Derived queries (findByEmailAndStatus)",
          "@Query (JPQL and native)",
          "@Modifying for updates/deletes",
          "Transactions: @Transactional propagation",
          "N+1 problem and solutions (JOIN FETCH, @EntityGraph)",
          "Auditing (@CreatedDate, @LastModifiedDate)",
          "Soft delete (@SQLDelete + @Where)",
          "Optimistic locking (@Version)",
          "Pessimistic locking (@Lock)",
        ]
      },
      {
        id: "8.4",
        title: "Spring Security",
        items: [
          "Authentication vs authorization",
          "SecurityFilterChain configuration",
          "UserDetailsService and PasswordEncoder",
          "BCrypt for password hashing",
          "JWT authentication implementation (complete flow)",
          "OAuth 2.0 / OpenID Connect",
          "Method-level security (@PreAuthorize)",
          "CSRF protection",
          "Spring Security testing",
        ]
      },
      {
        id: "8.5",
        title: "Kafka with Spring",
        items: [
          "Kafka basics: brokers, topics, partitions, offsets, consumer groups",
          "Producer setup with KafkaTemplate",
          "Consumer with @KafkaListener",
          "JSON serialization with Spring Kafka",
          "Error handling: DefaultErrorHandler",
          "Dead Letter Topic (DLT) pattern",
          "Exponential backoff retry",
          "Idempotent consumers",
          "Manual ack / acknowledgment modes",
        ]
      },
      {
        id: "8.6",
        title: "Microservices Patterns",
        items: [
          "Service discovery (Eureka or K8s native)",
          "API Gateway (Spring Cloud Gateway)",
          "OpenFeign for service-to-service calls",
          "Circuit breaker with Resilience4j",
          "Retry, bulkhead, timeout patterns",
          "Saga pattern (choreography vs orchestration)",
          "Distributed tracing (Micrometer + OpenTelemetry)",
          "Centralized config (Spring Cloud Config)",
        ]
      },
      {
        id: "8.7",
        title: "Async & Scheduling",
        items: [
          "@Async with custom ThreadPoolExecutor",
          "@Scheduled with cron, fixedRate, fixedDelay",
          "ShedLock for distributed scheduling",
          "WebClient (reactive HTTP client)",
        ]
      },
      {
        id: "8.8",
        title: "Testing",
        items: [
          "Unit tests with JUnit 5 + Mockito",
          "@WebMvcTest for controller slice testing",
          "@DataJpaTest for repository testing",
          "@SpringBootTest for integration tests",
          "TestContainers for real DB tests",
          "MockMvc",
        ]
      },
    ]
  },
  {
    id: "stage-9",
    title: "Stage 9: APIs & Integration",
    duration: "1-2 months",
    description: "GraphQL, gRPC, WebSockets, third-party integrations",
    sections: [
      {
        id: "9.1",
        title: "API Design",
        items: [
          "REST principles deep (stateless, cacheable, HATEOAS)",
          "Resource naming conventions",
          "Idempotency",
          "Pagination strategies (offset vs cursor)",
          "API versioning",
          "OpenAPI 3 specification",
          "Backward compatibility",
        ]
      },
      {
        id: "9.2",
        title: "GraphQL & gRPC",
        items: [
          "GraphQL schema, queries, mutations, subscriptions",
          "Spring for GraphQL",
          "N+1 problem and DataLoader",
          "gRPC and Protocol Buffers",
          "Streaming RPCs",
        ]
      },
      {
        id: "9.3",
        title: "Real-time",
        items: [
          "WebSocket protocol",
          "Spring WebSocket with STOMP",
          "Server-Sent Events (SSE)",
          "Real-time chat implementation",
        ]
      },
      {
        id: "9.4",
        title: "Security Deep",
        items: [
          "OWASP Top 10",
          "SQL injection prevention",
          "XSS prevention",
          "CSRF tokens",
          "Rate limiting strategies",
          "Secrets management (Vault, AWS Secrets Manager)",
          "HTTPS/TLS, HSTS, CSP headers",
        ]
      },
      {
        id: "9.5",
        title: "Third-party Integrations",
        items: [
          "Razorpay/Stripe payment integration + webhooks",
          "Email: SendGrid, AWS SES",
          "SMS: Twilio, MSG91",
          "S3 file storage",
          "OAuth providers (Google, GitHub)",
          "Firebase Cloud Messaging",
        ]
      },
    ]
  },
  {
    id: "stage-10",
    title: "Stage 10: DevOps & Cloud",
    duration: "2-3 months",
    description: "Docker, K8s, AWS, CI/CD — production reality",
    sections: [
      {
        id: "10.1",
        title: "Docker",
        items: [
          "Containers vs VMs",
          "Dockerfile instructions (FROM, COPY, RUN, CMD, ENTRYPOINT)",
          "Multi-stage builds (for Spring Boot — small images)",
          "docker build, run, ps, exec, logs",
          "Volumes and bind mounts",
          "Networks (bridge, host, custom)",
          "docker-compose for multi-container apps",
          "Image scanning (Trivy)",
          "Best practices: non-root user, .dockerignore, pinned versions",
        ]
      },
      {
        id: "10.2",
        title: "Kubernetes",
        items: [
          "Architecture: control plane + worker nodes",
          "Pods, Deployments, ReplicaSets",
          "Services: ClusterIP, NodePort, LoadBalancer",
          "Ingress and TLS",
          "ConfigMaps and Secrets",
          "Volumes and PVC",
          "Liveness, readiness, startup probes",
          "HPA (Horizontal Pod Autoscaler)",
          "StatefulSets, DaemonSets, Jobs, CronJobs",
          "Helm for templating",
          "kubectl debugging: logs, exec, describe, events",
        ]
      },
      {
        id: "10.3",
        title: "CI/CD",
        items: [
          "GitHub Actions workflows",
          "Build → test → scan → push → deploy pipeline",
          "Caching dependencies",
          "Secrets management in CI",
          "Blue-green deployment",
          "Canary deployment with Argo Rollouts/Flagger",
          "GitOps (ArgoCD, Flux)",
        ]
      },
      {
        id: "10.4",
        title: "AWS",
        items: [
          "IAM: users, roles, policies",
          "EC2, EBS, VPC, security groups",
          "S3 buckets, presigned URLs",
          "CloudFront CDN",
          "Route 53 DNS",
          "RDS (managed MySQL/Postgres)",
          "DynamoDB",
          "ElastiCache (Redis)",
          "Lambda (serverless)",
          "API Gateway",
          "SQS and SNS",
          "ECR + ECS or EKS",
          "CloudWatch (logs, metrics, alarms)",
          "Secrets Manager + KMS",
        ]
      },
      {
        id: "10.5",
        title: "Infrastructure as Code",
        items: [
          "Terraform: providers, resources, modules",
          "Terraform state (remote with S3 + DynamoDB)",
          "Workspaces",
          "Plan / apply / destroy cycle",
          "AWS CDK basics",
        ]
      },
      {
        id: "10.6",
        title: "Monitoring & Observability",
        items: [
          "Three pillars: logs, metrics, traces",
          "Prometheus + Grafana",
          "ELK or Loki + Grafana",
          "Distributed tracing: Jaeger, OpenTelemetry",
          "SLI / SLO / SLA, error budgets",
          "Incident response and postmortems",
        ]
      },
    ]
  },
  {
    id: "stage-11",
    title: "Stage 11: System Design",
    duration: "3-6 months",
    description: "The senior-engineer differentiator",
    sections: [
      {
        id: "11.1",
        title: "Low-Level Design (LLD)",
        items: [
          "SOLID principles (all 5)",
          "DRY, KISS, YAGNI",
          "Coupling and cohesion",
          "Composition over inheritance",
        ]
      },
      {
        id: "11.2",
        title: "Design Patterns",
        items: [
          "Creational: Singleton, Factory, Builder, Abstract Factory",
          "Structural: Adapter, Decorator, Facade, Proxy, Composite",
          "Behavioral: Strategy, Observer, Command, Template Method, State, Chain of Responsibility",
          "LLD problems: Parking Lot, Splitwise, Elevator, BookMyShow",
        ]
      },
      {
        id: "11.3",
        title: "HLD Building Blocks",
        items: [
          "CAP theorem",
          "Consistent hashing",
          "Load balancers (L4 vs L7)",
          "Caching strategies (cache-aside, write-through, write-back)",
          "Sharding strategies",
          "Database replication (master-slave, multi-master)",
          "Quorum-based consistency",
          "Eventual vs strong consistency",
          "Message queues (Kafka, RabbitMQ, SQS)",
          "CQRS and event sourcing",
          "Saga pattern",
          "Circuit breaker and bulkhead",
          "Bloom filters",
        ]
      },
      {
        id: "11.4",
        title: "Classic System Design Problems",
        items: [
          "Design URL Shortener (TinyURL/bit.ly)",
          "Design Rate Limiter",
          "Design Chat App (WhatsApp)",
          "Design Twitter / X feed",
          "Design Instagram",
          "Design Netflix",
          "Design Uber / ride-sharing",
          "Design Google Drive / Dropbox",
          "Design Web Crawler",
          "Design Search Autocomplete",
          "Design Notification System",
          "Design Payment System",
          "Design Distributed Cache",
          "Design Job Scheduler",
          "Design Leaderboard",
          "Design News Feed Ranking",
        ]
      },
      {
        id: "11.5",
        title: "Architecture Styles",
        items: [
          "Monolithic vs Modular Monolith vs Microservices",
          "Event-driven architecture",
          "Serverless architecture",
          "Hexagonal (Ports and Adapters)",
          "Clean architecture",
          "Domain-Driven Design (DDD): bounded contexts, aggregates",
        ]
      },
    ]
  },
  {
    id: "stage-12",
    title: "Stage 12: AI Engineering",
    duration: "2-4 months (and lifelong)",
    description: "The future-proof layer — GenAI / LLM apps",
    sections: [
      {
        id: "12.1",
        title: "AI / LLM Fundamentals",
        items: [
          "AI vs ML vs Deep Learning vs Generative AI",
          "What is a Transformer (intuition, not math)",
          "What is an LLM",
          "Tokens, context windows, model parameters",
          "Temperature, top-p, top-k",
          "Hallucinations and mitigations",
          "Embeddings and vector similarity",
        ]
      },
      {
        id: "12.2",
        title: "LLM APIs",
        items: [
          "OpenAI API (chat, embeddings)",
          "Anthropic Claude API",
          "Google Gemini API",
          "Token counting and cost estimation",
          "Streaming responses (SSE)",
          "Self-hosted models with Ollama",
        ]
      },
      {
        id: "12.3",
        title: "Prompt Engineering",
        items: [
          "Anatomy of a good prompt",
          "Zero-shot, few-shot, chain-of-thought",
          "Role prompting",
          "Output formatting (JSON)",
          "ReAct pattern",
          "Prompt injection and mitigations",
          "Prompt versioning and evaluation",
        ]
      },
      {
        id: "12.4",
        title: "RAG (Retrieval Augmented Generation)",
        items: [
          "Why RAG (vs fine-tuning)",
          "Pipeline: ingest → chunk → embed → store → retrieve → generate",
          "Embedding models (text-embedding-3, Cohere)",
          "Chunking strategies",
          "Vector databases: pgvector, Pinecone, Qdrant, Weaviate, Chroma",
          "Hybrid search (vector + keyword BM25)",
          "Re-ranking",
          "Query rewriting and HyDE",
          "RAG evaluation (RAGAS, faithfulness, relevance)",
        ]
      },
      {
        id: "12.5",
        title: "Spring AI (Java Native)",
        items: [
          "ChatClient and prompts",
          "Structured output to POJOs",
          "Embedding generation",
          "Vector Store abstraction (pgvector setup)",
          "Document readers and transformers",
          "Function calling (tools)",
          "Advisors (memory, RAG injection)",
        ]
      },
      {
        id: "12.6",
        title: "Agents & Tools",
        items: [
          "What is an AI agent",
          "Function calling deep",
          "ReAct loop",
          "LangChain4j",
          "Multi-agent collaboration",
          "Memory: short-term and long-term",
          "Agent evaluation",
          "MCP (Model Context Protocol)",
        ]
      },
      {
        id: "12.7",
        title: "Production AI",
        items: [
          "LLM observability (LangFuse, Helicone)",
          "Cost monitoring",
          "Guardrails: content filtering, PII detection",
          "Caching LLM responses (semantic cache)",
          "Build an AI customer support bot",
          "Build a RAG Q&A system over your docs",
          "Build a code review bot",
        ]
      },
    ]
  },
];

// Flatten helper - total item count for progress %
export function totalItems() {
  let count = 0;
  for (const stage of ROADMAP) {
    for (const section of stage.sections) {
      count += section.items.length;
    }
  }
  return count;
}

// Get a unique key for each item
export function itemKey(stageId, sectionId, idx) {
  return `${stageId}::${sectionId}::${idx}`;
}
