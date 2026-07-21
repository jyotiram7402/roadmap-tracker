// data/dsa/details-backtracking.js — worked solutions for the Backtracking phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "letter-case-permutation": {
    statement: "Given a string of letters and digits, return every string you can make by toggling the case of each letter. Digits stay unchanged. Order does not matter.",
    examples: [{ input: "s = \"a1b2\"", output: "[\"a1b2\",\"a1B2\",\"A1b2\",\"A1B2\"]" }],
    approaches: [
      { name: "Optimal", pattern: "Backtracking", theory: "Recurse position by position. At a digit there is a single branch (keep it). At a letter there are two branches: lowercase and uppercase. When the index reaches the end, record the current string.", code: ["public List<String> letterCasePermutation(String s) {", "    List<String> res = new ArrayList<>();", "    backtrack(s.toCharArray(), 0, res);", "    return res;", "}", "private void backtrack(char[] arr, int i, List<String> res) {", "    if (i == arr.length) { res.add(new String(arr)); return; }", "    if (Character.isDigit(arr[i])) {", "        backtrack(arr, i + 1, res);", "    } else {", "        arr[i] = Character.toLowerCase(arr[i]);", "        backtrack(arr, i + 1, res);", "        arr[i] = Character.toUpperCase(arr[i]);", "        backtrack(arr, i + 1, res);", "    }", "}"], time: "O(2^L * n)", space: "O(n)" }
    ],
    oneLiner: "Branch two ways on each letter (lower/upper), one way on each digit; collect at the end. O(2^L)."
  },
  "combinations": {
    statement: "Return all possible combinations of k numbers chosen from the range 1..n (order within a combination does not matter).",
    examples: [{ input: "n = 4, k = 2", output: "[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]" }],
    approaches: [
      { name: "Optimal", pattern: "Backtracking with start index", theory: "Build combinations by always choosing the next number greater than the last picked one (via a start index), which avoids duplicates and reordered repeats. When the current list reaches size k, record a copy; otherwise keep extending.", code: ["public List<List<Integer>> combine(int n, int k) {", "    List<List<Integer>> res = new ArrayList<>();", "    backtrack(1, n, k, new ArrayList<>(), res);", "    return res;", "}", "private void backtrack(int start, int n, int k, List<Integer> cur, List<List<Integer>> res) {", "    if (cur.size() == k) { res.add(new ArrayList<>(cur)); return; }", "    for (int i = start; i <= n; i++) {", "        cur.add(i);", "        backtrack(i + 1, n, k, cur, res);", "        cur.remove(cur.size() - 1);", "    }", "}"], time: "O(C(n,k) * k)", space: "O(k)" }
    ],
    oneLiner: "Backtrack picking only numbers after the last chosen (start index) until the list hits size k. "
  },
  "subsets": {
    statement: "Return all subsets (the power set) of an array of distinct integers.",
    examples: [{ input: "nums = [1,2,3]", output: "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]" }],
    approaches: [
      { name: "Optimal", pattern: "Backtracking (choose start index)", theory: "At each step record the current subset, then try adding each remaining element (from a moving start index) and recurse — removing it afterwards. The start index prevents duplicate subsets.", code: ["public List<List<Integer>> subsets(int[] nums) {", "    List<List<Integer>> res = new ArrayList<>();", "    backtrack(nums, 0, new ArrayList<>(), res);", "    return res;", "}", "private void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {", "    res.add(new ArrayList<>(cur));", "    for (int i = start; i < nums.length; i++) {", "        cur.add(nums[i]);", "        backtrack(nums, i + 1, cur, res);", "        cur.remove(cur.size() - 1);", "    }", "}"], time: "O(n · 2ⁿ)", space: "O(n)", dryRun: { title: "nums = [1,2]", headers: ["cur recorded", "then try", "recurse start"], rows: [["[]", "add 1", "start=1"], ["[1]", "add 2", "start=2"], ["[1,2]", "—", "backtrack"], ["[2]", "—", "done"]] } }
    ],
    oneLiner: "Backtrack recording the running subset and extending with each later element from a moving start index. O(n·2ⁿ).",
    similar: [["78", "Subsets", "Backtracking"], ["90", "Subsets II", "Backtracking + skip dup"], ["46", "Permutations", "Backtracking"]]
  },
  "permutations": {
    statement: "Return all permutations of an array of distinct integers.",
    examples: [{ input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }],
    approaches: [
      { name: "Optimal", pattern: "Backtracking with a used[] set", theory: "Build a permutation position by position; at each step try every unused number, mark it used, recurse, then unmark. When the current list is full, record it.", code: ["public List<List<Integer>> permute(int[] nums) {", "    List<List<Integer>> res = new ArrayList<>();", "    backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);", "    return res;", "}", "private void backtrack(int[] nums, boolean[] used, List<Integer> cur, List<List<Integer>> res) {", "    if (cur.size() == nums.length) { res.add(new ArrayList<>(cur)); return; }", "    for (int i = 0; i < nums.length; i++) {", "        if (used[i]) continue;", "        used[i] = true; cur.add(nums[i]);", "        backtrack(nums, used, cur, res);", "        cur.remove(cur.size() - 1); used[i] = false;", "    }", "}"], time: "O(n · n!)", space: "O(n)", dryRun: { title: "nums = [1,2]", headers: ["cur", "pick", "result"], rows: [["[]", "1", "—"], ["[1]", "2", "[1,2]"], ["[]", "2", "—"], ["[2]", "1", "[2,1]"]] } }
    ],
    oneLiner: "Backtrack filling positions with each unused number, recording full-length arrangements. O(n·n!).",
    similar: [["46", "Permutations", "Backtracking"], ["47", "Permutations II", "Backtracking + skip dup"], ["78", "Subsets", "Backtracking"]]
  },
  "combination-sum": {
    statement: "Given distinct candidates and a target, return all unique combinations summing to target; each candidate may be used unlimited times.",
    approaches: [
      { name: "Optimal", pattern: "Backtracking (reuse allowed)", theory: "Recurse with a start index and remaining target. Try each candidate from start; because reuse is allowed, recurse with the SAME index (not i+1). Prune when a candidate exceeds the remaining target (sort helps).", code: ["public List<List<Integer>> combinationSum(int[] c, int target) {", "    List<List<Integer>> res = new ArrayList<>();", "    Arrays.sort(c);", "    bt(c, target, 0, new ArrayList<>(), res);", "    return res;", "}", "private void bt(int[] c, int rem, int start, List<Integer> cur, List<List<Integer>> res) {", "    if (rem == 0) { res.add(new ArrayList<>(cur)); return; }", "    for (int i = start; i < c.length && c[i] <= rem; i++) {", "        cur.add(c[i]);", "        bt(c, rem - c[i], i, cur, res);   // same i → reuse", "        cur.remove(cur.size() - 1);", "    }", "}"], time: "exponential", space: "O(target)" }
    ],
    oneLiner: "Backtrack with a start index and remaining target; recurse on the same index to allow reuse, prune when candidate > remaining."
  },
  "letter-combinations-of-a-phone-number": {
    statement: "Given digits 2–9, return all letter combinations the number could spell (phone keypad mapping).",
    approaches: [
      { name: "Optimal", pattern: "Backtracking over digits", theory: "Map each digit to its letters; recurse position by position appending one letter per digit; record the string when its length equals the number of digits.", code: ["static final String[] MAP = {\"\",\"\",\"abc\",\"def\",\"ghi\",\"jkl\",\"mno\",\"pqrs\",\"tuv\",\"wxyz\"};", "public List<String> letterCombinations(String digits) {", "    List<String> res = new ArrayList<>();", "    if (digits.isEmpty()) return res;", "    bt(digits, 0, new StringBuilder(), res);", "    return res;", "}", "private void bt(String d, int i, StringBuilder sb, List<String> res) {", "    if (i == d.length()) { res.add(sb.toString()); return; }", "    for (char c : MAP[d.charAt(i) - '0'].toCharArray()) {", "        sb.append(c);", "        bt(d, i + 1, sb, res);", "        sb.deleteCharAt(sb.length() - 1);", "    }", "}"], time: "O(4ⁿ · n)", space: "O(n)" }
    ],
    oneLiner: "Backtrack appending one letter per digit from the keypad map, recording full-length strings. O(4ⁿ)."
  },
  "generate-parentheses": {
    statement: "Generate all combinations of n well-formed pairs of parentheses.",
    examples: [{ input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" }],
    approaches: [
      { name: "Optimal", pattern: "Backtracking with open/close counts", theory: "Track how many '(' and ')' are placed. You may add '(' while open < n, and ')' only while close < open (keeps it valid). Record when length is 2n.", code: ["public List<String> generateParenthesis(int n) {", "    List<String> res = new ArrayList<>();", "    bt(n, 0, 0, new StringBuilder(), res);", "    return res;", "}", "private void bt(int n, int open, int close, StringBuilder sb, List<String> res) {", "    if (sb.length() == 2 * n) { res.add(sb.toString()); return; }", "    if (open < n)    { sb.append('('); bt(n, open + 1, close, sb, res); sb.deleteCharAt(sb.length() - 1); }", "    if (close < open) { sb.append(')'); bt(n, open, close + 1, sb, res); sb.deleteCharAt(sb.length() - 1); }", "}"], time: "O(4ⁿ / √n)", space: "O(n)" }
    ],
    oneLiner: "Backtrack adding '(' while open < n and ')' while close < open — only valid prefixes survive."
  },
  "word-search": {
    statement: "Given a grid of letters and a word, return true if the word can be formed from sequentially adjacent cells (used at most once each).",
    approaches: [
      { name: "Optimal", pattern: "DFS backtracking on the grid", theory: "From every cell matching the first letter, DFS to 4-neighbours matching subsequent letters; mark cells visited during the path and unmark on backtrack.", code: ["public boolean exist(char[][] board, String word) {", "    for (int r = 0; r < board.length; r++)", "        for (int c = 0; c < board[0].length; c++)", "            if (dfs(board, word, 0, r, c)) return true;", "    return false;", "}", "private boolean dfs(char[][] b, String w, int i, int r, int c) {", "    if (i == w.length()) return true;", "    if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != w.charAt(i)) return false;", "    char t = b[r][c]; b[r][c] = '#';   // mark visited", "    boolean found = dfs(b, w, i + 1, r + 1, c) || dfs(b, w, i + 1, r - 1, c)", "                 || dfs(b, w, i + 1, r, c + 1) || dfs(b, w, i + 1, r, c - 1);", "    b[r][c] = t;                       // unmark", "    return found;", "}"], time: "O(m·n·4^L)", space: "O(L)" }
    ],
    oneLiner: "DFS from each matching cell, marking the path visited and unmarking on backtrack. O(m·n·4^L)."
  },
  "n-queens": {
    statement: "Place n queens on an n×n board so none attack each other; return all distinct solutions.",
    approaches: [
      { name: "Optimal", pattern: "Backtracking row by row + O(1) conflict sets", theory: "Place one queen per row. Track occupied columns and both diagonals (col−row and col+row) in sets for O(1) safety checks; recurse to the next row and undo on backtrack.", code: ["public List<List<String>> solveNQueens(int n) {", "    List<List<String>> res = new ArrayList<>();", "    Set<Integer> cols = new HashSet<>(), diag = new HashSet<>(), anti = new HashSet<>();", "    place(0, n, new int[n], cols, diag, anti, res);", "    return res;", "}", "private void place(int r, int n, int[] pos, Set<Integer> cols, Set<Integer> diag, Set<Integer> anti, List<List<String>> res) {", "    if (r == n) { res.add(build(pos, n)); return; }", "    for (int c = 0; c < n; c++) {", "        if (cols.contains(c) || diag.contains(r - c) || anti.contains(r + c)) continue;", "        cols.add(c); diag.add(r - c); anti.add(r + c); pos[r] = c;", "        place(r + 1, n, pos, cols, diag, anti, res);", "        cols.remove(c); diag.remove(r - c); anti.remove(r + c);", "    }", "}", "// build() renders each row as a string with 'Q' at pos[r]"], time: "O(n!)", space: "O(n)" }
    ],
    oneLiner: "One queen per row; O(1) column/diagonal conflict sets guide the backtracking. O(n!)."
  },
  "sudoku-solver": {
    statement: "Fill a partially completed 9×9 Sudoku board in place so every row, column, and 3×3 box contains 1–9.",
    approaches: [
      { name: "Optimal", pattern: "Backtracking with validity check", theory: "Find the next empty cell; try digits 1–9 that don't conflict in the row, column, or box; recurse. If a placement leads nowhere, undo it. Succeed when no empty cell remains.", code: ["public void solveSudoku(char[][] board) { solve(board); }", "private boolean solve(char[][] b) {", "    for (int r = 0; r < 9; r++)", "        for (int c = 0; c < 9; c++)", "            if (b[r][c] == '.') {", "                for (char d = '1'; d <= '9'; d++) {", "                    if (valid(b, r, c, d)) {", "                        b[r][c] = d;", "                        if (solve(b)) return true;", "                        b[r][c] = '.';", "                    }", "                }", "                return false;   // no digit fits", "            }", "    return true;", "}", "private boolean valid(char[][] b, int r, int c, char d) {", "    for (int i = 0; i < 9; i++) {", "        if (b[r][i] == d || b[i][c] == d) return false;", "        if (b[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == d) return false;", "    }", "    return true;", "}"], time: "exponential (bounded 9×9)", space: "O(1)" }
    ],
    oneLiner: "Backtrack: for each empty cell try valid digits (row/col/box checked) and recurse, undoing dead ends."
  }
};
