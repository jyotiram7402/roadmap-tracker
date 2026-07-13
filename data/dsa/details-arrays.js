// data/dsa/details-arrays.js — worked solutions for the Arrays phase.
// Original explanations and implementations of standard algorithms.
// Shape: { [problemId]: { statement, examples?, approaches[], oneLiner?, similar? } }

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

  "remove-duplicates-from-sorted-array": {
    statement: "Given a sorted array nums, remove the duplicates in place so each unique element appears once, and return the count of unique elements. The first k slots must hold the unique values in order.",
    examples: [{ input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,...]" }],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers (slow/fast)", theory: "Because the array is sorted, duplicates sit next to each other. A slow pointer marks where the next unique value goes; the fast pointer scans — whenever it sees a value different from the last kept one, write it forward.", code: ["public int removeDuplicates(int[] nums) {", "    int w = 1;                       // next write position", "    for (int i = 1; i < nums.length; i++)", "        if (nums[i] != nums[w - 1])  // new unique value", "            nums[w++] = nums[i];", "    return w;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [0,0,1,1,2]", headers: ["i", "nums[i]", "last kept", "write?", "array (first w)"], rows: [["1", "0", "0", "no", "[0]"], ["2", "1", "0", "yes → w=2", "[0,1]"], ["3", "1", "1", "no", "[0,1]"], ["4", "2", "1", "yes → w=3", "[0,1,2]"]] } }
    ],
    oneLiner: "Slow/fast pointers on the sorted array: copy each value forward only when it differs from the last kept value. O(n) time, O(1) space.",
    similar: [["26", "Remove Duplicates", "Two Pointers"], ["80", "Remove Duplicates II", "Two Pointers"], ["27", "Remove Element", "Two Pointers"]]
  },

  "remove-element": {
    statement: "Given an array nums and a value val, remove all occurrences of val in place and return the number of remaining elements. Order of the kept elements may be anything.",
    examples: [{ input: "nums = [3,2,2,3], val = 3", output: "2, nums = [2,2,...]" }],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers (overwrite)", theory: "Keep a write index. Scan the array; every element that is NOT val gets written at the write index, which then advances. Elements equal to val are simply skipped over.", code: ["public int removeElement(int[] nums, int val) {", "    int w = 0;", "    for (int x : nums)", "        if (x != val) nums[w++] = x;", "    return w;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Overwrite in place with a write pointer: copy every element that isn't val forward; the write index is the new length. O(n), O(1)."
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

  "merge-sorted-array": {
    statement: "Merge sorted array nums2 (n elements) into sorted array nums1, which has exactly n trailing empty slots. Merge in place so nums1 ends fully sorted.",
    examples: [{ input: "nums1 = [1,2,3,0,0,0], m=3; nums2 = [2,5,6], n=3", output: "[1,2,2,3,5,6]" }],
    approaches: [
      { name: "Better", pattern: "Merge into new array", theory: "Standard two-pointer merge into a temp array, then copy back. Correct but needs O(m+n) extra space.", code: ["// classic merge with a temp array, then arraycopy back"], time: "O(m+n)", space: "O(m+n)" },
      { name: "Optimal", pattern: "Two Pointers from the end", theory: "Fill nums1 from the back: compare the largest remaining element of each array and place the bigger one at the end. Working backwards uses the empty slots as the buffer, so nothing is overwritten.", code: ["public void merge(int[] a, int m, int[] b, int n) {", "    int i = m - 1, j = n - 1, k = m + n - 1;", "    while (j >= 0)", "        a[k--] = (i >= 0 && a[i] > b[j]) ? a[i--] : b[j--];", "}"], time: "O(m+n)", space: "O(1)", dryRun: { title: "a=[1,2,3,_,_,_], b=[2,5,6]", headers: ["compare", "place", "k", "a after"], rows: [["3 vs 6", "6", "5", "[1,2,3,_,_,6]"], ["3 vs 5", "5", "4", "[1,2,3,_,5,6]"], ["3 vs 2", "3", "3", "[1,2,3,3,5,6]"], ["2 vs 2", "2 (b)", "2", "[1,2,2,3,5,6]"]] } }
    ],
    oneLiner: "Merge from the back: compare the tails and write the larger into the last free slot of nums1 — the trailing gap means no overwrites. O(m+n), O(1)."
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

  "majority-element": {
    statement: "Given an array nums, return the element that appears more than n/2 times (guaranteed to exist).",
    examples: [{ input: "nums = [2,2,1,1,1,2,2]", output: "2" }],
    approaches: [
      { name: "Better", pattern: "HashMap counting", theory: "Count occurrences of each value; return the one whose count exceeds n/2.", code: ["public int majorityElement(int[] nums) {", "    Map<Integer,Integer> c = new HashMap<>();", "    for (int x : nums) {", "        int v = c.merge(x, 1, Integer::sum);", "        if (v > nums.length / 2) return x;", "    }", "    return -1;", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Boyer–Moore Voting", theory: "Keep a candidate and a counter. Matching elements vote +1, different ones −1; when the counter hits 0, adopt the current element as the new candidate. A true majority can never be fully cancelled out.", code: ["public int majorityElement(int[] nums) {", "    int candidate = nums[0], count = 0;", "    for (int x : nums) {", "        if (count == 0) candidate = x;", "        count += (x == candidate) ? 1 : -1;", "    }", "    return candidate;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [2,2,1,1,1,2,2]", headers: ["x", "candidate", "count"], rows: [["2", "2", "1"], ["2", "2", "2"], ["1", "2", "1"], ["1", "2", "0"], ["1", "1", "1"], ["2", "1", "0"], ["2", "2", "1"]] } }
    ],
    oneLiner: "Boyer–Moore voting: pair off different elements; whatever candidate survives with a positive count is the majority. O(n), O(1)."
  },

  "missing-number": {
    statement: "Given an array of n distinct numbers taken from the range [0, n], return the one number missing from the range.",
    examples: [{ input: "nums = [3,0,1]", output: "2" }],
    approaches: [
      { name: "Better", pattern: "Sum formula", theory: "The range 0..n sums to n(n+1)/2. Subtract the actual array sum — the difference is the missing number.", code: ["public int missingNumber(int[] nums) {", "    int n = nums.length, sum = n * (n + 1) / 2;", "    for (int x : nums) sum -= x;", "    return sum;", "}"], time: "O(n)", space: "O(1)" },
      { name: "Optimal", pattern: "XOR", theory: "XOR every index 0..n with every value: pairs cancel (a^a = 0), leaving exactly the missing number. Avoids any overflow concern.", code: ["public int missingNumber(int[] nums) {", "    int x = nums.length;              // start with n", "    for (int i = 0; i < nums.length; i++)", "        x ^= i ^ nums[i];", "    return x;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "XOR all indices 0..n against all values — pairs cancel and the missing number remains. O(n), O(1)."
  },

  "single-number": {
    statement: "Every element in nums appears exactly twice except one, which appears once. Find it in linear time without extra memory.",
    examples: [{ input: "nums = [4,1,2,1,2]", output: "4" }],
    approaches: [
      { name: "Better", pattern: "HashSet", theory: "Add on first sight, remove on second; the set ends with only the single number.", code: ["public int singleNumber(int[] nums) {", "    Set<Integer> s = new HashSet<>();", "    for (int x : nums) if (!s.add(x)) s.remove(x);", "    return s.iterator().next();", "}"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "XOR", theory: "x ^ x = 0 and x ^ 0 = x, and XOR is order-independent — so XOR-ing everything cancels the pairs and leaves the unique value.", code: ["public int singleNumber(int[] nums) {", "    int r = 0;", "    for (int x : nums) r ^= x;", "    return r;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [4,1,2,1,2]", headers: ["x", "r after r^=x"], rows: [["4", "4"], ["1", "5"], ["2", "7"], ["1", "6"], ["2", "4"]] } }
    ],
    oneLiner: "XOR the whole array — duplicates cancel to 0, leaving the single number. O(n), O(1)."
  },

  "find-all-numbers-disappeared-in-an-array": {
    statement: "Given an array of n integers where each value is in [1, n], some appear twice and others once. Return all numbers in [1, n] that never appear, without extra space (output aside).",
    examples: [{ input: "nums = [4,3,2,7,8,2,3,1]", output: "[5,6]" }],
    approaches: [
      { name: "Optimal", pattern: "Index marking (negation)", theory: "Use the array itself as a presence table: for each value v, flip nums[v−1] negative to mark 'v was seen'. Afterwards, any index i still positive means i+1 never appeared.", code: ["public List<Integer> findDisappearedNumbers(int[] nums) {", "    for (int x : nums) {", "        int idx = Math.abs(x) - 1;", "        if (nums[idx] > 0) nums[idx] = -nums[idx];", "    }", "    List<Integer> res = new ArrayList<>();", "    for (int i = 0; i < nums.length; i++)", "        if (nums[i] > 0) res.add(i + 1);", "    return res;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [4,3,2,7]", headers: ["x", "mark index", "array after"], rows: [["4", "3", "[4,3,2,-7]"], ["3", "2", "[4,3,-2,-7]"], ["2", "1", "[4,-3,-2,-7]"], ["7", "6 (out of demo)", "…"]] } }
    ],
    oneLiner: "Mark presence in place by negating nums[v−1] for every value v; indices left positive correspond to missing numbers. O(n), O(1)."
  },

  "squares-of-a-sorted-array": {
    statement: "Given an array sorted ascending (may contain negatives), return an array of the squares of each number, also sorted ascending.",
    examples: [{ input: "nums = [-4,-1,0,3,10]", output: "[0,1,9,16,100]" }],
    approaches: [
      { name: "Better", pattern: "Square then sort", theory: "Square everything and sort. Easy but pays an O(n log n) sort.", code: ["// square each value, then Arrays.sort(result)"], time: "O(n log n)", space: "O(n)" },
      { name: "Optimal", pattern: "Two Pointers from both ends", theory: "The largest square is at one of the two ends (most-negative or most-positive). Compare the two ends and fill the result array from the back.", code: ["public int[] sortedSquares(int[] nums) {", "    int n = nums.length, l = 0, r = n - 1;", "    int[] res = new int[n];", "    for (int k = n - 1; k >= 0; k--) {", "        int a = nums[l] * nums[l], b = nums[r] * nums[r];", "        if (a > b) { res[k] = a; l++; }", "        else       { res[k] = b; r--; }", "    }", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Two pointers at both ends: the bigger square goes into the result from the back. O(n) without sorting."
  },

  "intersection-of-two-arrays-ii": {
    statement: "Given two integer arrays, return their intersection where each element appears as many times as it occurs in both arrays.",
    examples: [{ input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2,2]" }],
    approaches: [
      { name: "Optimal", pattern: "HashMap counting", theory: "Count values of the smaller array in a map. Scan the other array: when a value still has a positive count, emit it and decrement.", code: ["public int[] intersect(int[] a, int[] b) {", "    Map<Integer,Integer> c = new HashMap<>();", "    for (int x : a) c.merge(x, 1, Integer::sum);", "    List<Integer> out = new ArrayList<>();", "    for (int x : b) {", "        if (c.getOrDefault(x, 0) > 0) {", "            out.add(x);", "            c.merge(x, -1, Integer::sum);", "        }", "    }", "    return out.stream().mapToInt(i -> i).toArray();", "}"], time: "O(m+n)", space: "O(min(m,n))" }
    ],
    oneLiner: "Count one array in a HashMap, then scan the other, emitting and decrementing while counts stay positive. O(m+n)."
  },

  "binary-search": {
    statement: "Given a sorted array and a target, return the index of the target or −1 if it is not present. Must run in O(log n).",
    examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
    approaches: [
      { name: "Optimal", pattern: "Binary Search", theory: "Compare the target with the middle element; discard the half that cannot contain it and repeat until found or the range is empty.", code: ["public int search(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;   // avoids overflow", "        if (nums[mid] == target) return mid;", "        if (nums[mid] < target) lo = mid + 1;", "        else hi = mid - 1;", "    }", "    return -1;", "}"], time: "O(log n)", space: "O(1)", dryRun: { title: "nums = [-1,0,3,5,9,12], target = 9", headers: ["lo", "hi", "mid", "nums[mid]", "action"], rows: [["0", "5", "2", "3", "3 < 9 → lo=3"], ["3", "5", "4", "9", "found → return 4"]] } }
    ],
    oneLiner: "Halve the sorted search range each step by comparing with the middle. O(log n), O(1)."
  },

  "search-insert-position": {
    statement: "Given a sorted array of distinct integers and a target, return the index if found, otherwise the index where it would be inserted to keep order.",
    examples: [{ input: "nums = [1,3,5,6], target = 2", output: "1" }],
    approaches: [
      { name: "Optimal", pattern: "Binary Search (lower bound)", theory: "Standard binary search, but when the loop ends without a hit, lo is exactly the first index with a value ≥ target — i.e., the insert position.", code: ["public int searchInsert(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] == target) return mid;", "        if (nums[mid] < target) lo = mid + 1;", "        else hi = mid - 1;", "    }", "    return lo;   // insert position", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search; if not found, lo lands on the first element ≥ target, which is the insertion index. O(log n)."
  },

  "height-checker": {
    statement: "Students stand in a line with given heights. Return how many positions differ from the line sorted in non-decreasing order.",
    examples: [{ input: "heights = [1,1,4,2,1,3]", output: "3" }],
    approaches: [
      { name: "Optimal", pattern: "Counting Sort compare", theory: "Heights are small (≤ 100), so counting sort gives the expected order in O(n). Walk the counts and compare with the original positions.", code: ["public int heightChecker(int[] heights) {", "    int[] count = new int[101];", "    for (int h : heights) count[h]++;", "    int mismatches = 0, h = 0;", "    for (int i = 0; i < heights.length; i++) {", "        while (count[h] == 0) h++;      // next expected height", "        if (heights[i] != h) mismatches++;", "        count[h]--;", "    }", "    return mismatches;", "}"], time: "O(n + k)", space: "O(k)" }
    ],
    oneLiner: "Counting sort the expected order (heights ≤ 100) and count positions where the original differs. O(n)."
  },

  "find-pivot-index": {
    statement: "Return the leftmost index where the sum of elements to its left equals the sum to its right, or −1 if none exists.",
    examples: [{ input: "nums = [1,7,3,6,5,6]", output: "3", explanation: "Left of index 3 sums to 11, right sums to 11." }],
    approaches: [
      { name: "Optimal", pattern: "Prefix Sum", theory: "Compute the total once. Walk with a running left sum: the right sum is total − left − nums[i]; when they match, i is the pivot.", code: ["public int pivotIndex(int[] nums) {", "    int total = 0, left = 0;", "    for (int x : nums) total += x;", "    for (int i = 0; i < nums.length; i++) {", "        if (left == total - left - nums[i]) return i;", "        left += nums[i];", "    }", "    return -1;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "One pass with total and running left sum: pivot when left == total − left − nums[i]. O(n), O(1)."
  },

  "running-sum-of-1d-array": {
    statement: "Return the running sum of the array, where result[i] = sum of nums[0..i].",
    examples: [{ input: "nums = [1,2,3,4]", output: "[1,3,6,10]" }],
    approaches: [
      { name: "Optimal", pattern: "Prefix Sum (in place)", theory: "Each element becomes itself plus the previous running total.", code: ["public int[] runningSum(int[] nums) {", "    for (int i = 1; i < nums.length; i++)", "        nums[i] += nums[i - 1];", "    return nums;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Accumulate in place: nums[i] += nums[i−1]. O(n), O(1)."
  },

  "richest-customer-wealth": {
    statement: "Given a grid where accounts[i][j] is the money of customer i in bank j, return the largest row sum (the richest customer's wealth).",
    examples: [{ input: "accounts = [[1,5],[7,3],[3,5]]", output: "10" }],
    approaches: [
      { name: "Optimal", pattern: "Row sums", theory: "Sum each row and track the maximum.", code: ["public int maximumWealth(int[][] accounts) {", "    int best = 0;", "    for (int[] row : accounts) {", "        int sum = 0;", "        for (int x : row) sum += x;", "        best = Math.max(best, sum);", "    }", "    return best;", "}"], time: "O(m·n)", space: "O(1)" }
    ],
    oneLiner: "Sum each row, keep the max. O(m·n)."
  },

  "kids-with-greatest-number-of-candies": {
    statement: "For each kid, return true if giving them extraCandies makes their count ≥ the current maximum among all kids.",
    examples: [{ input: "candies = [2,3,5,1,3], extra = 3", output: "[true,true,true,false,true]" }],
    approaches: [
      { name: "Optimal", pattern: "Precompute max", theory: "Find the max once, then each kid's answer is candies[i] + extra ≥ max.", code: ["public List<Boolean> kidsWithCandies(int[] candies, int extra) {", "    int max = 0;", "    for (int c : candies) max = Math.max(max, c);", "    List<Boolean> res = new ArrayList<>();", "    for (int c : candies) res.add(c + extra >= max);", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Compute the max once; each kid passes if candies + extra ≥ max. O(n)."
  },

  "find-the-highest-altitude": {
    statement: "A biker starts at altitude 0; gain[i] is the net altitude change of leg i. Return the highest altitude reached.",
    examples: [{ input: "gain = [-5,1,5,0,-7]", output: "1" }],
    approaches: [
      { name: "Optimal", pattern: "Prefix Sum max", theory: "Track the running altitude and its maximum (starting at 0).", code: ["public int largestAltitude(int[] gain) {", "    int alt = 0, best = 0;", "    for (int g : gain) {", "        alt += g;", "        best = Math.max(best, alt);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Running prefix sum of gains, tracking the maximum (≥ 0). O(n), O(1)."
  },

  "shuffle-the-array": {
    statement: "Given nums in the form [x1..xn, y1..yn], return it interleaved as [x1,y1,x2,y2,...].",
    examples: [{ input: "nums = [2,5,1,3,4,7], n = 3", output: "[2,3,5,4,1,7]" }],
    approaches: [
      { name: "Optimal", pattern: "Index interleave", theory: "Element i of the first half goes to position 2i; element i of the second half goes to 2i+1.", code: ["public int[] shuffle(int[] nums, int n) {", "    int[] res = new int[2 * n];", "    for (int i = 0; i < n; i++) {", "        res[2 * i] = nums[i];", "        res[2 * i + 1] = nums[n + i];", "    }", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Write nums[i] → 2i and nums[n+i] → 2i+1. O(n)."
  },

  "concatenation-of-array": {
    statement: "Return an array of length 2n formed by the array followed by a copy of itself.",
    examples: [{ input: "nums = [1,2,1]", output: "[1,2,1,1,2,1]" }],
    approaches: [
      { name: "Optimal", pattern: "Direct copy", theory: "ans[i] and ans[i+n] both take nums[i].", code: ["public int[] getConcatenation(int[] nums) {", "    int n = nums.length;", "    int[] ans = new int[2 * n];", "    for (int i = 0; i < n; i++) {", "        ans[i] = nums[i];", "        ans[i + n] = nums[i];", "    }", "    return ans;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "One pass writing each value at i and i+n. O(n)."
  },

  "build-array-from-permutation": {
    statement: "Given a zero-based permutation nums, return an array where ans[i] = nums[nums[i]].",
    examples: [{ input: "nums = [0,2,1,5,3,4]", output: "[0,1,2,4,5,3]" }],
    approaches: [
      { name: "Optimal", pattern: "Direct mapping", theory: "Each position simply reads through one level of indirection.", code: ["public int[] buildArray(int[] nums) {", "    int[] ans = new int[nums.length];", "    for (int i = 0; i < nums.length; i++)", "        ans[i] = nums[nums[i]];", "    return ans;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "ans[i] = nums[nums[i]] in one pass. O(n). (Follow-up: encode two values per slot with modular arithmetic for O(1) space.)"
  },

  "replace-elements-with-greatest-element-on-right-side": {
    statement: "Replace every element with the greatest element to its right; the last element becomes −1.",
    examples: [{ input: "arr = [17,18,5,4,6,1]", output: "[18,6,6,6,1,-1]" }],
    approaches: [
      { name: "Optimal", pattern: "Right-to-left running max", theory: "Walk from the end keeping the max seen so far; write it into the current slot before updating with the old value.", code: ["public int[] replaceElements(int[] arr) {", "    int max = -1;", "    for (int i = arr.length - 1; i >= 0; i--) {", "        int cur = arr[i];", "        arr[i] = max;", "        max = Math.max(max, cur);", "    }", "    return arr;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Scan right-to-left carrying the running max; place it, then fold in the old value. O(n), O(1)."
  },

  "remove-duplicates-from-sorted-array-ii": {
    statement: "In a sorted array, keep each value at most twice, in place, and return the new length.",
    examples: [{ input: "nums = [1,1,1,2,2,3]", output: "5, nums = [1,1,2,2,3,...]" }],
    approaches: [
      { name: "Optimal", pattern: "Two Pointers (allow 2)", theory: "Write pointer w. Copy nums[i] forward unless it equals the element two positions before the write head — that would make a third copy.", code: ["public int removeDuplicates(int[] nums) {", "    int w = 0;", "    for (int x : nums)", "        if (w < 2 || x != nums[w - 2])", "            nums[w++] = x;", "    return w;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Copy forward unless the value equals nums[w−2] — that caps every value at two copies. O(n), O(1)."
  },

  "3sum": {
    statement: "Find all unique triplets in nums that sum to zero.",
    examples: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }],
    approaches: [
      { name: "Brute Force", pattern: "Triple loop", theory: "Try every triplet and deduplicate with a set of sorted triplets. Far too slow beyond small inputs.", code: ["// three nested loops + a Set<List<Integer>> for dedup"], time: "O(n³)", space: "O(n)" },
      { name: "Optimal", pattern: "Sort + Two Pointers", theory: "Sort. Fix the first element, then find pairs summing to its negative with two pointers on the rest. Skip equal neighbours at every level to avoid duplicate triplets.", code: ["public List<List<Integer>> threeSum(int[] nums) {", "    Arrays.sort(nums);", "    List<List<Integer>> res = new ArrayList<>();", "    for (int i = 0; i < nums.length - 2; i++) {", "        if (i > 0 && nums[i] == nums[i - 1]) continue;   // skip dup anchor", "        int l = i + 1, r = nums.length - 1;", "        while (l < r) {", "            int sum = nums[i] + nums[l] + nums[r];", "            if (sum == 0) {", "                res.add(List.of(nums[i], nums[l], nums[r]));", "                while (l < r && nums[l] == nums[l + 1]) l++;", "                while (l < r && nums[r] == nums[r - 1]) r--;", "                l++; r--;", "            } else if (sum < 0) l++;", "            else r--;", "        }", "    }", "    return res;", "}"], time: "O(n²)", space: "O(1) extra", dryRun: { title: "sorted = [-4,-1,-1,0,1,2], i=1 (−1)", headers: ["l", "r", "sum", "action"], rows: [["2", "5", "0", "record [−1,−1,2]; move both"], ["3", "4", "0", "record [−1,0,1]; move both"], ["4", "3", "—", "l ≥ r → next i"]] } }
    ],
    oneLiner: "Sort, fix each anchor, and two-pointer the remainder for pairs summing to −anchor, skipping duplicates at every level. O(n²).",
    similar: [["15", "3Sum", "Two Pointers"], ["16", "3Sum Closest", "Two Pointers"], ["18", "4Sum", "Two Pointers"], ["1", "Two Sum", "HashMap"]]
  },

  "3sum-closest": {
    statement: "Return the sum of the triplet in nums closest to a given target.",
    examples: [{ input: "nums = [-1,2,1,-4], target = 1", output: "2", explanation: "−1 + 2 + 1 = 2." }],
    approaches: [
      { name: "Optimal", pattern: "Sort + Two Pointers", theory: "Same skeleton as 3Sum, but instead of matching zero, track the sum whose distance to target is smallest, moving pointers toward the target.", code: ["public int threeSumClosest(int[] nums, int target) {", "    Arrays.sort(nums);", "    int best = nums[0] + nums[1] + nums[2];", "    for (int i = 0; i < nums.length - 2; i++) {", "        int l = i + 1, r = nums.length - 1;", "        while (l < r) {", "            int sum = nums[i] + nums[l] + nums[r];", "            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;", "            if (sum == target) return sum;", "            if (sum < target) l++; else r--;", "        }", "    }", "    return best;", "}"], time: "O(n²)", space: "O(1)" }
    ],
    oneLiner: "Sort + two pointers per anchor, tracking the closest sum instead of an exact match. O(n²)."
  },

  "4sum": {
    statement: "Find all unique quadruplets summing to target.",
    examples: [{ input: "nums = [1,0,-1,0,-2,2], target = 0", output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]" }],
    approaches: [
      { name: "Optimal", pattern: "Sort + double anchor + Two Pointers", theory: "Sort; fix the first two elements with nested loops (skipping duplicates), then two-pointer the rest. Use long for the running sum to dodge overflow.", code: ["public List<List<Integer>> fourSum(int[] nums, int target) {", "    Arrays.sort(nums);", "    List<List<Integer>> res = new ArrayList<>();", "    int n = nums.length;", "    for (int i = 0; i < n - 3; i++) {", "        if (i > 0 && nums[i] == nums[i - 1]) continue;", "        for (int j = i + 1; j < n - 2; j++) {", "            if (j > i + 1 && nums[j] == nums[j - 1]) continue;", "            int l = j + 1, r = n - 1;", "            while (l < r) {", "                long sum = (long) nums[i] + nums[j] + nums[l] + nums[r];", "                if (sum == target) {", "                    res.add(List.of(nums[i], nums[j], nums[l], nums[r]));", "                    while (l < r && nums[l] == nums[l + 1]) l++;", "                    while (l < r && nums[r] == nums[r - 1]) r--;", "                    l++; r--;", "                } else if (sum < target) l++;", "                else r--;", "            }", "        }", "    }", "    return res;", "}"], time: "O(n³)", space: "O(1) extra" }
    ],
    oneLiner: "Two fixed anchors + two pointers, duplicates skipped at every level, long sums against overflow. O(n³)."
  },

  "product-of-array-except-self": {
    statement: "Return an array where each answer[i] is the product of all elements except nums[i] — without using division and in O(n).",
    examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }],
    approaches: [
      { name: "Brute Force", pattern: "Nested loop", theory: "For each i multiply everything else. O(n²) — too slow.", code: ["// for each i, loop j != i multiplying nums[j]"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "Prefix × Suffix products", theory: "answer[i] = (product of everything left of i) × (product of everything right of i). Do a left-to-right pass writing prefixes, then a right-to-left pass multiplying in suffixes with a running variable.", code: ["public int[] productExceptSelf(int[] nums) {", "    int n = nums.length;", "    int[] res = new int[n];", "    res[0] = 1;", "    for (int i = 1; i < n; i++)", "        res[i] = res[i - 1] * nums[i - 1];     // prefix", "    int suffix = 1;", "    for (int i = n - 1; i >= 0; i--) {", "        res[i] *= suffix;                       // × suffix", "        suffix *= nums[i];", "    }", "    return res;", "}"], time: "O(n)", space: "O(1) extra", dryRun: { title: "nums = [1,2,3,4]", headers: ["step", "suffix", "res"], rows: [["prefix pass", "—", "[1,1,2,6]"], ["i=3: res[3]·1", "4", "[1,1,2,6]"], ["i=2: res[2]·4", "12", "[1,1,8,6]"], ["i=1: res[1]·12", "24", "[1,12,8,6]"], ["i=0: res[0]·24", "24", "[24,12,8,6]"]] } }
    ],
    oneLiner: "Left pass stores prefix products, right pass multiplies in a running suffix — every slot gets left×right without division. O(n), O(1) extra.",
    similar: [["238", "Product Except Self", "Prefix/Suffix"], ["53", "Maximum Subarray", "Kadane"], ["152", "Max Product Subarray", "DP"]]
  },

  "maximum-product-subarray": {
    statement: "Find the contiguous subarray with the largest product.",
    examples: [{ input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] gives 6." }],
    approaches: [
      { name: "Optimal", pattern: "Track max AND min", theory: "A negative number turns the smallest product into the largest. So carry both the max and min product ending here; on each element, the new max/min come from {x, max·x, min·x}.", code: ["public int maxProduct(int[] nums) {", "    int max = nums[0], min = nums[0], best = nums[0];", "    for (int i = 1; i < nums.length; i++) {", "        int x = nums[i];", "        int candMax = Math.max(x, Math.max(max * x, min * x));", "        int candMin = Math.min(x, Math.min(max * x, min * x));", "        max = candMax; min = candMin;", "        best = Math.max(best, max);", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [2,3,-2,4]", headers: ["x", "max", "min", "best"], rows: [["2", "2", "2", "2"], ["3", "6", "3", "6"], ["-2", "-2", "-12", "6"], ["4", "4", "-48", "6"]] } }
    ],
    oneLiner: "Kadane-style but carry both running max and min products, since a negative flips them. O(n), O(1)."
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
  },

  "container-with-most-water": {
    statement: "Given heights of vertical lines, choose two that with the x-axis form a container holding the most water. Return that maximum area.",
    examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Lines at index 1 and 8: min(8,7) × 7 = 49." }],
    approaches: [
      { name: "Brute Force", pattern: "All pairs", theory: "Compute min(h[i],h[j])·(j−i) for every pair.", code: ["// double loop over all pairs tracking max area"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "Two Pointers", theory: "Start at both ends. Area is limited by the shorter line — moving the taller one can never help, so always move the shorter pointer inward and track the best area.", code: ["public int maxArea(int[] h) {", "    int l = 0, r = h.length - 1, best = 0;", "    while (l < r) {", "        best = Math.max(best, Math.min(h[l], h[r]) * (r - l));", "        if (h[l] < h[r]) l++;", "        else r--;", "    }", "    return best;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "height = [1,8,6,2,5,4,8,3,7]", headers: ["l", "r", "area", "best", "move"], rows: [["0(1)", "8(7)", "1·8=8", "8", "l++ (shorter)"], ["1(8)", "8(7)", "7·7=49", "49", "r--"], ["1(8)", "7(3)", "3·6=18", "49", "r--"], ["…", "…", "…", "49", "…"]] } }
    ],
    oneLiner: "Two pointers from the ends; compute the area and always move the shorter line inward — the tall one can't improve. O(n), O(1)."
  },

  "sort-colors": {
    statement: "Sort an array of 0s, 1s, and 2s in place in one pass (no library sort).",
    examples: [{ input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }],
    approaches: [
      { name: "Better", pattern: "Counting sort (two passes)", theory: "Count 0s/1s/2s then rewrite the array.", code: ["// count occurrences, then overwrite"], time: "O(n)", space: "O(1)" },
      { name: "Optimal", pattern: "Dutch National Flag (three pointers)", theory: "low, mid, high pointers. 0 swaps to the front (low), 2 swaps to the back (high, don't advance mid — the swapped-in value is unseen), 1 just advances mid.", code: ["public void sortColors(int[] a) {", "    int low = 0, mid = 0, high = a.length - 1;", "    while (mid <= high) {", "        if (a[mid] == 0)      swap(a, low++, mid++);", "        else if (a[mid] == 2) swap(a, mid, high--);", "        else                  mid++;", "    }", "}", "private void swap(int[] a, int i, int j) {", "    int t = a[i]; a[i] = a[j]; a[j] = t;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [2,0,2,1,1,0]", headers: ["mid", "a[mid]", "action", "array"], rows: [["0", "2", "swap high(5)", "[0,0,2,1,1,2]"], ["0", "0", "swap low, both++", "[0,0,2,1,1,2]"], ["1", "0", "swap low, both++", "[0,0,2,1,1,2]"], ["2", "2", "swap high(4)", "[0,0,1,1,2,2]"], ["2", "1", "mid++ … done", "[0,0,1,1,2,2]"]] } }
    ],
    oneLiner: "Dutch National Flag: 0s swap to the low front, 2s swap to the high back, 1s pass through — single pass, in place. O(n), O(1)."
  },

  "rotate-array": {
    statement: "Rotate the array to the right by k steps, in place.",
    examples: [{ input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" }],
    approaches: [
      { name: "Better", pattern: "Extra array", theory: "Place each element at (i+k) % n in a new array, then copy back.", code: ["// res[(i + k) % n] = nums[i]; copy back"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Triple reverse", theory: "Reverse the whole array, then reverse the first k and the remaining n−k separately. The rotation falls out.", code: ["public void rotate(int[] nums, int k) {", "    int n = nums.length; k %= n;", "    reverse(nums, 0, n - 1);", "    reverse(nums, 0, k - 1);", "    reverse(nums, k, n - 1);", "}", "private void reverse(int[] a, int i, int j) {", "    while (i < j) { int t = a[i]; a[i++] = a[j]; a[j--] = t; }", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [1,2,3,4,5,6,7], k = 3", headers: ["step", "array"], rows: [["reverse all", "[7,6,5,4,3,2,1]"], ["reverse first k=3", "[5,6,7,4,3,2,1]"], ["reverse rest", "[5,6,7,1,2,3,4]"]] } }
    ],
    oneLiner: "Reverse the whole array, then reverse the first k and the last n−k — three reversals rotate in place. O(n), O(1)."
  },

  "merge-intervals": {
    statement: "Given a list of intervals, merge all overlapping ones and return the non-overlapping result.",
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    approaches: [
      { name: "Optimal", pattern: "Sort by start + sweep", theory: "Sort by start. Walk the list keeping a current merged interval: if the next start is within the current end, extend the end; otherwise emit and start fresh.", code: ["public int[][] merge(int[][] intervals) {", "    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);", "    List<int[]> res = new ArrayList<>();", "    int[] cur = intervals[0];", "    for (int[] iv : intervals) {", "        if (iv[0] <= cur[1])", "            cur[1] = Math.max(cur[1], iv[1]);   // overlap → extend", "        else {", "            res.add(cur);", "            cur = iv;", "        }", "    }", "    res.add(cur);", "    return res.toArray(new int[0][]);", "}"], time: "O(n log n)", space: "O(n)", dryRun: { title: "[[1,3],[2,6],[8,10],[15,18]]", headers: ["interval", "cur before", "overlap?", "cur after / emitted"], rows: [["[2,6]", "[1,3]", "2 ≤ 3 yes", "cur=[1,6]"], ["[8,10]", "[1,6]", "8 > 6 no", "emit [1,6]; cur=[8,10]"], ["[15,18]", "[8,10]", "no", "emit [8,10]; cur=[15,18]"]] } }
    ],
    oneLiner: "Sort by start, sweep once extending the current interval while starts fall inside it, emitting when a gap appears. O(n log n).",
    similar: [["56", "Merge Intervals", "Sweep"], ["57", "Insert Interval", "Sweep"], ["435", "Non-overlapping Intervals", "Greedy"]]
  },

  "insert-interval": {
    statement: "Insert a new interval into a sorted, non-overlapping list and merge as needed.",
    examples: [{ input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }],
    approaches: [
      { name: "Optimal", pattern: "Three segments", theory: "Emit intervals ending before the new one; merge everything overlapping into the new interval; emit the rest.", code: ["public int[][] insert(int[][] intervals, int[] ni) {", "    List<int[]> res = new ArrayList<>();", "    int i = 0, n = intervals.length;", "    while (i < n && intervals[i][1] < ni[0]) res.add(intervals[i++]);   // before", "    while (i < n && intervals[i][0] <= ni[1]) {                        // overlap", "        ni[0] = Math.min(ni[0], intervals[i][0]);", "        ni[1] = Math.max(ni[1], intervals[i][1]);", "        i++;", "    }", "    res.add(ni);", "    while (i < n) res.add(intervals[i++]);                             // after", "    return res.toArray(new int[0][]);", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Copy the intervals before, absorb every overlapping one into the new interval, then copy the rest. O(n)."
  },

  "spiral-matrix": {
    statement: "Return all elements of an m×n matrix in spiral (clockwise) order.",
    examples: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }],
    approaches: [
      { name: "Optimal", pattern: "Shrinking boundaries", theory: "Keep top/bottom/left/right bounds. Walk the top row, right column, bottom row, left column, shrinking the corresponding bound after each side, until the bounds cross.", code: ["public List<Integer> spiralOrder(int[][] m) {", "    List<Integer> res = new ArrayList<>();", "    int top = 0, bottom = m.length - 1, left = 0, right = m[0].length - 1;", "    while (top <= bottom && left <= right) {", "        for (int c = left; c <= right; c++) res.add(m[top][c]);", "        top++;", "        for (int r = top; r <= bottom; r++) res.add(m[r][right]);", "        right--;", "        if (top <= bottom)", "            for (int c = right; c >= left; c--) res.add(m[bottom][c]);", "        bottom--;", "        if (left <= right)", "            for (int r = bottom; r >= top; r--) res.add(m[r][left]);", "        left++;", "    }", "    return res;", "}"], time: "O(m·n)", space: "O(1) extra" }
    ],
    oneLiner: "Four boundary pointers; peel the top, right, bottom, left edges in turn, shrinking each after use. O(m·n)."
  },

  "set-matrix-zeroes": {
    statement: "If a cell is 0, set its whole row and column to 0 — in place.",
    examples: [{ input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }],
    approaches: [
      { name: "Better", pattern: "Marker arrays", theory: "Record zero rows and columns in two boolean arrays, then zero them in a second pass. O(m+n) extra.", code: ["// boolean[] rowZero, colZero; two passes"], time: "O(m·n)", space: "O(m+n)" },
      { name: "Optimal", pattern: "First row/col as flags", theory: "Use the matrix's own first row and column to store the flags, plus two booleans for whether the first row/column themselves need zeroing. Zero inner cells from the flags, then handle the first row/col last.", code: ["public void setZeroes(int[][] m) {", "    int rows = m.length, cols = m[0].length;", "    boolean firstRow = false, firstCol = false;", "    for (int c = 0; c < cols; c++) if (m[0][c] == 0) firstRow = true;", "    for (int r = 0; r < rows; r++) if (m[r][0] == 0) firstCol = true;", "    for (int r = 1; r < rows; r++)", "        for (int c = 1; c < cols; c++)", "            if (m[r][c] == 0) { m[r][0] = 0; m[0][c] = 0; }", "    for (int r = 1; r < rows; r++)", "        for (int c = 1; c < cols; c++)", "            if (m[r][0] == 0 || m[0][c] == 0) m[r][c] = 0;", "    if (firstRow) for (int c = 0; c < cols; c++) m[0][c] = 0;", "    if (firstCol) for (int r = 0; r < rows; r++) m[r][0] = 0;", "}"], time: "O(m·n)", space: "O(1)" }
    ],
    oneLiner: "Store zero-flags in the first row/column themselves (plus two booleans for that row/col), then zero from the flags. O(m·n), O(1)."
  },

  "next-permutation": {
    statement: "Rearrange numbers into the lexicographically next greater permutation (or the smallest if none exists), in place.",
    examples: [{ input: "nums = [1,2,3]", output: "[1,3,2]" }],
    approaches: [
      { name: "Optimal", pattern: "Pivot + swap + reverse", theory: "From the right, find the first index i with nums[i] < nums[i+1] (the pivot). Find the rightmost element greater than the pivot, swap them, then reverse the suffix after i (it was descending, make it ascending).", code: ["public void nextPermutation(int[] nums) {", "    int n = nums.length, i = n - 2;", "    while (i >= 0 && nums[i] >= nums[i + 1]) i--;   // find pivot", "    if (i >= 0) {", "        int j = n - 1;", "        while (nums[j] <= nums[i]) j--;              // rightmost bigger", "        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;", "    }", "    for (int l = i + 1, r = n - 1; l < r; l++, r--) { // reverse suffix", "        int t = nums[l]; nums[l] = nums[r]; nums[r] = t;", "    }", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [1,3,2]", headers: ["step", "state"], rows: [["pivot: 1 (i=0, 1<3)", "[1,3,2]"], ["rightmost > 1 is 2", "swap → [2,3,1]"], ["reverse suffix", "[2,1,3]"]] } }
    ],
    oneLiner: "Find the rightmost ascent, swap it with the smallest larger element to its right, and reverse the suffix. O(n), O(1)."
  },

  "find-the-duplicate-number": {
    statement: "An array of n+1 integers has values in [1, n], so at least one number repeats. Find the duplicate without modifying the array and with O(1) space.",
    examples: [{ input: "nums = [1,3,4,2,2]", output: "2" }],
    approaches: [
      { name: "Better", pattern: "Sort or HashSet", theory: "Sorting places duplicates adjacent (but modifies), a set finds repeats (but uses O(n) space).", code: ["// sort + adjacent check, or HashSet"], time: "O(n log n) / O(n)", space: "O(1)* / O(n)" },
      { name: "Optimal", pattern: "Floyd's cycle detection on values", theory: "Treat i → nums[i] as a linked list; a duplicate value means two indices point to the same node — a cycle. Run tortoise/hare to meet inside the cycle, then reset one pointer to the start; they meet at the cycle entrance = the duplicate.", code: ["public int findDuplicate(int[] nums) {", "    int slow = nums[0], fast = nums[0];", "    do {", "        slow = nums[slow];", "        fast = nums[nums[fast]];", "    } while (slow != fast);", "    slow = nums[0];", "    while (slow != fast) {", "        slow = nums[slow];", "        fast = nums[fast];", "    }", "    return slow;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Map i → nums[i] and the duplicate creates a cycle; Floyd's tortoise-and-hare finds its entrance — the duplicate. O(n), O(1)."
  },

  "kth-largest-element-in-an-array": {
    statement: "Return the kth largest element of an unsorted array (not the kth distinct).",
    examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
    approaches: [
      { name: "Brute Force", pattern: "Sort", theory: "Sort descending and take index k−1.", code: ["// Arrays.sort(nums); return nums[nums.length - k];"], time: "O(n log n)", space: "O(1)" },
      { name: "Optimal", pattern: "Min-heap of size k", theory: "Keep a min-heap holding the k largest so far; push each value and pop when size exceeds k. The root is the kth largest.", code: ["public int findKthLargest(int[] nums, int k) {", "    PriorityQueue<Integer> heap = new PriorityQueue<>();", "    for (int x : nums) {", "        heap.offer(x);", "        if (heap.size() > k) heap.poll();", "    }", "    return heap.peek();", "}"], time: "O(n log k)", space: "O(k)", dryRun: { title: "nums = [3,2,1,5,6,4], k = 2", headers: ["x", "heap after"], rows: [["3", "[3]"], ["2", "[2,3]"], ["1", "[2,3] (1 popped)"], ["5", "[3,5]"], ["6", "[5,6]"], ["4", "[5,6] → answer 5"]] } }
    ],
    oneLiner: "Min-heap capped at size k: after pushing everything, its root is the kth largest. O(n log k). (Quickselect gives O(n) average.)"
  },

  "top-k-frequent-elements": {
    statement: "Return the k most frequent elements of the array (any order).",
    examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
    approaches: [
      { name: "Better", pattern: "Count + heap", theory: "Count with a map, keep a size-k min-heap ordered by frequency.", code: ["// HashMap counts + PriorityQueue<Map.Entry> of size k"], time: "O(n log k)", space: "O(n)" },
      { name: "Optimal", pattern: "Bucket sort by frequency", theory: "Count each value; a value's frequency is at most n, so drop values into buckets indexed by frequency and read buckets from high to low until k are collected.", code: ["public int[] topKFrequent(int[] nums, int k) {", "    Map<Integer,Integer> count = new HashMap<>();", "    for (int x : nums) count.merge(x, 1, Integer::sum);", "    List<Integer>[] bucket = new List[nums.length + 1];", "    for (var e : count.entrySet()) {", "        int f = e.getValue();", "        if (bucket[f] == null) bucket[f] = new ArrayList<>();", "        bucket[f].add(e.getKey());", "    }", "    int[] res = new int[k]; int idx = 0;", "    for (int f = nums.length; f >= 1 && idx < k; f--)", "        if (bucket[f] != null)", "            for (int v : bucket[f]) { res[idx++] = v; if (idx == k) break; }", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Count frequencies, bucket values by frequency (max n), and read buckets from the top until k collected — linear time. O(n)."
  },

  "find-peak-element": {
    statement: "A peak is strictly greater than its neighbours. Return the index of any peak in O(log n); nums[-1] and nums[n] are treated as −∞.",
    examples: [{ input: "nums = [1,2,3,1]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Binary search on slope", theory: "Look at mid: if nums[mid] < nums[mid+1] the slope rises to the right so a peak exists on the right; otherwise one exists at mid or left. Halve accordingly.", code: ["public int findPeakElement(int[] nums) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo < hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] < nums[mid + 1]) lo = mid + 1;   // rising → right", "        else hi = mid;                                  // falling → left/mid", "    }", "    return lo;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search following the rising slope — if nums[mid] < nums[mid+1], a peak lies right, else left/at mid. O(log n)."
  },

  "search-in-rotated-sorted-array": {
    statement: "A sorted array was rotated at an unknown pivot. Search for target in O(log n); return its index or −1.",
    examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }],
    approaches: [
      { name: "Optimal", pattern: "Modified binary search", theory: "At every mid, one half is always properly sorted. Determine which (compare with the ends), check whether the target lies inside that sorted half, and discard the other half.", code: ["public int search(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] == target) return mid;", "        if (nums[lo] <= nums[mid]) {              // left half sorted", "            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;", "            else lo = mid + 1;", "        } else {                                   // right half sorted", "            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;", "            else hi = mid - 1;", "        }", "    }", "    return -1;", "}"], time: "O(log n)", space: "O(1)", dryRun: { title: "nums = [4,5,6,7,0,1,2], target = 0", headers: ["lo", "hi", "mid", "sorted half", "action"], rows: [["0", "6", "3 (7)", "left [4..7]", "0 ∉ [4,7) → lo=4"], ["4", "6", "5 (1)", "right [1..2]", "0 ∉ (1,2] → hi=4"], ["4", "4", "4 (0)", "—", "found → 4"]] } }
    ],
    oneLiner: "Binary search where each step identifies the sorted half and keeps it only if the target falls inside it. O(log n)."
  },

  "find-minimum-in-rotated-sorted-array": {
    statement: "Find the minimum element of a rotated sorted array of unique values in O(log n).",
    examples: [{ input: "nums = [3,4,5,1,2]", output: "1" }],
    approaches: [
      { name: "Optimal", pattern: "Binary search vs right end", theory: "Compare mid to the rightmost element: if nums[mid] > nums[hi] the minimum is right of mid; otherwise it's at mid or left. Shrink until lo == hi.", code: ["public int findMin(int[] nums) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo < hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] > nums[hi]) lo = mid + 1;", "        else hi = mid;", "    }", "    return nums[lo];", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search comparing mid to the right end: bigger → min is right; else min at mid or left. O(log n)."
  },

  "gas-station": {
    statement: "Around a circular route, gas[i] fuel is available at station i and cost[i] is needed to reach the next. Return the unique starting station from which you can complete the loop, or −1.",
    examples: [{ input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy reset", theory: "If total gas ≥ total cost an answer exists. Track a running tank; whenever it goes negative, no station in the failed stretch can be the start — restart from the next station.", code: ["public int canCompleteCircuit(int[] gas, int[] cost) {", "    int total = 0, tank = 0, start = 0;", "    for (int i = 0; i < gas.length; i++) {", "        int gain = gas[i] - cost[i];", "        total += gain;", "        tank += gain;", "        if (tank < 0) {          // can't reach i+1 from start", "            start = i + 1;", "            tank = 0;", "        }", "    }", "    return total >= 0 ? start : -1;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "One pass: run a tank, and whenever it drops negative restart from the next station; feasible iff total gas ≥ total cost. O(n)."
  },

  "jump-game": {
    statement: "Each element is your max jump length from that index. Starting at index 0, can you reach the last index?",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "true" }, { input: "nums = [3,2,1,0,4]", output: "false" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy farthest reach", theory: "Sweep left to right tracking the farthest index reachable. If the current index ever exceeds that reach, you're stuck; if reach covers the last index, you win.", code: ["public boolean canJump(int[] nums) {", "    int reach = 0;", "    for (int i = 0; i < nums.length; i++) {", "        if (i > reach) return false;", "        reach = Math.max(reach, i + nums[i]);", "    }", "    return true;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [3,2,1,0,4]", headers: ["i", "reach", "stuck?"], rows: [["0", "3", "no"], ["1", "3", "no"], ["2", "3", "no"], ["3", "3", "no"], ["4", "—", "4 > 3 → false"]] } }
    ],
    oneLiner: "Greedy: carry the farthest reachable index; fail if the pointer passes it. O(n), O(1)."
  },

  "jump-game-ii": {
    statement: "Same setup, but reaching the last index is guaranteed — return the minimum number of jumps.",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "2", explanation: "0 → 1 → 4." }],
    approaches: [
      { name: "Optimal", pattern: "Greedy BFS layers", theory: "Treat ranges reachable with j jumps as BFS levels. Track the current level's end and the farthest seen; when the index hits the level end, a jump is spent and the level extends to that farthest point.", code: ["public int jump(int[] nums) {", "    int jumps = 0, end = 0, farthest = 0;", "    for (int i = 0; i < nums.length - 1; i++) {", "        farthest = Math.max(farthest, i + nums[i]);", "        if (i == end) {          // level boundary", "            jumps++;", "            end = farthest;", "        }", "    }", "    return jumps;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Implicit BFS: expand a window per jump; each time you reach its end, take one jump to the farthest point found. O(n)."
  },

  "candy": {
    statement: "Children in a line have ratings; each gets ≥ 1 candy and any child rated higher than a neighbour must get more candy than that neighbour. Return the minimum total candies.",
    examples: [{ input: "ratings = [1,0,2]", output: "5", explanation: "Candies [2,1,2]." }],
    approaches: [
      { name: "Optimal", pattern: "Two greedy passes", theory: "Left pass: rising rating → one more than the left neighbour. Right pass: falling rating → at least one more than the right neighbour (take max with the left-pass value). Both constraints end satisfied minimally.", code: ["public int candy(int[] ratings) {", "    int n = ratings.length;", "    int[] c = new int[n];", "    Arrays.fill(c, 1);", "    for (int i = 1; i < n; i++)", "        if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;", "    for (int i = n - 2; i >= 0; i--)", "        if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);", "    int total = 0;", "    for (int x : c) total += x;", "    return total;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Two passes: satisfy left-neighbour rises, then right-neighbour rises with a max — minimal candies meeting both. O(n)."
  },

  "subarray-sum-equals-k": {
    statement: "Count the number of contiguous subarrays whose sum equals k (values may be negative).",
    examples: [{ input: "nums = [1,1,1], k = 2", output: "2" }],
    approaches: [
      { name: "Brute Force", pattern: "All subarrays", theory: "Accumulate every (i, j) range sum. O(n²).", code: ["// double loop accumulating sums"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "Prefix sum + HashMap", theory: "A subarray (i, j] sums to k when prefix[j] − prefix[i] = k. Walk once keeping counts of seen prefixes; at each j add count(prefix − k).", code: ["public int subarraySum(int[] nums, int k) {", "    Map<Integer,Integer> seen = new HashMap<>();", "    seen.put(0, 1);", "    int prefix = 0, count = 0;", "    for (int x : nums) {", "        prefix += x;", "        count += seen.getOrDefault(prefix - k, 0);", "        seen.merge(prefix, 1, Integer::sum);", "    }", "    return count;", "}"], time: "O(n)", space: "O(n)", dryRun: { title: "nums = [1,1,1], k = 2", headers: ["x", "prefix", "need = prefix−k", "count", "map"], rows: [["1", "1", "-1", "0", "{0:1,1:1}"], ["1", "2", "0", "1", "{0:1,1:1,2:1}"], ["1", "3", "1", "2", "{…,3:1}"]] } }
    ],
    oneLiner: "Running prefix sum with a hash map of prefix counts; each step adds how many earlier prefixes equal prefix − k. O(n)."
  },

  "continuous-subarray-sum": {
    statement: "Return true if the array has a subarray of length ≥ 2 whose sum is a multiple of k.",
    examples: [{ input: "nums = [23,2,4,6,7], k = 6", output: "true", explanation: "[2,4] sums to 6." }],
    approaches: [
      { name: "Optimal", pattern: "Prefix sum mod k + first index map", theory: "If two prefixes have the same remainder mod k, the elements between them sum to a multiple of k. Store the FIRST index of each remainder; a repeat at distance ≥ 2 wins.", code: ["public boolean checkSubarraySum(int[] nums, int k) {", "    Map<Integer,Integer> first = new HashMap<>();", "    first.put(0, -1);", "    int mod = 0;", "    for (int i = 0; i < nums.length; i++) {", "        mod = (mod + nums[i]) % k;", "        Integer prev = first.get(mod);", "        if (prev != null) {", "            if (i - prev >= 2) return true;", "        } else first.put(mod, i);", "    }", "    return false;", "}"], time: "O(n)", space: "O(k)" }
    ],
    oneLiner: "Equal prefix remainders mod k bracket a multiple-of-k subarray; remember first occurrence and require gap ≥ 2. O(n)."
  },

  "maximum-sum-circular-subarray": {
    statement: "Find the maximum subarray sum where the subarray may wrap around the circular array.",
    examples: [{ input: "nums = [5,-3,5]", output: "10", explanation: "Wrapping [5,5]." }],
    approaches: [
      { name: "Optimal", pattern: "Kadane max + Kadane min", theory: "The answer is either the normal Kadane max, or (total − minimum subarray) for the wrapped case. Edge case: if all numbers are negative, the min subarray is everything — return the plain max.", code: ["public int maxSubarraySumCircular(int[] nums) {", "    int total = 0;", "    int maxCur = 0, maxBest = Integer.MIN_VALUE;", "    int minCur = 0, minBest = Integer.MAX_VALUE;", "    for (int x : nums) {", "        total += x;", "        maxCur = Math.max(x, maxCur + x);", "        maxBest = Math.max(maxBest, maxCur);", "        minCur = Math.min(x, minCur + x);", "        minBest = Math.min(minBest, minCur);", "    }", "    return maxBest < 0 ? maxBest : Math.max(maxBest, total - minBest);", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Answer = max(Kadane max, total − Kadane min), unless everything is negative — then just the Kadane max. O(n)."
  },

  "trapping-rain-water": {
    statement: "Given an elevation map, compute how much rain water it can trap between the bars.",
    examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    approaches: [
      { name: "Better", pattern: "Prefix max arrays", theory: "Water above bar i is min(maxLeft[i], maxRight[i]) − h[i]. Precompute both arrays.", code: ["// build leftMax[] and rightMax[], then sum min(l,r) − h"], time: "O(n)", space: "O(n)" },
      { name: "Optimal", pattern: "Two Pointers", theory: "Move from both ends carrying leftMax and rightMax. The side with the smaller max is the binding constraint, so its water can be settled immediately and that pointer advances.", code: ["public int trap(int[] h) {", "    int l = 0, r = h.length - 1;", "    int leftMax = 0, rightMax = 0, water = 0;", "    while (l < r) {", "        if (h[l] < h[r]) {", "            leftMax = Math.max(leftMax, h[l]);", "            water += leftMax - h[l];", "            l++;", "        } else {", "            rightMax = Math.max(rightMax, h[r]);", "            water += rightMax - h[r];", "            r--;", "        }", "    }", "    return water;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "height = [0,1,0,2,1,0,...]", headers: ["l/r", "h", "boundMax", "water +="], rows: [["l=0", "0", "L=0", "0"], ["l=1", "1", "L=1", "0"], ["l=2", "0", "L=1", "1"], ["l=3", "2", "L=2", "0"], ["l=4", "1", "L=2", "1"], ["…", "…", "…", "total 6"]] } }
    ],
    oneLiner: "Two pointers with running left/right maxes; settle water on whichever side has the smaller bound and advance it. O(n), O(1).",
    similar: [["42", "Trapping Rain Water", "Two Pointers"], ["11", "Container With Most Water", "Two Pointers"], ["84", "Largest Rectangle", "Monotonic Stack"]]
  },

  "first-missing-positive": {
    statement: "Return the smallest positive integer missing from an unsorted array, in O(n) time and O(1) extra space.",
    examples: [{ input: "nums = [3,4,-1,1]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Cyclic placement (index as hash)", theory: "The answer is in [1, n+1]. Put every value v in its home slot nums[v−1] by swapping until settled; then the first index whose value isn't index+1 reveals the missing positive.", code: ["public int firstMissingPositive(int[] nums) {", "    int n = nums.length;", "    for (int i = 0; i < n; i++) {", "        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {", "            int t = nums[nums[i] - 1];", "            nums[nums[i] - 1] = nums[i];", "            nums[i] = t;", "        }", "    }", "    for (int i = 0; i < n; i++)", "        if (nums[i] != i + 1) return i + 1;", "    return n + 1;", "}"], time: "O(n)", space: "O(1)", dryRun: { title: "nums = [3,4,-1,1]", headers: ["step", "array"], rows: [["place 3 → idx2", "[-1,4,3,1]"], ["place 4 → idx3", "[-1,1,3,4]"], ["place 1 → idx0", "[1,-1,3,4]"], ["scan", "idx1 ≠ 2 → answer 2"]] } }
    ],
    oneLiner: "Swap every value v into slot v−1 (cycle sort), then scan for the first slot where nums[i] ≠ i+1. O(n), O(1)."
  },

  "median-of-two-sorted-arrays": {
    statement: "Given two sorted arrays, return the median of the combined data in O(log(min(m,n))).",
    examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }],
    approaches: [
      { name: "Better", pattern: "Merge halfway", theory: "Merge until the middle position(s). O(m+n) — fine, but not the asked bound.", code: ["// standard merge counting to (m+n)/2"], time: "O(m+n)", space: "O(1)" },
      { name: "Optimal", pattern: "Binary search the partition", theory: "Binary search a cut i in the smaller array (cut j = half − i in the other) so every left-side element ≤ every right-side element. The median comes from the border values.", code: ["public double findMedianSortedArrays(int[] a, int[] b) {", "    if (a.length > b.length) return findMedianSortedArrays(b, a);", "    int m = a.length, n = b.length;", "    int lo = 0, hi = m, half = (m + n + 1) / 2;", "    while (lo <= hi) {", "        int i = (lo + hi) / 2, j = half - i;", "        int aL = i == 0 ? Integer.MIN_VALUE : a[i - 1];", "        int aR = i == m ? Integer.MAX_VALUE : a[i];", "        int bL = j == 0 ? Integer.MIN_VALUE : b[j - 1];", "        int bR = j == n ? Integer.MAX_VALUE : b[j];", "        if (aL <= bR && bL <= aR) {", "            if (((m + n) & 1) == 1) return Math.max(aL, bL);", "            return (Math.max(aL, bL) + Math.min(aR, bR)) / 2.0;", "        }", "        if (aL > bR) hi = i - 1;", "        else lo = i + 1;", "    }", "    throw new IllegalArgumentException();", "}"], time: "O(log min(m,n))", space: "O(1)" }
    ],
    oneLiner: "Binary-search the partition of the smaller array so both left halves ≤ both right halves; the median sits at the border. O(log min(m,n))."
  },

  "sliding-window-maximum": {
    statement: "Return the maximum of every window of size k as it slides across the array.",
    examples: [{ input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }],
    approaches: [
      { name: "Brute Force", pattern: "Scan each window", theory: "Max of each window separately — O(n·k).", code: ["// nested loop over each window"], time: "O(n·k)", space: "O(1)" },
      { name: "Optimal", pattern: "Monotonic deque", theory: "Keep a deque of indices whose values are decreasing. Pop smaller values from the back before adding the new index, drop the front when it leaves the window — the front is always the window max.", code: ["public int[] maxSlidingWindow(int[] nums, int k) {", "    Deque<Integer> dq = new ArrayDeque<>();   // indices, values decreasing", "    int n = nums.length;", "    int[] res = new int[n - k + 1];", "    for (int i = 0; i < n; i++) {", "        if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();", "        while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();", "        dq.offerLast(i);", "        if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()];", "    }", "    return res;", "}"], time: "O(n)", space: "O(k)", dryRun: { title: "nums = [1,3,-1,-3,5], k = 3", headers: ["i", "deque (values)", "emit"], rows: [["0", "[1]", "—"], ["1", "[3] (1 popped)", "—"], ["2", "[3,-1]", "3"], ["3", "[3,-1,-3]", "3"], ["4", "[5] (all popped)", "5"]] } }
    ],
    oneLiner: "Monotonic decreasing deque of indices: pop smaller tails, drop expired fronts, and the front is each window's max. O(n)."
  },

  "count-of-smaller-numbers-after-self": {
    statement: "For each element, count how many elements to its right are smaller. Return the counts array.",
    examples: [{ input: "nums = [5,2,6,1]", output: "[2,1,1,0]" }],
    approaches: [
      { name: "Brute Force", pattern: "Nested loop", theory: "For each i count smaller values to the right. O(n²).", code: ["// double loop counting"], time: "O(n²)", space: "O(1)" },
      { name: "Optimal", pattern: "Merge sort with counting", theory: "Merge-sort index pairs; when an element from the right half is placed before one from the left half during merge, every remaining left element gains one 'smaller after self'. Accumulate those jumps.", code: ["public List<Integer> countSmaller(int[] nums) {", "    int n = nums.length;", "    int[] counts = new int[n];", "    int[] idx = new int[n];", "    for (int i = 0; i < n; i++) idx[i] = i;", "    sort(nums, idx, counts, 0, n - 1, new int[n]);", "    List<Integer> res = new ArrayList<>();", "    for (int c : counts) res.add(c);", "    return res;", "}", "private void sort(int[] a, int[] idx, int[] cnt, int lo, int hi, int[] tmp) {", "    if (lo >= hi) return;", "    int mid = (lo + hi) / 2;", "    sort(a, idx, cnt, lo, mid, tmp);", "    sort(a, idx, cnt, mid + 1, hi, tmp);", "    int i = lo, j = mid + 1, k = lo, moved = 0;", "    while (i <= mid || j <= hi) {", "        if (j > hi || (i <= mid && a[idx[i]] <= a[idx[j]])) {", "            cnt[idx[i]] += moved;      // right-half smaller ones jumped past", "            tmp[k++] = idx[i++];", "        } else {", "            moved++;", "            tmp[k++] = idx[j++];", "        }", "    }", "    System.arraycopy(tmp, lo, idx, lo, hi - lo + 1);", "}"], time: "O(n log n)", space: "O(n)" }
    ],
    oneLiner: "Merge sort on indices, crediting each left element with the number of right-half elements that merged before it. O(n log n)."
  },

  "reverse-pairs": {
    statement: "Count pairs (i, j) with i < j and nums[i] > 2 × nums[j].",
    examples: [{ input: "nums = [1,3,2,3,1]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Merge sort with two-pointer count", theory: "During merge sort, before merging two sorted halves, sweep a pointer over the right half counting for each left element how many right elements satisfy left > 2·right — the pointer never moves backwards, keeping the count linear per level.", code: ["public int reversePairs(int[] nums) {", "    return sort(nums, 0, nums.length - 1);", "}", "private int sort(int[] a, int lo, int hi) {", "    if (lo >= hi) return 0;", "    int mid = (lo + hi) / 2;", "    int count = sort(a, lo, mid) + sort(a, mid + 1, hi);", "    int j = mid + 1;", "    for (int i = lo; i <= mid; i++) {", "        while (j <= hi && (long) a[i] > 2L * a[j]) j++;", "        count += j - (mid + 1);", "    }", "    // standard merge of a[lo..mid] and a[mid+1..hi]", "    int[] tmp = new int[hi - lo + 1];", "    int i = lo, k = 0, r = mid + 1;", "    while (i <= mid || r <= hi)", "        tmp[k++] = (r > hi || (i <= mid && a[i] <= a[r])) ? a[i++] : a[r++];", "    System.arraycopy(tmp, 0, a, lo, tmp.length);", "    return count;", "}"], time: "O(n log n)", space: "O(n)" }
    ],
    oneLiner: "Merge sort; before each merge, count cross pairs with a monotonic pointer testing left > 2·right (use long). O(n log n)."
  }
};
