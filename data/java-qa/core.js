// data/java-qa/core.js — Core Java concepts, interview Q&A.
// Original explanations written from an interview point of view.
export const QUESTIONS = [
  {
    q: "StringBuilder vs StringBuffer",
    slug: "stringbuilder-vs-stringbuffer",
    answer: [
      { kind: "text", text: "Both are mutable sequences of characters used to build/modify strings without creating a new object on every change (unlike the immutable String). The key difference is synchronization: StringBuffer's methods are synchronized (thread-safe), while StringBuilder's are not." },
      { kind: "text", text: "Because StringBuilder skips locking, it is faster and is the default choice in single-threaded code. Use StringBuffer only when the same builder is shared and mutated across multiple threads." },
      { kind: "code", lines: ["StringBuilder sb = new StringBuilder();", "sb.append(\"Hello\").append(\" \").append(\"World\");", "String s = sb.toString();   // \"Hello World\", one object mutated in place"] },
      { kind: "note", text: "Interview trap: both have the same API and an initial capacity of 16. Concatenating Strings in a loop with '+' creates many temporary objects — use a builder instead." },
    ],
    learn: "stringbuilder vs stringbuffer difference java thread safe",
  },
  {
    q: "Importance of the Garbage Collector?",
    slug: "importance-of-garbage-collector",
    answer: [
      { kind: "text", text: "The Garbage Collector (GC) automatically reclaims heap memory occupied by objects that are no longer reachable from any live reference. It frees developers from manual memory management (like C/C++ malloc/free), preventing most memory leaks and dangling-pointer bugs." },
      { kind: "text", text: "The JVM decides WHEN to run GC — you cannot force it (System.gc() is only a hint). It works on the reachability principle: an object is eligible for collection when no chain of references from a GC root (stack variables, static fields, etc.) can reach it." },
      { kind: "example", text: "Like a restaurant busser clearing tables no one is sitting at anymore — you focus on the meal (business logic) while the busser reclaims space in the background." },
      { kind: "note", text: "GC does not guarantee zero leaks: objects that are still referenced but never used (e.g. forgotten entries in a static collection) stay in memory." },
    ],
    learn: "importance of garbage collection in java",
  },
  {
    q: "What is a memory leak in Java?",
    slug: "what-is-a-memory-leak-in-java",
    answer: [
      { kind: "text", text: "A memory leak in Java is when objects are no longer needed but are still reachable from a GC root, so the Garbage Collector cannot reclaim them. Over time the heap fills up, leading to degraded performance and eventually an OutOfMemoryError." },
      { kind: "text", text: "Common causes: unbounded static collections/caches that keep growing, unclosed resources (streams, connections), listeners/callbacks never unregistered, and inner classes holding an implicit outer reference." },
      { kind: "code", lines: ["static List<byte[]> cache = new ArrayList<>();", "void handle() {", "    cache.add(new byte[1_000_000]);   // never removed -> leak", "}"] },
      { kind: "note", text: "Fixes: bound caches or use WeakHashMap, always close resources (try-with-resources), and unregister listeners. Profilers like VisualVM/MAT help locate leaks." },
    ],
    learn: "memory leak in java causes and how to avoid",
  },
  {
    q: "Runtime vs Compilation Error?",
    slug: "runtime-vs-compilation-error",
    answer: [
      { kind: "text", text: "A compilation (compile-time) error is caught by the compiler before the program runs — syntax mistakes, type mismatches, missing semicolons, using an undeclared variable. The code simply won't compile until fixed." },
      { kind: "text", text: "A runtime error occurs while the program is executing, after it compiled successfully — e.g. NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException (divide by zero). These are exceptions/errors thrown by the JVM." },
      { kind: "code", lines: ["int x = \"hello\";        // compile error: incompatible types", "", "int[] a = new int[2];", "int y = a[5];           // runtime error: ArrayIndexOutOfBoundsException"] },
      { kind: "note", text: "Rule of thumb: compile errors are about correctness of syntax/types; runtime errors are about the state/data during execution and often need exception handling." },
    ],
    learn: "runtime error vs compile time error java difference",
  },
  {
    q: "What is exception handling?",
    slug: "what-is-exception-handling",
    answer: [
      { kind: "text", text: "Exception handling is Java's mechanism to deal with runtime anomalies gracefully instead of crashing. You wrap risky code in a try block, catch specific exceptions to recover or log, and optionally use finally for cleanup — keeping error-handling separate from normal logic." },
      { kind: "text", text: "When an exception is thrown, the JVM unwinds the call stack looking for a matching catch. If none is found, the thread terminates and the stack trace is printed. throw raises an exception; throws declares that a method may propagate one." },
      { kind: "code", lines: ["try {", "    int r = 10 / divisor;", "} catch (ArithmeticException e) {", "    System.out.println(\"Cannot divide by zero\");", "} finally {", "    System.out.println(\"always runs\");", "}"] },
      { kind: "example", text: "Like a safety net under a trapeze artist — if something goes wrong mid-act you catch the fall and recover instead of the whole show stopping." },
    ],
    learn: "exception handling in java try catch finally",
  },
  {
    q: "Can you create a custom Exception?",
    slug: "can-you-create-a-custom-exception",
    answer: [
      { kind: "text", text: "Yes. Extend Exception (for a checked exception) or RuntimeException (for an unchecked one) and typically add constructors that pass a message and cause to super(). Custom exceptions make errors domain-specific and self-documenting." },
      { kind: "code", lines: ["class InsufficientFundsException extends RuntimeException {", "    InsufficientFundsException(String msg) {", "        super(msg);", "    }", "}", "", "if (amount > balance)", "    throw new InsufficientFundsException(\"Balance too low\");"] },
      { kind: "note", text: "Choice matters: extend RuntimeException for programming/business errors callers shouldn't be forced to catch; extend Exception when callers must handle a recoverable condition." },
    ],
    learn: "how to create custom exception in java",
  },
  {
    q: "Is it mandatory to use finally?",
    slug: "is-finally-mandatory",
    answer: [
      { kind: "text", text: "No. finally is optional. A valid try must be followed by at least one catch OR a finally (or both) — but you never need finally specifically. Use it when you have cleanup that must run whether or not an exception occurs (closing files, releasing locks)." },
      { kind: "code", lines: ["// valid: try + catch, no finally", "try { risky(); } catch (Exception e) { log(e); }", "", "// valid: try + finally, no catch", "try { risky(); } finally { cleanup(); }"] },
      { kind: "note", text: "try-with-resources often removes the need for finally, since resources implementing AutoCloseable are closed automatically." },
    ],
    learn: "is finally block mandatory in java",
  },
  {
    q: "Checked vs Unchecked Exceptions",
    slug: "checked-vs-unchecked-exceptions",
    answer: [
      { kind: "text", text: "Checked exceptions are verified at COMPILE time — the compiler forces you to either catch them or declare them with throws (e.g. IOException, SQLException). They extend Exception (but not RuntimeException) and represent recoverable, external conditions." },
      { kind: "text", text: "Unchecked exceptions extend RuntimeException and are NOT checked at compile time — they usually signal programming bugs (NullPointerException, IllegalArgumentException, ArrayIndexOutOfBoundsException). Errors (like OutOfMemoryError) are also unchecked." },
      { kind: "code", lines: ["// checked: must handle or declare", "void read() throws IOException { new FileReader(\"x.txt\"); }", "", "// unchecked: no compiler requirement", "String s = null;", "s.length();   // NullPointerException at runtime"] },
      { kind: "note", text: "Hierarchy: Throwable -> {Error, Exception}; Exception -> {RuntimeException (unchecked), all others (checked)}." },
    ],
    learn: "checked vs unchecked exceptions java difference",
  },
  {
    q: "Can we use multiple try blocks?",
    slug: "can-we-use-multiple-try-blocks",
    answer: [
      { kind: "text", text: "Yes. You can have several independent try-catch blocks one after another in the same method. Each try must still have its own catch and/or finally. What you cannot do is attach multiple sibling try blocks to a single set of catches." },
      { kind: "code", lines: ["try {", "    parseInput();", "} catch (NumberFormatException e) { /* ... */ }", "", "try {", "    saveToDb();", "} catch (SQLException e) { /* ... */ }"] },
      { kind: "note", text: "Separate try blocks let you isolate and recover from each failure point independently rather than aborting on the first error." },
    ],
    learn: "multiple try blocks in java",
  },
  {
    q: "Can we use nested try blocks?",
    slug: "can-we-use-nested-try-blocks",
    answer: [
      { kind: "text", text: "Yes. A try block can contain another try-catch inside it. If the inner block throws an exception it can't handle, it propagates outward to the enclosing catch. This is useful when an inner operation needs its own local recovery." },
      { kind: "code", lines: ["try {", "    try {", "        int r = 10 / x;", "    } catch (ArithmeticException e) {", "        System.out.println(\"inner: divide by zero\");", "    }", "    int[] a = new int[2]; a[5] = 1;   // handled by outer", "} catch (ArrayIndexOutOfBoundsException e) {", "    System.out.println(\"outer: bad index\");", "}"] },
      { kind: "note", text: "Keep nesting shallow — deeply nested try blocks hurt readability. Often refactoring into separate methods is cleaner." },
    ],
    learn: "nested try blocks in java example",
  },
  {
    q: "Is it mandatory to use catch?",
    slug: "is-catch-mandatory",
    answer: [
      { kind: "text", text: "No. catch is optional as long as the try is paired with a finally. A try can be followed by catch only, finally only, or both — but a try alone (with neither) is a compile error." },
      { kind: "code", lines: ["// legal: try-finally, no catch", "try {", "    lock.lock();", "    doWork();", "} finally {", "    lock.unlock();   // cleanup guaranteed", "}"] },
      { kind: "note", text: "With try-finally and no catch, any exception still propagates up the call stack after finally runs — you just aren't handling it here." },
    ],
    learn: "is catch block mandatory in java try finally",
  },
  {
    q: "Can we use multiple catch blocks?",
    slug: "can-we-use-multiple-catch-blocks",
    answer: [
      { kind: "text", text: "Yes. A single try can have multiple catch blocks to handle different exception types differently. They are checked top-to-bottom, and the first matching one runs. Since Java 7 you can also combine types in a multi-catch with the '|' operator." },
      { kind: "code", lines: ["try {", "    process();", "} catch (FileNotFoundException e) {", "    // specific first", "} catch (IOException | SQLException e) {", "    // multi-catch (Java 7+)", "} catch (Exception e) {", "    // most general last", "}"] },
      { kind: "note", text: "Order matters: a more specific subclass must come BEFORE its superclass, otherwise the code won't compile ('exception has already been caught')." },
    ],
    learn: "multiple catch blocks java multi-catch order",
  },
  {
    q: "Can we use nested catch blocks?",
    slug: "can-we-use-nested-catch-blocks",
    answer: [
      { kind: "text", text: "Yes — you can place a try-catch INSIDE a catch block. This is handy when your recovery/cleanup code itself might throw an exception (for example, logging or a fallback that can also fail)." },
      { kind: "code", lines: ["try {", "    primary();", "} catch (IOException e) {", "    try {", "        fallback();          // recovery might also fail", "    } catch (Exception ex) {", "        System.out.println(\"fallback failed too\");", "    }", "}"] },
      { kind: "note", text: "Be careful not to swallow the original exception — chain it (new Exception(msg, e)) so the root cause isn't lost." },
    ],
    learn: "nested catch block inside catch java",
  },
  {
    q: "Can we use multiple finally blocks?",
    slug: "can-we-use-multiple-finally-blocks",
    answer: [
      { kind: "text", text: "Not for a single try. Each try-catch structure can have exactly ONE finally block. However, if you have multiple (separate or nested) try blocks, each one may have its own finally — so multiple finally blocks can exist in a method, just not attached to the same try." },
      { kind: "code", lines: ["try { a(); } finally { cleanupA(); }   // one finally", "try { b(); } finally { cleanupB(); }   // another try, its own finally"] },
      { kind: "note", text: "Attempting two finally blocks on the same try is a compile error." },
    ],
    learn: "can we have multiple finally blocks java",
  },
  {
    q: "Nested finally blocks?",
    slug: "nested-finally-blocks",
    answer: [
      { kind: "text", text: "Yes — since a finally block can contain its own try-catch-finally, you can nest them. Each finally is tied to its own try. The inner finally runs before control returns to the outer structure." },
      { kind: "code", lines: ["try {", "    outer();", "} finally {", "    try {", "        closeInner();", "    } finally {", "        System.out.println(\"inner finally\");", "    }", "    System.out.println(\"outer finally\");", "}"] },
      { kind: "note", text: "Avoid returning or throwing from a finally — it can silently discard exceptions and return values from the try block." },
    ],
    learn: "nested finally blocks java behaviour",
  },
  {
    q: "Can we have just try & finally (no catch)?",
    slug: "try-finally-without-catch",
    answer: [
      { kind: "text", text: "Yes. try-finally without a catch is perfectly legal and common. You use it when you don't want to handle the exception here (let it propagate) but you MUST run cleanup code regardless — releasing a lock, closing a resource, etc." },
      { kind: "code", lines: ["lock.lock();", "try {", "    updateSharedState();   // may throw", "} finally {", "    lock.unlock();         // always released", "}"] },
      { kind: "note", text: "If the try throws, finally runs and then the exception continues up the stack. try-with-resources is the modern, cleaner alternative for closeable resources." },
    ],
    learn: "try finally without catch java",
  },
  {
    q: "Difference between final, finally, and finalize()?",
    slug: "final-finally-finalize-difference",
    answer: [
      { kind: "text", text: "They are unrelated despite similar names. final is a KEYWORD/modifier: a final variable is a constant, a final method can't be overridden, a final class can't be extended. finally is a BLOCK that always runs after try/catch for cleanup. finalize() is a METHOD (Object.finalize()) the GC once called before reclaiming an object." },
      { kind: "code", lines: ["final int MAX = 100;                    // constant", "try { work(); } finally { close(); }    // cleanup block", "protected void finalize() { }           // deprecated GC hook"] },
      { kind: "note", text: "finalize() is deprecated (since Java 9) and unreliable — never depend on it; use try-with-resources or Cleaner/AutoCloseable instead." },
    ],
    learn: "final vs finally vs finalize java difference",
  },
  {
    q: "When to use Generic Collections?",
    slug: "when-to-use-generic-collections",
    answer: [
      { kind: "text", text: "Use generics (type parameters like List<String>) whenever a collection holds a known type. They give compile-time type safety, eliminate manual casting, and make code self-documenting. Without generics you'd store Objects and risk ClassCastException at runtime." },
      { kind: "code", lines: ["// generic: safe, no cast", "List<String> names = new ArrayList<>();", "names.add(\"Ann\");", "String n = names.get(0);", "", "// raw type: unsafe, needs cast", "List raw = new ArrayList();", "raw.add(42);", "String bad = (String) raw.get(0);   // ClassCastException"] },
      { kind: "note", text: "Generics use type erasure — parameters exist at compile time but are erased at runtime, so you can't do new T() or check 'x instanceof List<String>'." },
    ],
    learn: "why use generics collections java type safety",
  },
  {
    q: "What is a HashMap and why use it?",
    slug: "what-is-a-hashmap-and-why-use-it",
    answer: [
      { kind: "text", text: "HashMap is a key-value store implementing the Map interface, backed by a hash table. It gives average O(1) time for put, get, and remove by hashing the key to locate its bucket. Keys are unique; it allows one null key and multiple null values." },
      { kind: "text", text: "Use it whenever you need fast lookups by a unique key — caches, counting frequencies, indexing records by id. It is unordered and NOT thread-safe." },
      { kind: "code", lines: ["Map<String, Integer> ages = new HashMap<>();", "ages.put(\"Ann\", 30);", "ages.put(\"Bob\", 25);", "int a = ages.get(\"Ann\");            // 30, O(1) average", "ages.getOrDefault(\"Cid\", 0);        // 0 if absent"] },
      { kind: "note", text: "If you need insertion order use LinkedHashMap; for sorted keys use TreeMap (O(log n))." },
    ],
    learn: "what is hashmap in java and why use it",
  },
  {
    q: "How is HashMap implemented internally?",
    slug: "how-is-hashmap-implemented-internally",
    answer: [
      { kind: "text", text: "HashMap holds an array of buckets (Node[] table). For each key it computes hashCode(), applies an internal spreading function, and maps it to a bucket index (hash & (n-1)). Entries in the same bucket (collisions) form a linked list; equals() distinguishes keys within a bucket." },
      { kind: "text", text: "Since Java 8, when a bucket's list exceeds 8 entries (and capacity >= 64) it converts to a balanced red-black TREE, improving worst-case lookup from O(n) to O(log n). When size exceeds capacity * load factor (default 0.75), the table resizes (doubles) and rehashes." },
      { kind: "code", lines: ["// simplified bucket index", "int hash = key.hashCode();", "hash = hash ^ (hash >>> 16);      // spread high bits", "int index = hash & (capacity - 1);"] },
      { kind: "note", text: "Default capacity 16, load factor 0.75. This is why keys need consistent hashCode()/equals() — a broken hashCode scatters or clusters entries and kills performance." },
    ],
    learn: "hashmap internal working java 8 treeify load factor",
  },
  {
    q: "What is hashCode()?",
    slug: "what-is-hashcode",
    answer: [
      { kind: "text", text: "hashCode() is a method from Object that returns an int used by hash-based collections (HashMap, HashSet) to decide which bucket an object belongs to. It converts an object into an integer 'fingerprint' for fast lookup." },
      { kind: "text", text: "The contract: (1) equal objects (per equals()) MUST return the same hashCode; (2) unequal objects SHOULD ideally return different codes but aren't required to. Violating rule 1 breaks HashMap/HashSet — you may store a key and never find it again." },
      { kind: "code", lines: ["class Point {", "    int x, y;", "    @Override public boolean equals(Object o) { /* compare x,y */ }", "    @Override public int hashCode() { return Objects.hash(x, y); }", "}"] },
      { kind: "note", text: "Golden rule: whenever you override equals(), you MUST override hashCode() too, using the same fields." },
    ],
    learn: "hashcode method java equals contract",
  },
  {
    q: "Comparator vs Comparable",
    slug: "comparator-vs-comparable",
    answer: [
      { kind: "text", text: "Comparable defines the NATURAL ordering of a class itself — you implement compareTo() inside the class (one sort order, e.g. by id). Comparator is an EXTERNAL strategy — a separate object implementing compare() that defines an alternate ordering without touching the class." },
      { kind: "code", lines: ["class Emp implements Comparable<Emp> {", "    int id; String name;", "    public int compareTo(Emp o) { return this.id - o.id; }   // natural", "}", "", "// external orderings", "Comparator<Emp> byName = Comparator.comparing(e -> e.name);", "list.sort(byName);", "list.sort(Comparator.comparingInt((Emp e) -> e.id).reversed());"] },
      { kind: "note", text: "Use Comparable for the single obvious ordering; use Comparator(s) when you need multiple/configurable orderings, or can't modify the class." },
    ],
    learn: "comparator vs comparable java difference example",
  },
  {
    q: "What is Multithreading?",
    slug: "what-is-multithreading",
    answer: [
      { kind: "text", text: "Multithreading is running multiple threads (independent paths of execution) within a single process concurrently. Threads share the process's memory/heap but each has its own stack. It improves responsiveness and throughput by overlapping work — e.g. doing I/O on one thread while computing on another." },
      { kind: "example", text: "Like a restaurant kitchen where several cooks (threads) work in parallel in the same kitchen (process), sharing the ingredients (memory) but each handling their own dish." },
      { kind: "code", lines: ["Runnable task = () -> System.out.println(\"in thread\");", "new Thread(task).start();   // runs concurrently with main"] },
      { kind: "note", text: "Sharing memory is the double-edged sword: it enables communication but creates race conditions, requiring synchronization." },
    ],
    learn: "what is multithreading in java",
  },
  {
    q: "Process vs Thread?",
    slug: "process-vs-thread",
    answer: [
      { kind: "text", text: "A process is an independent program in execution with its OWN memory space; processes are isolated and communicate via IPC. A thread is a lightweight unit of execution WITHIN a process — threads of the same process share memory (heap, code, data) but have separate stacks and program counters." },
      { kind: "text", text: "Threads are cheaper to create and switch between than processes, and communication is easy (shared memory) but requires synchronization. A crash in one thread can bring down the whole process; a crashed process doesn't affect others." },
      { kind: "example", text: "A process is a house; threads are the people living in it sharing the same rooms and fridge. Different houses (processes) don't share anything directly." },
      { kind: "note", text: "One-liner: process = isolated memory, heavy; thread = shared memory, light." },
    ],
    learn: "process vs thread difference java operating system",
  },
  {
    q: "Concurrency vs Parallelism?",
    slug: "concurrency-vs-parallelism",
    answer: [
      { kind: "text", text: "Concurrency is DEALING with many tasks at once — they make progress by interleaving, possibly on a single core via time-slicing. Parallelism is DOING many tasks at the exact same instant, which requires multiple cores/CPUs." },
      { kind: "text", text: "Concurrency is about structure (managing multiple tasks); parallelism is about execution (literally simultaneous). You can have concurrency without parallelism (one core juggling threads), and parallelism is a way to execute concurrent tasks faster." },
      { kind: "example", text: "Concurrency: one barista taking and juggling several orders, switching between them. Parallelism: several baristas each making one drink at the same time." },
      { kind: "note", text: "Java: ExecutorService/threads give concurrency; parallel streams and multi-core execution give parallelism." },
    ],
    learn: "concurrency vs parallelism difference explained",
  },
  {
    q: "Is HashMap thread-safe? How to make it thread-safe?",
    slug: "is-hashmap-thread-safe",
    answer: [
      { kind: "text", text: "No, HashMap is NOT thread-safe. Concurrent modification can corrupt its internal structure (historically even causing infinite loops on resize) or throw ConcurrentModificationException, and updates can be lost." },
      { kind: "text", text: "To make it thread-safe: (1) ConcurrentHashMap — the preferred, high-performance option using fine-grained/bucket-level locking; (2) Collections.synchronizedMap(map) — wraps with a single lock (coarse, slower); (3) Hashtable — legacy, fully synchronized, avoid in new code." },
      { kind: "code", lines: ["Map<String,Integer> m = new ConcurrentHashMap<>();   // best", "Map<String,Integer> s = Collections.synchronizedMap(new HashMap<>());"] },
      { kind: "note", text: "ConcurrentHashMap does not allow null keys or values, and its iterators are weakly consistent (won't throw ConcurrentModificationException)." },
    ],
    learn: "is hashmap thread safe concurrenthashmap java",
  },
  {
    q: "What are Immutable classes in Java?",
    slug: "what-are-immutable-classes",
    answer: [
      { kind: "text", text: "An immutable class is one whose objects' state cannot change after construction. String, Integer, and the other wrapper classes are immutable. Any 'modifying' operation returns a NEW object instead of altering the original." },
      { kind: "text", text: "Recipe to make one: mark the class final (no subclassing), make all fields private final, set them only in the constructor, provide no setters, and defensively copy any mutable objects on the way in and out (in getters)." },
      { kind: "code", lines: ["final class Money {", "    private final int amount;", "    private final String currency;", "    Money(int amount, String currency) {", "        this.amount = amount;", "        this.currency = currency;", "    }", "    int getAmount() { return amount; }        // no setters", "}"] },
      { kind: "note", text: "Records (Java 16+) are a concise way to create shallowly immutable data carriers." },
    ],
    learn: "immutable class in java how to create",
  },
  {
    q: "Why do you want to make a class immutable?",
    slug: "why-make-a-class-immutable",
    answer: [
      { kind: "text", text: "Immutability brings thread safety for free — since state never changes, immutable objects can be shared across threads without synchronization. They are also safe to use as HashMap keys or HashSet elements because their hashCode never changes." },
      { kind: "text", text: "Other benefits: simpler reasoning (no unexpected mutation/side effects), safe caching and sharing, and good defensive design (no need to copy them). The trade-off is more object creation, since every change produces a new object." },
      { kind: "example", text: "Like a printed certificate: once issued it can't be altered, so anyone can trust and copy it freely without worrying someone changed it underneath them." },
      { kind: "note", text: "This is why String is immutable — safe sharing in the string pool, usable as a key, and secure (can't be changed after validation)." },
    ],
    learn: "benefits of immutable classes java thread safety",
  },
  {
    q: "How to implement a Thread (both ways)?",
    slug: "how-to-implement-a-thread",
    answer: [
      { kind: "text", text: "Two ways. (1) Extend Thread and override run(), then call start(). (2) Implement Runnable, put the code in run(), and pass the instance to a Thread. Implementing Runnable is preferred because it keeps your class free to extend something else and separates the task from the thread." },
      { kind: "code", lines: ["// Way 1: extend Thread", "class MyThread extends Thread {", "    public void run() { System.out.println(\"running\"); }", "}", "new MyThread().start();", "", "// Way 2: implement Runnable (preferred)", "Runnable r = () -> System.out.println(\"running\");", "new Thread(r).start();"] },
      { kind: "note", text: "Always call start() (which creates a new thread and invokes run()), NOT run() directly — calling run() just executes it on the current thread." },
    ],
    learn: "how to create thread in java runnable extend thread",
  },
  {
    q: "Difference between Thread and Runnable?",
    slug: "thread-vs-runnable",
    answer: [
      { kind: "text", text: "Thread is a CLASS representing an actual thread of execution; Runnable is a functional INTERFACE representing just the task (the code to run). Extending Thread ties your task to being a thread and uses up your single inheritance slot; implementing Runnable is a decoupled task you can pass to any Thread or an ExecutorService." },
      { kind: "code", lines: ["// Runnable = the job; Thread = the worker that runs it", "Runnable job = () -> doWork();", "Thread worker = new Thread(job);", "worker.start();", "", "// also reusable with executors", "executor.submit(job);"] },
      { kind: "note", text: "Best practice: favour Runnable (or Callable, which returns a result) with an ExecutorService rather than extending Thread." },
    ],
    learn: "thread vs runnable difference java which is better",
  },
  {
    q: "What is thread-safety?",
    slug: "what-is-thread-safety",
    answer: [
      { kind: "text", text: "Thread-safety means code behaves correctly when accessed by multiple threads simultaneously — shared mutable state stays consistent with no race conditions, lost updates, or visibility problems, regardless of thread scheduling." },
      { kind: "text", text: "It is achieved by synchronization (synchronized methods/blocks, locks), atomic classes (AtomicInteger), immutability, thread-confinement (local variables), or using concurrent collections (ConcurrentHashMap). The 'volatile' keyword ensures visibility of a field across threads." },
      { kind: "code", lines: ["class Counter {", "    private int count = 0;", "    public synchronized void inc() { count++; }   // atomic + visible", "    public synchronized int get() { return count; }", "}"] },
      { kind: "note", text: "count++ is NOT atomic (read-modify-write) — without synchronization concurrent increments lose updates." },
    ],
    learn: "what is thread safety in java how to achieve",
  },
  {
    q: "Life cycle of a Thread?",
    slug: "life-cycle-of-a-thread",
    answer: [
      { kind: "text", text: "A thread moves through defined states (the Thread.State enum): NEW (created, not started), RUNNABLE (started, ready/running), BLOCKED (waiting to acquire a lock), WAITING (waiting indefinitely via wait()/join()), TIMED_WAITING (waiting with a timeout, e.g. sleep(ms)), and TERMINATED (run() finished)." },
      { kind: "code", lines: ["Thread t = new Thread(task);   // NEW", "t.start();                     // RUNNABLE", "// -> RUNNING when scheduled", "// -> BLOCKED / WAITING / TIMED_WAITING on lock, wait, sleep", "// -> TERMINATED when run() returns"] },
      { kind: "example", text: "Like an employee: hired (NEW), clocked in and working/available (RUNNABLE), waiting on a meeting room (BLOCKED), on a break (WAITING/TIMED_WAITING), and finished for good (TERMINATED)." },
      { kind: "note", text: "'Running' is not a separate JVM state — it's part of RUNNABLE, controlled by the OS scheduler." },
    ],
    learn: "thread life cycle states java",
  },
  {
    q: "What are wait(), notify(), and notifyAll()?",
    slug: "wait-notify-notifyall",
    answer: [
      { kind: "text", text: "They are Object methods for inter-thread communication (the monitor/wait-notify mechanism). wait() releases the object's lock and pauses the thread until notified; notify() wakes one waiting thread; notifyAll() wakes all waiting threads (they then re-contend for the lock)." },
      { kind: "text", text: "They MUST be called from within a synchronized block/method on the same object whose monitor you hold, otherwise you get IllegalMonitorStateException. Always call wait() inside a while loop that re-checks the condition, to guard against spurious wakeups." },
      { kind: "code", lines: ["synchronized (lock) {", "    while (!ready) {", "        lock.wait();        // releases lock, waits", "    }", "    consume();", "}", "// producer thread:", "synchronized (lock) { ready = true; lock.notifyAll(); }"] },
      { kind: "note", text: "Classic use: producer-consumer. Prefer notifyAll() over notify() to avoid stranded threads. Higher-level tools (BlockingQueue, Condition) are usually cleaner." },
    ],
    learn: "wait notify notifyall java producer consumer",
  },
];
