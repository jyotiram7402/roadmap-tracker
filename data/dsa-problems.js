// data/dsa-problems.js — DSA problem catalog for the "Prepare DSA" studio.
//
// The full list is built compactly from RAW (phase -> difficulty -> titles).
// Worked solutions (statement + brute/better/optimal + dry runs) live in
// per-phase files under data/dsa/ and are LAZY-LOADED via loadPhaseDetails()
// only when the user opens a problem — keeps the initial /dsa page light.

const RAW = {
  Arrays: {
    easy: ["Two Sum", "Contains Duplicate", "Remove Duplicates from Sorted Array", "Remove Element", "Move Zeroes", "Merge Sorted Array", "Best Time to Buy and Sell Stock", "Majority Element", "Missing Number", "Single Number", "Find All Numbers Disappeared in an Array", "Squares of a Sorted Array", "Intersection of Two Arrays II", "Binary Search", "Search Insert Position", "Height Checker", "Find Pivot Index", "Running Sum of 1D Array", "Richest Customer Wealth", "Kids With Greatest Number of Candies", "Find the Highest Altitude", "Shuffle the Array", "Concatenation of Array", "Build Array from Permutation", "Replace Elements with Greatest Element on Right Side", "Remove Duplicates from Sorted Array II", "How Many Numbers Are Smaller Than the Current Number", "Minimum Time Visiting All Points", "Minimum Absolute Difference"],
    medium: ["3Sum", "3Sum Closest", "4Sum", "Product of Array Except Self", "Maximum Product Subarray", "Maximum Subarray", "Container With Most Water", "Sort Colors", "Rotate Array", "Merge Intervals", "Insert Interval", "Spiral Matrix", "Set Matrix Zeroes", "Next Permutation", "Find the Duplicate Number", "Kth Largest Element in an Array", "Top K Frequent Elements", "Find Peak Element", "Search in Rotated Sorted Array", "Find Minimum in Rotated Sorted Array", "Gas Station", "Jump Game", "Jump Game II", "Candy", "Subarray Sum Equals K", "Continuous Subarray Sum", "Maximum Sum Circular Subarray", "Minimum Size Subarray Sum"],
    hard: ["Trapping Rain Water", "First Missing Positive", "Median of Two Sorted Arrays", "Sliding Window Maximum", "Count of Smaller Numbers After Self", "Reverse Pairs"]
  },
  Strings: {
    easy: ["Reverse String", "Valid Anagram", "Valid Palindrome", "Roman to Integer", "Longest Common Prefix", "Substrings of Size Three with Distinct Characters", "First Unique Character in a String", "Isomorphic Strings", "Ransom Note", "Implement strStr()", "Detect Capital", "Reverse Words in a String III", "Length of Last Word"],
    medium: ["Longest Substring Without Repeating Characters", "Longest Palindromic Substring", "Group Anagrams", "String Compression", "Decode String", "Minimum Window Substring", "Longest Repeating Character Replacement", "Partition Labels", "Zigzag Conversion", "Multiply Strings"],
    hard: ["Regular Expression Matching", "Wildcard Matching", "Edit Distance", "Text Justification"]
  },
  "Linked List": {
    easy: ["Reverse Linked List", "Linked List Cycle", "Merge Two Sorted Lists", "Middle of the Linked List", "Palindrome Linked List", "Remove Linked List Elements", "Delete Node in a Linked List", "Intersection of Two Linked Lists"],
    medium: ["Add Two Numbers", "Remove Nth Node From End of List", "Reorder List", "Odd Even Linked List", "Swap Nodes in Pairs", "Rotate List", "Partition List", "Copy List with Random Pointer", "LRU Cache", "Reverse Linked List II", "Sort List"],
    hard: ["Merge k Sorted Lists", "Reverse Nodes in k-Group"]
  },
  "Stack & Queue": {
    easy: ["Valid Parentheses", "Implement Queue using Stacks", "Implement Stack using Queues", "Next Greater Element I", "Baseball Game", "Time Needed to Buy Tickets"],
    medium: ["Min Stack", "Daily Temperatures", "Evaluate Reverse Polish Notation", "Decode String", "Asteroid Collision", "Online Stock Span", "Simplify Path", "Sort a Stack", "Reverse First K Elements of a Queue"],
    hard: ["Largest Rectangle in Histogram", "Basic Calculator", "Maximal Rectangle"]
  },
  Trees: {
    easy: ["Binary Tree Inorder Traversal", "Binary Tree Preorder Traversal", "Binary Tree Postorder Traversal", "Maximum Depth of Binary Tree", "Same Tree", "Symmetric Tree", "Invert Binary Tree", "Path Sum", "Balanced Binary Tree", "Minimum Depth of Binary Tree", "Average of Levels in Binary Tree", "Diameter of Binary Tree", "Convert Sorted Array to Binary Search Tree", "Two Sum IV - Input is a BST", "Lowest Common Ancestor of a Binary Search Tree", "Minimum and Maximum Value in a Binary Tree"],
    medium: ["Binary Tree Level Order Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST", "Lowest Common Ancestor of a Binary Tree", "Construct Binary Tree from Preorder and Inorder Traversal", "Flatten Binary Tree to Linked List", "Binary Tree Right Side View", "Count Good Nodes in Binary Tree", "Path Sum II", "Insert into a Binary Search Tree", "Binary Tree Zigzag Level Order Traversal", "Delete Node in a BST", "Balance a Binary Search Tree"],
    hard: ["Serialize and Deserialize Binary Tree", "Binary Tree Maximum Path Sum", "Recover Binary Search Tree"]
  },
  "Binary Search": {
    easy: ["Binary Search", "Guess Number Higher or Lower", "First Bad Version", "Search Insert Position"],
    medium: ["Search in Rotated Sorted Array", "Find Peak Element", "Koko Eating Bananas", "Capacity To Ship Packages Within D Days", "Time Based Key-Value Store"],
    hard: ["Median of Two Sorted Arrays", "Split Array Largest Sum"]
  },
  "Dynamic Programming": {
    easy: ["Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "Counting Bits", "Range Sum Query - Immutable"],
    medium: ["House Robber II", "Coin Change", "Longest Increasing Subsequence", "Longest Common Subsequence", "Decode Ways", "Partition Equal Subset Sum", "Unique Paths", "Target Sum", "Word Break"],
    hard: ["Edit Distance", "Burst Balloons", "Regular Expression Matching"]
  },
  Graphs: {
    easy: ["Find if Path Exists in Graph"],
    medium: ["Number of Islands", "Clone Graph", "Course Schedule", "Pacific Atlantic Water Flow", "Rotting Oranges", "Network Delay Time", "Cheapest Flights Within K Stops"],
    hard: ["Word Ladder", "Alien Dictionary", "Critical Connections in a Network"]
  },
  "Heap / Priority Queue": {
    easy: ["Last Stone Weight"],
    medium: ["Kth Largest Element in an Array", "Top K Frequent Elements", "Merge k Sorted Lists", "Task Scheduler", "Find Median from Data Stream", "K Closest Points to Origin"],
    hard: ["Sliding Window Median"]
  },
  Backtracking: {
    easy: [],
    medium: ["Subsets", "Permutations", "Combination Sum", "Letter Combinations of a Phone Number", "Generate Parentheses", "Word Search", "Letter Case Permutation", "Combinations"],
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
      });
    }
  }
}

