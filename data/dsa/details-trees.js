// data/dsa/details-trees.js — worked solutions for the Trees phase.
// Original explanations + Java implementations. class TreeNode { int val; TreeNode left, right; }

export const DETAILS = {
  "binary-tree-inorder-traversal": {
    statement: "Return the values of a binary tree visited in inorder (left, node, right).",
    approaches: [
      { name: "Recursive", pattern: "DFS", theory: "Recurse left, visit the node, recurse right.", code: ["public List<Integer> inorderTraversal(TreeNode root) {", "    List<Integer> res = new ArrayList<>();", "    dfs(root, res);", "    return res;", "}", "private void dfs(TreeNode n, List<Integer> res) {", "    if (n == null) return;", "    dfs(n.left, res); res.add(n.val); dfs(n.right, res);", "}"], time: "O(n)", space: "O(h)" },
      { name: "Iterative", pattern: "Explicit stack", theory: "Push all left children, pop and visit, then move to the right child.", code: ["public List<Integer> inorderTraversal(TreeNode root) {", "    List<Integer> res = new ArrayList<>();", "    Deque<TreeNode> st = new ArrayDeque<>();", "    TreeNode cur = root;", "    while (cur != null || !st.isEmpty()) {", "        while (cur != null) { st.push(cur); cur = cur.left; }", "        cur = st.pop(); res.add(cur.val); cur = cur.right;", "    }", "    return res;", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Inorder = left, node, right; recursion or an explicit stack pushing all lefts first. O(n)."
  },
  "binary-tree-preorder-traversal": {
    statement: "Return the values of a binary tree visited in preorder (node, left, right).",
    approaches: [
      { name: "Iterative", pattern: "Explicit stack", theory: "Push root; pop and visit; push right then left so left comes out first.", code: ["public List<Integer> preorderTraversal(TreeNode root) {", "    List<Integer> res = new ArrayList<>();", "    if (root == null) return res;", "    Deque<TreeNode> st = new ArrayDeque<>();", "    st.push(root);", "    while (!st.isEmpty()) {", "        TreeNode n = st.pop(); res.add(n.val);", "        if (n.right != null) st.push(n.right);", "        if (n.left != null) st.push(n.left);", "    }", "    return res;", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Preorder = node, left, right; a stack that pushes right before left. O(n)."
  },
  "binary-tree-postorder-traversal": {
    statement: "Return the values of a binary tree visited in postorder (left, right, node).",
    approaches: [
      { name: "Iterative", pattern: "Reverse of node-right-left", theory: "Do a node-right-left traversal, adding each value to the front — that yields postorder.", code: ["public List<Integer> postorderTraversal(TreeNode root) {", "    LinkedList<Integer> res = new LinkedList<>();", "    if (root == null) return res;", "    Deque<TreeNode> st = new ArrayDeque<>();", "    st.push(root);", "    while (!st.isEmpty()) {", "        TreeNode n = st.pop(); res.addFirst(n.val);", "        if (n.left != null) st.push(n.left);", "        if (n.right != null) st.push(n.right);", "    }", "    return res;", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Build node-right-left and prepend each value (reverse) to get left-right-node. O(n)."
  },
  "maximum-depth-of-binary-tree": {
    statement: "Return the maximum depth (nodes on the longest root-to-leaf path) of a binary tree.",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
    approaches: [
      { name: "Recursive", pattern: "DFS", theory: "Depth = 1 + max(left depth, right depth); empty tree is 0.", code: ["public int maxDepth(TreeNode root) {", "    if (root == null) return 0;", "    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "1 + max(left, right) depth, recursively. O(n)."
  },
  "same-tree": {
    statement: "Return true if two binary trees are structurally identical with equal node values.",
    approaches: [
      { name: "Recursive", pattern: "DFS", theory: "Both null → equal; one null or values differ → not equal; else recurse on both children.", code: ["public boolean isSameTree(TreeNode p, TreeNode q) {", "    if (p == null || q == null) return p == q;", "    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Recurse comparing values and both subtrees; both null is equal. O(n)."
  },
  "symmetric-tree": {
    statement: "Return true if a binary tree is a mirror image of itself around its center.",
    approaches: [
      { name: "Recursive", pattern: "Mirror DFS", theory: "Compare left subtree against right subtree with mirrored children: left.left vs right.right, left.right vs right.left.", code: ["public boolean isSymmetric(TreeNode root) {", "    return root == null || mirror(root.left, root.right);", "}", "private boolean mirror(TreeNode a, TreeNode b) {", "    if (a == null || b == null) return a == b;", "    return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Check the tree against its mirror: a.left↔b.right, a.right↔b.left. O(n)."
  },
  "invert-binary-tree": {
    statement: "Invert a binary tree — swap every node's left and right children.",
    examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
    approaches: [
      { name: "Recursive", pattern: "DFS swap", theory: "Swap the two children of every node.", code: ["public TreeNode invertTree(TreeNode root) {", "    if (root == null) return null;", "    TreeNode t = root.left;", "    root.left = invertTree(root.right);", "    root.right = invertTree(t);", "    return root;", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Swap children at every node recursively. O(n)."
  },
  "path-sum": {
    statement: "Return true if the tree has a root-to-leaf path whose node values sum to a target.",
    approaches: [
      { name: "Recursive", pattern: "DFS with remaining sum", theory: "Subtract the node value from the target; at a leaf, check whether the remainder equals the leaf value.", code: ["public boolean hasPathSum(TreeNode root, int target) {", "    if (root == null) return false;", "    if (root.left == null && root.right == null) return target == root.val;", "    int rem = target - root.val;", "    return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "DFS carrying the remaining target; succeed when a leaf's value equals it. O(n)."
  },
  "balanced-binary-tree": {
    statement: "Return true if the tree is height-balanced (every node's two subtrees differ in height by at most 1).",
    approaches: [
      { name: "Optimal", pattern: "DFS returning height, -1 on imbalance", theory: "Bubble up each subtree's height; return −1 the moment any node is unbalanced, short-circuiting the rest.", code: ["public boolean isBalanced(TreeNode root) {", "    return height(root) != -1;", "}", "private int height(TreeNode n) {", "    if (n == null) return 0;", "    int l = height(n.left); if (l == -1) return -1;", "    int r = height(n.right); if (r == -1) return -1;", "    if (Math.abs(l - r) > 1) return -1;", "    return 1 + Math.max(l, r);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Post-order height that returns −1 to signal imbalance up the tree. O(n)."
  },
  "minimum-depth-of-binary-tree": {
    statement: "Return the minimum depth — the shortest root-to-leaf path length.",
    approaches: [
      { name: "Optimal", pattern: "DFS (careful with one child)", theory: "A null child is not a leaf, so with only one child you must descend that side; take the min only among existing children.", code: ["public int minDepth(TreeNode root) {", "    if (root == null) return 0;", "    if (root.left == null) return 1 + minDepth(root.right);", "    if (root.right == null) return 1 + minDepth(root.left);", "    return 1 + Math.min(minDepth(root.left), minDepth(root.right));", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Min depth but only descend existing children, so a single-child node isn't treated as a leaf. O(n)."
  },
  "binary-tree-level-order-traversal": {
    statement: "Return node values level by level, top to bottom, each level as its own list.",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    approaches: [
      { name: "Optimal", pattern: "BFS with a queue", theory: "Process one level at a time: snapshot the queue size, dequeue exactly that many nodes (the level), collect values and enqueue their children.", code: ["public List<List<Integer>> levelOrder(TreeNode root) {", "    List<List<Integer>> res = new ArrayList<>();", "    if (root == null) return res;", "    Queue<TreeNode> q = new LinkedList<>();", "    q.add(root);", "    while (!q.isEmpty()) {", "        int size = q.size();", "        List<Integer> level = new ArrayList<>();", "        for (int i = 0; i < size; i++) {", "            TreeNode n = q.poll();", "            level.add(n.val);", "            if (n.left != null) q.add(n.left);", "            if (n.right != null) q.add(n.right);", "        }", "        res.add(level);", "    }", "    return res;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "root = [3,9,20,null,null,15,7]", headers: ["level size", "dequeued", "children enqueued", "result"], rows: [["1", "3", "9,20", "[[3]]"], ["2", "9,20", "15,7", "[[3],[9,20]]"], ["2", "15,7", "—", "[[3],[9,20],[15,7]]"]] } }
    ],
    oneLiner: "BFS a level at a time: snapshot the queue size, drain that many nodes, enqueue their children. O(n).",
    similar: [["102", "Level Order", "BFS"], ["199", "Right Side View", "BFS"], ["103", "Zigzag Level Order", "BFS"]]
  },
  "validate-binary-search-tree": {
    statement: "Return true if a binary tree is a valid BST — every node greater than all nodes in its left subtree and less than all in its right subtree.",
    examples: [{ input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "4's right subtree holds 3, which is < 5." }],
    approaches: [
      { name: "Brute", pattern: "Node-only check (insufficient)", theory: "Comparing a node only with its direct children misses deep violations, so a range-based check is required. Shown to motivate the optimal approach.", code: ["// comparing node vs immediate children fails cases like [5,1,4,null,null,3,6]"], time: "—", space: "—" },
      { name: "Optimal", pattern: "DFS with (low, high) range", theory: "Pass down an allowed open interval; each node must lie strictly inside it. Going left tightens the high bound to the node's value; going right tightens the low bound.", code: ["public boolean isValidBST(TreeNode root) {", "    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);", "}", "private boolean valid(TreeNode n, long low, long high) {", "    if (n == null) return true;", "    if (n.val <= low || n.val >= high) return false;", "    return valid(n.left, low, n.val) && valid(n.right, n.val, high);", "}"], time: "O(n)", space: "O(h)", dryRun: { title: "root = [5,1,4,_,_,3,6]", headers: ["node", "allowed (low, high)", "ok?"], rows: [["5", "(−∞, +∞)", "yes"], ["1", "(−∞, 5)", "yes"], ["4", "(5, +∞)", "no → false"]] } }
    ],
    oneLiner: "DFS carrying a strict (low, high) range each node must lie in; left tightens high, right tightens low. O(n).",
    similar: [["98", "Validate BST", "DFS range"], ["230", "Kth Smallest in BST", "Inorder"], ["235", "LCA of BST", "BST property"]]
  },
  "kth-smallest-element-in-a-bst": {
    statement: "Return the kth smallest value in a BST.",
    approaches: [
      { name: "Optimal", pattern: "Inorder traversal", theory: "An inorder walk of a BST yields sorted values; stop at the kth.", code: ["public int kthSmallest(TreeNode root, int k) {", "    Deque<TreeNode> st = new ArrayDeque<>();", "    TreeNode cur = root;", "    while (cur != null || !st.isEmpty()) {", "        while (cur != null) { st.push(cur); cur = cur.left; }", "        cur = st.pop();", "        if (--k == 0) return cur.val;", "        cur = cur.right;", "    }", "    return -1;", "}"], time: "O(h + k)", space: "O(h)" }
    ],
    oneLiner: "Iterative inorder (sorted for a BST); return the kth popped value. O(h + k)."
  },
  "lowest-common-ancestor-of-a-binary-tree": {
    statement: "Given two nodes p and q, return their lowest common ancestor — the deepest node that has both as descendants.",
    examples: [{ input: "root = [3,5,1,6,2,0,8], p = 5, q = 1", output: "3" }],
    approaches: [
      { name: "Optimal", pattern: "Post-order DFS", theory: "Return the node if it is p or q. If both left and right recursions find a target, the current node is the LCA; otherwise propagate whichever side found one.", code: ["public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {", "    if (root == null || root == p || root == q) return root;", "    TreeNode left = lowestCommonAncestor(root.left, p, q);", "    TreeNode right = lowestCommonAncestor(root.right, p, q);", "    if (left != null && right != null) return root;   // split point", "    return left != null ? left : right;", "}"], time: "O(n)", space: "O(h)", dryRun: { title: "p=5, q=1 under root 3", headers: ["node", "left finds", "right finds", "returns"], rows: [["5", "—", "—", "5 (is p)"], ["1", "—", "—", "1 (is q)"], ["3", "5", "1", "3 = LCA"]] } }
    ],
    oneLiner: "Return p/q on sight; the node where both sides report a find is the LCA. O(n).",
    similar: [["236", "LCA of Binary Tree", "DFS"], ["235", "LCA of BST", "BST walk"], ["1650", "LCA III", "Two pointers"]]
  },
  "construct-binary-tree-from-preorder-and-inorder-traversal": {
    statement: "Rebuild a binary tree from its preorder and inorder traversal arrays (values are unique).",
    approaches: [
      { name: "Optimal", pattern: "Recursion + index map", theory: "Preorder's first element is the root; its position in inorder splits left and right subtrees. A value→index map on inorder makes the split O(1).", code: ["int pre = 0; Map<Integer,Integer> idx = new HashMap<>();", "public TreeNode buildTree(int[] preorder, int[] inorder) {", "    for (int i = 0; i < inorder.length; i++) idx.put(inorder[i], i);", "    return build(preorder, 0, inorder.length - 1);", "}", "private TreeNode build(int[] pre, int lo, int hi) {", "    if (lo > hi) return null;", "    TreeNode root = new TreeNode(pre[this.pre++]);", "    int mid = idx.get(root.val);", "    root.left = build(pre, lo, mid - 1);", "    root.right = build(pre, mid + 1, hi);", "    return root;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Preorder yields roots in order; each root's inorder index splits its subtrees. O(n)."
  },
  "flatten-binary-tree-to-linked-list": {
    statement: "Flatten a binary tree into a preorder 'linked list' using right pointers (left set to null), in place.",
    approaches: [
      { name: "Optimal", pattern: "Rightmost rewiring", theory: "For each node with a left child, find that left subtree's rightmost node, hang the current right subtree there, move left up to right, and null the left.", code: ["public void flatten(TreeNode root) {", "    TreeNode cur = root;", "    while (cur != null) {", "        if (cur.left != null) {", "            TreeNode last = cur.left;", "            while (last.right != null) last = last.right;", "            last.right = cur.right;", "            cur.right = cur.left;", "            cur.left = null;", "        }", "        cur = cur.right;", "    }", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Splice each left subtree onto the right chain via its rightmost node. O(n), O(1)."
  },
  "binary-tree-right-side-view": {
    statement: "Return the values visible from the right side of the tree, top to bottom.",
    approaches: [
      { name: "Optimal", pattern: "BFS, last of each level", theory: "Level-order BFS; the last node dequeued at each level is the one visible from the right.", code: ["public List<Integer> rightSideView(TreeNode root) {", "    List<Integer> res = new ArrayList<>();", "    if (root == null) return res;", "    Queue<TreeNode> q = new LinkedList<>();", "    q.add(root);", "    while (!q.isEmpty()) {", "        int size = q.size();", "        for (int i = 0; i < size; i++) {", "            TreeNode n = q.poll();", "            if (i == size - 1) res.add(n.val);", "            if (n.left != null) q.add(n.left);", "            if (n.right != null) q.add(n.right);", "        }", "    }", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "BFS per level, take the last node of each level. O(n)."
  },
  "count-good-nodes-in-binary-tree": {
    statement: "A node is 'good' if no node on the path from the root to it is greater. Count the good nodes.",
    approaches: [
      { name: "Optimal", pattern: "DFS carrying path max", theory: "Pass down the max seen so far; a node is good when its value ≥ that max, and it becomes the new max for its subtrees.", code: ["public int goodNodes(TreeNode root) {", "    return dfs(root, Integer.MIN_VALUE);", "}", "private int dfs(TreeNode n, int max) {", "    if (n == null) return 0;", "    int good = n.val >= max ? 1 : 0;", "    max = Math.max(max, n.val);", "    return good + dfs(n.left, max) + dfs(n.right, max);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "DFS carrying the path max; count nodes ≥ that max. O(n)."
  },
  "path-sum-ii": {
    statement: "Return all root-to-leaf paths whose node values sum to a target.",
    approaches: [
      { name: "Optimal", pattern: "Backtracking DFS", theory: "Track the current path and remaining sum; at a leaf that hits the target, record a copy of the path. Remove the node on the way back up.", code: ["public List<List<Integer>> pathSum(TreeNode root, int target) {", "    List<List<Integer>> res = new ArrayList<>();", "    dfs(root, target, new ArrayList<>(), res);", "    return res;", "}", "private void dfs(TreeNode n, int rem, List<Integer> path, List<List<Integer>> res) {", "    if (n == null) return;", "    path.add(n.val);", "    if (n.left == null && n.right == null && rem == n.val) res.add(new ArrayList<>(path));", "    else { dfs(n.left, rem - n.val, path, res); dfs(n.right, rem - n.val, path, res); }", "    path.remove(path.size() - 1);", "}"], time: "O(n²)", space: "O(h)" }
    ],
    oneLiner: "Backtracking DFS accumulating the path; record a copy at any leaf summing to target. O(n²) worst."
  },
  "serialize-and-deserialize-binary-tree": {
    statement: "Design methods to serialize a binary tree to a string and deserialize it back to the identical tree.",
    approaches: [
      { name: "Optimal", pattern: "Preorder with null markers", theory: "Serialize preorder, writing '#' for null. Deserialize by consuming tokens in the same order, building nodes and treating '#' as null.", code: ["public String serialize(TreeNode root) {", "    StringBuilder sb = new StringBuilder();", "    ser(root, sb);", "    return sb.toString();", "}", "private void ser(TreeNode n, StringBuilder sb) {", "    if (n == null) { sb.append(\"#,\"); return; }", "    sb.append(n.val).append(',');", "    ser(n.left, sb); ser(n.right, sb);", "}", "public TreeNode deserialize(String data) {", "    return de(new ArrayDeque<>(Arrays.asList(data.split(\",\"))));", "}", "private TreeNode de(Deque<String> q) {", "    String t = q.poll();", "    if (t.equals(\"#\")) return null;", "    TreeNode n = new TreeNode(Integer.parseInt(t));", "    n.left = de(q); n.right = de(q);", "    return n;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Preorder with '#' null markers; rebuild by consuming tokens in the same order. O(n)."
  },
  "binary-tree-maximum-path-sum": {
    statement: "Return the maximum path sum of any path in the tree (a path is any sequence of connected nodes; it need not pass through the root).",
    approaches: [
      { name: "Optimal", pattern: "DFS returning best downward gain", theory: "Each node returns its best single-branch gain (node + max(0, best child)). The best path bending at a node is node + left gain + right gain; track the global maximum of those.", code: ["int best = Integer.MIN_VALUE;", "public int maxPathSum(TreeNode root) {", "    gain(root);", "    return best;", "}", "private int gain(TreeNode n) {", "    if (n == null) return 0;", "    int l = Math.max(0, gain(n.left));", "    int r = Math.max(0, gain(n.right));", "    best = Math.max(best, n.val + l + r);   // path bends at n", "    return n.val + Math.max(l, r);          // path continues upward", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Each node returns its best downward branch; the global best is node + both positive branches. O(n)."
  },
  "recover-binary-search-tree": {
    statement: "Two nodes of a BST were swapped by mistake. Recover the tree without changing its structure.",
    approaches: [
      { name: "Optimal", pattern: "Inorder finds the offenders", theory: "An inorder walk of a valid BST is sorted; the swap creates one or two descending adjacent pairs. Record the first (higher) and last (lower) offenders, then swap their values back.", code: ["TreeNode first, second, prev;", "public void recoverTree(TreeNode root) {", "    inorder(root);", "    int t = first.val; first.val = second.val; second.val = t;", "}", "private void inorder(TreeNode n) {", "    if (n == null) return;", "    inorder(n.left);", "    if (prev != null && prev.val > n.val) {", "        if (first == null) first = prev;", "        second = n;", "    }", "    prev = n;", "    inorder(n.right);", "}"], time: "O(n)", space: "O(h)" }
    ],
    oneLiner: "Inorder scan spots the descending pair(s); swap the first-high and last-low values back. O(n)."
  }
};
