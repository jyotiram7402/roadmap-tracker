// data/dsa/details-greedy.js — worked solutions for the Greedy phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "assign-cookies": {
    statement: "Each child i has a greed factor g[i]; each cookie j has size s[j]. A child is content if given a cookie with size ≥ their greed. Maximize the number of content children.",
    approaches: [
      { name: "Optimal", pattern: "Sort + two pointers (greedy)", theory: "Sort children and cookies. Walk both; give the smallest sufficient cookie to the least greedy child, advancing the cookie pointer always and the child pointer only on a match.", code: ["public int findContentChildren(int[] g, int[] s) {", "    Arrays.sort(g); Arrays.sort(s);", "    int child = 0, cookie = 0;", "    while (child < g.length && cookie < s.length) {", "        if (s[cookie] >= g[child]) child++;   // content", "        cookie++;", "    }", "    return child;", "}"], time: "O(n log n)", space: "O(1)" }
    ],
    oneLiner: "Sort both; give each child the smallest cookie that satisfies them. O(n log n)."
  },
  "jump-game": {
    statement: "Each element is your maximum jump length from that index. Starting at index 0, can you reach the last index?",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "true" }, { input: "nums = [3,2,1,0,4]", output: "false" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy farthest reach", theory: "Sweep tracking the farthest reachable index. If the current index ever exceeds that reach you're stuck; if reach covers the last index you win.", code: ["public boolean canJump(int[] nums) {", "    int reach = 0;", "    for (int i = 0; i < nums.length; i++) {", "        if (i > reach) return false;", "        reach = Math.max(reach, i + nums[i]);", "    }", "    return true;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Greedy: carry the farthest reachable index; fail if the pointer passes it. O(n)."
  },
  "jump-game-ii": {
    statement: "Reaching the last index is guaranteed — return the minimum number of jumps.",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy BFS layers", theory: "Treat indices reachable with j jumps as BFS levels. Track the current level's end and the farthest seen; each time the index hits the level end, spend a jump and extend to farthest.", code: ["public int jump(int[] nums) {", "    int jumps = 0, end = 0, farthest = 0;", "    for (int i = 0; i < nums.length - 1; i++) {", "        farthest = Math.max(farthest, i + nums[i]);", "        if (i == end) { jumps++; end = farthest; }", "    }", "    return jumps;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Implicit BFS: expand a window per jump; on reaching its end, jump to the farthest reachable. O(n)."
  },
  "gas-station": {
    statement: "Around a circular route, gas[i] is available at station i and cost[i] is needed to reach the next. Return the unique start that completes the loop, or −1.",
    examples: [{ input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy reset", theory: "An answer exists iff total gas ≥ total cost. Track a running tank; whenever it goes negative, no station in the failed stretch can start the loop, so restart from the next station.", code: ["public int canCompleteCircuit(int[] gas, int[] cost) {", "    int total = 0, tank = 0, start = 0;", "    for (int i = 0; i < gas.length; i++) {", "        int gain = gas[i] - cost[i];", "        total += gain; tank += gain;", "        if (tank < 0) { start = i + 1; tank = 0; }", "    }", "    return total >= 0 ? start : -1;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Run a tank; restart from the next station whenever it dips negative; feasible iff total gas ≥ total cost. O(n)."
  },
  "partition-labels": {
    statement: "Partition a string into as many parts as possible so each letter appears in at most one part. Return the sizes of the parts.",
    examples: [{ input: "s = \"ababcbacadefegdehijhklij\"", output: "[9,7,8]" }],
    approaches: [
      { name: "Optimal", pattern: "Greedy last-occurrence sweep", theory: "Record each letter's last index. Sweep, extending the current partition's end to the max last-index of letters seen; when the index reaches that end, cut a partition.", code: ["public List<Integer> partitionLabels(String s) {", "    int[] last = new int[26];", "    for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;", "    List<Integer> res = new ArrayList<>();", "    int start = 0, end = 0;", "    for (int i = 0; i < s.length(); i++) {", "        end = Math.max(end, last[s.charAt(i) - 'a']);", "        if (i == end) { res.add(end - start + 1); start = i + 1; }", "    }", "    return res;", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Extend each part to the farthest last-occurrence of its letters; cut when the index reaches that end. O(n)."
  },
  "task-scheduler": {
    statement: "Given tasks (letters) and a cooldown n between identical tasks, return the minimum intervals (including idles) to finish all tasks.",
    approaches: [
      { name: "Optimal", pattern: "Greedy math on the most frequent", theory: "The most frequent task forms (maxFreq − 1) blocks of size (n + 1), plus the count of tasks tied at maxFreq. The answer is max(total tasks, that skeleton).", code: ["public int leastInterval(char[] tasks, int n) {", "    int[] freq = new int[26];", "    for (char c : tasks) freq[c - 'A']++;", "    int max = 0, ties = 0;", "    for (int f : freq) if (f > max) { max = f; ties = 1; } else if (f == max) ties++;", "    int slots = (max - 1) * (n + 1) + ties;", "    return Math.max(tasks.length, slots);", "}"], time: "O(n)", space: "O(1)" }
    ],
    oneLiner: "Frame around the most frequent task: max(totalTasks, (maxFreq−1)(n+1) + #ties). O(n)."
  },
  "candy": {
    statement: "Children in a line have ratings; each gets ≥ 1 candy and any child rated higher than a neighbour gets more candy than that neighbour. Return the minimum total.",
    examples: [{ input: "ratings = [1,0,2]", output: "5", explanation: "Candies [2,1,2]." }],
    approaches: [
      { name: "Optimal", pattern: "Two greedy passes", theory: "Left pass: a rise over the left neighbour gets one more candy. Right pass: a rise over the right neighbour takes max(current, right+1). Both neighbour constraints end satisfied minimally.", code: ["public int candy(int[] r) {", "    int n = r.length; int[] c = new int[n];", "    Arrays.fill(c, 1);", "    for (int i = 1; i < n; i++) if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1;", "    for (int i = n - 2; i >= 0; i--) if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);", "    int total = 0; for (int x : c) total += x;", "    return total;", "}"], time: "O(n)", space: "O(n)" }
    ],
    oneLiner: "Two passes: satisfy left-neighbour rises, then right-neighbour rises with a max. O(n)."
  }
};