// unique company list for the filter dropdown
export const ALL_COMPANIES = [...new Set(Object.values(COMPANIES).flat())].sort();

// ---- lazy per-phase solution details ------------------------------------
// Each file exports DETAILS: { [problemId]: { statement, examples?, approaches, oneLiner?, similar? } }
const PHASE_LOADERS = {
  "Arrays": () => import("./dsa/details-arrays.js"),
  "Strings": () => import("./dsa/details-strings.js"),
  "Linked List": () => import("./dsa/details-linked-list.js"),
  "Stack & Queue": () => import("./dsa/details-stack-queue.js"),
  "Trees": () => import("./dsa/details-trees.js"),
  "Binary Search": () => import("./dsa/details-binary-search.js"),
  "Dynamic Programming": () => import("./dsa/details-dp.js"),
  "Graphs": () => import("./dsa/details-graphs.js"),
  "Heap / Priority Queue": () => import("./dsa/details-heap.js"),
  "Backtracking": () => import("./dsa/details-backtracking.js"),
  "Greedy": () => import("./dsa/details-greedy.js"),
  "Intervals": () => import("./dsa/details-intervals.js"),
};

export async function loadPhaseDetails(phase) {
  const loader = PHASE_LOADERS[phase];
  if (!loader) return {};
  try {
    return (await loader()).DETAILS || {};
  } catch {
    return {};
  }
}

// ---- cross-reference index (used by the DSA "Sheets" browser) -------------
// Maps a problem slug -> which worked solution / difficulty it corresponds to,
// so a sheet's problem list can surface full brute/better/optimal solutions
// (and real difficulty tags) for the problems we've already worked out.
export const SOLUTION_INDEX = {};
for (const p of DSA_PROBLEMS) {
  if (!SOLUTION_INDEX[p.id]) {
    SOLUTION_INDEX[p.id] = { phase: p.phase, difficulty: p.difficulty, title: p.title, companies: p.companies, hot: p.hot };
  }
}

// True if we have a full worked solution for this slug.
export function hasSolution(slug) {
  return !!SOLUTION_INDEX[slug];
}

// Best-known difficulty for a slug (from our worked catalog), or null.
export function difficultyForSlug(slug) {
  return SOLUTION_INDEX[slug] ? SOLUTION_INDEX[slug].difficulty : null;
}

// Load the full worked solution for a slug regardless of phase. Tries the
// primary slug first, then any provided fallbacks (e.g. a LeetCode slug).
export async function loadSolutionBySlug(...slugs) {
  for (const s of slugs) {
    if (!s) continue;
    const e = SOLUTION_INDEX[s];
    if (!e) continue;
    const details = await loadPhaseDetails(e.phase);
    if (details[s]) {
      return { ...details[s], _phase: e.phase, _difficulty: e.difficulty, _title: e.title, _slug: s };
    }
  }
  return null;
}
