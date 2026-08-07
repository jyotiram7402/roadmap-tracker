// data/company-qa.js — Company-wise interview questions.
// Structure: COMPANIES -> sets (role + experience) -> questions.
// Question shape matches the rest of the app:
//   { q, slug, answer: [ {kind:"text"|"example"|"note", text} | {kind:"code", lines:[]} ], learn }
// Answers are original write-ups of standard concepts (not copied from any post).

export const COMPANIES = [
  {
    id: "coforge",
    name: "Coforge",
    color: "text-orange-400 bg-orange-500/10",
    sets: [
      {
        id: "coforge-java-dev",
        role: "Java Developer",
        level: "2–5 yrs",
        questions: [
          {
            q: "RESTful vs other web services (REST vs SOAP)",
            slug: "rest-vs-soap-web-services",
            answer: [
              { kind: "text", text: "REST is an architectural style, not a protocol: it uses plain HTTP as the transport and models everything as a resource addressed by a URI. SOAP is a strict XML-based protocol with its own message envelope and a formal WSDL contract." },
              { kind: "text", text: "RESTful services are stateless, use standard HTTP methods (GET/POST/PUT/DELETE), identify resources by URIs, exchange lightweight JSON (or XML), are cacheable, and scale well — the default for modern web and mobile APIs." },
              { kind: "text", text: "SOAP services are protocol-based with a rigid XML format described by WSDL, can be stateful, and support WS-Security and ACID transactions — but they are heavier and more complex, which suits enterprise/legacy or transactional systems (banking, telecom)." },
              { kind: "code", lines: ["@RestController", "@RequestMapping(\"/api/users\")", "public class UserController {", "    @GetMapping(\"/{id}\")", "    public User get(@PathVariable Long id) { /* ... */ }", "    @PostMapping", "    public User create(@RequestBody User u) { /* ... */ }", "}"] },
              { kind: "note", text: "One-liner: REST = lightweight, stateless, resource-oriented over HTTP (usually JSON); SOAP = heavyweight, contract-first XML protocol with built-in security and transactions." },
            ],
            learn: "rest vs soap web services difference",
          },
          {
            q: "How does HashMap work internally?",
            slug: "hashmap-internal-working",
            answer: [
              { kind: "text", text: "A HashMap stores entries in an array of buckets — internally a Node[] table. Each Node holds the key, the value, the key's hash, and a next pointer for chaining within a bucket." },
              { kind: "text", text: "On put(key, value) it computes the key's hashCode(), spreads the bits (hash ^ (hash >>> 16)) to reduce collisions, and maps to a bucket index with (n - 1) & hash. An empty bucket stores the node directly; otherwise it appends to that bucket, handling the collision." },
              { kind: "text", text: "Collision handling: buckets start as a linked list. When a single bucket's chain length exceeds 8 AND the table capacity is at least 64, that bucket is treeified into a red-black tree, dropping worst-case lookup in it from O(n) to O(log n)." },
              { kind: "text", text: "Resizing: when the number of entries exceeds loadFactor × capacity, the table doubles and all entries are rehashed into the larger table. Defaults are initial capacity 16 and load factor 0.75." },
              { kind: "code", lines: ["Map<String,Integer> map = new HashMap<>(); // capacity 16, load 0.75", "map.put(\"a\", 1);   // hash(\"a\") -> index (n-1)&hash -> store Node", "map.get(\"a\");      // hash -> index -> walk bucket, compare via equals()", "", "// thresholds in java.util.HashMap:", "// TREEIFY_THRESHOLD = 8, MIN_TREEIFY_CAPACITY = 64"] },
              { kind: "note", text: "Always override hashCode() and equals() together for keys — a broken contract can put equal keys in different buckets and break get()." },
            ],
            learn: "how hashmap works internally in java treeify bucket",
          },
          {
            q: "Custom exceptions in Java & Spring Boot",
            slug: "custom-exception-java-spring-boot",
            answer: [
              { kind: "text", text: "Yes — create a custom exception by extending Exception for a checked exception (the caller must handle or declare it) or RuntimeException for an unchecked one (business/programming errors). Add constructors that pass a message (and optional cause) to super()." },
              { kind: "code", lines: ["// checked", "public class ResourceNotFoundException extends Exception {", "    public ResourceNotFoundException(String msg) { super(msg); }", "}", "", "// unchecked", "public class InvalidOrderException extends RuntimeException {", "    public InvalidOrderException(String msg) { super(msg); }", "}"] },
              { kind: "text", text: "In Spring Boot, handle them centrally with a @RestControllerAdvice class and @ExceptionHandler methods that map each exception to a proper HTTP status and response body — keeping controllers clean." },
              { kind: "code", lines: ["@RestControllerAdvice", "public class GlobalExceptionHandler {", "    @ExceptionHandler(InvalidOrderException.class)", "    public ResponseEntity<String> handle(InvalidOrderException ex) {", "        return ResponseEntity.status(HttpStatus.BAD_REQUEST)", "                             .body(ex.getMessage());", "    }", "}"] },
              { kind: "note", text: "For REST APIs, prefer unchecked exceptions and translate them to status codes in @RestControllerAdvice; return a structured error body (timestamp, message, path) in production." },
            ],
            learn: "custom exception java spring boot restcontrolleradvice",
          },
          {
            q: "How to check if a LinkedList has a cycle (is circular)?",
            slug: "linked-list-cycle-detection",
            answer: [
              { kind: "text", text: "Use Floyd's cycle detection — the tortoise-and-hare (slow and fast pointer) approach. Each iteration, move one pointer 1 step and the other 2 steps." },
              { kind: "text", text: "If the fast pointer reaches null (the end), the list has no cycle. If the slow and fast pointers ever meet, the list contains a cycle. It runs in O(n) time and O(1) space." },
              { kind: "code", lines: ["public boolean hasCycle(ListNode head) {", "    ListNode slow = head, fast = head;", "    while (fast != null && fast.next != null) {", "        slow = slow.next;              // 1 step", "        fast = fast.next.next;         // 2 steps", "        if (slow == fast) return true; // they met -> cycle", "    }", "    return false;                      // reached end -> no cycle", "}"] },
              { kind: "note", text: "A strictly circular list (tail points back to head) is just a special cycle, so Floyd's detects it. To also find the cycle's start: after they meet, move one pointer back to head and advance both by 1 — they meet at the start node." },
            ],
            learn: "detect cycle in linked list floyd tortoise hare",
          },
        ],
      },
    ],
  },
];

export function companyStats(c) {
  const qs = c.sets.reduce((n, s) => n + s.questions.length, 0);
  return { sets: c.sets.length, qs };
}
export function totalCompanyQuestions() {
  return COMPANIES.reduce((n, c) => n + companyStats(c).qs, 0);
}
export function googleLink(q) {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
