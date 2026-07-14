// data/dsa/details-linked-list.js — worked solutions for the Linked List phase.
// Original explanations and implementations of standard algorithms.
// Node convention: class ListNode { int val; ListNode next; }
// Shape: { [problemId]: { statement, examples?, approaches[], oneLiner?, similar? } }

export const DETAILS = {
  "reverse-linked-list": {
    statement: "Reverse a singly linked list so every next pointer points to the previous node, and return the new head.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = []", output: "[]" }
    ],
    approaches: [
      { name: "Better", pattern: "Recursion", theory: "Recurse to the tail first; it becomes the new head. On the way back, make each node's successor point back at it (head.next.next = head) and cut the forward link. Elegant, but the call stack costs O(n) space.", code: ["public ListNode reverseList(ListNode head) {", "    if (head == null || head.next == null) return head;", "    ListNode newHead = reverseList(head.next);", "    head.next.next = head;   // point successor back at me", "    head.next = null;        // cut the old forward link", "    return newHead;", "}"], time: "O(n)", space: "O(n) stack" },
      { name: "Optimal", pattern: "Iterative pointer flip", theory: "Walk the list with three pointers: prev (already reversed part), cur (node being flipped), and next (saved so the rest of the list isn't lost). Each step redirects cur.next to prev and advances everything one node.", code: ["public ListNode reverseList(ListNode head) {", "    ListNode prev = null, cur = head;", "    while (cur != null) {", "        ListNode next = cur.next;   // save the rest", "        cur.next = prev;            // flip the link", "        prev = cur;", "        cur = next;", "    }", "    return prev;   // new head", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "head = 1→2→3", headers: ["cur", "saved next", "cur.next set to", "reversed so far"], rows: [["1", "2", "null", "1"], ["2", "3", "1", "2→1"], ["3", "null", "2", "3→2→1"], ["null (stop)", "—", "—", "return 3"]] } }
    ],
    oneLiner: "Three pointers: save next, flip cur.next to prev, slide all three forward; prev ends as the new head. O(n), O(1).",
    similar: [["206", "Reverse Linked List", "Pointer flip"], ["92", "Reverse Linked List II", "Pointer flip"], ["25", "Reverse Nodes in k-Group", "Pointer flip"]]
  },

  "linked-list-cycle": {
    statement: "Determine whether a linked list loops back on itself, i.e. following next pointers never reaches null.",
    examples: [{ input: "head = [1,2,3,4], tail's next points back to node 2", output: "true" }],
    approaches: [
      { name: "Better", pattern: "HashSet of visited nodes", theory: "Track every node object visited in a set; revisiting one proves a cycle, reaching null proves there is none.", code: ["public boolean hasCycle(ListNode head) {", "    Set<ListNode> seen = new HashSet<>();", "    for (ListNode cur = head; cur != null; cur = cur.next)", "        if (!seen.add(cur)) return true;", "    return false;", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Floyd's slow/fast pointers", theory: "Move one pointer a node at a time and another two nodes at a time. In a cycle, the fast pointer gains one position per step on the slow one, so they must collide; without a cycle, fast hits null.", code: ["public boolean hasCycle(ListNode head) {", "    ListNode slow = head, fast = head;", "    while (fast != null && fast.next != null) {", "        slow = slow.next;", "        fast = fast.next.next;", "        if (slow == fast) return true;", "    }", "    return false;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Floyd's tortoise and hare: fast gains one node per step inside a cycle, so a meeting means a loop. O(n), O(1).",
    similar: [["141", "Linked List Cycle", "Slow/Fast"], ["142", "Linked List Cycle II", "Slow/Fast"], ["287", "Find the Duplicate Number", "Slow/Fast"]]
  },

  "merge-two-sorted-lists": {
    statement: "Splice two ascending linked lists into one ascending list that reuses the existing nodes.",
    examples: [{ input: "list1 = [1,3,5], list2 = [2,4,6]", output: "[1,2,3,4,5,6]" }],
    approaches: [
      { name: "Optimal", pattern: "Dummy head + tail append", theory: "A dummy node removes the empty-result special case. Repeatedly attach the smaller of the two current heads to the tail; when one list runs out, attach the remainder of the other in one link.", code: ["public ListNode mergeTwoLists(ListNode a, ListNode b) {", "    ListNode dummy = new ListNode(0), tail = dummy;", "    while (a != null && b != null) {", "        if (a.val <= b.val) { tail.next = a; a = a.next; }", "        else                { tail.next = b; b = b.next; }", "        tail = tail.next;", "    }", "    tail.next = (a != null) ? a : b;   // leftover", "    return dummy.next;", "}"], time: "O(m+n)", space: "O(1)" }
    ],
    oneLiner: "Dummy head, then repeatedly append the smaller current node; splice on whatever remains. O(m+n), O(1).",
    similar: [["21", "Merge Two Sorted Lists", "Dummy + splice"], ["23", "Merge k Sorted Lists", "Heap"], ["88", "Merge Sorted Array", "Two Pointers"]]
  },

  "middle-of-the-linked-list": {
    statement: "Return the middle node of a linked list; when the length is even, return the second of the two middles.",
    examples: [
      { input: "head = [1,2,3,4,5]", output: "node 3" },
      { input: "head = [1,2,3,4]", output: "node 3 (second middle)" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Slow/Fast pointers", theory: "Advance slow one node and fast two nodes per step. When fast falls off the end, slow has covered exactly half the list and is standing on the middle.", code: ["public ListNode middleNode(ListNode head) {", "    ListNode slow = head, fast = head;", "    while (fast != null && fast.next != null) {", "        slow = slow.next;", "        fast = fast.next.next;", "    }", "    return slow;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Slow moves 1, fast moves 2; when fast exhausts the list, slow is the middle. O(n), O(1)."
  },

  "palindrome-linked-list": {
    statement: "Check whether the sequence of values in a singly linked list reads the same in both directions.",
    examples: [
      { input: "head = [1,2,2,1]", output: "true" },
      { input: "head = [1,2]", output: "false" }
    ],
    approaches: [
      { name: "Better", pattern: "Copy to array", theory: "Dump the values into an ArrayList and compare with two indices from both ends. Simple, but uses linear extra memory.", code: ["public boolean isPalindrome(ListNode head) {", "    List<Integer> vals = new ArrayList<>();", "    for (ListNode cur = head; cur != null; cur = cur.next)", "        vals.add(cur.val);", "    int l = 0, r = vals.size() - 1;", "    while (l < r)", "        if (!vals.get(l++).equals(vals.get(r--))) return false;", "    return true;", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Reverse second half", theory: "Find the middle with slow/fast pointers, reverse the second half in place, then walk one pointer from each end of the two halves comparing values. (Optionally re-reverse to restore the list.)", code: ["public boolean isPalindrome(ListNode head) {", "    ListNode slow = head, fast = head;", "    while (fast != null && fast.next != null) {", "        slow = slow.next;", "        fast = fast.next.next;", "    }", "    ListNode second = reverse(slow);   // head of reversed back half", "    for (ListNode p1 = head, p2 = second; p2 != null; p1 = p1.next, p2 = p2.next)", "        if (p1.val != p2.val) return false;", "    return true;", "}", "private ListNode reverse(ListNode head) {", "    ListNode prev = null;", "    while (head != null) {", "        ListNode next = head.next;", "        head.next = prev;", "        prev = head;", "        head = next;", "    }", "    return prev;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Find the middle, reverse the back half, and compare the two halves node by node. O(n), O(1).",
    similar: [["234", "Palindrome Linked List", "Reverse half"], ["876", "Middle of Linked List", "Slow/Fast"], ["206", "Reverse Linked List", "Pointer flip"]]
  },

  "remove-linked-list-elements": {
    statement: "Delete every node whose value equals a given target and return the resulting list's head.",
    examples: [{ input: "head = [1,2,6,3,6], val = 6", output: "[1,2,3]" }],
    approaches: [
      { name: "Optimal", pattern: "Dummy head + bypass", theory: "A dummy node in front makes deleting the real head no different from any other node. Stand on the node before each candidate: if the next node matches, bypass it; otherwise step forward.", code: ["public ListNode removeElements(ListNode head, int val) {", "    ListNode dummy = new ListNode(0);", "    dummy.next = head;", "    ListNode cur = dummy;", "    while (cur.next != null) {", "        if (cur.next.val == val) cur.next = cur.next.next;   // unlink", "        else cur = cur.next;", "    }", "    return dummy.next;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Add a dummy in front, then bypass every next node that matches the target. O(n), O(1)."
  },

  "delete-node-in-a-linked-list": {
    statement: "You are handed only the node to delete (never the tail) and no access to the head. Remove its value from the list.",
    examples: [{ input: "list = [1,4,7,9], node = the node holding 4", output: "[1,7,9]" }],
    approaches: [
      { name: "Optimal", pattern: "Copy successor, skip it", theory: "Without the predecessor you cannot unlink the node itself — so make it impersonate its successor: copy the next node's value in, then splice the next node out. The value 'disappears' even though a different node object was freed.", code: ["public void deleteNode(ListNode node) {", "    node.val = node.next.val;      // become the successor", "    node.next = node.next.next;    // drop the real successor", "}"], time: "O(1)", space: "O(1)" }
    ],
    oneLiner: "Overwrite the node with its successor's value and unlink the successor. O(1)."
  },

  "intersection-of-two-linked-lists": {
    statement: "Two singly linked lists may share their tail section. Return the first node common to both, or null if they never meet.",
    examples: [{ input: "A = [4,1,8,4,5], B = [5,6,1,8,4,5] sharing from node 8", output: "node 8" }],
    approaches: [
      { name: "Better", pattern: "HashSet of one list", theory: "Store all node references of list A in a set, then walk list B; the first node already present is the intersection.", code: ["public ListNode getIntersectionNode(ListNode headA, ListNode headB) {", "    Set<ListNode> nodes = new HashSet<>();", "    for (ListNode cur = headA; cur != null; cur = cur.next)", "        nodes.add(cur);", "    for (ListNode cur = headB; cur != null; cur = cur.next)", "        if (nodes.contains(cur)) return cur;", "    return null;", "}"], time: "O(m+n)", space: "O(m)" },
      { name: "Optimal", pattern: "Two pointers switching heads", theory: "Walk a pointer down each list; when a pointer finishes, restart it at the other list's head. Both pointers then travel exactly m+n steps, so they arrive at the intersection together — or both hit null simultaneously when there is none.", code: ["public ListNode getIntersectionNode(ListNode headA, ListNode headB) {", "    ListNode a = headA, b = headB;", "    while (a != b) {", "        a = (a == null) ? headB : a.next;", "        b = (b == null) ? headA : b.next;", "    }", "    return a;   // intersection node or null", "}"], time: "O(m+n)", space: "O(1)" }
    ],
    oneLiner: "Run two pointers that swap onto the other list when they finish — equal path lengths force them to meet at the junction (or at null). O(m+n), O(1)."
  },

  "add-two-numbers": {
    statement: "Two non-negative integers are stored one digit per node in reverse order. Return their sum as a list in the same format.",
    examples: [{ input: "l1 = [9,1] (19), l2 = [5] (5)", output: "[4,2] (24)" }],
    approaches: [
      { name: "Optimal", pattern: "Digit-by-digit with carry", theory: "Add corresponding digits plus the carry, exactly like column addition on paper. Because the lists are least-significant-first, one forward pass works; keep going while either list or a carry remains.", code: ["public ListNode addTwoNumbers(ListNode l1, ListNode l2) {", "    ListNode dummy = new ListNode(0), tail = dummy;", "    int carry = 0;", "    while (l1 != null || l2 != null || carry != 0) {", "        int sum = carry;", "        if (l1 != null) { sum += l1.val; l1 = l1.next; }", "        if (l2 != null) { sum += l2.val; l2 = l2.next; }", "        carry = sum / 10;", "        tail.next = new ListNode(sum % 10);", "        tail = tail.next;", "    }", "    return dummy.next;", "}"], time: "O(max(m,n))", space: "O(max(m,n))", dryRun: { title: "l1 = 9→1, l2 = 5", headers: ["digit1", "digit2", "carry in", "sum", "node written"], rows: [["9", "5", "0", "14", "4 (carry 1)"], ["1", "—", "1", "2", "2 (carry 0)"]] } }
    ],
    oneLiner: "Column addition down both lists with a running carry; loop while any digits or carry remain. O(max(m,n)).",
    similar: [["2", "Add Two Numbers", "Carry simulation"], ["445", "Add Two Numbers II", "Stack"], ["66", "Plus One", "Carry"]]
  },

  "remove-nth-node-from-end-of-list": {
    statement: "Delete the nth node counting from the end of the list in a single pass and return the head.",
    examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }],
    approaches: [
      { name: "Optimal", pattern: "Two pointers with an n-node gap", theory: "From a dummy head, advance a lead pointer n nodes. Then move lead and trail together until lead reaches the last node — trail now stands just before the victim, so bypass it. The dummy makes deleting the real head painless.", code: ["public ListNode removeNthFromEnd(ListNode head, int n) {", "    ListNode dummy = new ListNode(0);", "    dummy.next = head;", "    ListNode lead = dummy, trail = dummy;", "    for (int i = 0; i < n; i++) lead = lead.next;   // open the gap", "    while (lead.next != null) {", "        lead = lead.next;", "        trail = trail.next;", "    }", "    trail.next = trail.next.next;   // bypass the nth from end", "    return dummy.next;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Keep two pointers n apart; when the leader hits the tail, the trailer sits before the node to unlink. One pass, O(1) space.",
    similar: [["19", "Remove Nth From End", "Gap pointers"], ["876", "Middle of Linked List", "Slow/Fast"], ["61", "Rotate List", "Length + cut"]]
  },

  "reorder-list": {
    statement: "Rearrange a list L0→L1→...→Ln into L0→Ln→L1→Ln−1→..., relinking nodes in place without changing any values.",
    examples: [{ input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" }],
    approaches: [
      { name: "Optimal", pattern: "Middle + reverse + interleave", theory: "Three classic steps: find the middle with slow/fast pointers, reverse the second half, then zip the two halves together taking one node from each alternately. Everything happens by relinking, no extra nodes.", code: ["public void reorderList(ListNode head) {", "    ListNode slow = head, fast = head;", "    while (fast.next != null && fast.next.next != null) {", "        slow = slow.next;", "        fast = fast.next.next;", "    }", "    ListNode second = reverse(slow.next);", "    slow.next = null;                      // split the halves", "    ListNode first = head;", "    while (second != null) {               // interleave", "        ListNode t1 = first.next, t2 = second.next;", "        first.next = second;", "        second.next = t1;", "        first = t1;", "        second = t2;", "    }", "}", "private ListNode reverse(ListNode head) {", "    ListNode prev = null;", "    while (head != null) {", "        ListNode next = head.next;", "        head.next = prev;", "        prev = head;", "        head = next;", "    }", "    return prev;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Split at the middle, reverse the back half, then alternate nodes from front and back. O(n), O(1).",
    similar: [["143", "Reorder List", "Middle+Reverse"], ["234", "Palindrome Linked List", "Middle+Reverse"], ["206", "Reverse Linked List", "Pointer flip"]]
  },

  "odd-even-linked-list": {
    statement: "Regroup a list so nodes in odd positions come first (keeping order) followed by the even-position nodes, using O(1) extra space.",
    examples: [{ input: "head = [1,2,3,4,5]", output: "[1,3,5,2,4]" }],
    approaches: [
      { name: "Optimal", pattern: "Two chains stitched together", theory: "Grow an odd chain and an even chain in one pass by alternately stealing nodes: odd takes even's successor and vice versa. Remember the even chain's head, and attach it after the odd chain's tail at the end.", code: ["public ListNode oddEvenList(ListNode head) {", "    if (head == null) return null;", "    ListNode odd = head, even = head.next, evenHead = even;", "    while (even != null && even.next != null) {", "        odd.next = even.next;   odd = odd.next;", "        even.next = odd.next;   even = even.next;", "    }", "    odd.next = evenHead;   // append evens after odds", "    return head;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Weave two alternating chains in one pass, then hang the even chain off the odd tail. O(n), O(1)."
  },

  "swap-nodes-in-pairs": {
    statement: "Swap every two adjacent nodes of a list by relinking them (not by exchanging values) and return the head.",
    examples: [{ input: "head = [1,2,3,4]", output: "[2,1,4,3]" }],
    approaches: [
      { name: "Optimal", pattern: "Dummy + local rewiring", theory: "Stand on the node before each pair (starting at a dummy). For pair (first, second): route first past the pair, point second at first, and hook the predecessor onto second. Then advance the anchor to first, which is now the pair's back node.", code: ["public ListNode swapPairs(ListNode head) {", "    ListNode dummy = new ListNode(0);", "    dummy.next = head;", "    ListNode prev = dummy;", "    while (prev.next != null && prev.next.next != null) {", "        ListNode first = prev.next, second = first.next;", "        first.next = second.next;   // step over the pair", "        second.next = first;        // reverse the pair", "        prev.next = second;         // reconnect predecessor", "        prev = first;               // anchor for the next pair", "    }", "    return dummy.next;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "From an anchor before each pair, rewire three links to flip the pair, then hop the anchor forward two nodes. O(n), O(1).",
    similar: [["24", "Swap Nodes in Pairs", "Rewiring"], ["25", "Reverse Nodes in k-Group", "Rewiring"], ["206", "Reverse Linked List", "Pointer flip"]]
  },

  "rotate-list": {
    statement: "Rotate a linked list to the right by k places, where k may exceed the list length.",
    examples: [{ input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]" }],
    approaches: [
      { name: "Optimal", pattern: "Close the ring, cut once", theory: "Measure the length n and let the old tail point back at the head, forming a ring. A right-rotation by k means the new tail sits n − (k mod n) − 1 hops from the old head; walk there, take its next as the new head, and cut the ring.", code: ["public ListNode rotateRight(ListNode head, int k) {", "    if (head == null || head.next == null || k == 0) return head;", "    int n = 1;", "    ListNode tail = head;", "    while (tail.next != null) { tail = tail.next; n++; }", "    k %= n;", "    if (k == 0) return head;", "    tail.next = head;                       // form a ring", "    ListNode newTail = head;", "    for (int i = 0; i < n - k - 1; i++) newTail = newTail.next;", "    ListNode newHead = newTail.next;", "    newTail.next = null;                    // cut the ring", "    return newHead;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Link tail to head to make a ring, then break it after n − k%n nodes. O(n), O(1)."
  },

  "partition-list": {
    statement: "Rearrange a list so every node smaller than x precedes every node greater than or equal to x, preserving the original relative order within each side.",
    examples: [{ input: "head = [3,5,1,4,2], x = 4", output: "[3,1,2,5,4]" }],
    approaches: [
      { name: "Optimal", pattern: "Two chains, then join", theory: "Build a 'smaller' chain and a 'greater-or-equal' chain behind two dummy heads, appending each node to the matching chain as you scan. Terminate the second chain (to break any leftover link) and attach it after the first.", code: ["public ListNode partition(ListNode head, int x) {", "    ListNode lessHead = new ListNode(0), less = lessHead;", "    ListNode geHead = new ListNode(0), ge = geHead;", "    for (ListNode cur = head; cur != null; cur = cur.next) {", "        if (cur.val < x) { less.next = cur; less = cur; }", "        else             { ge.next = cur;   ge = cur; }", "    }", "    ge.next = null;               // seal the tail", "    less.next = geHead.next;      // join the chains", "    return lessHead.next;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Route each node into a less-than chain or a ge chain behind dummy heads, seal the tail, and concatenate. O(n), O(1)."
  },

  "copy-list-with-random-pointer": {
    statement: "Each node carries an extra random pointer to any node (or null). Produce a deep copy of the list where no pointer touches an original node.",
    examples: [{ input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]] (val, random index)", output: "an identical structure of brand-new nodes" }],
    approaches: [
      { name: "Better", pattern: "HashMap original → clone", theory: "Pass 1 creates a bare clone per node in a map keyed by the original. Pass 2 wires each clone's next and random by looking up the clones of the original's targets (a null key simply misses, yielding null).", code: ["public Node copyRandomList(Node head) {", "    Map<Node, Node> clone = new HashMap<>();", "    for (Node cur = head; cur != null; cur = cur.next)", "        clone.put(cur, new Node(cur.val));", "    for (Node cur = head; cur != null; cur = cur.next) {", "        clone.get(cur).next = clone.get(cur.next);", "        clone.get(cur).random = clone.get(cur.random);", "    }", "    return clone.get(head);", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Interleave clones in place", theory: "Insert each clone directly after its original (A→A'→B→B'...). Now every original's random.next is exactly its clone's random target — set them in a second pass. A third pass unzips the two lists. The interleaving replaces the hash map.", code: ["public Node copyRandomList(Node head) {", "    if (head == null) return null;", "    for (Node cur = head; cur != null; cur = cur.next.next) {", "        Node copy = new Node(cur.val);", "        copy.next = cur.next;", "        cur.next = copy;", "    }", "    for (Node cur = head; cur != null; cur = cur.next.next)", "        if (cur.random != null)", "            cur.next.random = cur.random.next;   // clone of random", "    Node newHead = head.next;", "    for (Node cur = head; cur != null; cur = cur.next) {", "        Node copy = cur.next;", "        cur.next = copy.next;                    // restore original", "        if (copy.next != null) copy.next = copy.next.next;   // link clones", "    }", "    return newHead;", "}"], time: "O(n)", space: "O(1) extra" }
    ],
    oneLiner: "Either map original→clone in two passes, or interleave clones after their originals so random targets are found via original.random.next, then unzip. O(n)."
  },

  "lru-cache": {
    statement: "Design a fixed-capacity key-value cache where get and put both run in O(1); when full, inserting a new key evicts the least recently used entry.",
    examples: [{ input: "capacity 2: put(1,1), put(2,2), get(1)→1, put(3,3) evicts 2, get(2)", output: "get(2) returns -1" }],
    approaches: [
      { name: "Better", pattern: "LinkedHashMap (access order)", theory: "Java's LinkedHashMap can maintain entries in access order and offers a removeEldestEntry hook, which together implement LRU in a few lines. Great to mention, but interviewers usually want the structure built by hand.", code: ["class LRUCache extends LinkedHashMap<Integer, Integer> {", "    private final int capacity;", "    public LRUCache(int capacity) {", "        super(capacity, 0.75f, true);   // true = access order", "        this.capacity = capacity;", "    }", "    public int get(int key) {", "        return getOrDefault(key, -1);", "    }", "    public void put(int key, int value) {", "        super.put(key, value);", "    }", "    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {", "        return size() > capacity;", "    }", "}"], time: "O(1) per op", space: "O(capacity)" },
      { name: "Optimal", pattern: "HashMap + doubly linked list", theory: "The HashMap gives O(1) key lookup; a doubly linked list with sentinel head/tail keeps recency order — most recent behind head, LRU before tail. Every get/put unlinks the touched node and reinserts it at the front; eviction unlinks tail.prev. Nodes store their key so eviction can also clean the map.", code: ["class LRUCache {", "    private class Node {", "        int key, val;", "        Node prev, next;", "        Node(int k, int v) { key = k; val = v; }", "    }", "    private final int capacity;", "    private final Map<Integer, Node> map = new HashMap<>();", "    private final Node head = new Node(0, 0);   // MRU side sentinel", "    private final Node tail = new Node(0, 0);   // LRU side sentinel", "", "    public LRUCache(int capacity) {", "        this.capacity = capacity;", "        head.next = tail;", "        tail.prev = head;", "    }", "    public int get(int key) {", "        Node n = map.get(key);", "        if (n == null) return -1;", "        moveToFront(n);", "        return n.val;", "    }", "    public void put(int key, int value) {", "        Node n = map.get(key);", "        if (n != null) {", "            n.val = value;", "            moveToFront(n);", "            return;", "        }", "        if (map.size() == capacity) {", "            Node lru = tail.prev;", "            unlink(lru);", "            map.remove(lru.key);", "        }", "        Node fresh = new Node(key, value);", "        map.put(key, fresh);", "        insertAfterHead(fresh);", "    }", "    private void moveToFront(Node n) { unlink(n); insertAfterHead(n); }", "    private void unlink(Node n) {", "        n.prev.next = n.next;", "        n.next.prev = n.prev;", "    }", "    private void insertAfterHead(Node n) {", "        n.next = head.next;", "        n.prev = head;", "        head.next.prev = n;", "        head.next = n;", "    }", "}"], time: "O(1) per op", space: "O(capacity)", dryRun: { title: "capacity = 2", headers: ["operation", "list (MRU→LRU)", "evicted", "returns"], rows: [["put(1,1)", "1", "—", "—"], ["put(2,2)", "2, 1", "—", "—"], ["get(1)", "1, 2", "—", "1"], ["put(3,3)", "3, 1", "key 2", "—"], ["get(2)", "3, 1", "—", "-1"]] } }
    ],
    oneLiner: "HashMap for O(1) lookup plus a doubly linked list for recency: touch → move node to front, overflow → drop the node before the tail sentinel.",
    similar: [["146", "LRU Cache", "HashMap + DLL"], ["460", "LFU Cache", "HashMap + buckets"], ["380", "Insert Delete GetRandom O(1)", "HashMap + array"]]
  },

  "merge-k-sorted-lists": {
    statement: "Merge k individually sorted linked lists into one sorted list.",
    examples: [{ input: "lists = [[1,4],[2,5],[3]]", output: "[1,2,3,4,5]" }],
    approaches: [
      { name: "Brute Force", pattern: "Collect and sort", theory: "Pour every value into one ArrayList, sort it, and rebuild a fresh list. Simple, but ignores that the inputs are already sorted and allocates all-new nodes.", code: ["public ListNode mergeKLists(ListNode[] lists) {", "    List<Integer> vals = new ArrayList<>();", "    for (ListNode node : lists)", "        for (; node != null; node = node.next)", "            vals.add(node.val);", "    Collections.sort(vals);", "    ListNode dummy = new ListNode(0), tail = dummy;", "    for (int v : vals) {", "        tail.next = new ListNode(v);", "        tail = tail.next;", "    }", "    return dummy.next;", "}"], time: "O(N log N)", space: "O(N)" },
      { name: "Optimal", pattern: "Min-heap of current heads", theory: "Seed a priority queue with each list's head. Repeatedly pop the smallest node, append it to the output, and push that node's successor if it exists. The heap always holds at most k nodes, so each of the N nodes costs O(log k). (Pairwise divide-and-conquer merging achieves the same bound.)", code: ["public ListNode mergeKLists(ListNode[] lists) {", "    PriorityQueue<ListNode> heap =", "        new PriorityQueue<>((a, b) -> a.val - b.val);", "    for (ListNode node : lists)", "        if (node != null) heap.offer(node);", "    ListNode dummy = new ListNode(0), tail = dummy;", "    while (!heap.isEmpty()) {", "        ListNode min = heap.poll();", "        tail.next = min;", "        tail = min;", "        if (min.next != null) heap.offer(min.next);", "    }", "    return dummy.next;", "}"], time: "O(N log k)", space: "O(k)", dryRun: { title: "lists = [1→4, 2→5, 3]", headers: ["heap", "popped", "output so far", "pushed"], rows: [["{1,2,3}", "1", "1", "4"], ["{2,3,4}", "2", "1→2", "5"], ["{3,4,5}", "3", "1→2→3", "—"], ["{4,5}", "4", "1→2→3→4", "—"], ["{5}", "5", "1→2→3→4→5", "—"]] } }
    ],
    oneLiner: "Keep the k current heads in a min-heap; pop the smallest onto the result and push its successor. O(N log k), O(k).",
    similar: [["23", "Merge k Sorted Lists", "Heap"], ["21", "Merge Two Sorted Lists", "Splice"], ["378", "Kth Smallest in Sorted Matrix", "Heap"]]
  },

  "reverse-nodes-in-k-group": {
    statement: "Reverse the nodes of a list k at a time; a final group shorter than k stays in its original order.",
    examples: [
      { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
      { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Count k, reverse block, recurse", theory: "First confirm k nodes remain — if not, return head unchanged (the short tail keeps its order). Otherwise recursively process the rest of the list; its returned head becomes the 'prev' that this block reverses into, so the standard pointer-flip loop both reverses the block and stitches it to the already-processed remainder.", code: ["public ListNode reverseKGroup(ListNode head, int k) {", "    ListNode probe = head;", "    for (int i = 0; i < k; i++) {      // are k nodes available?", "        if (probe == null) return head;", "        probe = probe.next;", "    }", "    ListNode prev = reverseKGroup(probe, k);   // handle the rest first", "    ListNode cur = head;", "    for (int i = 0; i < k; i++) {      // flip this block into prev", "        ListNode next = cur.next;", "        cur.next = prev;", "        prev = cur;", "        cur = next;", "    }", "    return prev;   // new head of this block", "}"], time: "O(n)", space: "O(n/k) stack" }
    ],
    oneLiner: "Verify k nodes exist, recurse on the remainder, then flip the current block so it lands on the processed tail. O(n).",
    similar: [["25", "Reverse Nodes in k-Group", "Block reverse"], ["206", "Reverse Linked List", "Pointer flip"], ["24", "Swap Nodes in Pairs", "Rewiring"]]
  }
};
