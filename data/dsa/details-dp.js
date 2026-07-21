// data/dsa/details-dp.js — worked solutions for the Dynamic Programming phase.
// Original explanations and implementations of standard algorithms.
// Shape: { [problemId]: { statement, examples?, approaches[], oneLiner?, similar? } }

export const DETAILS = {
  "counting-bits": {
    statement: "For every number i from 0 to n, return the count of set bits (1s) in its binary representation, as an array of length n+1.",
    examples: [{ input: "n = 5", output: "[0,1,1,2,1,2]" }],
    approaches: [
      { name: "Optimal", pattern: "DP on bits (i >> 1)", theory: "The bit count of i equals the bit count of i/2 (i.e. i >> 1) plus the lowest bit (i & 1). Dropping the last bit is a number we've already solved, so each answer is O(1) from a previous one.", code: ["public int[] countBits(int n) {", "    int[] bits = new int[n + 1];", "    for (int i = 1; i <= n; i++)", "        bits[i] = bits[i >> 1] + (i & 1);", "    return bits;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "n = 5", headers: ["i", "i>>1", "bits[i>>1]", "i&1", "bits[i]"], rows: [["1", "0", "0", "1", "1"], ["2", "1", "1", "0", "1"], ["3", "1", "1", "1", "2"], ["4", "2", "1", "0", "1"], ["5", "2", "1", "1", "2"]] } }
    ],
    oneLiner: "bits[i] = bits[i>>1] + (i&1) — reuse the answer for i with its last bit removed. O(n)."
  },
  "range-sum-query-immutable": {
    statement: "Design NumArray(nums) supporting sumRange(i, j) = the sum of nums[i..j] inclusive. The array never changes and there can be many queries.",
    examples: [{ input: "nums = [-2,0,3,-5,2,-1]; sumRange(0,2); sumRange(2,5)", output: "1; -1" }],
    approaches: [
      { name: "Optimal", pattern: "Prefix sums", theory: "Precompute prefix[i] = sum of the first i elements (prefix[0] = 0). Then any range sum is prefix[right+1] - prefix[left] in O(1). Building the prefix array is a single O(n) pass in the constructor.", code: ["class NumArray {", "    private int[] prefix;", "    public NumArray(int[] nums) {", "        prefix = new int[nums.length + 1];", "        for (int i = 0; i < nums.length; i++)", "            prefix[i + 1] = prefix[i] + nums[i];", "    }", "    public int sumRange(int left, int right) {", "        return prefix[right + 1] - prefix[left];", "    }", "}"], time: "O(n) build, O(1) query", space: "O(n)" }
    ],
    oneLiner: "Precompute prefix sums; sumRange(l,r) = prefix[r+1] - prefix[l] in O(1)."
  },
  "climbing-stairs": {
    statement: "You climb a staircase of n steps, moving up 1 or 2 steps at a time. Count how many distinct step sequences reach the top.",
    examples: [
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1." },
      { input: "n = 5", output: "8" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Plain recursion", theory: "The last move was either a 1-step or a 2-step, so ways(n) = ways(n−1) + ways(n−2). Recursing directly recomputes the same subproblems over and over, which blows up exponentially.", code: ["public int climbStairs(int n) {", "    if (n <= 2) return n;", "    return climbStairs(n - 1) + climbStairs(n - 2);", "}"], time: "O(2ⁿ)", space: "O(n) stack" },
      { name: "Optimal", pattern: "Bottom-up DP (two variables)", theory: "The recurrence is the Fibonacci relation, and each state only needs the two states below it. Roll the table into two variables and build upward from the base cases ways(1)=1, ways(2)=2.", code: ["public int climbStairs(int n) {", "    if (n <= 2) return n;", "    int two = 1, one = 2;          // ways(i-2), ways(i-1)", "    for (int i = 3; i <= n; i++) {", "        int cur = one + two;", "        two = one;", "        one = cur;", "    }", "    return one;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "n = 5", headers: ["i", "two (i−2)", "one (i−1)", "cur = one + two"], rows: [["3", "1", "2", "3"], ["4", "2", "3", "5"], ["5", "3", "5", "8"]] } }
    ],
    oneLiner: "ways(n) = ways(n−1) + ways(n−2) — Fibonacci built bottom-up with two rolling variables. O(n) time, O(1) space.",
    similar: [["70", "Climbing Stairs", "1D DP"], ["746", "Min Cost Climbing Stairs", "1D DP"], ["198", "House Robber", "1D DP"], ["509", "Fibonacci Number", "1D DP"]]
  },

  "min-cost-climbing-stairs": {
    statement: "Each stair i has a cost paid when you step on it; from a stair you may climb 1 or 2. Starting from index 0 or 1, return the cheapest total cost to step past the top of the staircase.",
    examples: [
      { input: "cost = [10,15,20]", output: "15", explanation: "Start on 15, jump two — done." },
      { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Bottom-up DP (two variables)", theory: "Let best(i) be the min cost to stand just past stair i. You arrive at position i from i−1 (paying cost[i−1]) or from i−2 (paying cost[i−2]); take the cheaper. Only the last two answers are needed, so two variables suffice.", code: ["public int minCostClimbingStairs(int[] cost) {", "    int a = 0, b = 0;               // best to reach positions i-2, i-1", "    for (int i = 2; i <= cost.length; i++) {", "        int cur = Math.min(a + cost[i - 2], b + cost[i - 1]);", "        a = b;", "        b = cur;", "    }", "    return b;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "best(i) = min(best(i−1)+cost[i−1], best(i−2)+cost[i−2]) rolled into two variables; answer is best just past the last stair. O(n), O(1).",
    similar: [["746", "Min Cost Climbing Stairs", "1D DP"], ["70", "Climbing Stairs", "1D DP"], ["198", "House Robber", "1D DP"]]
  },

  "house-robber": {
    statement: "Houses along a street hold money, but robbing two adjacent houses trips the alarm. Return the maximum loot possible without robbing neighbours.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob houses 0 and 2: 1 + 3." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "2 + 9 + 1." }
    ],
    approaches: [
      { name: "Optimal", pattern: "1D DP (take / skip)", theory: "For each house choose: skip it (keep the best so far), or take it plus the best from two houses back. Carry just those two running values across the street.", code: ["public int rob(int[] nums) {", "    int prev = 0, cur = 0;   // best up to i-2, best up to i-1", "    for (int x : nums) {", "        int take = prev + x;", "        prev = cur;", "        cur = Math.max(cur, take);", "    }", "    return cur;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [2,7,9,3,1]", headers: ["x", "take = prev + x", "cur = max(cur, take)"], rows: [["2", "0+2=2", "2"], ["7", "0+7=7", "7"], ["9", "2+9=11", "11"], ["3", "7+3=10", "11"], ["1", "11+1=12", "12"]] } }
    ],
    oneLiner: "At each house: max(skip → best so far, take → best two back + money). Two rolling variables. O(n), O(1).",
    similar: [["198", "House Robber", "1D DP"], ["213", "House Robber II", "Circular DP"], ["337", "House Robber III", "Tree DP"]]
  },

  "house-robber-ii": {
    statement: "Same as House Robber, but the houses form a circle so the first and last are adjacent. Return the maximum loot.",
    examples: [
      { input: "nums = [2,3,2]", output: "3", explanation: "Houses 0 and 2 are neighbours on the circle, so take house 1." },
      { input: "nums = [1,2,3,1]", output: "4" }
    ],
    approaches: [
      { name: "Optimal", pattern: "Two linear passes", theory: "On a circle you can never take both the first and the last house. So the answer is the better of two straight-line robberies: one that excludes the last house, and one that excludes the first.", code: ["public int rob(int[] nums) {", "    int n = nums.length;", "    if (n == 1) return nums[0];", "    return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));", "}", "private int robRange(int[] nums, int lo, int hi) {", "    int prev = 0, cur = 0;", "    for (int i = lo; i <= hi; i++) {", "        int take = prev + nums[i];", "        prev = cur;", "        cur = Math.max(cur, take);", "    }", "    return cur;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Break the circle: solve the line without the last house and the line without the first, and return the better. O(n), O(1).",
    similar: [["213", "House Robber II", "Circular DP"], ["198", "House Robber", "1D DP"]]
  },

  "coin-change": {
    statement: "Given coin denominations (unlimited supply of each) and a target amount, return the fewest coins that sum exactly to the amount, or −1 if it cannot be made.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "5 + 5 + 1." },
      { input: "coins = [2], amount = 3", output: "-1" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Recursion over choices", theory: "From the remaining amount, try subtracting each coin and recurse; the answer is 1 + the best of the sub-results. Correct, but the same remainders are re-solved exponentially many times.", code: ["public int coinChange(int[] coins, int amount) {", "    int res = best(coins, amount);", "    return res == Integer.MAX_VALUE ? -1 : res;", "}", "private int best(int[] coins, int rem) {", "    if (rem == 0) return 0;", "    if (rem < 0) return Integer.MAX_VALUE;", "    int min = Integer.MAX_VALUE;", "    for (int c : coins) {", "        int sub = best(coins, rem - c);", "        if (sub != Integer.MAX_VALUE) min = Math.min(min, sub + 1);", "    }", "    return min;", "}"], time: "O(kⁿ)", space: "O(amount) stack" },
      { name: "Optimal", pattern: "Bottom-up DP (unbounded knapsack)", theory: "dp[a] = fewest coins to make amount a. For every amount from 1 up, try ending with each coin c: dp[a] = min(dp[a], dp[a−c] + 1). Seed dp[0] = 0 and use amount+1 as infinity so unreachable states stay flagged.", code: ["public int coinChange(int[] coins, int amount) {", "    int[] dp = new int[amount + 1];", "    Arrays.fill(dp, amount + 1);    // acts as infinity", "    dp[0] = 0;", "    for (int a = 1; a <= amount; a++)", "        for (int c : coins)", "            if (c <= a)", "                dp[a] = Math.min(dp[a], dp[a - c] + 1);", "    return dp[amount] > amount ? -1 : dp[amount];", "}"], time: "O(amount · k)", space: "O(amount)", dryRun: { title: "coins = [1,2,5], amount = 5", headers: ["a", "best last coin", "dp[a]"], rows: [["1", "1 (dp[0]+1)", "1"], ["2", "2 (dp[0]+1)", "1"], ["3", "2 (dp[1]+1)", "2"], ["4", "2 (dp[2]+1)", "2"], ["5", "5 (dp[0]+1)", "1"]] } }
    ],
    oneLiner: "dp[a] = 1 + min over coins of dp[a−coin], built from 0 up to amount; amount+1 marks unreachable. O(amount·coins), O(amount).",
    similar: [["322", "Coin Change", "Unbounded knapsack"], ["518", "Coin Change II", "Count combinations"], ["279", "Perfect Squares", "Unbounded knapsack"]]
  },

  "longest-increasing-subsequence": {
    statement: "Return the length of the longest strictly increasing subsequence of nums (elements keep their order but need not be adjacent).",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "One such subsequence: 2, 3, 7, 101." },
      { input: "nums = [7,7,7,7]", output: "1" }
    ],
    approaches: [
      { name: "Better", pattern: "1D DP (LIS ending here)", theory: "dp[i] = length of the longest increasing subsequence that ends at index i. For each i look back at every j < i with nums[j] < nums[i] and extend the best of them.", code: ["public int lengthOfLIS(int[] nums) {", "    int n = nums.length, best = 1;", "    int[] dp = new int[n];", "    Arrays.fill(dp, 1);", "    for (int i = 1; i < n; i++) {", "        for (int j = 0; j < i; j++)", "            if (nums[j] < nums[i])", "                dp[i] = Math.max(dp[i], dp[j] + 1);", "        best = Math.max(best, dp[i]);", "    }", "    return best;", "}"], time: "O(n²)", space: "O(n)" },
      { name: "Optimal", pattern: "Patience sorting (tails + binary search)", theory: "Keep tails[k] = the smallest possible tail of an increasing subsequence of length k+1. Each new number replaces the first tail ≥ it (binary search); if it is bigger than every tail, it extends the array. The array length is the LIS length.", code: ["public int lengthOfLIS(int[] nums) {", "    int[] tails = new int[nums.length];", "    int size = 0;", "    for (int x : nums) {", "        int lo = 0, hi = size;", "        while (lo < hi) {              // first tail >= x", "            int mid = (lo + hi) / 2;", "            if (tails[mid] < x) lo = mid + 1;", "            else hi = mid;", "        }", "        tails[lo] = x;", "        if (lo == size) size++;", "    }", "    return size;", "}"], time: "O(n log n)", space: "O(n)" }
    ],
    oneLiner: "Maintain the smallest possible tail for each subsequence length; binary-search each number into that tails array — its final size is the answer. O(n log n).",
    similar: [["300", "Longest Increasing Subsequence", "Patience sorting"], ["354", "Russian Doll Envelopes", "Sort + LIS"], ["1143", "Longest Common Subsequence", "2D DP"]]
  },

  "longest-common-subsequence": {
    statement: "Given two strings, return the length of the longest subsequence that appears in both (characters in order, not necessarily contiguous).",
    examples: [
      { input: "text1 = \"abcde\", text2 = \"ace\"", output: "3", explanation: "\"ace\" appears in both." },
      { input: "text1 = \"abc\", text2 = \"def\"", output: "0" }
    ],
    approaches: [
      { name: "Optimal", pattern: "2D DP (grid of prefixes)", theory: "dp[i][j] = LCS length of the first i chars of a and first j chars of b. If the current characters match, extend the diagonal by 1; otherwise take the better of dropping one character from either string.", code: ["public int longestCommonSubsequence(String a, String b) {", "    int m = a.length(), n = b.length();", "    int[][] dp = new int[m + 1][n + 1];", "    for (int i = 1; i <= m; i++)", "        for (int j = 1; j <= n; j++)", "            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)", "                ? dp[i - 1][j - 1] + 1", "                : Math.max(dp[i - 1][j], dp[i][j - 1]);", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Prefix grid: matching chars extend the diagonal, otherwise inherit the best of dropping a char from either side. O(m·n).",
    similar: [["1143", "Longest Common Subsequence", "2D DP"], ["72", "Edit Distance", "2D DP"], ["583", "Delete Operation for Two Strings", "LCS"]]
  },

  "decode-ways": {
    statement: "Digits map to letters via 1→A … 26→Z. Given a digit string, count how many ways it can be decoded into letters.",
    examples: [
      { input: "s = \"226\"", output: "3", explanation: "2|2|6, 22|6, 2|26." },
      { input: "s = \"06\"", output: "0", explanation: "A leading zero can't start a code." }
    ],
    approaches: [
      { name: "Optimal", pattern: "1D DP (last one or two digits)", theory: "Ways for a prefix depend on how it ends: a non-zero last digit adds the ways of the prefix one shorter, and a last pair in 10–26 adds the ways of the prefix two shorter. Roll the table into two variables.", code: ["public int numDecodings(String s) {", "    if (s.charAt(0) == '0') return 0;", "    int prev2 = 1, prev1 = 1;    // ways for prefixes i-2 and i-1", "    for (int i = 1; i < s.length(); i++) {", "        int cur = 0;", "        if (s.charAt(i) != '0') cur += prev1;", "        int pair = (s.charAt(i - 1) - '0') * 10 + (s.charAt(i) - '0');", "        if (pair >= 10 && pair <= 26) cur += prev2;", "        if (cur == 0) return 0;    // stuck (e.g. \"30\")", "        prev2 = prev1;", "        prev1 = cur;", "    }", "    return prev1;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Fibonacci-style: each position adds prev1 if its digit is non-zero and prev2 if the last two digits form 10–26. O(n), O(1).",
    similar: [["91", "Decode Ways", "1D DP"], ["70", "Climbing Stairs", "1D DP"], ["639", "Decode Ways II", "DP with wildcards"]]
  },

  "partition-equal-subset-sum": {
    statement: "Decide whether the array can be split into two subsets with equal sums.",
    examples: [
      { input: "nums = [1,5,11,5]", output: "true", explanation: "{1,5,5} and {11} both sum to 11." },
      { input: "nums = [1,2,3,5]", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "0/1 knapsack (boolean subset-sum)", theory: "An equal split exists iff some subset sums to total/2 (impossible when total is odd). dp[s] = can some prefix of items reach sum s; process each number once, sweeping s downward so an item isn't reused.", code: ["public boolean canPartition(int[] nums) {", "    int sum = 0;", "    for (int x : nums) sum += x;", "    if (sum % 2 != 0) return false;", "    int target = sum / 2;", "    boolean[] dp = new boolean[target + 1];", "    dp[0] = true;", "    for (int x : nums)", "        for (int s = target; s >= x; s--)   // backwards: each item used once", "            if (dp[s - x]) dp[s] = true;", "    return dp[target];", "}"], time: "O(n · sum)", space: "O(sum)" }
    ],
    oneLiner: "Subset-sum to total/2 with a 1D boolean knapsack, iterating sums downward per item. O(n·sum), O(sum).",
    similar: [["416", "Partition Equal Subset Sum", "0/1 knapsack"], ["494", "Target Sum", "Counting knapsack"], ["1049", "Last Stone Weight II", "0/1 knapsack"]]
  },

  "unique-paths": {
    statement: "A robot starts in the top-left cell of an m×n grid and can only move right or down. Count the distinct paths to the bottom-right cell.",
    examples: [
      { input: "m = 3, n = 7", output: "28" },
      { input: "m = 3, n = 2", output: "3" }
    ],
    approaches: [
      { name: "Optimal", pattern: "DP with a rolling row", theory: "Paths into a cell = paths from above + paths from the left. Sweeping row by row, one 1D array holds 'above' values and updates in place to become the current row.", code: ["public int uniquePaths(int m, int n) {", "    int[] dp = new int[n];", "    Arrays.fill(dp, 1);              // first row: one path each", "    for (int i = 1; i < m; i++)", "        for (int j = 1; j < n; j++)", "            dp[j] += dp[j - 1];      // above + left", "    return dp[n - 1];", "}"], time: "O(m·n)", space: "O(n)" }
    ],
    oneLiner: "Each cell = paths from above + left; a single rolling row does both. O(m·n) time, O(n) space. (Also equals C(m+n−2, m−1).)",
    similar: [["62", "Unique Paths", "Grid DP"], ["63", "Unique Paths II", "Grid DP + obstacles"], ["64", "Minimum Path Sum", "Grid DP"]]
  },

  "target-sum": {
    statement: "Assign + or − to every number so the expression evaluates to target; count the number of ways.",
    examples: [
      { input: "nums = [1,1,1,1,1], target = 3", output: "5", explanation: "Five sign patterns give 3, e.g. −1+1+1+1+1." }
    ],
    approaches: [
      { name: "Optimal", pattern: "Reduce to counting subset-sum", theory: "Split the numbers into a + group P and a − group N. Then P − N = target and P + N = total, so P = (total + target) / 2. The task becomes: count subsets summing to P — a standard counting knapsack.", code: ["public int findTargetSumWays(int[] nums, int target) {", "    int total = 0;", "    for (int x : nums) total += x;", "    if (Math.abs(target) > total || (total + target) % 2 != 0) return 0;", "    int p = (total + target) / 2;", "    int[] dp = new int[p + 1];       // dp[s] = #subsets with sum s", "    dp[0] = 1;", "    for (int x : nums)", "        for (int s = p; s >= x; s--)", "            dp[s] += dp[s - x];", "    return dp[p];", "}"], time: "O(n · sum)", space: "O(sum)" }
    ],
    oneLiner: "Algebra turns signs into a subset choice: count subsets summing to (total+target)/2 with a 1D counting knapsack. O(n·sum).",
    similar: [["494", "Target Sum", "Counting knapsack"], ["416", "Partition Equal Subset Sum", "0/1 knapsack"], ["698", "Partition to K Equal Sum Subsets", "Backtracking"]]
  },

  "word-break": {
    statement: "Given a string s and a dictionary of words, decide whether s can be cut into a sequence of one or more dictionary words (words may repeat).",
    examples: [
      { input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", output: "true", explanation: "\"leet\" + \"code\"." },
      { input: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", output: "false" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Recursion on the cut point", theory: "From position start, try every prefix; if it is a dictionary word, recurse on the rest. Without caching, the same suffixes are re-checked exponentially often.", code: ["public boolean wordBreak(String s, List<String> wordDict) {", "    return canBreak(s, 0, new HashSet<>(wordDict));", "}", "private boolean canBreak(String s, int start, Set<String> dict) {", "    if (start == s.length()) return true;", "    for (int end = start + 1; end <= s.length(); end++)", "        if (dict.contains(s.substring(start, end)) && canBreak(s, end, dict))", "            return true;", "    return false;", "}"], time: "O(2ⁿ)", space: "O(n) stack" },
      { name: "Optimal", pattern: "1D DP over prefixes", theory: "dp[i] = the first i characters can be segmented. dp[i] is true when some split point j has dp[j] true and s[j..i) in the dictionary. dp[0] = true (empty prefix); the answer is dp[n].", code: ["public boolean wordBreak(String s, List<String> wordDict) {", "    Set<String> dict = new HashSet<>(wordDict);", "    int n = s.length();", "    boolean[] dp = new boolean[n + 1];", "    dp[0] = true;", "    for (int i = 1; i <= n; i++)", "        for (int j = 0; j < i; j++)", "            if (dp[j] && dict.contains(s.substring(j, i))) {", "                dp[i] = true;", "                break;", "            }", "    return dp[n];", "}"], time: "O(n² · L)", space: "O(n)", dryRun: { title: "s = \"leetcode\", dict = {leet, code}", headers: ["i", "split found", "dp[i]"], rows: [["1–3", "none", "false"], ["4", "dp[0] + \"leet\"", "true"], ["5–7", "none", "false"], ["8", "dp[4] + \"code\"", "true"]] } }
    ],
    oneLiner: "dp[i] = some j has dp[j] true and s[j..i) in the dictionary; dp[0] seeds the chain. O(n²) splits, O(n) space.",
    similar: [["139", "Word Break", "Prefix DP"], ["140", "Word Break II", "DP + backtracking"], ["472", "Concatenated Words", "Prefix DP"]]
  },

  "edit-distance": {
    statement: "Return the minimum number of single-character insertions, deletions, or replacements needed to turn one word into another.",
    examples: [
      { input: "word1 = \"horse\", word2 = \"ros\"", output: "3", explanation: "horse → rorse (replace) → rose (delete) → ros (delete)." },
      { input: "word1 = \"intention\", word2 = \"execution\"", output: "5" }
    ],
    approaches: [
      { name: "Optimal", pattern: "2D DP (Levenshtein grid)", theory: "dp[i][j] = edits to turn the first i chars of a into the first j chars of b. Matching last chars cost nothing (diagonal); otherwise pay 1 for the cheapest of replace (diagonal), delete (up), or insert (left). Borders are all-insert / all-delete.", code: ["public int minDistance(String a, String b) {", "    int m = a.length(), n = b.length();", "    int[][] dp = new int[m + 1][n + 1];", "    for (int i = 0; i <= m; i++) dp[i][0] = i;   // delete everything", "    for (int j = 0; j <= n; j++) dp[0][j] = j;   // insert everything", "    for (int i = 1; i <= m; i++)", "        for (int j = 1; j <= n; j++)", "            dp[i][j] = a.charAt(i - 1) == b.charAt(j - 1)", "                ? dp[i - 1][j - 1]", "                : 1 + Math.min(dp[i - 1][j - 1],", "                      Math.min(dp[i - 1][j], dp[i][j - 1]));", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Levenshtein grid: free on match, else 1 + min(replace, delete, insert) from the three neighbouring cells. O(m·n).",
    similar: [["72", "Edit Distance", "2D DP"], ["1143", "Longest Common Subsequence", "2D DP"], ["583", "Delete Operation for Two Strings", "LCS"]]
  },

  "burst-balloons": {
    statement: "Bursting balloon i earns nums[left] × nums[i] × nums[right] where left/right are its current neighbours (out-of-bounds counts as 1). Burst them all in the order that maximizes total coins.",
    examples: [
      { input: "nums = [3,1,5,8]", output: "167", explanation: "Burst 1, 5, 3, 8 → 15 + 120 + 24 + 8 = 167." }
    ],
    approaches: [
      { name: "Optimal", pattern: "Interval DP (pick the LAST balloon)", theory: "Thinking about the first burst is hopeless because neighbours keep changing — instead fix which balloon pops LAST inside an open interval (l, r). Its payout is then walls l and r times itself, plus the best of the two independent sub-intervals. Pad the array with 1s as walls and grow intervals by length.", code: ["public int maxCoins(int[] nums) {", "    int n = nums.length;", "    int[] b = new int[n + 2];", "    b[0] = b[n + 1] = 1;             // virtual walls", "    for (int i = 0; i < n; i++) b[i + 1] = nums[i];", "    int[][] dp = new int[n + 2][n + 2];   // dp[l][r]: open interval (l, r)", "    for (int len = 2; len <= n + 1; len++)", "        for (int l = 0; l + len <= n + 1; l++) {", "            int r = l + len;", "            for (int k = l + 1; k < r; k++)   // k pops last in (l, r)", "                dp[l][r] = Math.max(dp[l][r],", "                    dp[l][k] + b[l] * b[k] * b[r] + dp[k][r]);", "        }", "    return dp[0][n + 1];", "}"], time: "O(n³)", space: "O(n²)" }
    ],
    oneLiner: "Interval DP choosing the last balloon to pop in each open interval — its neighbours are the fixed walls. O(n³), O(n²).",
    similar: [["312", "Burst Balloons", "Interval DP"], ["1039", "Minimum Score Triangulation", "Interval DP"], ["1000", "Minimum Cost to Merge Stones", "Interval DP"]]
  },

  "regular-expression-matching": {
    statement: "Implement full-string matching where '.' matches any one character and '*' matches zero or more copies of the character just before it.",
    examples: [
      { input: "s = \"aab\", p = \"c*a*b\"", output: "true", explanation: "c* matches zero c's, a* matches aa." },
      { input: "s = \"mississippi\", p = \"mis*is*p*.\"", output: "false" }
    ],
    approaches: [
      { name: "Optimal", pattern: "2D DP over (text prefix, pattern prefix)", theory: "dp[i][j] = first i chars of s match first j chars of p. A literal or '.' consumes one char from each. A '*' either contributes zero copies (drop the pair, look 2 left in the pattern) or one more copy (if its base matches s's last char, look 1 up in the text).", code: ["public boolean isMatch(String s, String p) {", "    int m = s.length(), n = p.length();", "    boolean[][] dp = new boolean[m + 1][n + 1];", "    dp[0][0] = true;", "    for (int j = 2; j <= n; j++)     // patterns like a*b* match empty", "        dp[0][j] = p.charAt(j - 1) == '*' && dp[0][j - 2];", "    for (int i = 1; i <= m; i++)", "        for (int j = 1; j <= n; j++) {", "            char pc = p.charAt(j - 1);", "            if (pc == '*') {", "                dp[i][j] = dp[i][j - 2];               // zero copies", "                char base = p.charAt(j - 2);", "                if (base == '.' || base == s.charAt(i - 1))", "                    dp[i][j] = dp[i][j] || dp[i - 1][j]; // one more copy", "            } else if (pc == '.' || pc == s.charAt(i - 1)) {", "                dp[i][j] = dp[i - 1][j - 1];", "            }", "        }", "    return dp[m][n];", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "2D DP: literals/'.' step diagonally; each '*' is a choice between zero copies (j−2) and one-more-copy (i−1). O(m·n).",
    similar: [["10", "Regular Expression Matching", "2D DP"], ["44", "Wildcard Matching", "2D DP"], ["97", "Interleaving String", "2D DP"]]
  }
};
