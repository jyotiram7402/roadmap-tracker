// data/dsa/details-heap.js — worked solutions for the Heap / Priority Queue phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "k-closest-points-to-origin": {
    statement: "Given an array of points on a plane and an integer k, return the k points closest to the origin (0, 0) by Euclidean distance. The answer may be in any order.",
    examples: [{ input: "points = [[1,3],[-2,2]], k = 1", output: "[[-2,2]]", explanation: "Distance^2: 10 vs 8, so [-2,2] is closer." }],
    approaches: [
      { name: "Optimal", pattern: "Max-heap of size k", theory: "Keep a max-heap ordered by squared distance (no need for sqrt — it preserves ordering). Push each point; whenever the heap exceeds size k, pop the farthest. The k points that remain are the closest.", code: ["public int[][] kClosest(int[][] points, int k) {", "    PriorityQueue<int[]> heap = new PriorityQueue<>(", "        (a, b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));", "    for (int[] p : points) {", "        heap.offer(p);", "        if (heap.size() > k) heap.poll();", "    }", "    int[][] res = new int[k][2];", "    for (int i = 0; i < k; i++) res[i] = heap.poll();", "    return res;", "}"], time: "O(n log k)", space: "O(k)" }
    ],
    oneLiner: "Max-heap of size k keyed by squared distance; evict the farthest whenever size exceeds k. O(n log k)."
  },
  "last-stone-weight": {
    statement: "Repeatedly smash the two heaviest stones; if unequal, the difference returns to the pile. Return the weight of the last remaining stone (or 0).",
    approaches: [
      { name: "Optimal", pattern: "Max-heap", theory: "A max-heap gives the two heaviest in O(log n); push back their difference when they differ. Repeat until ≤ 1 remains.", code: ["public int lastStoneWeight(int[] stones) {", "    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());", "    for (int s : stones) pq.add(s);", "    while (pq.size() > 1) {", "        int a = pq.poll(), b = pq.poll();", "        if (a != b) pq.add(a - b);", "    }", "    return pq.isEmpty() ? 0 : pq.peek();", "}"], time: "O(n log n)", space: "O(n)" }
    ],
    oneLiner: "Max-heap: pop the two heaviest, push back their difference, until one/none remains. O(n log n)."
  },
  "kth-largest-element-in-an-array": {
    statement: "Return the kth largest element of an unsorted array (not the kth distinct).",
    examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
    approaches: [
      { name: "Brute Force", pattern: "Sort", theory: "Sort ascending and take index n − k.", code: ["// Arrays.sort(nums); return nums[nums.length - k];"], time: "O(n log n)", space: "O(1)" },
      { name: "Optimal", pattern: "Min-heap of size k", theory: "Keep a min-heap of the k largest seen; push each value and pop when the size exceeds k. The root is the kth largest.", code: ["public int findKthLargest(int[] nums, int k) {", "    PriorityQueue<Integer> heap = new PriorityQueue<>();", "    for (int x : nums) {", "        heap.offer(x);", "        if (heap.size() > k) heap.poll();", "    }", "    return heap.peek();", "}"], time: "O(n log k)", space: "O(k)", dryRun: { title: "nums = [3,2,1,5,6,4], k = 2", headers: ["x", "heap (min at front)"], rows: [["3", "[3]"], ["2", "[2,3]"], ["1", "[2,3] (1 popped)"], ["5", "[3,5]"], ["6", "[5,6]"], ["4", "[5,6] → answer 5"]] } }
    ],
    oneLiner: "Min-heap capped at k; after pushing all values its root is the kth largest. O(n log k). (Quickselect: O(n) average.)",
    similar: [["215", "Kth Largest", "Heap/Quickselect"], ["347", "Top K Frequent", "Heap/Bucket"], ["703", "Kth Largest Stream", "Heap"]]
  },
  "top-k-frequent-elements": {
    statement: "Return the k most frequent elements of the array (any order).",
    examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
    approaches: [
      { name: "Better", pattern: "Count + min-heap", theory: "Count frequencies, then keep a size-k min-heap ordered by frequency.", code: ["// HashMap counts + PriorityQueue<int[]{val,freq}> of size k by freq"], time: "O(n log k)", space: "O(n)" },
      { name: "Optimal", pattern: "Bucket sort by frequency", theory: "A value's frequency is at most n, so drop values into buckets indexed by frequency and read from the highest bucket down until k are collected.", code: ["public int[] topKFrequent(int[] nums, int k) {", "    Map<Integer,Integer> count = new HashMap<>();", "    for (int x : nums) count.merge(x, 1, Integer::sum);", "    List<Integer>[] bucket = new List[nums.length + 1];", "    for (var e : count.entrySet()) {", "        int f = e.getValue();", "        if (bucket[f] == null) bucket[f] = new ArrayList<>();", "        bucket[f].add(e.getKey());", "    }", "    int[] res = new int[k]; int idx = 0;", "    for (int f = nums.length; f >= 1 && idx < k; f--)", "        if (bucket[f] != null) for (int v : bucket[f]) { res[idx++] = v; if (idx == k) break; }", "    return res;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Count, bucket values by frequency (≤ n), read buckets top-down until k collected. O(n).",
    similar: [["347", "Top K Frequent", "Bucket/Heap"], ["692", "Top K Words", "Heap"], ["215", "Kth Largest", "Heap"]]
  },
  "merge-k-sorted-lists": {
    statement: "Merge k sorted linked lists into one sorted list.",
    examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
    approaches: [
      { name: "Optimal", pattern: "Min-heap of heads", theory: "Push the head of each list into a min-heap. Repeatedly pop the smallest, append it to the result, and push that node's next. The heap always holds one node per active list.", code: ["public ListNode mergeKLists(ListNode[] lists) {", "    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);", "    for (ListNode l : lists) if (l != null) pq.add(l);", "    ListNode dummy = new ListNode(0), tail = dummy;", "    while (!pq.isEmpty()) {", "        ListNode n = pq.poll();", "        tail.next = n; tail = n;", "        if (n.next != null) pq.add(n.next);", "    }", "    return dummy.next;", "}"], time: "O(N log k)", space: "O(k)", dryRun: { title: "heads 1,1,2", headers: ["heap (vals)", "pop", "push next", "result tail"], rows: [["[1,1,2]", "1", "4", "1"], ["[1,2,4]", "1", "3", "1,1"], ["[2,3,4]", "2", "6", "1,1,2"], ["…", "…", "…", "→ sorted"]] } }
    ],
    oneLiner: "Min-heap of the k list heads; pop smallest, append, push its next — one node per list at a time. O(N log k).",
    similar: [["23", "Merge k Lists", "Heap"], ["21", "Merge Two Lists", "Two pointers"], ["378", "Kth Smallest in Matrix", "Heap"]]
  },
  "task-scheduler": {
    statement: "Given CPU tasks (letters) and a cooldown n between two identical tasks, return the minimum number of intervals (including idles) to finish all tasks.",
    approaches: [
      { name: "Optimal", pattern: "Greedy math on the most frequent", theory: "The most frequent task dictates a skeleton of (maxFreq − 1) blocks of size (n + 1), plus the number of tasks tied at maxFreq. The answer is max(total tasks, that skeleton size).", code: ["public int leastInterval(char[] tasks, int n) {", "    int[] freq = new int[26];", "    for (char c : tasks) freq[c - 'A']++;", "    int max = 0, maxCount = 0;", "    for (int f : freq) if (f > max) { max = f; maxCount = 1; } else if (f == max) maxCount++;", "    int slots = (max - 1) * (n + 1) + maxCount;", "    return Math.max(tasks.length, slots);", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Frame the schedule around the most frequent task: max(totalTasks, (maxFreq−1)(n+1) + #ties). O(n)."
  },
  "find-median-from-data-stream": {
    statement: "Design a structure that supports adding numbers and querying the running median.",
    examples: [{ input: "add 1, add 2, median, add 3, median", output: "1.5, then 2" }],
    approaches: [
      { name: "Optimal", pattern: "Two heaps (max-heap lo, min-heap hi)", theory: "Keep the lower half in a max-heap and the upper half in a min-heap, balanced so their sizes differ by ≤ 1. The median is the max-heap top (odd total) or the average of both tops (even).", code: ["PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder()); // max-heap", "PriorityQueue<Integer> hi = new PriorityQueue<>();                          // min-heap", "public void addNum(int num) {", "    lo.offer(num);", "    hi.offer(lo.poll());              // pass the largest of lo up", "    if (hi.size() > lo.size()) lo.offer(hi.poll());  // rebalance", "}", "public double findMedian() {", "    return lo.size() > hi.size() ? lo.peek() : (lo.peek() + hi.peek()) / 2.0;", "}"], time: "add O(log n), median O(1)", space: "O(n)", dryRun: { title: "add 1, 2, 3", headers: ["op", "lo (max)", "hi (min)", "median"], rows: [["add 1", "[1]", "[]", "1"], ["add 2", "[1]", "[2]", "1.5"], ["add 3", "[2,1]", "[3]", "2"]] } }
    ],
    oneLiner: "Balance a max-heap (lower half) and min-heap (upper half); the median is their top(s). Add O(log n), query O(1).",
    similar: [["295", "Median from Stream", "Two heaps"], ["480", "Sliding Window Median", "Two heaps"], ["703", "Kth Largest Stream", "Heap"]]
  },
  "sliding-window-median": {
    statement: "Return the median of every window of size k as it slides across the array.",
    approaches: [
      { name: "Optimal", pattern: "Two balanced heaps with lazy removal", theory: "Maintain the two-heap median structure over the window; when the window slides, add the new element and mark the outgoing one for removal, pruning tops lazily and rebalancing by count.", code: ["// Two heaps (max-heap lo, min-heap hi) + a delayed-removal HashMap<Integer,Integer>.", "// On each slide: add nums[i], schedule removal of nums[i-k], prune heap tops that are", "// scheduled, and rebalance sizes; median = tops as in Find Median from Data Stream.", "// (TreeMap-based multiset is a cleaner alternative.)"], time: "O(n log k)", space: "O(k)" }
    ],
    oneLiner: "The two-heap median approach plus lazy deletion of the element leaving the window. O(n log k)."
  }
};
