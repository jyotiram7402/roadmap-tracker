// data/dsa/details-graphs.js — worked solutions for the Graphs phase.
// Original explanations + Java implementations of standard algorithms.

export const DETAILS = {
  "find-if-path-exists-in-graph": {
    statement: "Given an undirected graph with n nodes and edges, return true if there is a path between a source and a destination.",
    approaches: [
      { name: "Optimal", pattern: "Union-Find (or BFS/DFS)", theory: "Union every edge's endpoints; a path exists iff source and destination share a root. (A BFS/DFS reachability check works too.)", code: ["int[] parent;", "public boolean validPath(int n, int[][] edges, int src, int dst) {", "    parent = new int[n];", "    for (int i = 0; i < n; i++) parent[i] = i;", "    for (int[] e : edges) union(e[0], e[1]);", "    return find(src) == find(dst);", "}", "int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }", "void union(int a, int b) { parent[find(a)] = find(b); }"], time: "O((n+e) α)", space: "O(n)" }
    ],
    oneLiner: "Union-Find the edges; source and destination connected iff same root. Near-linear."
  },
  "number-of-islands": {
    statement: "Given a grid of '1' (land) and '0' (water), count the islands (groups of land connected 4-directionally).",
    examples: [{ input: "grid = [[1,1,0],[0,1,0],[0,0,1]]", output: "2" }],
    approaches: [
      { name: "Optimal", pattern: "DFS/BFS flood fill", theory: "Scan the grid; on each unvisited land cell, increment the count and flood-fill its whole island to water so it isn't recounted.", code: ["public int numIslands(char[][] g) {", "    int count = 0;", "    for (int r = 0; r < g.length; r++)", "        for (int c = 0; c < g[0].length; c++)", "            if (g[r][c] == '1') { count++; dfs(g, r, c); }", "    return count;", "}", "private void dfs(char[][] g, int r, int c) {", "    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;", "    g[r][c] = '0';", "    dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);", "}"], time: "O(m·n)", space: "O(m·n)", dryRun: { title: "grid = [[1,1,0],[0,1,0],[0,0,1]]", headers: ["cell", "land?", "action", "count"], rows: [["(0,0)", "yes", "flood island A", "1"], ["(0,1),(1,1)", "flooded", "part of A", "1"], ["(2,2)", "yes", "flood island B", "2"]] } }
    ],
    oneLiner: "Each unvisited land cell starts a flood fill that sinks its island; count the fills. O(m·n).",
    similar: [["200", "Number of Islands", "Flood fill"], ["695", "Max Area of Island", "DFS"], ["994", "Rotting Oranges", "BFS"]]
  },
  "clone-graph": {
    statement: "Deep-clone a connected undirected graph given a reference to one node.",
    approaches: [
      { name: "Optimal", pattern: "DFS + visited map", theory: "Keep a map from original node to its clone. DFS: if a node is already cloned return it; otherwise create the clone, record it, then recurse to clone and attach each neighbour.", code: ["Map<Node,Node> seen = new HashMap<>();", "public Node cloneGraph(Node node) {", "    if (node == null) return null;", "    if (seen.containsKey(node)) return seen.get(node);", "    Node copy = new Node(node.val);", "    seen.put(node, copy);", "    for (Node nb : node.neighbors) copy.neighbors.add(cloneGraph(nb));", "    return copy;", "}"], time: "O(V+E)", space: "O(V)" }
    ],
    oneLiner: "DFS with an original→clone map; create a clone before recursing so cycles resolve. O(V+E)."
  },
  "course-schedule": {
    statement: "Given numCourses and prerequisite pairs [a, b] (b before a), return true if all courses can be finished (i.e., the dependency graph has no cycle).",
    examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }],
    approaches: [
      { name: "Optimal", pattern: "Topological sort (Kahn's BFS)", theory: "Build a graph and in-degrees. Start a queue with all in-degree-0 courses; pop one, decrement its neighbours, enqueuing any that reach 0. If every course is processed, no cycle exists.", code: ["public boolean canFinish(int n, int[][] prereq) {", "    List<List<Integer>> g = new ArrayList<>();", "    for (int i = 0; i < n; i++) g.add(new ArrayList<>());", "    int[] indeg = new int[n];", "    for (int[] p : prereq) { g.get(p[1]).add(p[0]); indeg[p[0]]++; }", "    Queue<Integer> q = new LinkedList<>();", "    for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);", "    int done = 0;", "    while (!q.isEmpty()) {", "        int c = q.poll(); done++;", "        for (int nx : g.get(c)) if (--indeg[nx] == 0) q.add(nx);", "    }", "    return done == n;", "}"], time: "O(V+E)", space: "O(V+E)", dryRun: { title: "n=3, prereq=[[1,0],[2,1]]", headers: ["queue", "pop", "indeg after", "done"], rows: [["[0]", "0", "1→0", "1"], ["[1]", "1", "2→0", "2"], ["[2]", "2", "—", "3 == n → true"]] } }
    ],
    oneLiner: "Kahn's topological sort: peel off in-degree-0 nodes; all processed means no cycle. O(V+E).",
    similar: [["207", "Course Schedule", "Topo sort"], ["210", "Course Schedule II", "Topo order"], ["269", "Alien Dictionary", "Topo sort"]]
  },
  "pacific-atlantic-water-flow": {
    statement: "In a heights grid, water flows to lower-or-equal neighbours. Return cells from which water can reach both the Pacific (top/left) and Atlantic (bottom/right) oceans.",
    approaches: [
      { name: "Optimal", pattern: "Reverse DFS from both oceans", theory: "Instead of testing every cell, flow backwards: from each ocean's border cells, DFS to neighbours with height ≥ current (uphill). Cells reachable from both oceans are the answer.", code: ["public List<List<Integer>> pacificAtlantic(int[][] h) {", "    int m = h.length, n = h[0].length;", "    boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];", "    for (int i = 0; i < m; i++) { dfs(h, pac, i, 0); dfs(h, atl, i, n - 1); }", "    for (int j = 0; j < n; j++) { dfs(h, pac, 0, j); dfs(h, atl, m - 1, j); }", "    List<List<Integer>> res = new ArrayList<>();", "    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++)", "        if (pac[i][j] && atl[i][j]) res.add(List.of(i, j));", "    return res;", "}", "private void dfs(int[][] h, boolean[][] ok, int r, int c) {", "    ok[r][c] = true;", "    int[][] d = {{1,0},{-1,0},{0,1},{0,-1}};", "    for (int[] x : d) {", "        int nr = r + x[0], nc = c + x[1];", "        if (nr >= 0 && nc >= 0 && nr < h.length && nc < h[0].length", "            && !ok[nr][nc] && h[nr][nc] >= h[r][c]) dfs(h, ok, nr, nc);", "    }", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Reverse-flow DFS uphill from each ocean's border; cells reached by both oceans qualify. O(m·n)."
  },
  "rotting-oranges": {
    statement: "In a grid, 2 = rotten, 1 = fresh, 0 = empty. Each minute a rotten orange rots its 4-neighbours. Return minutes until none are fresh, or −1 if impossible.",
    approaches: [
      { name: "Optimal", pattern: "Multi-source BFS", theory: "Seed the queue with all initially rotten oranges (time 0) and count fresh ones. BFS level by level; each level is a minute, rotting fresh neighbours. If any fresh remain at the end, return −1.", code: ["public int orangesRotting(int[][] g) {", "    int m = g.length, n = g[0].length, fresh = 0, min = 0;", "    Queue<int[]> q = new LinkedList<>();", "    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {", "        if (g[r][c] == 2) q.add(new int[]{r, c});", "        else if (g[r][c] == 1) fresh++;", "    }", "    int[][] d = {{1,0},{-1,0},{0,1},{0,-1}};", "    while (!q.isEmpty() && fresh > 0) {", "        min++;", "        for (int s = q.size(); s > 0; s--) {", "            int[] cur = q.poll();", "            for (int[] x : d) {", "                int nr = cur[0] + x[0], nc = cur[1] + x[1];", "                if (nr >= 0 && nc >= 0 && nr < m && nc < n && g[nr][nc] == 1) {", "                    g[nr][nc] = 2; fresh--; q.add(new int[]{nr, nc});", "                }", "            }", "        }", "    }", "    return fresh == 0 ? min : -1;", "}"], time: "O(m·n)", space: "O(m·n)" }
    ],
    oneLiner: "Multi-source BFS from all rotten oranges; each BFS level is a minute; −1 if any fresh remain. O(m·n)."
  },
  "network-delay-time": {
    statement: "Given a directed weighted graph and a source, return the time for a signal to reach all nodes (max shortest-path distance), or −1 if some node is unreachable.",
    approaches: [
      { name: "Optimal", pattern: "Dijkstra's algorithm", theory: "Shortest paths from the source with a min-heap; the answer is the largest finalized distance, or −1 if a node stays unreached.", code: ["public int networkDelayTime(int[][] times, int n, int k) {", "    List<int[]>[] g = new List[n + 1];", "    for (int i = 1; i <= n; i++) g[i] = new ArrayList<>();", "    for (int[] t : times) g[t[0]].add(new int[]{t[1], t[2]});", "    int[] dist = new int[n + 1];", "    Arrays.fill(dist, Integer.MAX_VALUE);", "    dist[k] = 0;", "    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);", "    pq.add(new int[]{k, 0});", "    while (!pq.isEmpty()) {", "        int[] cur = pq.poll();", "        if (cur[1] > dist[cur[0]]) continue;", "        for (int[] e : g[cur[0]]) {", "            int nd = cur[1] + e[1];", "            if (nd < dist[e[0]]) { dist[e[0]] = nd; pq.add(new int[]{e[0], nd}); }", "        }", "    }", "    int ans = 0;", "    for (int i = 1; i <= n; i++) {", "        if (dist[i] == Integer.MAX_VALUE) return -1;", "        ans = Math.max(ans, dist[i]);", "    }", "    return ans;", "}"], time: "O(E log V)", space: "O(V+E)" }
    ],
    oneLiner: "Dijkstra from the source; answer is the maximum shortest distance, −1 if any node is unreachable. O(E log V)."
  },
  "word-ladder": {
    statement: "Given beginWord, endWord, and a word list, return the length of the shortest transformation sequence changing one letter at a time (each intermediate must be in the list), or 0.",
    approaches: [
      { name: "Optimal", pattern: "BFS over word graph", theory: "Words are nodes; an edge joins words differing by one letter. BFS from beginWord, generating neighbours by trying every letter at every position, gives the shortest length.", code: ["public int ladderLength(String begin, String end, List<String> words) {", "    Set<String> dict = new HashSet<>(words);", "    if (!dict.contains(end)) return 0;", "    Queue<String> q = new LinkedList<>();", "    q.add(begin);", "    int steps = 1;", "    while (!q.isEmpty()) {", "        for (int s = q.size(); s > 0; s--) {", "            char[] w = q.poll().toCharArray();", "            for (int i = 0; i < w.length; i++) {", "                char old = w[i];", "                for (char c = 'a'; c <= 'z'; c++) {", "                    w[i] = c;", "                    String next = new String(w);", "                    if (next.equals(end)) return steps + 1;", "                    if (dict.remove(next)) q.add(next);", "                }", "                w[i] = old;", "            }", "        }", "        steps++;", "    }", "    return 0;", "}"], time: "O(N · L · 26)", space: "O(N · L)" }
    ],
    oneLiner: "BFS the implicit graph where edges join one-letter-apart words; first arrival at endWord is shortest. O(N·L·26)."
  },
  "alien-dictionary": {
    statement: "Given words sorted by an unknown alphabet, return a possible ordering of the letters (or empty string if invalid).",
    approaches: [
      { name: "Optimal", pattern: "Topological sort of letters", theory: "Each adjacent word pair gives one ordering constraint (first differing character). Build a graph of these constraints and topologically sort; a cycle or a prefix conflict means invalid.", code: ["public String alienOrder(String[] words) {", "    Map<Character,Set<Character>> g = new HashMap<>();", "    Map<Character,Integer> indeg = new HashMap<>();", "    for (String w : words) for (char c : w.toCharArray()) { g.putIfAbsent(c, new HashSet<>()); indeg.putIfAbsent(c, 0); }", "    for (int i = 0; i + 1 < words.length; i++) {", "        String a = words[i], b = words[i + 1];", "        if (a.length() > b.length() && a.startsWith(b)) return \"\";  // prefix conflict", "        for (int j = 0; j < Math.min(a.length(), b.length()); j++) {", "            char x = a.charAt(j), y = b.charAt(j);", "            if (x != y) { if (g.get(x).add(y)) indeg.merge(y, 1, Integer::sum); break; }", "        }", "    }", "    Queue<Character> q = new LinkedList<>();", "    for (char c : indeg.keySet()) if (indeg.get(c) == 0) q.add(c);", "    StringBuilder sb = new StringBuilder();", "    while (!q.isEmpty()) {", "        char c = q.poll(); sb.append(c);", "        for (char nx : g.get(c)) if (indeg.merge(nx, -1, Integer::sum) == 0) q.add(nx);", "    }", "    return sb.length() == indeg.size() ? sb.toString() : \"\";", "}"], time: "O(total chars)", space: "O(1) (≤26 letters)" }
    ],
    oneLiner: "Derive letter-order constraints from adjacent word pairs, then topologically sort; cycle/prefix conflict → invalid."
  },
  "critical-connections-in-a-network": {
    statement: "Find all bridges in an undirected graph — edges whose removal disconnects the graph.",
    approaches: [
      { name: "Optimal", pattern: "Tarjan's bridges (DFS low-link)", theory: "DFS assigns each node a discovery time and a low-link (earliest reachable ancestor). Edge (u, v) is a bridge when low[v] > disc[u] — v's subtree can't reach u or above without this edge.", code: ["int timer = 0;", "public List<List<Integer>> criticalConnections(int n, List<List<Integer>> conns) {", "    List<Integer>[] g = new List[n];", "    for (int i = 0; i < n; i++) g[i] = new ArrayList<>();", "    for (var c : conns) { g[c.get(0)].add(c.get(1)); g[c.get(1)].add(c.get(0)); }", "    int[] disc = new int[n], low = new int[n];", "    Arrays.fill(disc, -1);", "    List<List<Integer>> res = new ArrayList<>();", "    dfs(0, -1, g, disc, low, res);", "    return res;", "}", "private void dfs(int u, int parent, List<Integer>[] g, int[] disc, int[] low, List<List<Integer>> res) {", "    disc[u] = low[u] = timer++;", "    for (int v : g[u]) {", "        if (v == parent) continue;", "        if (disc[v] == -1) {", "            dfs(v, u, g, disc, low, res);", "            low[u] = Math.min(low[u], low[v]);", "            if (low[v] > disc[u]) res.add(List.of(u, v));   // bridge", "        } else low[u] = Math.min(low[u], disc[v]);", "    }", "}"], time: "O(V+E)", space: "O(V+E)" }
    ],
    oneLiner: "Tarjan's DFS with discovery/low-link times; edge (u,v) is a bridge when low[v] > disc[u]. O(V+E)."
  }
};
