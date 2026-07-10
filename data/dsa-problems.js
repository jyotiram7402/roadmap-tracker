// data/dsa-problems.js — DSA problem catalog for the "Prepare DSA" studio.
//
// The full list is built compactly from RAW (phase -> difficulty -> titles).
// A few problems carry full worked content (statement, examples, and
// brute/better/optimal approaches with dry-run tables) in DETAILS; the rest are
// catalog entries with difficulty, phase, company tags, a "hot" (most-asked)
// flag, and a LeetCode link — full solutions are filled in phase by phase.

const RAW = {
  Arrays: {
    easy: ["Two Sum", "Contains Duplicate", "Remove Duplicates from Sorted Array", "Remove Element", "Move Zeroes", "Merge Sorted Array", "Best Time to Buy and Sell Stock", "Majority Element", "Missing Number", "Single Number", "Find All Numbers Disappeared in an Array", "Squares of a Sorted Array", "Intersection of Two Arrays II", "Binary Search", "Search Insert Position", "Height Checker", "Find Pivot Index", "Running Sum of 1D Array", "Richest Customer Wealth", "Kids With Greatest Number of Candies", "Find the Highest Altitude", "Shuffle the Array", "Concatenation of Array", "Build Array from Permutation", "Replace Elements with Greatest Element on Right Side", "Remove Duplicates from Sorted Array II"],
    medium: ["3Sum", "3Sum Closest", "4Sum", "Product of Array Except Self", "Maximum Product Subarray", "Maximum Subarray", "Container With Most Water", "Sort Colors", "Rotate Array", "Merge Intervals", "Insert Interval", "Spiral Matrix", "Set Matrix Zeroes", "Next Permutation", "Find the Duplicate Number", "Kth Largest Element in an Array", "Top K Frequent Elements", "Find Peak Element", "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", "Gas Station", "Jump Game", "Jump Game II", "Candy", "Subarray Sum Equals K", "Continuous Subarray Sum", "Maximum Sum Circular Subarray"],
    hard: ["Trapping Rain Water", "First Missing Positive", "Median of Two Sorted Arrays", "Sliding Window Maximum", "Count of Smaller Numbers After Self", "Reverse Pairs"]
  },
  Strings: {
    easy: ["Reverse String", "Valid Anagram", "Valid Palindrome", "Roman to Integer", "Longest Common Prefix", "First Unique Character in a String", "Isomorphic Strings", "Ransom Note", "Implement strStr()", "Detect Capital", "Reverse Words in a String III", "Length of Last Word"],
    medium: ["Longest Substring Without Repeating Characters", "Longest Palindromic Substring", "Group Anagrams", "String Compression", "Decode String", "Minimum Window Substring", "Longest Repeating Character Replacement", "Partition Labels", "Zigzag Conversion", "Multiply Strings"],
    hard: ["Regular Expression Matching", "Wildcard Matching", "Edit Distance", "Text Justification"]
  },
  "Linked List": {
    easy: ["Reverse Linked List", "Linked List Cycle", "Merge Two Sorted Lists", "Middle of the Linked List", "Palindrome Linked List", "Remove Linked List Elements", "Delete Node in a Linked List", "Intersection of Two Linked Lists"],
    medium: ["Add Two Numbers", "Remove Nth Node From End of List", "Reorder List", "Odd Even Linked List", "Swap Nodes in Pairs", "Rotate List", "Partition List", "Copy List with Random Pointer", "LRU Cache"],
    hard: ["Merge k Sorted Lists", "Reverse Nodes in k-Group"]
  },
  "Stack & Queue": {
    easy: ["Valid Parentheses", "Implement Queue using Stacks", "Implement Stack using Queues", "Next Greater Element I", "Baseball Game"],
    medium: ["Min Stack", "Daily Temperatures", "Evaluate Reverse Polish Notation", "Decode String", "Asteroid Collision", "Online Stock Span", "Simplify Path"],
    hard: ["Largest Rectangle in Histogram", "Basic Calculator", "Maximal Rectangle"]
  },
  Trees: {
    easy: ["Binary Tree Inorder Traversal", "Binary Tree Preorder Traversal", "Binary Tree Postorder Traversal", "Maximum Depth of Binary Tree", "Same Tree", "Symmetric Tree", "Invert Binary Tree", "Path Sum", "Balanced Binary Tree", "Minimum Depth of Binary Tree"],
    medium: ["Binary Tree Level Order Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST", "Lowest Common Ancestor of a Binary Tree", "Construct Binary Tree from Preorder and Inorder Traversal", "Flatten Binary Tree to Linked List", "Binary Tree Right Side View", "Count Good Nodes in Binary Tree", "Path Sum II"],
    hard: ["Serialize and Deserialize Binary Tree", "Binary Tree Maximum Path Sum", "Recover Binary Search Tree"]
  },
  "Binary Search": {
    easy: ["Binary Search", "Guess Number Higher or Lower", "First Bad Version", "Search Insert Position"],
    medium: ["Search in Rotated Sorted Array", "Find Peak Element", "Koko Eating Bananas", "Capacity To Ship Packages Within D Days", "Time Based Key-Value Store"],
    hard: ["Median of Two Sorted Arrays", "Split Array Largest Sum"]
  },
  "Dynamic Programming": {
    easy: ["Climbing Stairs", "Min Cost Climbing Stairs", "House Robber"],
    medium: ["House Robber II", "Coin Change", "Longest Increasing Subsequence", "Longest Common Subsequence", "Decode Ways", "Partition Equal Subset Sum", "Unique Paths", "Target Sum", "Word Break"],
    hard: ["Edit Distance", "Burst Balloons", "Regular Expression Matching"]
  },
  Graphs: {
    easy: ["Find if Path Exists in Graph"],
    medium: ["Number of Islands", "Clone Graph", "Course Schedule", "Pacific Atlantic Water Flow", "Rotting Oranges", "Network Delay Time"],
    hard: ["Word Ladder", "Alien Dictionary", "Critical Connections in a Network"]
  },
  "Heap / Priority Queue": {
    easy: ["Last Stone Weight"],
    medium: ["Kth Largest Element in an Array", "Top K Frequent Elements", "Merge k Sorted Lists", "Task Scheduler", "Find Median from Data Stream"],
    hard: ["Sliding Window Median"]
  },
  Backtracking: {
    easy: [],
    medium: ["Subsets", "Permutations", "Combination Sum", "Letter Combinations of a Phone Number", "Generate Parentheses", "Word Search"],
    hard: ["N-Queens", "Sudoku Solver"]
  },
  Greedy: {
    easy: ["Assign Cookies"],
    medium: ["Jump Game", "Jump Game II", "Gas Station", "Partition Labels", "Task Scheduler"],
    hard: ["Candy"]
  },
  Intervals: {
    easy: [],
    medium: ["Merge Intervals", "Insert Interval", "Non-overlapping Intervals", "Meeting Rooms II"],
    hard: ["Employee Free Time"]
  }
};

