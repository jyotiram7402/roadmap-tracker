// data/crackify.js — "Crackify" curated LeetCode starter set.
// A hand-picked list of must-do problems tagged by Type / Difficulty /
// Pattern Category. Full brute → better → optimal solutions are resolved
// from the app's worked-solution set (data/dsa/*) by slug at view time.

function slug(t) {
  return (t || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function lcSlugOf(link) {
  const m = (link || "").match(/problems\/([a-z0-9-]+)/i);
  return m ? m[1] : "";
}
function normDiff(d) {
  const s = (d || "").toLowerCase();
  if (s.includes("easy")) return "easy";
  if (s.includes("medium")) return "medium";
  if (s.includes("hard")) return "hard";
  return "medium";
}

// Raw list exactly as curated (name, LeetCode link, type, difficulty, pattern).
const RAW = [
  ["Reverse String", "https://leetcode.com/problems/reverse-string/", "Strings", "Leetcode Easy", "Two Pointers"],
  ["Two Sum", "https://leetcode.com/problems/two-sum/", "Arrays", "Leetcode Easy", "Hashmaps"],
  ["Valid Anagram", "https://leetcode.com/problems/valid-anagram/", "Strings", "Leetcode Easy", "Hashmaps / String Manipulation / Frequency Array"],
  ["Contains Duplicate", "https://leetcode.com/problems/contains-duplicate/", "Arrays", "Leetcode Easy", "Hashmaps"],
  ["Move Zeroes", "https://leetcode.com/problems/move-zeroes/", "Arrays", "Leetcode Easy", "Two Pointers"],
  ["Remove Element", "https://leetcode.com/problems/remove-element/", "Arrays", "Leetcode Easy", "Two Pointers"],
  ["Remove Duplicates from Sorted Array", "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", "Arrays", "Leetcode Easy", "Two Pointers / Sorting"],
  ["Merge Sorted Array", "https://leetcode.com/problems/merge-sorted-array/", "Arrays", "Leetcode Easy", "Merge Intervals / Two Pointers"],
  ["Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", "Strings", "Leetcode Easy", "Two Pointers / String Manipulation"],
  ["First Unique Character in a String", "https://leetcode.com/problems/first-unique-character-in-a-string/", "Strings", "Leetcode Easy", "Hashmaps"],
  ["Rotate Array", "https://leetcode.com/problems/rotate-array/", "Arrays", "Leetcode Medium", "Two Pointers"],
  ["Majority Element", "https://leetcode.com/problems/majority-element/", "Arrays", "Leetcode Easy", "Hashmaps"],
  ["Maximum Subarray", "https://leetcode.com/problems/maximum-subarray/", "Arrays", "Leetcode Medium", "Kadane's Algo / Prefix Sum"],
  ["Squares of a Sorted Array", "https://leetcode.com/problems/squares-of-a-sorted-array/", "Arrays", "Leetcode Easy", "Two Pointers / Sorting"],
  ["Intersection of Two Arrays II", "https://leetcode.com/problems/intersection-of-two-arrays-ii/", "Arrays", "Leetcode Easy", "Hashmaps / Two Pointers"],
  ["Find All Numbers Disappeared in an Array", "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/", "Arrays", "Leetcode Easy", "In-Place Manipulation / Counting"],
  ["Missing Number", "https://leetcode.com/problems/missing-number/", "Arrays", "Leetcode Easy", "Bit Manipulation / Prefix Sums"],
  ["Roman to Integer", "https://leetcode.com/problems/roman-to-integer/", "Strings", "Leetcode Easy", "String Manipulation"],
  ["Longest Common Prefix", "https://leetcode.com/problems/longest-common-prefix/", "Strings", "Leetcode Easy", "String Manipulation / Sorting"],
  ["Substrings of Size Three with Distinct Characters", "https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/", "Strings", "Leetcode Easy", "Sliding Window"],
  ["Linked List Cycle", "https://leetcode.com/problems/linked-list-cycle/", "LinkedList", "Leetcode Easy", "Fast and Slow Pointers"],
  ["Reverse Linked List", "https://leetcode.com/problems/reverse-linked-list/", "LinkedList", "Leetcode Easy", "In-Place Reversal"],
  ["Merge Two Sorted Lists", "https://leetcode.com/problems/merge-two-sorted-lists/", "LinkedList", "Leetcode Easy", "Dummy Node Technique"],
  ["Valid Parentheses", "https://leetcode.com/problems/valid-parentheses/", "Stacks", "Leetcode Easy", "Expression Evaluation / Stack"],
  ["Min Stack", "https://leetcode.com/problems/min-stack/", "Stacks", "Leetcode Medium", "Design Problems / Two Stacks"],
  ["Symmetric Tree", "https://leetcode.com/problems/symmetric-tree/", "Trees", "Leetcode Easy", "Mirror & Symmetry / Recursion"],
  ["Binary Tree Inorder Traversal", "https://leetcode.com/problems/binary-tree-inorder-traversal/", "Trees", "Leetcode Easy", "Traversal"],
  ["Binary Search", "https://leetcode.com/problems/binary-search/", "Arrays", "Leetcode Easy", "Basic Binary Search"],
  ["Climbing Stairs", "https://leetcode.com/problems/climbing-stairs/", "Integer", "Leetcode Easy", "Basic Dynamic Programming"],
  ["Single Number", "https://leetcode.com/problems/single-number/", "Arrays", "Leetcode Easy", "Bit Manipulation / Counting"],
];

export const CRACKIFY = RAW.map(([name, link, type, difficulty, pattern]) => ({
  name,
  link,
  type,
  pattern,
  difficulty: normDiff(difficulty),
  slug: slug(name),
  lcSlug: lcSlugOf(link),
}));

export const CRACKIFY_TYPES = [...new Set(CRACKIFY.map((p) => p.type))];
export const CRACKIFY_PATTERNS = [...new Set(CRACKIFY.map((p) => p.pattern))].sort();
