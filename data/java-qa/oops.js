// data/java-qa/oops.js — OOP concepts, interview Q&A.
// Original explanations written from an interview point of view.
export const QUESTIONS = [
  {
    q: "Why do we need OOP?",
    slug: "why-do-we-need-oop",
    answer: [
      { kind: "text", text: "OOP models software as interacting objects that bundle data (state) and behaviour (methods) together. It exists to tame complexity in large systems through four pillars — encapsulation, abstraction, inheritance and polymorphism — which give us reusability, maintainability, and code that maps to how we think about the real world." },
      { kind: "example", text: "A banking app: instead of loose variables and functions, you model an Account object that owns its balance and exposes deposit()/withdraw(). The balance can't be corrupted from outside, and a SavingsAccount can reuse and extend Account." },
      { kind: "text", text: "Interview angle: contrast with procedural code — OOP reduces duplication (inheritance/composition), hides implementation (encapsulation), and lets one interface work with many types (polymorphism), so change stays local." },
    ],
    learn: "why do we need object oriented programming java",
  },
  {
    q: "What is Encapsulation?",
    slug: "what-is-encapsulation",
    answer: [
      { kind: "text", text: "Encapsulation is binding data and the methods that operate on it into a single unit (a class) and restricting direct access to the data — usually by making fields private and exposing controlled getters/setters. It protects invariants and lets you change internals without breaking callers." },
      { kind: "code", lines: ["class Account {", "    private double balance;              // hidden state", "    public void deposit(double amt) {", "        if (amt > 0) balance += amt;      // guarded — invariant protected", "    }", "    public double getBalance() { return balance; }", "}"] },
      { kind: "example", text: "A medicine capsule hides the drug inside a shell; you take it as a unit and can't tamper with the contents. A class hides its fields the same way." },
    ],
    learn: "encapsulation in java with example",
  },
  {
    q: "Abstraction v/s Encapsulation",
    slug: "abstraction-vs-encapsulation",
    answer: [
      { kind: "text", text: "Abstraction is about design — hiding complexity by exposing only WHAT an object does (its essential behaviour), not HOW. Encapsulation is about implementation — hiding data by restricting access and bundling it with its methods." },
      { kind: "example", text: "Driving a car: abstraction is the steering wheel/pedals (what you use); encapsulation is the sealed engine bay that protects the internals. Abstraction hides complexity; encapsulation hides data." },
      { kind: "note", text: "One line: abstraction is achieved with interfaces/abstract classes (design level); encapsulation is achieved with access modifiers + getters/setters (data level)." },
    ],
    learn: "abstraction vs encapsulation difference java",
  },
  {
    q: "What is inheritance?",
    slug: "what-is-inheritance",
    answer: [
      { kind: "text", text: "Inheritance lets a child class acquire the fields and methods of a parent class (using extends), modelling an 'is-a' relationship. It promotes code reuse and enables runtime polymorphism." },
      { kind: "code", lines: ["class Vehicle { void start() { System.out.println(\"start\"); } }", "class Car extends Vehicle {   // Car IS-A Vehicle", "    void openRoof() {}", "}", "new Car().start();            // reused from Vehicle"] },
      { kind: "example", text: "A Car is-a Vehicle, an ElectricCar is-a Car. Common behaviour lives once in the parent; specializations extend it." },
      { kind: "note", text: "Prefer composition over inheritance when the relationship is 'has-a' rather than 'is-a' — inheritance couples the child tightly to the parent." },
    ],
    learn: "inheritance in java is-a relationship",
  },
  {
    q: "What is Polymorphism?",
    slug: "what-is-polymorphism",
    answer: [
      { kind: "text", text: "Polymorphism means 'many forms' — the same interface/reference can behave differently depending on the actual object. It lets you write code against a general type and have the right implementation run at runtime." },
      { kind: "code", lines: ["Shape s = new Circle();", "s.area();   // runs Circle's area()", "s = new Square();", "s.area();   // now runs Square's area()"] },
      { kind: "example", text: "A 'draw()' button works for any Shape — circle, square, triangle — without the caller knowing the concrete type. Add a new shape later and the calling code doesn't change." },
    ],
    learn: "polymorphism in java with example",
  },
  {
    q: "Types of Polymorphism?",
    slug: "types-of-polymorphism",
    answer: [
      { kind: "text", text: "Two types. Compile-time (static) polymorphism via method OVERLOADING — the method is chosen by the compiler from the argument list. Runtime (dynamic) polymorphism via method OVERRIDING — the JVM picks the implementation based on the actual object at runtime." },
      { kind: "code", lines: ["// compile-time: overloading", "int add(int a, int b) {...}", "double add(double a, double b) {...}", "", "// runtime: overriding", "Animal a = new Dog();", "a.sound();  // Dog's sound() chosen at runtime"] },
      { kind: "note", text: "Interview trap: operator overloading is NOT supported in Java (except '+' for Strings, done by the compiler)." },
    ],
    learn: "types of polymorphism compile time runtime java",
  },
  {
    q: "Overloading v/s Overriding?",
    slug: "overloading-vs-overriding",
    answer: [
      { kind: "text", text: "Overloading = same method name, different parameter list, within the same class (or inherited) — resolved at compile time. Overriding = subclass redefines a parent's method with the same signature — resolved at runtime." },
      { kind: "code", lines: ["class Calc {", "    int add(int a, int b) { return a + b; }          // overload", "    int add(int a, int b, int c) { return a+b+c; }   // overload", "}", "class Base { void show() {} }", "class Child extends Base { @Override void show() {} } // override"] },
      { kind: "note", text: "Overriding rules: same signature, return type covariant, access can't be more restrictive, can't throw broader checked exceptions. Overloading only needs different parameters (return type alone is not enough)." },
    ],
    learn: "method overloading vs overriding java",
  },
  {
    q: "How to override a method?",
    slug: "how-to-override-a-method",
    answer: [
      { kind: "text", text: "Declare a method in the subclass with the exact same name, parameter list and compatible (covariant) return type as the parent's. Add @Override so the compiler verifies you're actually overriding, not accidentally overloading." },
      { kind: "code", lines: ["class Animal { String sound() { return \"...\"; } }", "class Dog extends Animal {", "    @Override", "    String sound() { return \"Woof\"; }", "}"] },
      { kind: "note", text: "You cannot override private, static, or final methods. Access modifier can only widen (e.g. protected -> public), never narrow." },
    ],
    learn: "how to override method in java override annotation",
  },
  {
    q: "Abstraction v/s Abstract Class",
    slug: "abstraction-vs-abstract-class",
    answer: [
      { kind: "text", text: "Abstraction is the CONCEPT — hiding implementation and exposing only behaviour. An abstract class is one TOOL to achieve it in Java: a class marked abstract that can hold abstract (unimplemented) methods plus concrete methods and state, and cannot be instantiated." },
      { kind: "note", text: "So abstraction is the 'what', abstract classes (and interfaces) are the 'how'. Interfaces are the other tool." },
    ],
    learn: "abstraction vs abstract class java",
  },
  {
    q: "Abstract Classes",
    slug: "abstract-classes",
    answer: [
      { kind: "text", text: "An abstract class (keyword abstract) is a partially-implemented base class that cannot be instantiated directly. It can have abstract methods (no body, must be implemented by subclasses), concrete methods, constructors, and instance fields. Use it to share common code + state while forcing subclasses to fill in specifics." },
      { kind: "code", lines: ["abstract class Shape {", "    String name;                       // state allowed", "    Shape(String n) { name = n; }      // constructor allowed", "    abstract double area();            // must be implemented", "    void describe() { System.out.println(name + \": \" + area()); }", "}", "class Circle extends Shape {", "    double r;", "    Circle(double r){ super(\"circle\"); this.r=r; }", "    double area() { return Math.PI * r * r; }", "}"] },
      { kind: "example", text: "A 'Payment' base with a shared logForAudit() but an abstract process() each payment type (Card, UPI, Wallet) must implement." },
    ],
    learn: "abstract class in java example",
  },
  {
    q: "Interfaces",
    slug: "interfaces",
    answer: [
      { kind: "text", text: "An interface is a pure contract: a set of method signatures a class promises to implement (using implements). It models a 'can-do' capability and enables multiple inheritance of type. Since Java 8 it can also have default and static methods; since Java 9, private methods; fields are implicitly public static final." },
      { kind: "code", lines: ["interface Payable {", "    void pay(double amt);              // abstract by default", "    default void receipt() {           // Java 8 default method", "        System.out.println(\"Paid\");", "    }", "}", "class Card implements Payable {", "    public void pay(double amt) { /* ... */ }", "}"] },
      { kind: "example", text: "Comparable, Runnable, List — 'capabilities' many unrelated classes can implement." },
    ],
    learn: "interface in java default methods",
  },
  {
    q: "Abstract Class v/s Interfaces",
    slug: "abstract-class-vs-interfaces",
    answer: [
      { kind: "text", text: "Abstract class: 'is-a', can have state (instance fields), constructors, and any-access concrete methods; a class extends only ONE. Interface: 'can-do', no instance state (only constants), no constructor, methods are public; a class implements MANY." },
      { kind: "code", lines: ["// single inheritance of class, multiple of interface", "class Duck extends Bird implements Swimmer, Flyer { }"] },
      { kind: "note", text: "Since Java 8 interfaces can have default method bodies, so the line is blurrier — but only abstract classes can hold mutable state and constructors." },
    ],
    learn: "abstract class vs interface java difference table",
  },
  {
    q: "When to prefer Abstract Classes over Interfaces?",
    slug: "when-to-prefer-abstract-classes",
    answer: [
      { kind: "text", text: "Prefer an abstract class when related types share common STATE or implemented behaviour, when you need constructors or non-public members, or when you want to add methods later without breaking subclasses. It expresses a strong 'is-a' with shared code." },
      { kind: "example", text: "GUI widgets: an abstract Component holds x/y/width fields and a common repaint(), while each widget implements draw()." },
    ],
    learn: "when to use abstract class over interface java",
  },
  {
    q: "When to prefer Interfaces over Abstract Classes?",
    slug: "when-to-prefer-interfaces",
    answer: [
      { kind: "text", text: "Prefer an interface when unrelated classes need to share a capability, when you need multiple inheritance of type, or when you're defining a pure contract/API with no shared state. Interfaces give maximum flexibility and loose coupling." },
      { kind: "example", text: "Comparable — a Person, Invoice and File are unrelated but all 'can be compared'. They can't share a base class, but they can all implement Comparable." },
    ],
    learn: "when to use interface over abstract class java",
  },
  {
    q: "Static Class v/s Static Method",
    slug: "static-class-vs-static-method",
    answer: [
      { kind: "text", text: "A static method belongs to the class, not an instance — call it as ClassName.method() and it can't use instance (non-static) members or 'this'. A 'static class' in Java only means a static NESTED class: a nested class marked static that doesn't hold a reference to the outer instance." },
      { kind: "code", lines: ["class Outer {", "    static int square(int x) { return x * x; }   // static method", "    static class Helper { }                        // static nested class", "}", "Outer.square(5);", "Outer.Helper h = new Outer.Helper();  // no Outer instance needed"] },
      { kind: "note", text: "Top-level classes cannot be static — only nested ones." },
    ],
    learn: "static nested class vs static method java",
  },
  {
    q: "Static v/s Singleton Class",
    slug: "static-vs-singleton-class",
    answer: [
      { kind: "text", text: "A class with all-static members is never instantiated — you call methods on the class. A Singleton is a normal class restricted to exactly ONE instance (private constructor + a static accessor), so it's a real object: it can implement interfaces, be passed around, hold state, and support lazy loading." },
      { kind: "code", lines: ["class Singleton {", "    private static Singleton instance;", "    private Singleton() {}", "    public static synchronized Singleton get() {", "        if (instance == null) instance = new Singleton();", "        return instance;", "    }", "}"] },
      { kind: "note", text: "Use static utilities for stateless helpers (Math); use a singleton when you need one stateful object with polymorphism/lifecycle (a config or connection pool)." },
    ],
    learn: "static class vs singleton pattern java",
  },
  {
    q: "Constructor firing sequence in inheritance?",
    slug: "constructor-firing-sequence-in-inheritance",
    answer: [
      { kind: "text", text: "Construction flows top-down: the parent constructor runs before the child's body. When you create a child, its constructor implicitly (or explicitly via super(...)) calls the parent constructor first, up to Object, then bodies complete from the top of the hierarchy down." },
      { kind: "code", lines: ["class A { A(){ System.out.println(\"A\"); } }", "class B extends A { B(){ System.out.println(\"B\"); } }", "new B();", "// Output:", "// A", "// B"] },
      { kind: "note", text: "super(...) must be the first statement in a constructor. If omitted, a no-arg super() is inserted — which fails to compile if the parent has no no-arg constructor." },
    ],
    learn: "constructor execution order inheritance java super",
  },
  {
    q: "Constructor Overloading",
    slug: "constructor-overloading",
    answer: [
      { kind: "text", text: "Defining multiple constructors in the same class with different parameter lists, so an object can be built in different ways. One constructor can call another with this(...) (constructor chaining) to avoid duplication." },
      { kind: "code", lines: ["class Box {", "    int w, h;", "    Box() { this(1, 1); }          // chains to the 2-arg one", "    Box(int s) { this(s, s); }", "    Box(int w, int h) { this.w = w; this.h = h; }", "}"] },
      { kind: "note", text: "this(...) must be the first statement, and you can't chain both this(...) and super(...) in the same constructor." },
    ],
    learn: "constructor overloading and chaining this java",
  },
  {
    q: "Can you set the constructor as static, final, private?",
    slug: "can-constructor-be-static-final-private",
    answer: [
      { kind: "text", text: "static — NO. Constructors initialise a specific instance, which contradicts 'static' (belongs to the class); it's a compile error. final — NO. final blocks overriding, but constructors are never inherited/overridden, so it's meaningless and disallowed. private — YES. A private constructor is legal and useful: it prevents outside instantiation (Singletons, static utility classes, factory-only creation)." },
      { kind: "code", lines: ["class Config {", "    private Config() {}                 // legal: no outside 'new'", "    static Config create() { return new Config(); }", "}"] },
    ],
    learn: "can constructor be static final private java",
  },
  {
    q: "Which is executed 1st, static block or constructor?",
    slug: "static-block-vs-constructor-order",
    answer: [
      { kind: "text", text: "The static block runs FIRST — and only once — when the class is loaded, before any object exists. The constructor runs later, each time an object is created. Order: static blocks/fields (class load) -> instance initializer blocks -> constructor (per object)." },
      { kind: "code", lines: ["class Demo {", "    static { System.out.println(\"static block\"); }   // 1st, once", "    { System.out.println(\"instance block\"); }         // per object", "    Demo() { System.out.println(\"constructor\"); }     // per object", "}", "new Demo(); new Demo();", "// static block  (once)", "// instance block / constructor  (twice)"] },
    ],
    learn: "static block vs constructor execution order java",
  },
  {
    q: "Can a class be abstract and final?",
    slug: "can-a-class-be-abstract-and-final",
    answer: [
      { kind: "text", text: "No — they contradict each other. 'abstract' means the class MUST be extended to be useful (it may have unimplemented methods and can't be instantiated). 'final' means the class CANNOT be extended. A class can't require and forbid subclassing at once, so the compiler rejects it." },
    ],
    learn: "can a class be abstract and final java",
  },
  {
    q: "Can you override a static method?",
    slug: "can-you-override-a-static-method",
    answer: [
      { kind: "text", text: "No. Static methods belong to the class and are resolved at compile time by the reference type, not the object — so they aren't polymorphic. Declaring the same static method in a subclass HIDES the parent's (method hiding), it doesn't override it." },
      { kind: "code", lines: ["class A { static void f(){ System.out.println(\"A\"); } }", "class B extends A { static void f(){ System.out.println(\"B\"); } }", "A ref = new B();", "ref.f();   // prints \"A\" — chosen by reference type, not object"] },
    ],
    learn: "can we override static method java method hiding",
  },
  {
    q: "What is the purpose of the super keyword?",
    slug: "purpose-of-super-keyword",
    answer: [
      { kind: "text", text: "super refers to the immediate parent class. Three uses: (1) super(...) to call a parent constructor, (2) super.method() to call a parent's (overridden) method, (3) super.field to access a parent field hidden by a child field." },
      { kind: "code", lines: ["class Base { void show(){ System.out.println(\"Base\"); } }", "class Child extends Base {", "    void show() {", "        super.show();                 // call parent version too", "        System.out.println(\"Child\");", "    }", "}"] },
    ],
    learn: "super keyword uses in java",
  },
  {
    q: "Can constructors be overridden?",
    slug: "can-constructors-be-overridden",
    answer: [
      { kind: "text", text: "No. Overriding requires inheritance of a method with the same name, but constructors are not inherited (a constructor's name is the class name, which differs between parent and child). Constructors can only be OVERLOADED (within a class) and CHAINED (via super()/this())." },
    ],
    learn: "can constructors be overridden java",
  },
  {
    q: "Deep Copy vs Shallow Copy",
    slug: "deep-copy-vs-shallow-copy",
    answer: [
      { kind: "text", text: "A shallow copy duplicates the object but copies references to nested objects — so both copies share the same inner objects (mutating one affects the other). A deep copy recursively duplicates nested objects too, giving a fully independent clone." },
      { kind: "code", lines: ["// shallow: address is shared", "Person p2 = new Person(p1.name, p1.address);", "p2.address.city = \"X\";   // also changes p1.address!", "", "// deep: clone the nested object too", "Person p2 = new Person(p1.name, new Address(p1.address));"] },
      { kind: "example", text: "Photocopying a form with a stapled attachment: shallow = you both point to the same attachment; deep = each copy gets its own attachment." },
    ],
    learn: "deep copy vs shallow copy java example",
  },
  {
    q: "Can you instantiate an abstract class?",
    slug: "can-you-instantiate-abstract-class",
    answer: [
      { kind: "text", text: "No — 'new AbstractClass()' is a compile error, because it may contain unimplemented abstract methods. You instantiate a concrete subclass instead. You CAN, however, create an anonymous subclass on the spot that implements the abstract methods." },
      { kind: "code", lines: ["abstract class Task { abstract void run(); }", "Task t = new Task() {          // anonymous concrete subclass", "    void run() { System.out.println(\"done\"); }", "};"] },
    ],
    learn: "can we instantiate abstract class java anonymous",
  },
  {
    q: "Does Java support Multiple Inheritance? Why?",
    slug: "does-java-support-multiple-inheritance",
    answer: [
      { kind: "text", text: "Java does NOT support multiple inheritance of CLASSES, to avoid the 'diamond problem' — ambiguity when two parents provide the same method and the compiler can't decide which to inherit. It DOES support multiple inheritance of TYPE via interfaces." },
      { kind: "code", lines: ["class A implements X, Y { }   // OK: multiple interfaces", "// class A extends B, C { }   // ERROR: multiple classes"] },
      { kind: "note", text: "With Java 8 default methods, if two interfaces give the same default method, the class MUST override it and can pick one with InterfaceName.super.method()." },
    ],
    learn: "why java does not support multiple inheritance diamond problem",
  },
  {
    q: "How is runtime polymorphism achieved in Java?",
    slug: "how-is-runtime-polymorphism-achieved",
    answer: [
      { kind: "text", text: "Through method overriding + dynamic method dispatch. When you call an overridden method on a superclass reference, the JVM looks up the ACTUAL object's type at runtime (via its virtual method table) and invokes that class's version — not the reference type's." },
      { kind: "code", lines: ["Animal a = new Cat();", "a.sound();   // JVM dispatches to Cat.sound() at runtime"] },
      { kind: "note", text: "Requires inheritance and an overridable (non-static, non-final, non-private) method. This is why 'program to an interface' works." },
    ],
    learn: "runtime polymorphism dynamic method dispatch java",
  },
  {
    q: "Can a subclass access private members of the superclass?",
    slug: "can-subclass-access-private-members",
    answer: [
      { kind: "text", text: "No — private members are only visible inside the declaring class, so a subclass cannot access them directly (they are inherited but not accessible). The subclass reaches them indirectly through public/protected getters/setters the parent exposes." },
      { kind: "code", lines: ["class Base { private int x; protected int getX(){ return x; } }", "class Sub extends Base {", "    void show() { /* x is invisible */ System.out.println(getX()); }", "}"] },
    ],
    learn: "can subclass access private members superclass java",
  },
  {
    q: "Difference between public, private, protected, and default?",
    slug: "access-modifiers-difference",
    answer: [
      { kind: "text", text: "These are Java's four access levels, from most to least open: public (everywhere), protected (same package + subclasses anywhere), default/package-private (same package only — no keyword), private (same class only)." },
      { kind: "code", lines: ["// Access from:        class  package  subclass  world", "// public               yes     yes      yes      yes", "// protected            yes     yes      yes      no", "// default (no kw)      yes     yes      no       no", "// private              yes     no       no       no"] },
      { kind: "note", text: "Rule of thumb: keep fields private and expose the minimum needed — it's the backbone of encapsulation." },
    ],
    learn: "public private protected default access modifiers java",
  },
];
