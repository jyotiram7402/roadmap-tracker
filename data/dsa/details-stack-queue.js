// data/dsa/details-stack-queue.js — worked solutions for the Stack & Queue phase.
// Original explanations and implementations of standard algorithms.
// Shape: { [problemId]: { statement, examples?, approaches[], oneLiner?, similar? } }

export const DETAILS = {
  "time-needed-to-buy-tickets": {
    statement: "n people stand in a queue; tickets[i] is how many tickets person i wants. Each second the front person buys one ticket, then rejoins the back unless they are done. Return the seconds until person at index k finishes.",
    examples: [{ input: "tickets = [2,3,2], k = 2", output: "6" }],
    approaches: [
      { name: "Brute", pattern: "Queue simulation", theory: "Literally simulate: loop over indices in a circle, decrement a ticket and count a second whenever the current person still needs tickets, and stop the moment person k reaches zero.", code: ["public int timeRequiredToBuy(int[] tickets, int k) {", "    int time = 0, n = tickets.length, i = 0;", "    while (tickets[k] > 0) {", "        if (tickets[i] > 0) { tickets[i]--; time++; }", "        if (i == k && tickets[k] == 0) break;", "        i = (i + 1) % n;", "    }", "    return time;", "}"], time: "O(n * tickets[k])", space: "O(1)" },
      { name: "Optimal", pattern: "Counting", theory: "Person k finishes after buying tickets[k] rounds. Anyone at or before k contributes up to tickets[k] seconds; anyone after k gets one fewer round (they stop once k is done), so they contribute up to tickets[k]-1. Sum the min of each person's demand and that cap.", code: ["public int timeRequiredToBuy(int[] tickets, int k) {", "    int time = 0;", "    for (int i = 0; i < tickets.length; i++) {", "        if (i <= k) time += Math.min(tickets[i], tickets[k]);", "        else time += Math.min(tickets[i], tickets[k] - 1);", "    }", "    return time;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Each person before/at k gives min(t[i], t[k]) seconds; after k, min(t[i], t[k]-1). Sum them. O(n)."
  },
  "sort-a-stack": {
    statement: "Sort a stack in ascending order (largest element on top) using only stack operations / recursion — no other explicit data structure.",
    examples: [{ input: "stack (top -> bottom) = [34, 3, 31, 98, 92, 23]", output: "[98, 92, 34, 31, 23, 3] (top -> bottom)" }],
    approaches: [
      { name: "Optimal", pattern: "Recursion (insert in order)", theory: "Pop the top and recursively sort the remaining stack. Then insert the popped value back into its sorted position: if the top is larger than the value, pop it aside, insert recursively, and push it back.", code: ["public void sortStack(Stack<Integer> st) {", "    if (st.isEmpty()) return;", "    int top = st.pop();", "    sortStack(st);", "    insert(st, top);", "}", "private void insert(Stack<Integer> st, int val) {", "    if (st.isEmpty() || st.peek() <= val) { st.push(val); return; }", "    int top = st.pop();", "    insert(st, val);", "    st.push(top);", "}"], time: "O(n^2)", space: "O(n)" }
    ],
    oneLiner: "Recursively empty the stack, then insert each value back into its sorted place. O(n^2), O(n) recursion."
  },
  "reverse-first-k-elements-of-a-queue": {
    statement: "Given a queue and a number k, reverse the order of the first k elements while keeping the remaining elements in their original order.",
    examples: [{ input: "queue = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }],
    approaches: [
      { name: "Optimal", pattern: "Stack + rotate", theory: "Dequeue the first k elements into a stack, then enqueue them back — the stack reverses their order but places them behind the rest. Finally rotate the remaining (n-k) elements from front to back so the reversed block returns to the front.", code: ["public Queue<Integer> reverseFirstK(Queue<Integer> q, int k) {", "    Stack<Integer> st = new Stack<>();", "    for (int i = 0; i < k; i++) st.push(q.poll());", "    while (!st.isEmpty()) q.offer(st.pop());", "    int rest = q.size() - k;", "    for (int i = 0; i < rest; i++) q.offer(q.poll());", "    return q;", "}"], time: "O(n)", space: "O(k)" }
    ],
    oneLiner: "Stack-reverse the first k, re-enqueue them, then rotate the other n-k to the back. O(n)."
  },
  "valid-parentheses": {
    statement: "Given a string made up only of the characters ()[]{}  decide whether it is well-formed: every opener must be closed by the matching bracket type, and brackets must close in the reverse order they were opened.",
    examples: [
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false", explanation: "( is closed by ], a different bracket type." },
      { input: "s = \"([])\"", output: "true" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Repeated pair removal", theory: "A valid string must contain at least one innermost pair like () or [] or {}. Keep deleting such adjacent pairs; if the string shrinks to empty it was valid, and if it stops shrinking while non-empty it was not.", code: ["public boolean isValid(String s) {", "    int prevLen = -1;", "    while (s.length() != prevLen) {", "        prevLen = s.length();", "        s = s.replace(\"()\", \"\").replace(\"[]\", \"\").replace(\"{}\", \"\");", "    }", "    return s.isEmpty();", "}"], time: "O(n²)", space: "O(n)" },
      { name: "Optimal", pattern: "Stack of expected closers", theory: "Scan once. When we meet an opener, push the closer we will eventually need. When we meet a closer, it must equal the top of the stack (the most recently opened, not-yet-closed bracket); otherwise the nesting is broken. A valid string ends with an empty stack.", code: ["public boolean isValid(String s) {", "    Deque<Character> st = new ArrayDeque<>();", "    for (char c : s.toCharArray()) {", "        if (c == '(') st.push(')');", "        else if (c == '[') st.push(']');", "        else if (c == '{') st.push('}');", "        else if (st.isEmpty() || st.pop() != c) return false;", "    }", "    return st.isEmpty();", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "s = \"([])\"", headers: ["ch", "stack before", "action"], rows: [["(", "(empty)", "push ')'"], ["[", ")", "push ']'"], ["]", ") ]", "pop ']' — match"], [")", ")", "pop ')' — match"], ["end", "(empty)", "stack empty → true"]] } }
    ],
    oneLiner: "Push the expected closing bracket for every opener; each closer must equal the stack top. Valid iff the stack ends empty. O(n) time, O(n) space.",
    similar: [["20", "Valid Parentheses", "Stack"], ["22", "Generate Parentheses", "Backtracking"], ["32", "Longest Valid Parentheses", "Stack / DP"], ["1249", "Minimum Remove to Make Valid", "Stack"]]
  },

  "implement-queue-using-stacks": {
    statement: "Build a FIFO queue (push, pop, peek, empty) using only two LIFO stacks and their standard operations.",
    examples: [{ input: "push(1), push(2), peek(), pop(), empty()", output: "[null,null,1,1,false]" }],
    approaches: [
      { name: "Optimal", pattern: "Two stacks (in / out)", theory: "Pushes go onto the 'in' stack. Pops and peeks come from the 'out' stack; when 'out' is empty, dump all of 'in' into it — that double reversal restores FIFO order. Each element moves between stacks at most once, so every operation is amortized O(1).", code: ["class MyQueue {", "    private Deque<Integer> in = new ArrayDeque<>();", "    private Deque<Integer> out = new ArrayDeque<>();", "", "    public void push(int x) { in.push(x); }", "", "    public int pop() { shift(); return out.pop(); }", "", "    public int peek() { shift(); return out.peek(); }", "", "    public boolean empty() { return in.isEmpty() && out.isEmpty(); }", "", "    private void shift() {           // refill out only when it runs dry", "        if (out.isEmpty())", "            while (!in.isEmpty()) out.push(in.pop());", "    }", "}"], time: "O(1) amortized per op", space: "O(n)" }
    ],
    oneLiner: "An input stack and an output stack: transfer everything from in to out only when out is empty — two reversals make FIFO. Amortized O(1) per operation."
  },

  "implement-stack-using-queues": {
    statement: "Build a LIFO stack (push, pop, top, empty) using only queue operations.",
    examples: [{ input: "push(1), push(2), top(), pop(), empty()", output: "[null,null,2,2,false]" }],
    approaches: [
      { name: "Optimal", pattern: "One queue, rotate on push", theory: "After enqueuing a new element, rotate the queue by dequeuing and re-enqueuing everything that was already there. The newest element ends up at the front, so pop and top are plain queue operations.", code: ["class MyStack {", "    private Queue<Integer> q = new LinkedList<>();", "", "    public void push(int x) {", "        q.offer(x);", "        for (int i = 1; i < q.size(); i++)   // rotate older items behind x", "            q.offer(q.poll());", "    }", "", "    public int pop() { return q.poll(); }", "", "    public int top() { return q.peek(); }", "", "    public boolean empty() { return q.isEmpty(); }", "}"], time: "push O(n), pop/top O(1)", space: "O(n)" }
    ],
    oneLiner: "Single queue: after every push, rotate the older elements behind the new one so the queue front always holds the stack top. Push O(n), everything else O(1)."
  },

  "next-greater-element-i": {
    statement: "nums1 is a subset of nums2. For each value in nums1, find the first element to its right in nums2 that is strictly larger, or −1 if none exists.",
    examples: [{ input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]" }],
    approaches: [
      { name: "Optimal", pattern: "Monotonic decreasing stack + HashMap", theory: "Sweep nums2 once keeping a stack of values still waiting for a greater element. Each new value pops every smaller value below it — the new value is their answer, recorded in a map. Values left on the stack at the end have answer −1. Then nums1 is answered by map lookups.", code: ["public int[] nextGreaterElement(int[] nums1, int[] nums2) {", "    Map<Integer,Integer> next = new HashMap<>();", "    Deque<Integer> st = new ArrayDeque<>();", "    for (int x : nums2) {", "        while (!st.isEmpty() && st.peek() < x)", "            next.put(st.pop(), x);       // x answers everything smaller", "        st.push(x);", "    }", "    int[] res = new int[nums1.length];", "    for (int i = 0; i < nums1.length; i++)", "        res[i] = next.getOrDefault(nums1[i], -1);", "    return res;", "}"], time: "O(m + n)", space: "O(n)", dryRun: { title: "nums2 = [1,3,4,2]", headers: ["x", "popped (answered by x)", "stack after"], rows: [["1", "—", "[1]"], ["3", "1→3", "[3]"], ["4", "3→4", "[4]"], ["2", "—", "[4,2]"]] } }
    ],
    oneLiner: "One monotonic-stack pass over nums2 records each value's next greater element in a map; nums1 is answered by lookup. O(m+n).",
    similar: [["496", "Next Greater Element I", "Monotonic Stack"], ["503", "Next Greater Element II", "Monotonic Stack (circular)"], ["739", "Daily Temperatures", "Monotonic Stack"]]
  },

  "baseball-game": {
    statement: "Process a list of scoring operations: a number records that score, \"+\" records the sum of the previous two scores, \"D\" doubles the previous score, and \"C\" cancels the previous score. Return the sum of all remaining scores.",
    examples: [{ input: "ops = [\"5\",\"2\",\"C\",\"D\",\"+\"]", output: "30", explanation: "Record 5, record 2, cancel 2, double (10), then 5+10=15. Total 5+10+15 = 30." }],
    approaches: [
      { name: "Optimal", pattern: "Stack simulation", theory: "Every rule looks at or removes only the most recent scores, which is exactly what a stack provides. Push numbers; for \"+\" combine the two most recent; for \"D\" double the top; for \"C\" pop.", code: ["public int calPoints(String[] operations) {", "    Deque<Integer> st = new ArrayDeque<>();", "    for (String op : operations) {", "        switch (op) {", "            case \"C\": st.pop(); break;", "            case \"D\": st.push(2 * st.peek()); break;", "            case \"+\": {", "                int top = st.pop();", "                int sum = top + st.peek();", "                st.push(top);", "                st.push(sum);", "                break;", "            }", "            default: st.push(Integer.parseInt(op));", "        }", "    }", "    int total = 0;", "    for (int x : st) total += x;", "    return total;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Simulate on a stack — every rule touches only the newest one or two scores. Sum the stack at the end. O(n)."
  },

  "min-stack": {
    statement: "Design a stack supporting push, pop, top, and getMin, where getMin returns the minimum element currently in the stack — all in constant time.",
    examples: [{ input: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "[null,null,null,-3,null,0,-2]" }],
    approaches: [
      { name: "Optimal", pattern: "Stack of (value, min-so-far) pairs", theory: "Alongside each value, store the minimum of the stack as it was at the moment of that push. The pair on top always knows the current minimum, and popping automatically restores the previous minimum — no recomputation ever needed.", code: ["class MinStack {", "    private Deque<int[]> st = new ArrayDeque<>();   // {value, min at this depth}", "", "    public void push(int val) {", "        int min = st.isEmpty() ? val : Math.min(val, st.peek()[1]);", "        st.push(new int[]{val, min});", "    }", "", "    public void pop() { st.pop(); }", "", "    public int top() { return st.peek()[0]; }", "", "    public int getMin() { return st.peek()[1]; }", "}"], time: "O(1) per operation", space: "O(n)", dryRun: { title: "push −2, 0, −3 then pop", headers: ["op", "pair pushed/popped", "getMin()"], rows: [["push −2", "(−2, −2)", "−2"], ["push 0", "(0, −2)", "−2"], ["push −3", "(−3, −3)", "−3"], ["pop", "(−3, −3) removed", "−2"]] } }
    ],
    oneLiner: "Store (value, min-so-far) pairs; the top pair's second field is always the current minimum, and pops restore older minimums for free. All ops O(1)."
  },

  "daily-temperatures": {
    statement: "Given daily temperatures, return for each day how many days you must wait until a strictly warmer day, or 0 if none ever comes.",
    examples: [{ input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }],
    approaches: [
      { name: "Optimal", pattern: "Monotonic decreasing stack of indices", theory: "Keep a stack of day indices whose warmer day has not arrived yet; their temperatures sit in decreasing order. When today is warmer than the day on top, today is that day's answer — pop it, record the index gap, and repeat. Every index is pushed and popped at most once.", code: ["public int[] dailyTemperatures(int[] temperatures) {", "    int n = temperatures.length;", "    int[] res = new int[n];", "    Deque<Integer> st = new ArrayDeque<>();   // indices, temps decreasing", "    for (int i = 0; i < n; i++) {", "        while (!st.isEmpty() && temperatures[st.peek()] < temperatures[i]) {", "            int j = st.pop();", "            res[j] = i - j;                   // days waited", "        }", "        st.push(i);", "    }", "    return res;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "temps = [73,74,75,71,72]", headers: ["i", "temp", "popped (res)", "stack after (indices)"], rows: [["0", "73", "—", "[0]"], ["1", "74", "0 (res[0]=1)", "[1]"], ["2", "75", "1 (res[1]=1)", "[2]"], ["3", "71", "—", "[2,3]"], ["4", "72", "3 (res[3]=1)", "[2,4]"]] } }
    ],
    oneLiner: "Monotonic stack of unanswered day indices; a warmer day pops all colder days and the index difference is their wait. O(n).",
    similar: [["739", "Daily Temperatures", "Monotonic Stack"], ["496", "Next Greater Element I", "Monotonic Stack"], ["901", "Online Stock Span", "Monotonic Stack"]]
  },

  "evaluate-reverse-polish-notation": {
    statement: "Evaluate an arithmetic expression given in postfix (Reverse Polish) notation, where operators follow their operands. Division truncates toward zero.",
    examples: [{ input: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]", output: "9", explanation: "(2 + 1) * 3 = 9." }],
    approaches: [
      { name: "Optimal", pattern: "Operand stack", theory: "Postfix needs no parentheses: push numbers, and when an operator arrives, pop its two operands (the second pop is the LEFT operand), apply, and push the result. One value remains at the end — the answer.", code: ["public int evalRPN(String[] tokens) {", "    Deque<Integer> st = new ArrayDeque<>();", "    for (String t : tokens) {", "        switch (t) {", "            case \"+\": st.push(st.pop() + st.pop()); break;", "            case \"*\": st.push(st.pop() * st.pop()); break;", "            case \"-\": { int b = st.pop(), a = st.pop(); st.push(a - b); break; }", "            case \"/\": { int b = st.pop(), a = st.pop(); st.push(a / b); break; }", "            default: st.push(Integer.parseInt(t));", "        }", "    }", "    return st.pop();", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Push numbers; each operator pops two operands (mind the order for − and /) and pushes the result. Final stack value is the answer. O(n)."
  },

  "decode-string": {
    statement: "Decode strings of the form k[inner], meaning the substring inner repeats k times; patterns can nest, as in 3[a2[c]].",
    examples: [
      { input: "s = \"3[a]2[bc]\"", output: "\"aaabcbc\"" },
      { input: "s = \"3[a2[c]]\"", output: "\"accaccacc\"" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Two stacks (counts + partial strings)", theory: "Build the current segment in a StringBuilder. At '[' save the pending repeat count and the string built so far, then start fresh. At ']' pop both: append the inner segment count-times onto the saved outer string and continue with that. Nesting works naturally because deeper brackets sit higher on the stacks.", code: ["public String decodeString(String s) {", "    Deque<Integer> counts = new ArrayDeque<>();", "    Deque<StringBuilder> saved = new ArrayDeque<>();", "    StringBuilder cur = new StringBuilder();", "    int num = 0;", "    for (char c : s.toCharArray()) {", "        if (Character.isDigit(c)) num = num * 10 + (c - '0');", "        else if (c == '[') {", "            counts.push(num); num = 0;", "            saved.push(cur); cur = new StringBuilder();", "        } else if (c == ']') {", "            StringBuilder outer = saved.pop();", "            int k = counts.pop();", "            for (int i = 0; i < k; i++) outer.append(cur);", "            cur = outer;", "        } else cur.append(c);", "    }", "    return cur.toString();", "}"], time: "O(output length)", space: "O(output length)", dryRun: { title: "s = \"3[a2[c]]\"", headers: ["chars", "counts", "saved", "cur"], rows: [["3[", "[3]", "[\"\"]", "\"\""], ["a", "[3]", "[\"\"]", "\"a\""], ["2[", "[3,2]", "[\"\",\"a\"]", "\"\""], ["c then ]", "[3]", "[\"\"]", "\"acc\""], ["]", "[]", "[]", "\"accaccacc\""]] } }
    ],
    oneLiner: "Two stacks: '[' saves the repeat count and the string built so far, ']' pops both and splices the repeated inner segment back in. Linear in the output size."
  },

  "asteroid-collision": {
    statement: "Asteroids move along a row: positive values fly right, negative fly left, all at equal speed. When two meet, the smaller (by absolute size) explodes — both explode on a tie. Return the surviving asteroids.",
    examples: [
      { input: "asteroids = [5,10,-5]", output: "[5,10]", explanation: "10 destroys −5; 5 and 10 never meet." },
      { input: "asteroids = [8,-8]", output: "[]", explanation: "Equal sizes destroy each other." }
    ],
    approaches: [
      { name: "Optimal", pattern: "Stack of survivors", theory: "Only a right-mover already on the stack and an incoming left-mover can collide. For each new asteroid, fight it against the stack top while a collision is possible: pop smaller right-movers, die against bigger ones, and annihilate on ties. Whatever survives gets pushed.", code: ["public int[] asteroidCollision(int[] asteroids) {", "    Deque<Integer> st = new ArrayDeque<>();", "    for (int a : asteroids) {", "        boolean alive = true;", "        while (alive && a < 0 && !st.isEmpty() && st.peek() > 0) {", "            if (st.peek() < -a) st.pop();      // top explodes, keep fighting", "            else if (st.peek() == -a) {        // both explode", "                st.pop(); alive = false;", "            }", "            else alive = false;                // incoming explodes", "        }", "        if (alive) st.push(a);", "    }", "    int[] res = new int[st.size()];", "    for (int i = res.length - 1; i >= 0; i--) res[i] = st.pop();", "    return res;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "asteroids = [10,2,-5]", headers: ["a", "fights", "stack after"], rows: [["10", "—", "[10]"], ["2", "—", "[10,2]"], ["-5", "beats 2, loses to 10", "[10]"]] } }
    ],
    oneLiner: "Stack of survivors: each left-mover fights the right-movers on top — pop smaller ones, vanish against bigger ones, mutual destruction on ties. O(n)."
  },

  "online-stock-span": {
    statement: "For a stream of daily prices, return with each new price its span: the count of consecutive days ending today whose price was less than or equal to today's.",
    examples: [{ input: "next(100), next(80), next(60), next(70), next(60), next(75), next(85)", output: "[1,1,1,2,1,4,6]" }],
    approaches: [
      { name: "Optimal", pattern: "Monotonic stack of (price, span)", theory: "Days dominated by a higher later price can never matter again — collapse them. Keep a stack of (price, span) with strictly decreasing prices; a new price pops every entry ≤ itself and accumulates their spans into its own. Amortized O(1) per call.", code: ["class StockSpanner {", "    private Deque<int[]> st = new ArrayDeque<>();   // {price, span}", "", "    public int next(int price) {", "        int span = 1;", "        while (!st.isEmpty() && st.peek()[0] <= price)", "            span += st.pop()[1];        // absorb dominated days", "        st.push(new int[]{price, span});", "        return span;", "    }", "}"], time: "O(1) amortized per call", space: "O(n)", dryRun: { title: "prices 100, 80, 60, 70, 60, 75", headers: ["price", "absorbed spans", "span returned"], rows: [["100", "—", "1"], ["80", "—", "1"], ["60", "—", "1"], ["70", "60 (1)", "2"], ["60", "—", "1"], ["75", "60 (1) + 70 (2)", "4"]] } }
    ],
    oneLiner: "Monotonic stack of (price, span): each new price pops all prices ≤ it and adds their spans to its own. Amortized O(1) per quote."
  },

  "simplify-path": {
    statement: "Convert an absolute Unix-style path into canonical form: collapse repeated slashes, drop single dots, and let double dots pop the previous directory.",
    examples: [
      { input: "path = \"/home//foo/\"", output: "\"/home/foo\"" },
      { input: "path = \"/a/./b/../../c/\"", output: "\"/c\"" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Split + deque of directories", theory: "Splitting on '/' turns the path into tokens. Empty tokens (from // or a trailing /) and '.' change nothing; '..' removes the most recent directory if any; anything else is a real directory name to keep. Joining the survivors with '/' gives the canonical path.", code: ["public String simplifyPath(String path) {", "    Deque<String> dirs = new ArrayDeque<>();", "    for (String part : path.split(\"/\")) {", "        if (part.isEmpty() || part.equals(\".\")) continue;", "        if (part.equals(\"..\")) {", "            if (!dirs.isEmpty()) dirs.pollLast();   // go up one level", "        } else dirs.addLast(part);", "    }", "    return \"/\" + String.join(\"/\", dirs);", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Split on '/', skip empties and '.', let '..' pop the last directory, then rejoin with slashes. O(n)."
  },

  "largest-rectangle-in-histogram": {
    statement: "Given bar heights of a histogram (each bar has width 1), return the area of the largest rectangle that fits entirely inside the bars.",
    examples: [{ input: "heights = [2,1,5,6,2,3]", output: "10", explanation: "Bars 5 and 6 support a 5×2 rectangle." }],
    approaches: [
      { name: "Optimal", pattern: "Monotonic increasing stack of indices", theory: "The widest rectangle at a bar's full height stretches until a strictly shorter bar on each side. Sweep left to right with a stack of indices whose heights increase; when the current bar is shorter than the top, the popped bar has found its right boundary (here) and its left boundary (new stack top), so its area can be settled. A virtual height-0 bar at the end flushes the stack.", code: ["public int largestRectangleArea(int[] heights) {", "    Deque<Integer> st = new ArrayDeque<>();", "    int best = 0, n = heights.length;", "    for (int i = 0; i <= n; i++) {", "        int cur = (i == n) ? 0 : heights[i];   // sentinel flushes stack", "        while (!st.isEmpty() && heights[st.peek()] > cur) {", "            int h = heights[st.pop()];", "            int left = st.isEmpty() ? -1 : st.peek();", "            best = Math.max(best, h * (i - left - 1));", "        }", "        st.push(i);", "    }", "    return best;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "heights = [2,1,5,6,2,3]", headers: ["i (height)", "popped bar → area", "best"], rows: [["1 (1)", "2 → 2×1 = 2", "2"], ["4 (2)", "6 → 6×1 = 6, then 5 → 5×2 = 10", "10"], ["6 (0)", "3 → 3, then 2 → 2×4 = 8, then 1 → 6", "10"]] } }
    ],
    oneLiner: "Increasing-index stack: when a shorter bar arrives, each popped bar's rectangle is settled with the current index as right wall and the new top as left wall. O(n).",
    similar: [["84", "Largest Rectangle in Histogram", "Monotonic Stack"], ["85", "Maximal Rectangle", "Histogram per row"], ["42", "Trapping Rain Water", "Stack / Two Pointers"]]
  },

  "basic-calculator": {
    statement: "Evaluate an expression string containing digits, plus, minus, parentheses, and spaces (no multiplication or division) without using any built-in eval.",
    examples: [
      { input: "s = \"1 + 1\"", output: "2" },
      { input: "s = \"(1+(4+5+2)-3)+(6+8)\"", output: "23" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Running total + sign stack", theory: "Keep a running result and the sign of the next number. An opening parenthesis suspends the current context: push the result and sign, then restart at zero. A closing parenthesis finishes the inner value and folds it back in as inner × savedSign + savedResult. Arbitrary nesting flattens into one linear scan.", code: ["public int calculate(String s) {", "    Deque<Integer> st = new ArrayDeque<>();", "    int result = 0, sign = 1, num = 0;", "    for (char c : s.toCharArray()) {", "        if (Character.isDigit(c)) num = num * 10 + (c - '0');", "        else if (c == '+') { result += sign * num; num = 0; sign = 1; }", "        else if (c == '-') { result += sign * num; num = 0; sign = -1; }", "        else if (c == '(') {", "            st.push(result); st.push(sign);   // save outer context", "            result = 0; sign = 1;", "        } else if (c == ')') {", "            result += sign * num; num = 0;", "            result = result * st.pop() + st.pop();  // × saved sign, + outer", "        }", "    }", "    return result + sign * num;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "s = \"2-(3+1)\"", headers: ["ch", "result", "sign", "stack"], rows: [["2", "0 (num=2)", "+1", "[]"], ["-", "2", "−1", "[]"], ["(", "0", "+1", "[2, −1]"], ["3+1", "3 (num=1)", "+1", "[2, −1]"], [")", "4·(−1)+2 = −2", "+1", "[]"]] } }
    ],
    oneLiner: "Scan once with a running total; '(' pushes the outer result and sign, ')' multiplies the inner value by that sign and adds it back. O(n)."
  },

  "maximal-rectangle": {
    statement: "In a binary matrix of '0' and '1' characters, find the area of the largest rectangle containing only ones.",
    examples: [{ input: "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", output: "6" }],
    approaches: [
      { name: "Optimal", pattern: "Row-by-row histogram + monotonic stack", theory: "Treat each row as the floor of a histogram: heights[c] counts consecutive ones ending at this row in column c (reset to 0 on a '0'). The best all-ones rectangle whose bottom edge lies on this row is exactly the largest rectangle in that histogram, solvable in O(cols) with a monotonic stack. Take the max over all rows.", code: ["public int maximalRectangle(char[][] matrix) {", "    if (matrix.length == 0) return 0;", "    int cols = matrix[0].length, best = 0;", "    int[] heights = new int[cols];", "    for (char[] row : matrix) {", "        for (int c = 0; c < cols; c++)", "            heights[c] = (row[c] == '1') ? heights[c] + 1 : 0;", "        best = Math.max(best, histogramArea(heights));", "    }", "    return best;", "}", "", "private int histogramArea(int[] h) {", "    Deque<Integer> st = new ArrayDeque<>();", "    int best = 0;", "    for (int i = 0; i <= h.length; i++) {", "        int cur = (i == h.length) ? 0 : h[i];", "        while (!st.isEmpty() && h[st.peek()] > cur) {", "            int height = h[st.pop()];", "            int left = st.isEmpty() ? -1 : st.peek();", "            best = Math.max(best, height * (i - left - 1));", "        }", "        st.push(i);", "    }", "    return best;", "}"], time: "O(rows × cols)", space: "O(cols)" }
    ],
    oneLiner: "Grow a histogram of consecutive ones per column row by row and run the largest-rectangle-in-histogram stack on each row. O(rows × cols).",
    similar: [["85", "Maximal Rectangle", "Histogram + Stack"], ["84", "Largest Rectangle in Histogram", "Monotonic Stack"], ["221", "Maximal Square", "DP"]]
  }
};