// Commonly-reported interviewing companies for well-known problems (indicative).
const COMPANIES = {
  "Two Sum": ["Amazon", "Google", "Microsoft", "Apple", "Adobe"],
  "Contains Duplicate": ["Amazon", "Microsoft", "Adobe"],
  "Best Time to Buy and Sell Stock": ["Amazon", "Google", "Facebook", "Microsoft"],
  "Maximum Subarray": ["Amazon", "Microsoft", "LinkedIn", "Bloomberg"],
  "Move Zeroes": ["Facebook", "Amazon", "Bloomberg"],
  "3Sum": ["Amazon", "Facebook", "Adobe", "Microsoft"],
  "Product of Array Except Self": ["Amazon", "Facebook", "Microsoft", "Apple"],
  "Container With Most Water": ["Amazon", "Bloomberg", "Adobe"],
  "Merge Intervals": ["Google", "Amazon", "Facebook", "Microsoft"],
  "Rotate Array": ["Amazon", "Microsoft"],
  "Group Anagrams": ["Amazon", "Uber", "Facebook"],
  "Longest Substring Without Repeating Characters": ["Amazon", "Bloomberg", "Adobe", "Google"],
  "Valid Parentheses": ["Amazon", "Google", "Microsoft", "Facebook"],
  "Trapping Rain Water": ["Amazon", "Google", "Goldman Sachs"],
  "Median of Two Sorted Arrays": ["Amazon", "Google", "Adobe", "Microsoft"],
  "Reverse Linked List": ["Amazon", "Microsoft", "Apple", "Adobe"],
  "LRU Cache": ["Amazon", "Microsoft", "Facebook", "Bloomberg"],
  "Merge k Sorted Lists": ["Amazon", "Google", "Facebook", "Microsoft"],
  "Number of Islands": ["Amazon", "Google", "Microsoft", "Facebook"],
  "Course Schedule": ["Amazon", "Google", "Zenefits"],
  "Validate Binary Search Tree": ["Amazon", "Microsoft", "Facebook"],
  "Binary Tree Level Order Traversal": ["Amazon", "Microsoft", "Facebook"],
  "Lowest Common Ancestor of a Binary Tree": ["Amazon", "Facebook", "LinkedIn"],
  "Coin Change": ["Amazon", "Google", "Uber"],
  "Climbing Stairs": ["Amazon", "Adobe", "Apple"],
  "Word Break": ["Amazon", "Google", "Facebook"],
  "Top K Frequent Elements": ["Amazon", "Facebook", "Yelp"],
  "Kth Largest Element in an Array": ["Amazon", "Facebook", "Microsoft"],
  "Find Median from Data Stream": ["Amazon", "Google", "Goldman Sachs"],
  "Subsets": ["Amazon", "Facebook", "Bloomberg"],
  "Permutations": ["Amazon", "Microsoft", "LinkedIn"],
  "Search in Rotated Sorted Array": ["Amazon", "Facebook", "Microsoft"],
  "Minimum Window Substring": ["Amazon", "Facebook", "LinkedIn"]
};

