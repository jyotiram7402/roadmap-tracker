// data/dsa/details-binary-search.js — worked solutions for the Binary Search phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "binary-search": {
    statement: "Given a sorted array and a target, return the target's index or −1. Must run in O(log n).",
    examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
    approaches: [
      { name: "Optimal", pattern: "Binary Search", theory: "Compare the target with the middle element; discard the half that cannot contain it and repeat until found or the range is empty.", code: ["public int search(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] == target) return mid;", "        if (nums[mid] < target) lo = mid + 1;", "        else hi = mid - 1;", "    }", "    return -1;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Halve the sorted search range each step by comparing with the middle. O(log n)."
  },
  "guess-number-higher-or-lower": {
    statement: "A number is picked in [1, n]. Using an API guess(x) that returns −1/0/1, find it.",
    approaches: [
      { name: "Optimal", pattern: "Binary Search on answer", theory: "Binary search over [1, n], letting guess() tell you which half to keep.", code: ["public int guessNumber(int n) {", "    int lo = 1, hi = n;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        int r = guess(mid);", "        if (r == 0) return mid;", "        if (r < 0) hi = mid - 1;   // pick is lower", "        else lo = mid + 1;", "    }", "    return -1;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search over 1..n driven by the guess() feedback. O(log n)."
  },
  "first-bad-version": {
    statement: "Versions 1..n; after some version all are bad. Using isBadVersion(v), find the first bad one with the fewest calls.",
    approaches: [
      { name: "Optimal", pattern: "Binary Search (lower bound)", theory: "Search for the boundary: if mid is bad, the answer is mid or earlier (hi = mid); else it's after (lo = mid + 1).", code: ["public int firstBadVersion(int n) {", "    int lo = 1, hi = n;", "    while (lo < hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (isBadVersion(mid)) hi = mid;", "        else lo = mid + 1;", "    }", "    return lo;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search for the first true in a false…true sequence. O(log n)."
  },
  "search-insert-position": {
    statement: "In a sorted array of distinct integers, return the target's index, or the index where it would be inserted to keep order.",
    examples: [{ input: "nums = [1,3,5,6], target = 2", output: "1" }],
    approaches: [
      { name: "Optimal", pattern: "Binary Search (lower bound)", theory: "Standard binary search; if not found, lo ends on the first index with a value ≥ target — the insert position.", code: ["public int searchInsert(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] == target) return mid;", "        if (nums[mid] < target) lo = mid + 1;", "        else hi = mid - 1;", "    }", "    return lo;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search; on a miss, lo is the first element ≥ target = the insert index. O(log n)."
  },
  "search-in-rotated-sorted-array": {
    statement: "A sorted array was rotated at an unknown pivot. Search for a target in O(log n); return its index or −1.",
    examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }],
    approaches: [
      { name: "Optimal", pattern: "Modified binary search", theory: "At each mid one half is always properly sorted. Identify it, check whether the target lies inside that sorted half, and discard the other half.", code: ["public int search(int[] nums, int target) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo <= hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] == target) return mid;", "        if (nums[lo] <= nums[mid]) {                 // left sorted", "            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;", "            else lo = mid + 1;", "        } else {                                      // right sorted", "            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;", "            else hi = mid - 1;", "        }", "    }", "    return -1;", "}"], time: "O(log n)", space: "O(1)", dryRun: { title: "nums = [4,5,6,7,0,1,2], target = 0", headers: ["lo", "hi", "mid", "sorted half", "action"], rows: [["0", "6", "3 (7)", "left [4..7]", "0 ∉ [4,7) → lo=4"], ["4", "6", "5 (1)", "right [1..2]", "0 ∉ (1,2] → hi=4"], ["4", "4", "4 (0)", "—", "found → 4"]] } }
    ],
    oneLiner: "Binary search where each step keeps the sorted half only if the target falls inside it. O(log n).",
    similar: [["33", "Search Rotated", "Modified BS"], ["153", "Min in Rotated", "BS"], ["81", "Search Rotated II", "BS + dup skip"]]
  },
  "find-peak-element": {
    statement: "Return the index of any peak (strictly greater than its neighbours) in O(log n); nums[-1] and nums[n] are −∞.",
    examples: [{ input: "nums = [1,2,3,1]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Binary search on slope", theory: "If nums[mid] < nums[mid+1] the slope rises right, so a peak exists on the right; otherwise a peak is at mid or left.", code: ["public int findPeakElement(int[] nums) {", "    int lo = 0, hi = nums.length - 1;", "    while (lo < hi) {", "        int mid = lo + (hi - lo) / 2;", "        if (nums[mid] < nums[mid + 1]) lo = mid + 1;", "        else hi = mid;", "    }", "    return lo;", "}"], time: "O(log n)", space: "O(1)" }
    ],
    oneLiner: "Binary search following the rising slope toward a peak. O(log n)."
  },
  "koko-eating-bananas": {
    statement: "Koko eats at speed k bananas/hour from piles; each hour she finishes one pile (or eats k from it). Find the minimum k to finish all piles within h hours.",
    examples: [{ input: "piles = [3,6,7,11], h = 8", output: "4" }],
    approaches: [
      { name: "Optimal", pattern: "Binary search on the answer", theory: "Feasibility is monotonic: a higher speed always finishes in time. Binary search k in [1, max pile]; for each candidate compute hours as the sum of ceil(pile/k) and keep the smallest feasible k.", code: ["public int minEatingSpeed(int[] piles, int h) {", "    int lo = 1, hi = 0;", "    for (int p : piles) hi = Math.max(hi, p);", "    while (lo < hi) {", "        int k = lo + (hi - lo) / 2;", "        long hours = 0;", "        for (int p : piles) hours += (p + k - 1) / k;   // ceil", "        if (hours <= h) hi = k;                          // feasible, try smaller", "        else lo = k + 1;", "    }", "    return lo;", "}"], time: "O(n log maxPile)", space: "O(1)", dryRun: { title: "piles = [3,6,7,11], h = 8", headers: ["k", "hours = Σ ceil(p/k)", "≤ 8?"], rows: [["6", "1+1+2+2 = 6", "yes → hi=6"], ["3", "1+2+3+4 = 10", "no → lo=4"], ["5", "1+2+2+3 = 8", "yes → hi=5"], ["4", "1+2+2+3 = 8", "yes → answer 4"]] } }
    ],
    oneLiner: "Binary search the eating speed; feasibility (total hours ≤ h) is monotonic in speed. O(n log maxPile).",
    similar: [["875", "Koko Bananas", "BS on answer"], ["1011", "Ship Packages", "BS on answer"], ["410", "Split Array", "BS on answer"]]
  },
  "capacity-to-ship-packages-within-d-days": {
    statement: "Ship packages (in order) with a fixed daily capacity; find the least capacity that delivers everything within D days.",
    approaches: [
      { name: "Optimal", pattern: "Binary search on capacity", theory: "Capacity feasibility is monotonic. Search capacity in [max weight, total weight]; greedily count days needed for a candidate and keep the smallest feasible.", code: ["public int shipWithinDays(int[] w, int days) {", "    int lo = 0, hi = 0;", "    for (int x : w) { lo = Math.max(lo, x); hi += x; }", "    while (lo < hi) {", "        int cap = lo + (hi - lo) / 2;", "        int d = 1, load = 0;", "        for (int x : w) {", "            if (load + x > cap) { d++; load = 0; }", "            load += x;", "        }", "        if (d <= days) hi = cap;", "        else lo = cap + 1;", "    }", "    return lo;", "}"], time: "O(n log(sum))", space: "O(1)" }
    ],
    oneLiner: "Binary search capacity in [maxWeight, totalWeight]; greedily count days for each candidate. O(n log sum)."
  },
  "time-based-key-value-store": {
    statement: "Design a store with set(key, value, timestamp) and get(key, t) returning the value with the largest timestamp ≤ t.",
    approaches: [
      { name: "Optimal", pattern: "HashMap + binary search on timestamps", theory: "Store each key's (timestamp, value) entries in insertion (increasing timestamp) order; get() binary-searches for the largest timestamp ≤ t.", code: ["Map<String, List<int[]>> map = new HashMap<>();  // key -> [ts, valueId]", "Map<Integer,String> vals = new HashMap<>();", "int id = 0;", "public void set(String key, String value, int ts) {", "    map.computeIfAbsent(key, k -> new ArrayList<>()).add(new int[]{ts, id});", "    vals.put(id++, value);", "}", "public String get(String key, int t) {", "    List<int[]> list = map.get(key);", "    if (list == null) return \"\";", "    int lo = 0, hi = list.size() - 1, ans = -1;", "    while (lo <= hi) {", "        int mid = (lo + hi) >>> 1;", "        if (list.get(mid)[0] <= t) { ans = list.get(mid)[1]; lo = mid + 1; }", "        else hi = mid - 1;", "    }", "    return ans == -1 ? \"\" : vals.get(ans);", "}"], time: "set O(1), get O(log n)", space: "O(n)" }
    ],
    oneLiner: "Per-key timestamp-sorted list; get() binary-searches for the largest timestamp ≤ t. O(log n) get."
  },
  "median-of-two-sorted-arrays": {
    statement: "Given two sorted arrays, return the median of the combined data in O(log(min(m,n))).",
    examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }],
    approaches: [
      { name: "Better", pattern: "Merge to the middle", theory: "Merge until the middle index. O(m+n) — correct but not the target bound.", code: ["// two-pointer merge, stopping at (m+n)/2"], time: "O(m+n)", space: "O(1)" },
      { name: "Optimal", pattern: "Binary search the partition", theory: "Binary-search a cut i in the smaller array (cut j = half − i in the other) so every element left of the cuts ≤ every element right. The median sits at that border.", code: ["public double findMedianSortedArrays(int[] a, int[] b) {", "    if (a.length > b.length) return findMedianSortedArrays(b, a);", "    int m = a.length, n = b.length, lo = 0, hi = m, half = (m + n + 1) / 2;", "    while (lo <= hi) {", "        int i = (lo + hi) / 2, j = half - i;", "        int aL = i == 0 ? Integer.MIN_VALUE : a[i - 1];", "        int aR = i == m ? Integer.MAX_VALUE : a[i];", "        int bL = j == 0 ? Integer.MIN_VALUE : b[j - 1];", "        int bR = j == n ? Integer.MAX_VALUE : b[j];", "        if (aL <= bR && bL <= aR) {", "            if (((m + n) & 1) == 1) return Math.max(aL, bL);", "            return (Math.max(aL, bL) + Math.min(aR, bR)) / 2.0;", "        }", "        if (aL > bR) hi = i - 1; else lo = i + 1;", "    }", "    throw new IllegalArgumentException();", "}"], time: "O(log min(m,n))", space: "O(1)" }
    ],
    oneLiner: "Binary-search the partition of the smaller array so both left halves ≤ both right halves; the median is at the border. O(log min(m,n)).",
    similar: [["4", "Median of Two Sorted Arrays", "Partition BS"], ["215", "Kth Largest", "Heap/Quickselect"]]
  },
  "split-array-largest-sum": {
    statement: "Split an array into k contiguous subarrays to minimize the largest subarray sum. Return that minimized value.",
    approaches: [
      { name: "Optimal", pattern: "Binary search on the answer", theory: "The answer lies in [max element, total sum] and feasibility (can we split into ≤ k parts each ≤ cap) is monotonic. Binary-search the cap, greedily counting parts.", code: ["public int splitArray(int[] nums, int k) {", "    int lo = 0, hi = 0;", "    for (int x : nums) { lo = Math.max(lo, x); hi += x; }", "    while (lo < hi) {", "        int cap = lo + (hi - lo) / 2;", "        int parts = 1, sum = 0;", "        for (int x : nums) {", "            if (sum + x > cap) { parts++; sum = 0; }", "            sum += x;", "        }", "        if (parts <= k) hi = cap;", "        else lo = cap + 1;", "    }", "    return lo;", "}"], time: "O(n log(sum))", space: "O(1)" }
    ],
    oneLiner: "Binary search the max-subarray-sum cap in [max, total]; greedily count parts for feasibility. O(n log sum)."
  }
};
