// data/dsa/details-intervals.js — worked solutions for the Intervals phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "merge-intervals": {
    statement: "Given a list of intervals, merge all overlapping ones and return the non-overlapping result.",
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    approaches: [
      { name: "Optimal", pattern: "Sort by start + sweep", theory: "Sort by start. Keep a current merged interval: if the next start is within the current end, extend the end; otherwise emit the current and start fresh.", code: ["public int[][] merge(int[][] intervals) {", "    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);", "    List<int[]> res = new ArrayList<>();", "    int[] cur = intervals[0];", "    for (int[] iv : intervals) {", "        if (iv[0] <= cur[1]) cur[1] = Math.max(cur[1], iv[1]);   // overlap → extend", "        else { res.add(cur); cur = iv; }", "    }", "    res.add(cur);", "    return res.toArray(new int[0][]);", "}"], time: "O(n log n)", space: "O(n)", dryRun: { title: "[[1,3],[2,6],[8,10],[15,18]]", headers: ["interval", "cur before", "overlap?", "cur after / emitted"], rows: [["[2,6]", "[1,3]", "2 ≤ 3 yes", "cur=[1,6]"], ["[8,10]", "[1,6]", "8 > 6 no", "emit [1,6]; cur=[8,10]"], ["[15,18]", "[8,10]", "no", "emit [8,10]; cur=[15,18]"]] } }
    ],
    oneLiner: "Sort by start, sweep once extending the current interval while starts fall inside it, emitting on a gap. O(n log n).",
    similar: [["56", "Merge Intervals", "Sweep"], ["57", "Insert Interval", "Sweep"], ["435", "Non-overlapping Intervals", "Greedy"]]
  },
  "insert-interval": {
    statement: "Insert a new interval into a sorted, non-overlapping list and merge as needed.",
    examples: [{ input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }],
    approaches: [
      { name: "Optimal", pattern: "Three segments", theory: "Emit intervals ending before the new one; merge everything overlapping into the new interval; emit the rest — all in one linear pass.", code: ["public int[][] insert(int[][] intervals, int[] ni) {", "    List<int[]> res = new ArrayList<>();", "    int i = 0, n = intervals.length;", "    while (i < n && intervals[i][1] < ni[0]) res.add(intervals[i++]);       // before", "    while (i < n && intervals[i][0] <= ni[1]) {                            // overlap", "        ni[0] = Math.min(ni[0], intervals[i][0]);", "        ni[1] = Math.max(ni[1], intervals[i][1]);", "        i++;", "    }", "    res.add(ni);", "    while (i < n) res.add(intervals[i++]);                                 // after", "    return res.toArray(new int[0][]);", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Copy intervals before, absorb every overlapping one into the new interval, then copy the rest. O(n)."
  },
  "non-overlapping-intervals": {
    statement: "Return the minimum number of intervals to remove so the rest are non-overlapping.",
    examples: [{ input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3]." }],
    approaches: [
      { name: "Optimal", pattern: "Greedy by earliest end", theory: "Sort by end time and greedily keep intervals that start at or after the last kept end (they finish soonest, leaving the most room). Every skipped overlap counts as one removal.", code: ["public int eraseOverlapIntervals(int[][] intervals) {", "    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);", "    int end = Integer.MIN_VALUE, keep = 0;", "    for (int[] iv : intervals) {", "        if (iv[0] >= end) { end = iv[1]; keep++; }   // non-overlapping, keep", "    }", "    return intervals.length - keep;", "}"], time: "O(n log n)", space: "O(1)" }
    ],
    oneLiner: "Sort by end, greedily keep earliest-finishing compatible intervals; removals = total − kept. O(n log n)."
  },
  "meeting-rooms-ii": {
    statement: "Given meeting time intervals, return the minimum number of conference rooms required.",
    examples: [{ input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Min-heap of end times", theory: "Sort by start. Keep a min-heap of the end times of ongoing meetings. For each meeting, if the earliest end ≤ its start, that room frees up (pop); otherwise a new room is needed. Push the current end. Heap size peaks at the answer.", code: ["public int minMeetingRooms(int[][] intervals) {", "    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);", "    PriorityQueue<Integer> ends = new PriorityQueue<>();", "    for (int[] iv : intervals) {", "        if (!ends.isEmpty() && ends.peek() <= iv[0]) ends.poll();  // reuse a room", "        ends.offer(iv[1]);", "    }", "    return ends.size();", "}"], time: "O(n log n)", space: "O(n)", dryRun: { title: "[[0,30],[5,10],[15,20]]", headers: ["meeting", "earliest end", "reuse?", "heap (ends)"], rows: [["[0,30]", "—", "—", "[30]"], ["[5,10]", "30", "no (30>5)", "[10,30]"], ["[15,20]", "10", "yes (10≤15)", "[20,30]"]] } }
    ],
    oneLiner: "Sort by start; a min-heap of end times reuses a room when the earliest end ≤ current start — peak heap size is the answer. O(n log n).",
    similar: [["253", "Meeting Rooms II", "Heap"], ["252", "Meeting Rooms", "Sort"], ["56", "Merge Intervals", "Sweep"]]
  },
  "employee-free-time": {
    statement: "Given each employee's list of busy intervals, return the intervals of free time common to all employees.",
    approaches: [
      { name: "Optimal", pattern: "Flatten + sort + merge, gaps are free", theory: "Collect every busy interval, sort by start, and sweep merging overlaps as in Merge Intervals. Whenever the next interval starts after the running max end, that gap is common free time.", code: ["public List<int[]> employeeFreeTime(List<List<int[]>> schedule) {", "    List<int[]> all = new ArrayList<>();", "    for (var emp : schedule) all.addAll(emp);", "    all.sort((a, b) -> a[0] - b[0]);", "    List<int[]> free = new ArrayList<>();", "    int end = all.get(0)[1];", "    for (int[] iv : all) {", "        if (iv[0] > end) free.add(new int[]{end, iv[0]});   // gap = free", "        end = Math.max(end, iv[1]);", "    }", "    return free;", "}"], time: "O(n log n)", space: "O(n)" }
    ],
    oneLiner: "Merge all busy intervals across employees; the gaps between merged blocks are the common free time. O(n log n)."
  }
};