// Most-asked (⭐) — shown by the "Most asked" filter and a star badge.
const HOT = new Set([
  "Two Sum", "Contains Duplicate", "Best Time to Buy and Sell Stock", "Maximum Subarray", "3Sum",
  "Product of Array Except Self", "Merge Intervals", "Container With Most Water", "Rotate Array",
  "Longest Substring Without Repeating Characters", "Group Anagrams", "Valid Parentheses",
  "Trapping Rain Water", "Median of Two Sorted Arrays", "Reverse Linked List", "LRU Cache",
  "Merge k Sorted Lists", "Number of Islands", "Course Schedule", "Validate Binary Search Tree",
  "Binary Tree Level Order Traversal", "Lowest Common Ancestor of a Binary Tree", "Coin Change",
  "Climbing Stairs", "Word Break", "Top K Frequent Elements", "Kth Largest Element in an Array",
  "Find Median from Data Stream", "Subsets", "Permutations", "Search in Rotated Sorted Array",
  "Minimum Window Substring", "Move Zeroes"
]);

// Fully-worked problems: statement + examples + brute/better/optimal approaches.
export const DETAILS = {
  "two-sum": {
    statement: "Given an integer array nums and an integer target, return the indices of the two numbers that add up to target. Exactly one solution exists and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Nested Loop", theory: "Check every pair (i, j). If nums[i] + nums[j] == target, return their indices.", code: ["public int[] twoSum(int[] nums, int target) {", "    for (int i = 0; i < nums.length; i++)", "        for (int j = i + 1; j < nums.length; j++)", "            if (nums[i] + nums[j] == target)", "                return new int[]{i, j};", "    return new int[]{};", "}"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "HashMap (complement lookup)", theory: "For each number x, the partner we need is target − x. Keep seen numbers in a map of value → index; if the complement is already there, we found the pair in one pass.", code: ["public int[] twoSum(int[] nums, int target) {", "    Map<Integer,Integer> seen = new HashMap<>();", "    for (int i = 0; i < nums.length; i++) {", "        int need = target - nums[i];", "        if (seen.containsKey(need)) return new int[]{seen.get(need), i};", "        seen.put(nums[i], i);", "    }", "    return new int[]{};", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "nums = [2,7,11,15], target = 9", headers: ["i", "num", "need", "seen before", "action"], rows: [["0", "2", "7", "{}", "put 2→0"], ["1", "7", "2", "{2:0}", "2 found → return [0,1]"]] } }
    ],
    oneLiner: "One pass with a hash map: for each number check if its complement (target − num) was already seen; if so return both indices. O(n) time, O(n) space.",
    similar: [["1", "Two Sum", "HashMap"], ["167", "Two Sum II - Sorted", "Two Pointers"], ["15", "3Sum", "Sort + Two Pointers"], ["454", "4Sum II", "HashMap"]]
  },
  "contains-duplicate": {
    statement: "Given an integer array nums, return true if any value appears at least twice, and false if every element is unique.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears twice." },
      { input: "nums = [1,2,3,4]", output: "false", explanation: "Every element is unique." }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Nested Loop", theory: "Compare every element with every other element; if any two are equal, there is a duplicate.", code: ["public boolean containsDuplicate(int[] nums) {", "    for (int i = 0; i < nums.length; i++)", "        for (int j = i + 1; j < nums.length; j++)", "            if (nums[i] == nums[j]) return true;", "    return false;", "}"], time: "O(n²)", space: "O(1)" },
      { name: "Better", pattern: "HashMap (frequency count)", theory: "Count how many times each value appears; if any count reaches 2, return true.", code: ["public boolean containsDuplicate(int[] nums) {", "    Map<Integer,Integer> map = new HashMap<>();", "    for (int num : nums) {", "        map.put(num, map.getOrDefault(num, 0) + 1);", "        if (map.get(num) > 1) return true;", "    }", "    return false;", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "HashSet", theory: "A HashSet stores only unique elements. While traversing, try to add each number; add() returns false if it was already present — that means a duplicate.", code: ["public boolean containsDuplicate(int[] nums) {", "    Set<Integer> set = new HashSet<>();", "    for (int num : nums)", "        if (!set.add(num)) return true;   // add() false => duplicate", "    return false;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "nums = [1,2,3,1]", headers: ["#", "num", "set before", "present?", "action"], rows: [["1", "1", "{}", "no", "add → {1}"], ["2", "2", "{1}", "no", "add → {1,2}"], ["3", "3", "{1,2}", "no", "add → {1,2,3}"], ["4", "1", "{1,2,3}", "yes", "return true"]] } }
    ],
    oneLiner: "Traverse the array adding each number to a HashSet; if a number is already present, a duplicate is found — return true. O(n) time, O(n) space.",
    similar: [["217", "Contains Duplicate", "HashSet"], ["219", "Contains Duplicate II", "HashMap / window"], ["136", "Single Number", "XOR"], ["349", "Intersection of Two Arrays", "HashSet"]]
  },
  "best-time-to-buy-and-sell-stock": {
    statement: "Given prices where prices[i] is the price of a stock on day i, maximize profit by buying on one day and selling on a later day. Return the maximum profit, or 0 if none is possible.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy at 1 (day 2), sell at 6 (day 5)." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "Prices only fall; no profit." }
    ],
    approaches: [
      { name: "Brute Force", pattern: "Nested Loop", theory: "Try every buy day i and every later sell day j; track the largest prices[j] − prices[i].", code: ["public int maxProfit(int[] p) {", "    int best = 0;", "    for (int i = 0; i < p.length; i++)", "        for (int j = i + 1; j < p.length; j++)", "            best = Math.max(best, p[j] - p[i]);", "    return best;", "}"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "One pass (track min so far)", theory: "Keep the minimum price seen so far; at each day the best sell-today profit is price − minSoFar. Track the maximum of those.", code: ["public int maxProfit(int[] p) {", "    int min = Integer.MAX_VALUE, best = 0;", "    for (int price : p) {", "        min = Math.min(min, price);", "        best = Math.max(best, price - min);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "prices = [7,1,5,3,6,4]", headers: ["price", "min", "price − min", "best"], rows: [["7", "7", "0", "0"], ["1", "1", "0", "0"], ["5", "1", "4", "4"], ["3", "1", "2", "4"], ["6", "1", "5", "5"], ["4", "1", "3", "5"]] } }
    ],
    oneLiner: "Track the minimum price so far in one pass; at each day the candidate profit is price − minSoFar, and we keep the maximum. O(n) time, O(1) space.",
    similar: [["121", "Best Time to Buy/Sell Stock", "One pass"], ["122", "Best Time II", "Greedy"], ["53", "Maximum Subarray", "Kadane"]]
  },
  "move-zeroes": {
    statement: "Given an integer array nums, move all 0's to the end while keeping the relative order of the non-zero elements. Do it in place.",
    examples: [
      { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" },
      { input: "nums = [0]", output: "[0]" }
    ],
    approaches: [
      { name: "Better", pattern: "Extra array", theory: "Copy non-zeros into a new array in order, then pad with zeros, then copy back. Simple but uses extra space.", code: ["public void moveZeroes(int[] nums) {", "    int[] res = new int[nums.length]; int k = 0;", "    for (int x : nums) if (x != 0) res[k++] = x;", "    System.arraycopy(res, 0, nums, 0, nums.length);", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Two pointers (in place)", theory: "Keep an insert index for the next non-zero slot. Scan; whenever the current value is non-zero, swap it into the insert position and advance it. Zeros naturally fall to the end.", code: ["public void moveZeroes(int[] nums) {", "    int insert = 0;", "    for (int i = 0; i < nums.length; i++) {", "        if (nums[i] != 0) {", "            int t = nums[insert]; nums[insert] = nums[i]; nums[i] = t;", "            insert++;", "        }", "    }", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [0,1,0,3,12]", headers: ["i", "nums[i]", "insert", "array after"], rows: [["0", "0", "0", "[0,1,0,3,12]"], ["1", "1", "0→1", "[1,0,0,3,12]"], ["2", "0", "1", "[1,0,0,3,12]"], ["3", "3", "1→2", "[1,3,0,0,12]"], ["4", "12", "2→3", "[1,3,12,0,0]"]] } }
    ],
    oneLiner: "Two pointers: an insert index tracks where the next non-zero goes; swap each non-zero forward, and zeros end up at the back. O(n) time, O(1) space.",
    similar: [["283", "Move Zeroes", "Two Pointers"], ["27", "Remove Element", "Two Pointers"], ["26", "Remove Duplicates", "Two Pointers"]]
  },
  "maximum-subarray": {
    statement: "Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] sums to 6." },
      { input: "nums = [1]", output: "1" }
    ],
    approaches: [
      { name: "Brute Force", pattern: "All subarrays", theory: "Try every start i and end j, sum the elements between, and track the maximum.", code: ["public int maxSubArray(int[] a) {", "    int best = Integer.MIN_VALUE;", "    for (int i = 0; i < a.length; i++) {", "        int sum = 0;", "        for (int j = i; j < a.length; j++) { sum += a[j]; best = Math.max(best, sum); }", "    }", "    return best;", "}"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "Kadane's algorithm", theory: "At each index decide: extend the current running sum, or restart from the current element (whichever is larger). Track the best running sum seen.", code: ["public int maxSubArray(int[] a) {", "    int cur = a[0], best = a[0];", "    for (int i = 1; i < a.length; i++) {", "        cur = Math.max(a[i], cur + a[i]);", "        best = Math.max(best, cur);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [-2,1,-3,4,-1,2,1,-5,4]", headers: ["num", "cur = max(num, cur+num)", "best"], rows: [["-2", "-2", "-2"], ["1", "1", "1"], ["-3", "-2", "1"], ["4", "4", "4"], ["-1", "3", "4"], ["2", "5", "5"], ["1", "6", "6"], ["-5", "1", "6"], ["4", "5", "6"]] } }
    ],
    oneLiner: "Kadane's: keep a running sum that restarts whenever it would drop below the current element, and track the maximum running sum. O(n) time, O(1) space.",
    similar: [["53", "Maximum Subarray", "Kadane"], ["152", "Maximum Product Subarray", "DP"], ["918", "Max Circular Subarray", "Kadane"]]
  }
};

function slug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const PHASES = Object.keys(RAW);
export const DIFFICULTIES = ["easy", "medium", "hard"];

export const DSA_PROBLEMS = [];
let _seq = 0;
for (const phase of PHASES) {
  for (const diff of DIFFICULTIES) {
    for (const title of RAW[phase][diff] || []) {
      const id = slug(title);
      DSA_PROBLEMS.push({
        key: `${phase}:${id}:${_seq++}`,
        id,
        title,
        difficulty: diff,
        phase,
        companies: COMPANIES[title] || [],
        hot: HOT.has(title),
        leetcode: `https://leetcode.com/problemset/?search=${encodeURIComponent(title)}`,
        details: DETAILS[id] || null,
      });
    }
  }
}

// unique company list for the filter dropdown
export const ALL_COMPANIES = [...new Set(Object.values(COMPANIES).flat())].sort();
