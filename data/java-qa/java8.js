// data/java-qa/java8.js — Java 8 & Streams, interview Q&A.
// Original explanations written from an interview point of view.
export const QUESTIONS = [
  {
    q: "Print the frequency of each character in a string using Streams",
    slug: "char-frequency-using-streams",
    answer: [
      { kind: "text", text: "Split the string into characters, then use Collectors.groupingBy with Collectors.counting() to build a Map<Character, Long>. chars() gives an IntStream of code points, so map each int to a Character before grouping." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "String s = \"banana\";", "Map<Character, Long> freq = s.chars()", "        .mapToObj(c -> (char) c)", "        .collect(Collectors.groupingBy(c -> c, Collectors.counting()));", "System.out.println(freq);"] },
      { kind: "note", text: "Output: {a=3, b=1, n=2}. Use LinkedHashMap via groupingBy(c -> c, LinkedHashMap::new, counting()) if you need insertion order preserved." },
    ],
    learn: "count character frequency in string using java 8 streams",
  },
  {
    q: "Print a list of integers using Streams",
    slug: "print-list-of-integers-using-streams",
    answer: [
      { kind: "text", text: "Call forEach on the stream (or directly on the list) and pass a method reference System.out::println. forEach is a terminal operation that consumes each element." },
      { kind: "code", lines: ["import java.util.*;", "", "List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);", "nums.stream().forEach(System.out::println);", "", "// print on one line, comma-separated:", "String line = nums.stream()", "        .map(String::valueOf)", "        .collect(java.util.stream.Collectors.joining(\", \"));", "System.out.println(line);"] },
      { kind: "note", text: "For a plain list you can skip .stream() and call nums.forEach(System.out::println) directly — Iterable also has forEach." },
    ],
    learn: "print list of integers using java 8 stream forEach",
  },
  {
    q: "Print the non-duplicate (unique) characters from a string using Streams",
    slug: "unique-characters-using-streams",
    answer: [
      { kind: "text", text: "Two readings of 'unique'. (1) Distinct characters — use distinct(). (2) Characters that appear exactly once — group by character, count, then keep entries with count 1. The second is the more common interview intent." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "String s = \"programming\";", "", "// characters that occur exactly once, preserving order", "String result = s.chars()", "        .mapToObj(c -> (char) c)", "        .collect(Collectors.groupingBy(c -> c, LinkedHashMap::new, Collectors.counting()))", "        .entrySet().stream()", "        .filter(e -> e.getValue() == 1)", "        .map(e -> String.valueOf(e.getKey()))", "        .collect(Collectors.joining());", "System.out.println(result);"] },
      { kind: "note", text: "Output for \"programming\": \"poain\". For just distinct chars instead use: s.chars().distinct().mapToObj(c -> (char) c)...." },
    ],
    learn: "print non repeating unique characters from string java 8 stream",
  },
  {
    q: "Given a list of employees, sort the list by employee name in reverse order",
    slug: "sort-employees-by-name-reverse",
    answer: [
      { kind: "text", text: "Use Comparator.comparing(Employee::getName) to build the natural (A-Z) comparator, then .reversed() to flip it to Z-A. Pass it to sorted() in a stream, or to List.sort() to sort in place." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "List<Employee> sorted = employees.stream()", "        .sorted(Comparator.comparing(Employee::getName).reversed())", "        .collect(Collectors.toList());", "", "// or in place:", "employees.sort(Comparator.comparing(Employee::getName).reversed());"] },
      { kind: "note", text: "Gotcha: order matters — comparing(...).reversed() reverses the whole key. For case-insensitive sorting use comparing(Employee::getName, String.CASE_INSENSITIVE_ORDER)." },
    ],
    learn: "sort list of objects by field in reverse order java 8 comparator",
  },
  {
    q: "Given a list of employees, get the highest salary",
    slug: "highest-salary-using-streams",
    answer: [
      { kind: "text", text: "Use max() with a comparator on salary — it returns an Optional<Employee> because the list could be empty. Or map to the salary and use a DoubleStream's max() when you only need the number." },
      { kind: "code", lines: ["import java.util.*;", "", "Optional<Employee> top = employees.stream()", "        .max(Comparator.comparingDouble(Employee::getSalary));", "top.ifPresent(e -> System.out.println(e.getName() + \": \" + e.getSalary()));", "", "// only the value:", "double maxSalary = employees.stream()", "        .mapToDouble(Employee::getSalary)", "        .max()", "        .orElse(0);"] },
      { kind: "note", text: "max() returns Optional, so never call .get() blindly — use ifPresent/orElse to guard the empty case." },
    ],
    learn: "find max salary employee using java 8 stream max comparator",
  },
  {
    q: "Given a list of employees, group the employees by department",
    slug: "group-employees-by-department",
    answer: [
      { kind: "text", text: "Collectors.groupingBy with a classifier function (the department) produces a Map<String, List<Employee>> — one bucket per department, each holding the matching employees." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "Map<String, List<Employee>> byDept = employees.stream()", "        .collect(Collectors.groupingBy(Employee::getDepartment));", "byDept.forEach((dept, list) -> System.out.println(dept + \" -> \" + list.size()));"] },
      { kind: "note", text: "You can add a downstream collector, e.g. groupingBy(Employee::getDepartment, Collectors.counting()) to get a count per department instead of the full list." },
    ],
    learn: "group list of employees by department java 8 collectors groupingBy",
  },
  {
    q: "Given a list of employees, get the highest salary by department",
    slug: "highest-salary-by-department",
    answer: [
      { kind: "text", text: "Use groupingBy with a downstream collector. maxBy(comparator) gives the top-earning Employee per department (as Optional); or collectingAndThen to unwrap it; or mapping + maxBy if you only want the salary number." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "Map<String, Optional<Employee>> topByDept = employees.stream()", "        .collect(Collectors.groupingBy(", "                Employee::getDepartment,", "                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary))));", "", "// just the max salary per department:", "Map<String, Double> maxSalaryByDept = employees.stream()", "        .collect(Collectors.groupingBy(", "                Employee::getDepartment,", "                Collectors.mapping(Employee::getSalary,", "                        Collectors.maxBy(Comparator.naturalOrder()))))", "        .entrySet().stream()", "        .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().orElse(0.0)));"] },
      { kind: "note", text: "To avoid the Optional wrapper, wrap maxBy in Collectors.collectingAndThen(maxBy(...), Optional::get) — safe only when each group is guaranteed non-empty." },
    ],
    learn: "highest salary per department java 8 groupingBy maxBy downstream collector",
  },
  {
    q: "Given words like {apple, banana}, return the count of each character in each word separately using streams",
    slug: "char-count-per-word-using-streams",
    answer: [
      { kind: "text", text: "Iterate the words and, for each, build a per-character frequency map with the same groupingBy+counting technique. The outer structure is a Map<String, Map<Character, Long>> — one inner map per word." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "List<String> words = Arrays.asList(\"apple\", \"banana\");", "", "Map<String, Map<Character, Long>> result = words.stream()", "        .collect(Collectors.toMap(", "                w -> w,", "                w -> w.chars()", "                        .mapToObj(c -> (char) c)", "                        .collect(Collectors.groupingBy(c -> c, Collectors.counting()))));", "", "result.forEach((word, counts) -> System.out.println(word + \": \" + counts));"] },
      { kind: "note", text: "Output: apple: {a=1, p=2, l=1, e=1}, banana: {a=3, b=1, n=2}. Use LinkedHashMap in the inner groupingBy if you need each character in first-seen order." },
    ],
    learn: "count characters in each word separately using java 8 streams",
  },
  {
    q: "What are Streams? How are they different from Collections?",
    slug: "streams-vs-collections",
    answer: [
      { kind: "text", text: "A Stream is a pipeline for processing a sequence of elements with functional-style operations (map, filter, reduce). It is NOT a data structure — it holds no storage; it just carries elements from a source (a collection, array, I/O) through operations to a result." },
      { kind: "text", text: "Key differences: a Collection stores data and you pull elements out (external iteration); a Stream computes data on demand and pushes elements through the pipeline (internal iteration). Streams are lazy, can be traversed only once, and don't modify their source." },
      { kind: "example", text: "A Collection is water stored in a bucket; a Stream is water flowing through a pipe — you attach filters/taps (operations) and only when you open the end tap (terminal op) does water actually flow." },
      { kind: "note", text: "A stream is single-use: once a terminal operation runs, reusing it throws IllegalStateException. Collections can be iterated many times." },
    ],
    learn: "difference between stream and collection in java 8",
  },
  {
    q: "What are functional interfaces?",
    slug: "what-are-functional-interfaces",
    answer: [
      { kind: "text", text: "A functional interface is an interface with exactly ONE abstract method (a SAM — Single Abstract Method). It can have any number of default/static methods. Because it has a single contract, it can be the target type of a lambda expression or method reference." },
      { kind: "code", lines: ["@FunctionalInterface", "interface Calculator {", "    int operate(int a, int b);        // the single abstract method", "    default void log() { System.out.println(\"calc\"); }  // allowed", "}", "", "Calculator add = (a, b) -> a + b;    // lambda assigned to it", "System.out.println(add.operate(2, 3));  // 5"] },
      { kind: "note", text: "@FunctionalInterface is optional but recommended — it makes the compiler enforce the single-abstract-method rule. Methods inherited from Object (equals, hashCode) don't count toward the one abstract method." },
    ],
    learn: "functional interface in java 8 single abstract method",
  },
  {
    q: "What is a lambda expression?",
    slug: "what-is-a-lambda-expression",
    answer: [
      { kind: "text", text: "A lambda is a concise, anonymous function — a block of behaviour you can pass around as a value. Syntax: (parameters) -> body. It implements the single abstract method of a functional interface without the boilerplate of an anonymous class." },
      { kind: "code", lines: ["// (params) -> expression", "Runnable r = () -> System.out.println(\"run\");", "Comparator<String> byLen = (a, b) -> a.length() - b.length();", "", "// with a block body", "Function<Integer, Integer> square = x -> {", "    return x * x;", "};"] },
      { kind: "example", text: "Instead of writing a whole class to say 'when clicked, print hi', you hand over just the behaviour: button.onClick(() -> print(\"hi\"))." },
      { kind: "note", text: "A lambda captures effectively-final local variables from its enclosing scope, and its 'this' refers to the enclosing instance (unlike an anonymous class, where 'this' is the anonymous object itself)." },
    ],
    learn: "lambda expression syntax java 8 with example",
  },
  {
    q: "What are default and static methods in interfaces?",
    slug: "default-and-static-methods-in-interfaces",
    answer: [
      { kind: "text", text: "Java 8 let interfaces carry method bodies. A default method (keyword default) provides an implementation that implementing classes inherit and may override — it lets you add methods to an interface without breaking existing implementers. A static method belongs to the interface itself and is called as InterfaceName.method()." },
      { kind: "code", lines: ["interface Vehicle {", "    void start();                       // abstract", "    default void honk() {               // inherited, overridable", "        System.out.println(\"Beep\");", "    }", "    static Vehicle create() {           // called as Vehicle.create()", "        return () -> System.out.println(\"start\");", "    }", "}"] },
      { kind: "note", text: "Default methods enabled evolving interfaces like Collection (e.g. forEach, stream) without forcing every implementer to change. Static interface methods are NOT inherited by implementing classes." },
    ],
    learn: "default and static methods in interface java 8",
  },
  {
    q: "Terminal vs Intermediate stream operations?",
    slug: "terminal-vs-intermediate-operations",
    answer: [
      { kind: "text", text: "Intermediate operations (map, filter, sorted, distinct, limit) transform a stream into another stream and are LAZY — they only describe work and return a new stream. Terminal operations (collect, forEach, reduce, count, findFirst) trigger execution and produce a result or side effect; after one runs the stream is consumed." },
      { kind: "code", lines: ["long count = list.stream()", "        .filter(s -> s.length() > 3)   // intermediate (lazy)", "        .map(String::toUpperCase)      // intermediate (lazy)", "        .count();                      // terminal (runs the pipeline)"] },
      { kind: "note", text: "Without a terminal operation, no intermediate op executes — the pipeline does nothing. This laziness lets the stream fuse operations and short-circuit (e.g. findFirst, limit)." },
    ],
    learn: "intermediate vs terminal operations in java 8 streams",
  },
  {
    q: "What are Parallel Streams?",
    slug: "what-are-parallel-streams",
    answer: [
      { kind: "text", text: "A parallel stream splits its data into chunks and processes them concurrently across multiple threads, then combines the results. You opt in with parallelStream() or .parallel(). Under the hood it uses the common ForkJoinPool to divide work." },
      { kind: "code", lines: ["import java.util.*;", "", "long sum = numbers.parallelStream()", "        .mapToLong(Integer::longValue)", "        .sum();", "", "// or convert a sequential stream:", "list.stream().parallel().forEach(System.out::println);"] },
      { kind: "note", text: "Only a win for large datasets with CPU-heavy, independent, stateless operations. Operations must not share mutable state or rely on encounter order, or results become non-deterministic." },
    ],
    learn: "parallel streams in java 8 forkjoinpool",
  },
  {
    q: "What is a lambda vs an anonymous function/class?",
    slug: "lambda-vs-anonymous-class",
    answer: [
      { kind: "text", text: "Both let you supply behaviour inline, but a lambda is shorthand only for a functional interface (one abstract method) and is far more concise. An anonymous class can implement an interface with many methods or extend a class, and can hold its own state/fields." },
      { kind: "text", text: "Semantic differences: in a lambda 'this' refers to the enclosing instance; in an anonymous class 'this' refers to the anonymous object. A lambda does not create a new scope for names and compiles via invokedynamic rather than generating a separate .class file." },
      { kind: "code", lines: ["// anonymous class", "Runnable a = new Runnable() {", "    public void run() { System.out.println(\"hi\"); }", "};", "", "// equivalent lambda", "Runnable b = () -> System.out.println(\"hi\");"] },
      { kind: "note", text: "Use a lambda for a single-method interface; reach for an anonymous class when you need multiple methods, instance fields, or to extend a class." },
    ],
    learn: "lambda expression vs anonymous inner class java difference",
  },
  {
    q: "What is a default method in Java 8?",
    slug: "what-is-a-default-method",
    answer: [
      { kind: "text", text: "A default method is a method in an interface with a full body, marked with the default keyword. Implementing classes inherit it automatically and may override it. It was added so libraries could grow their interfaces without breaking the thousands of classes already implementing them." },
      { kind: "code", lines: ["interface MyCollection<E> {", "    boolean add(E e);", "    int size();", "    default boolean isEmptyDefault() {", "        return size() == 0;          // reuse existing abstract methods", "    }", "}"] },
      { kind: "example", text: "Iterable.forEach and Collection.stream are real default methods — they were added in Java 8, yet every pre-existing List/Set implementation kept compiling because the default body applied automatically." },
      { kind: "note", text: "Also called a 'defender method' or 'virtual extension method'. It solves the interface-evolution problem." },
    ],
    learn: "default method in java 8 interface evolution",
  },
  {
    q: "If two interfaces have default methods with the same name, how do you resolve it?",
    slug: "resolve-duplicate-default-methods",
    answer: [
      { kind: "text", text: "When a class implements two interfaces that each provide a default method with the same signature, the compiler cannot choose and reports an error. You MUST override the method in your class to resolve the ambiguity. Inside the override you can delegate to a specific one with InterfaceName.super.method()." },
      { kind: "code", lines: ["interface A { default void hello(){ System.out.println(\"A\"); } }", "interface B { default void hello(){ System.out.println(\"B\"); } }", "", "class C implements A, B {", "    @Override", "    public void hello() {", "        A.super.hello();     // explicitly pick A's version", "    }", "}"] },
      { kind: "note", text: "This is Java's answer to the diamond problem for default methods — resolution is forced onto the programmer, not guessed by the compiler." },
    ],
    learn: "two interfaces same default method conflict resolution java 8",
  },
  {
    q: "Default methods in interfaces — why are they needed and how are conflicts resolved?",
    slug: "default-methods-need-and-conflicts",
    answer: [
      { kind: "text", text: "Why needed: to evolve interfaces without breaking backward compatibility. Before Java 8, adding a method to a published interface broke every implementing class. Default methods let the JDK add stream(), forEach(), removeIf() etc. to existing interfaces safely." },
      { kind: "text", text: "Conflict resolution rules, in order: (1) a concrete method in a CLASS always wins over any interface default; (2) the most specific sub-interface wins over its super-interface; (3) if two unrelated interfaces clash, the class must override and may call X.super.method()." },
      { kind: "code", lines: ["// rule 1: class/superclass method beats interface default", "// rule 2: sub-interface default beats super-interface default", "// rule 3: unrelated clash -> must override", "class C implements A, B {", "    public void m() { A.super.m(); }", "}"] },
      { kind: "note", text: "Mnemonic: 'Class wins, then most-specific interface, then you decide.'" },
    ],
    learn: "why default methods needed and conflict resolution rules java 8",
  },
  {
    q: "Explain lambda expressions. Why were they introduced?",
    slug: "lambda-expressions-why-introduced",
    answer: [
      { kind: "text", text: "A lambda is an anonymous function you can treat as data: (args) -> body. It gives Java a compact way to express behaviour that previously required a bulky anonymous class implementing a single-method interface." },
      { kind: "text", text: "Why introduced: to enable functional-style programming and, crucially, to make the Stream API usable. Passing behaviour (a predicate, a mapper) to library methods becomes readable, and it lets the JVM/library decide how to run it (e.g. in parallel)." },
      { kind: "code", lines: ["// before Java 8", "list.sort(new Comparator<String>() {", "    public int compare(String a, String b){ return a.length()-b.length(); }", "});", "", "// with a lambda", "list.sort((a, b) -> a.length() - b.length());"] },
      { kind: "note", text: "Lambdas reduce boilerplate, enable behaviour parameterization, and pair with functional interfaces + streams — they were the flagship feature of Java 8." },
    ],
    learn: "why were lambda expressions introduced in java 8",
  },
  {
    q: "Difference between a lambda expression and an anonymous inner class?",
    slug: "lambda-vs-anonymous-inner-class-difference",
    answer: [
      { kind: "text", text: "Applicability: a lambda works only with a functional interface (one abstract method); an anonymous inner class can implement any interface or extend any class. State: an anonymous class can declare instance fields; a lambda cannot." },
      { kind: "text", text: "'this' meaning: inside a lambda, this = the enclosing object; inside an anonymous class, this = the anonymous instance itself. Compilation: a lambda uses invokedynamic (no extra class file), while each anonymous class generates its own Outer$1.class." },
      { kind: "code", lines: ["Runnable anon = new Runnable() {", "    int local = 5;                  // fields allowed", "    public void run() { System.out.println(this.local); }  // this = anon", "};", "Runnable lam = () -> System.out.println(this);  // this = enclosing instance"] },
      { kind: "note", text: "Both can only capture effectively-final local variables. Prefer lambdas for single-method interfaces; use anonymous classes when you need state or multiple methods." },
    ],
    learn: "lambda vs anonymous inner class this keyword compilation difference",
  },
  {
    q: "What is a Functional Interface? Name commonly used ones.",
    slug: "functional-interface-common-ones",
    answer: [
      { kind: "text", text: "A functional interface has a single abstract method, so it can be implemented by a lambda. java.util.function provides the standard ones used across the Stream API." },
      { kind: "code", lines: ["// core functional interfaces (java.util.function)", "Predicate<T>        boolean test(T t)        // filter", "Function<T,R>        R apply(T t)             // map", "Consumer<T>          void accept(T t)        // forEach", "Supplier<T>          T get()                 // lazy supply", "Comparator<T>        int compare(T a, T b)   // sorting", "BiFunction<T,U,R>    R apply(T t, U u)", "UnaryOperator<T>     T apply(T t)            // Function<T,T>", "BinaryOperator<T>    T apply(T a, T b)       // reduce"] },
      { kind: "note", text: "Others you should know: Runnable, Callable, BiPredicate, BiConsumer, and the primitive-specialized ones (IntPredicate, ToIntFunction, IntSupplier) that avoid boxing." },
    ],
    learn: "common functional interfaces java 8 predicate function consumer supplier",
  },
  {
    q: "What happens if a functional interface has two abstract methods?",
    slug: "functional-interface-two-abstract-methods",
    answer: [
      { kind: "text", text: "It is no longer a functional interface. If you mark it @FunctionalInterface, the compiler rejects it with an error. Even without the annotation, you cannot assign a lambda to it because the compiler can't know which method the lambda implements." },
      { kind: "code", lines: ["@FunctionalInterface", "interface Bad {", "    void a();", "    void b();     // compile error: not a functional interface", "}"] },
      { kind: "note", text: "Exception: methods that override public methods of java.lang.Object (equals, hashCode, toString) do NOT count toward the single-abstract-method limit — so an interface with one real method plus 'boolean equals(Object)' is still functional." },
    ],
    learn: "functional interface with two abstract methods compile error java",
  },
  {
    q: "Explain the Stream API. How is it different from Collections?",
    slug: "stream-api-vs-collections",
    answer: [
      { kind: "text", text: "The Stream API (java.util.stream) processes sequences of elements through a declarative pipeline: a source, zero or more intermediate operations, and one terminal operation. You describe WHAT to compute, not HOW to loop." },
      { kind: "text", text: "vs Collections: a Collection is about storing and managing data in memory; a Stream is about computing over data. Streams don't store elements, don't mutate the source, use internal iteration, are lazy, and are single-use." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "List<String> names = Arrays.asList(\"Ann\", \"Bob\", \"Al\");", "List<String> aNames = names.stream()", "        .filter(n -> n.startsWith(\"A\"))", "        .sorted()", "        .collect(Collectors.toList());   // [Al, Ann]"] },
      { kind: "note", text: "Rule of thumb: use a Collection to hold data, a Stream to process it. A stream can be built FROM a collection but is not a replacement for one." },
    ],
    learn: "java 8 stream api explained vs collections framework",
  },
  {
    q: "Difference between intermediate and terminal operations in streams?",
    slug: "intermediate-vs-terminal-difference",
    answer: [
      { kind: "text", text: "Intermediate operations return a new Stream and are lazy — they queue up transformations (filter, map, sorted, peek, distinct, limit) but run nothing on their own. Terminal operations return a non-stream result (collect, forEach, reduce, count, anyMatch) and trigger the whole pipeline, consuming the stream." },
      { kind: "code", lines: ["Stream<Integer> pipeline = Stream.of(1, 2, 3, 4)", "        .filter(n -> n % 2 == 0)   // intermediate: nothing runs yet", "        .map(n -> n * 10);         // intermediate: still nothing", "List<Integer> out = pipeline.collect(", "        java.util.stream.Collectors.toList());  // terminal: NOW it runs -> [20, 40]"] },
      { kind: "note", text: "Tell-tale sign: an intermediate op's return type is Stream<...>; a terminal op returns something else (a value, collection, Optional, or void). Only terminal ops can be at the end." },
    ],
    learn: "intermediate vs terminal stream operations difference java 8",
  },
  {
    q: "Explain map() vs flatMap() with a real use case.",
    slug: "map-vs-flatmap",
    answer: [
      { kind: "text", text: "map() transforms each element one-to-one and keeps the stream's structure. flatMap() transforms each element into a stream and then FLATTENS all those streams into one — it's map plus flatten, used to collapse nested collections." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "// map: strings -> stream of lengths (one-to-one)", "List<Integer> lens = Stream.of(\"ab\", \"cde\")", "        .map(String::length)", "        .collect(Collectors.toList());   // [2, 3]", "", "// flatMap: List<List<Integer>> -> single flat stream", "List<List<Integer>> nested = Arrays.asList(", "        Arrays.asList(1, 2), Arrays.asList(3, 4));", "List<Integer> flat = nested.stream()", "        .flatMap(List::stream)", "        .collect(Collectors.toList());   // [1, 2, 3, 4]"] },
      { kind: "example", text: "Real use case: given a List<Order> where each order has a List<Item>, flatMap(order -> order.getItems().stream()) gives you a single stream of every item across all orders." },
      { kind: "note", text: "Use map when the mapper returns one value; use flatMap when the mapper returns a Stream/Collection/Optional and you want the results merged." },
    ],
    learn: "map vs flatmap in java 8 streams with example",
  },
  {
    q: "How does stream laziness work? When does execution actually happen?",
    slug: "stream-laziness-execution",
    answer: [
      { kind: "text", text: "Intermediate operations are lazy: calling filter/map just records the step and returns a new stream — no element is touched. Nothing runs until a TERMINAL operation is invoked. At that point the pipeline executes." },
      { kind: "text", text: "Execution is also element-by-element and fused: each element flows through all the intermediate steps before the next element starts (not step-by-step over the whole dataset). This enables short-circuiting — findFirst, limit, anyMatch can stop early without processing everything." },
      { kind: "code", lines: ["import java.util.stream.*;", "", "Stream.of(\"a\", \"b\", \"c\")", "        .filter(s -> { System.out.println(\"filter \" + s); return true; })", "        .map(s -> { System.out.println(\"map \" + s); return s; })", "        .findFirst();", "// prints: filter a, map a   -> stops after the first element"] },
      { kind: "note", text: "Because of laziness, a pipeline with no terminal operation does nothing at all. peek() is often used to observe this behaviour." },
    ],
    learn: "how stream laziness and short circuiting works java 8",
  },
  {
    q: "Difference between forEach() and forEachOrdered()?",
    slug: "foreach-vs-foreachordered",
    answer: [
      { kind: "text", text: "In a sequential stream both behave the same. The difference shows up in PARALLEL streams: forEach() does not guarantee encounter order (elements are processed by many threads in any order), whereas forEachOrdered() guarantees the elements are consumed in the stream's defined encounter order." },
      { kind: "code", lines: ["import java.util.stream.*;", "", "// order NOT guaranteed", "IntStream.range(0, 5).parallel().forEach(System.out::print);", "", "// order guaranteed: 01234", "IntStream.range(0, 5).parallel().forEachOrdered(System.out::print);"] },
      { kind: "note", text: "forEachOrdered sacrifices some parallelism to preserve order. If order doesn't matter, forEach is faster in parallel." },
    ],
    learn: "foreach vs foreachordered parallel stream order java 8",
  },
  {
    q: "What are parallel streams and how do they work internally?",
    slug: "parallel-streams-internals",
    answer: [
      { kind: "text", text: "A parallel stream processes elements concurrently. Internally it uses a Spliterator to recursively split the source into sub-parts, submits those parts as tasks to the ForkJoinPool.commonPool() (fork/join framework), processes each in a worker thread, and then combines partial results (e.g. the combiner in collect/reduce)." },
      { kind: "code", lines: ["import java.util.*;", "", "long total = list.parallelStream()", "        .filter(n -> n > 0)", "        .mapToLong(Integer::longValue)", "        .sum();", "", "// pool size defaults to (CPU cores - 1) workers + the calling thread"] },
      { kind: "note", text: "By default all parallel streams share the common ForkJoinPool, so one slow/blocking task can starve others. The number of threads defaults to Runtime.getRuntime().availableProcessors()." },
    ],
    learn: "how parallel streams work internally spliterator forkjoinpool java 8",
  },
  {
    q: "When should you NOT use parallel streams?",
    slug: "when-not-to-use-parallel-streams",
    answer: [
      { kind: "text", text: "Avoid parallel streams when: the dataset is small (splitting/merging overhead outweighs the gain); operations are cheap; the source is hard to split (LinkedList, I/O-based streams); operations perform blocking I/O or hold locks; or order matters and you'd need forEachOrdered anyway." },
      { kind: "text", text: "Also avoid when the pipeline has SIDE EFFECTS on shared mutable state — that causes race conditions and non-deterministic results. And be careful of blocking calls, since all parallel streams share the common ForkJoinPool and can starve each other." },
      { kind: "code", lines: ["// BAD: shared mutable state -> race condition", "List<Integer> out = new ArrayList<>();", "list.parallelStream().forEach(out::add);   // not thread-safe!", "", "// GOOD: let collect() handle the merge safely", "List<Integer> safe = list.parallelStream()", "        .collect(java.util.stream.Collectors.toList());"] },
      { kind: "note", text: "Rule: only parallelize large, CPU-bound, stateless, easily-splittable workloads — and always measure, don't assume it's faster." },
    ],
    learn: "when not to use parallel streams java 8 pitfalls",
  },
  {
    q: "Difference between findFirst() and findAny()?",
    slug: "findfirst-vs-findany",
    answer: [
      { kind: "text", text: "Both return an Optional and short-circuit. findFirst() returns the FIRST element in the stream's encounter order. findAny() returns ANY element — it's free to return whichever element a thread finds first, which lets parallel streams avoid the cost of respecting order." },
      { kind: "code", lines: ["import java.util.*;", "", "Optional<Integer> first = list.stream()", "        .filter(n -> n > 10)", "        .findFirst();          // deterministic: the first match", "", "Optional<Integer> any = list.parallelStream()", "        .filter(n -> n > 10)", "        .findAny();            // possibly faster, any match"] },
      { kind: "note", text: "In a sequential stream findAny usually also returns the first element, but that is not guaranteed. Use findAny in parallel when you just need one match and don't care which." },
    ],
    learn: "findfirst vs findany difference java 8 stream",
  },
  {
    q: "What is Optional? Why was it introduced?",
    slug: "what-is-optional",
    answer: [
      { kind: "text", text: "Optional<T> is a container that may or may not hold a non-null value. It was introduced to model 'a result that might be absent' explicitly in the type system, so APIs can signal 'no value' without returning null — reducing NullPointerExceptions and making the absence case impossible to ignore." },
      { kind: "code", lines: ["import java.util.*;", "", "Optional<String> maybe = findUserName(id);   // may be empty", "String name = maybe", "        .map(String::toUpperCase)", "        .orElse(\"GUEST\");", "", "maybe.ifPresent(n -> System.out.println(\"Hi \" + n));"] },
      { kind: "example", text: "Like a wrapped gift box that might be empty: you must open it (isPresent/orElse) before assuming a value, instead of grabbing thin air and crashing." },
      { kind: "note", text: "Intended mainly as a return type. Don't use it for fields, method parameters, or in collections — it adds overhead and isn't Serializable." },
    ],
    learn: "java 8 optional class why introduced avoid null pointer",
  },
  {
    q: "Difference between orElse() and orElseGet()?",
    slug: "orelse-vs-orelseget",
    answer: [
      { kind: "text", text: "Both supply a fallback when the Optional is empty. orElse(value) takes an already-computed value and is ALWAYS evaluated — even when the Optional has a value. orElseGet(supplier) takes a Supplier and only invokes it when the Optional is actually empty (lazy)." },
      { kind: "code", lines: ["import java.util.*;", "", "Optional<String> present = Optional.of(\"hi\");", "", "// expensiveDefault() RUNS even though value is present:", "String a = present.orElse(expensiveDefault());", "", "// expensiveDefault() is NOT run because value is present:", "String b = present.orElseGet(() -> expensiveDefault());"] },
      { kind: "note", text: "Interview gotcha: if the fallback is costly or has side effects, prefer orElseGet — orElse eagerly computes the argument regardless, wasting work when the value is present." },
    ],
    learn: "orElse vs orElseGet difference java 8 optional eager lazy",
  },
  {
    q: "Why is Optional.get() discouraged?",
    slug: "why-optional-get-discouraged",
    answer: [
      { kind: "text", text: "get() returns the value only if present; if the Optional is empty it throws NoSuchElementException. Calling it without first checking isPresent() defeats the whole purpose of Optional — it just replaces a NullPointerException with a different runtime exception." },
      { kind: "code", lines: ["import java.util.*;", "", "Optional<String> o = Optional.empty();", "// String s = o.get();   // throws NoSuchElementException", "", "// prefer safe alternatives:", "String s = o.orElse(\"default\");", "o.ifPresent(System.out::println);", "String t = o.orElseThrow(() -> new IllegalStateException(\"missing\"));"] },
      { kind: "note", text: "Prefer orElse/orElseGet/orElseThrow/ifPresent/map. Modern JDKs even added orElseThrow() with no args as a clearer, intention-revealing replacement for get()." },
    ],
    learn: "why avoid optional.get() java best practice",
  },
  {
    q: "Difference between reduce() and collect()?",
    slug: "reduce-vs-collect",
    answer: [
      { kind: "text", text: "reduce() is an IMMUTABLE reduction: it repeatedly combines elements into a single value using an associative function (sum, product, concatenation) and works well in parallel. collect() is a MUTABLE reduction: it accumulates elements into a mutable container (List, Map, StringBuilder) via a supplier/accumulator/combiner — used for building collections." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "// reduce: fold into one value", "int sum = Stream.of(1, 2, 3, 4).reduce(0, Integer::sum);  // 10", "", "// collect: build a container", "List<Integer> list = Stream.of(1, 2, 3)", "        .collect(Collectors.toList());", "String csv = Stream.of(\"a\", \"b\").collect(Collectors.joining(\",\"));"] },
      { kind: "note", text: "Use reduce for a single scalar result from associative combination; use collect when the result is a mutable data structure. Doing string concatenation with reduce is O(n^2) — use collect(joining()) instead." },
    ],
    learn: "reduce vs collect difference java 8 mutable immutable reduction",
  },
  {
    q: "Explain Collectors.groupingBy() vs partitioningBy().",
    slug: "groupingby-vs-partitioningby",
    answer: [
      { kind: "text", text: "groupingBy(classifier) splits elements into any number of groups keyed by the classifier's return value, producing a Map<K, List<T>>. partitioningBy(predicate) is a special case: it always splits into exactly TWO groups keyed by Boolean — true and false — producing a Map<Boolean, List<T>>." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.stream.*;", "", "List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);", "", "// groupingBy: many keys", "Map<Integer, List<Integer>> byMod = nums.stream()", "        .collect(Collectors.groupingBy(n -> n % 3));   // keys 0,1,2", "", "// partitioningBy: exactly two keys (true/false)", "Map<Boolean, List<Integer>> byEven = nums.stream()", "        .collect(Collectors.partitioningBy(n -> n % 2 == 0));"] },
      { kind: "note", text: "partitioningBy always contains both true AND false keys, even if one list is empty — groupingBy only creates keys that actually occur. Both accept a downstream collector (counting, mapping, etc.)." },
    ],
    learn: "groupingBy vs partitioningBy collectors java 8 difference",
  },
  {
    q: "Why was the new Date-Time API (java.time) introduced?",
    slug: "why-java-time-introduced",
    answer: [
      { kind: "text", text: "The old java.util.Date and Calendar were flawed: mutable (not thread-safe), poorly designed (months 0-indexed, years since 1900), lacked clear separation of date/time/zone, and needed SimpleDateFormat which itself is not thread-safe." },
      { kind: "text", text: "java.time (JSR-310, inspired by Joda-Time) fixes this with immutable, thread-safe classes and a clear domain model: LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant, Duration, Period, and thread-safe DateTimeFormatter." },
      { kind: "code", lines: ["import java.time.*;", "import java.time.format.*;", "", "LocalDate today = LocalDate.now();", "LocalDate dob = LocalDate.of(1990, Month.JANUARY, 15);", "Period age = Period.between(dob, today);", "LocalDate nextWeek = today.plusWeeks(1);   // returns a NEW object", "String s = today.format(DateTimeFormatter.ISO_DATE);"] },
      { kind: "note", text: "Key wins: immutability (thread-safe by design), fluent methods that return new instances, and separate types for date, time, instant, and zone." },
    ],
    learn: "why java 8 introduced new date time api java.time",
  },
  {
    q: "Explain method references and their types.",
    slug: "method-references-and-types",
    answer: [
      { kind: "text", text: "A method reference (::) is shorthand for a lambda that just calls an existing method. If a lambda does nothing but invoke one method, you can replace it with a reference to that method, which is more readable." },
      { kind: "code", lines: ["import java.util.*;", "import java.util.function.*;", "", "// 1. static method:            ClassName::staticMethod", "Function<String, Integer> f = Integer::parseInt;", "", "// 2. instance method of a particular object:  obj::method", "String prefix = \"Hi\";", "Supplier<Integer> len = prefix::length;", "", "// 3. instance method of an arbitrary object of a type:  Type::method", "Comparator<String> c = String::compareToIgnoreCase;", "", "// 4. constructor reference:    ClassName::new", "Supplier<ArrayList<String>> make = ArrayList::new;"] },
      { kind: "note", text: "Four types: static (Integer::parseInt), bound instance (obj::method), unbound instance (String::toUpperCase), and constructor (ArrayList::new). The compiler infers which from the target functional interface." },
    ],
    learn: "method references types java 8 static instance constructor",
  },
];
