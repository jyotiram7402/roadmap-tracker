// data/sql/details-l3.js — worked answers for Level 3 (Senior, 4+ yrs) SQL questions.
// Original explanations, queries, and demo/result tables.
// answer block kinds: {kind:"text",text} | {kind:"sql",lines:[...]} | {kind:"table",title,headers,rows}

export const DETAILS = {
  "l3-t-1": {
    answer: [
      { kind: "text", text: "Optimizing a slow query starts with measurement, not guessing: capture the actual execution plan and runtime statistics (rows read vs rows returned, wait/IO) to find where time goes. Then work the biggest cost first." },
      { kind: "table", title: "Common tactics", headers: ["Symptom", "Fix"], rows: [["Full table scan on a filter", "Add/adjust an index so the predicate is seekable"], ["Non-SARGable predicate", "Rewrite so the column is bare (no function wrapping it)"], ["Selecting too much", "Return only needed columns; avoid SELECT *"], ["Bad join order/estimates", "Update statistics; simplify or hint the join"], ["Repeated subquery", "Refactor to a CTE/window function or pre-aggregate"], ["Huge sort/spill", "Add a supporting index or reduce the working set"]] },
      { kind: "text", text: "After each change, re-check the plan to confirm the estimated and actual row counts converged and the expensive operator changed (e.g. a scan became a seek)." }
    ],
    oneLiner: "Measure with the execution plan first, then fix the biggest cost: seekable indexes, SARGable predicates, fewer columns, better estimates/statistics, and eliminating repeated work."
  },
  "l3-t-2": {
    answer: [
      { kind: "text", text: "An execution plan is the engine's chosen strategy for running a query — the operators (scans, seeks, joins, sorts, aggregates), their order, and cost/row estimates. EXPLAIN shows the estimated plan; EXPLAIN ANALYZE (Postgres/MySQL) actually runs it and reports real timings and row counts." },
      { kind: "sql", lines: ["EXPLAIN ANALYZE", "SELECT * FROM orders WHERE customer_id = 42;"] },
      { kind: "text", text: "Read it inside-out / bottom-up (leaf operators feed their parents). Key signals: Seq/Table Scan vs Index Seek, a large gap between estimated and actual rows (stale statistics), and expensive Sort/Hash/nested-loop operators over big inputs." }
    ],
    oneLiner: "EXPLAIN shows the planned operators and estimates; EXPLAIN ANALYZE adds real timings — read bottom-up and watch for scans, sorts, and estimate-vs-actual row gaps."
  },
  "l3-t-3": {
    answer: [
      { kind: "text", text: "SARGable (Search ARGument able) means a predicate can use an index seek because the indexed column appears bare on one side, un-wrapped by a function or expression. Non-SARGable predicates force the engine to compute a value for every row, defeating the index and causing a scan." },
      { kind: "sql", lines: ["-- NOT SARGable: function on the column", "WHERE YEAR(order_date) = 2026;", "", "-- SARGable: range on the bare column (index seek)", "WHERE order_date >= '2026-01-01'", "  AND order_date <  '2027-01-01';"] },
      { kind: "text", text: "The same applies to leading wildcards (LIKE '%foo') and implicit type conversions on the column — both break SARGability." }
    ],
    oneLiner: "A SARGable predicate leaves the indexed column bare so the engine can seek; wrapping it in a function, a leading-wildcard LIKE, or a type conversion forces a scan."
  },
  "l3-t-4": {
    answer: [
      { kind: "text", text: "Missing indexes force scans: read-heavy queries touch far more pages than needed, increasing IO, CPU, and lock contention, and joins/sorts get expensive. The optimizer may warn about missing indexes in the plan." },
      { kind: "text", text: "But too many indexes are also harmful: every INSERT/UPDATE/DELETE must maintain each index (write amplification), they consume storage and buffer-pool memory, and redundant/overlapping indexes confuse the optimizer. The goal is a small set of well-chosen indexes that cover the real query patterns." },
      { kind: "table", title: "Trade-off", headers: ["Too few indexes", "Too many indexes"], rows: [["Slow reads / scans", "Slow writes (maintain each index)"], ["High IO on filters/joins", "Wasted storage + memory"], ["Poor sort/group perf", "Optimizer overhead / redundancy"]] }
    ],
    oneLiner: "Missing indexes cause scans and slow reads; too many slow every write and waste storage/memory — aim for a lean set of indexes matched to actual query patterns."
  },
  "l3-t-5": {
    answer: [
      { kind: "text", text: "Isolation level controls how much one transaction is shielded from others' concurrent changes, trading consistency against concurrency. Each level permits certain read anomalies." },
      { kind: "table", title: "Levels vs anomalies", headers: ["Isolation level", "Dirty read", "Non-repeatable read", "Phantom read"], rows: [["READ UNCOMMITTED", "possible", "possible", "possible"], ["READ COMMITTED", "no", "possible", "possible"], ["REPEATABLE READ", "no", "no", "possible*"], ["SERIALIZABLE", "no", "no", "no"]] },
      { kind: "text", text: "Dirty read = seeing another txn's uncommitted data; non-repeatable read = a re-read row changed; phantom = a re-run range gains/loses rows. (*Some engines like InnoDB block phantoms at REPEATABLE READ via next-key locks.)" }
    ],
    oneLiner: "Higher isolation blocks more anomalies at the cost of concurrency: READ UNCOMMITTED allows all, READ COMMITTED blocks dirty reads, REPEATABLE READ also blocks non-repeatable reads, SERIALIZABLE blocks phantoms too."
  },
  "l3-t-6": {
    answer: [
      { kind: "text", text: "A deadlock occurs when two or more transactions each hold a lock the other needs and neither can proceed — a cycle of waits. The engine's deadlock detector finds the cycle and aborts one transaction (the victim) so the others continue; the victim must retry." },
      { kind: "text", text: "Prevention: acquire locks in a consistent order across the codebase, keep transactions short, touch rows in a deterministic sequence, use appropriate indexes to lock fewer rows, and lower isolation where safe. Application code should catch the deadlock error and retry with backoff." }
    ],
    oneLiner: "A deadlock is a cycle of transactions each waiting on a lock the other holds; the engine kills a victim to break it — prevent it with consistent lock ordering, short transactions, and retry-on-failure."
  },
  "l3-t-7": {
    answer: [
      { kind: "text", text: "A clustered index stores the table rows themselves in key order in its leaf level — so the table IS the index and there can be only one. A non-clustered index is a separate B-tree whose leaves hold the key plus a row locator (the clustered key or a physical pointer) used to fetch the full row." },
      { kind: "table", title: "Internals", headers: ["Aspect", "Clustered", "Non-clustered"], rows: [["Leaf holds", "Full data rows (in key order)", "Key + locator to the row"], ["Count per table", "One", "Many"], ["Extra lookup", "None (data is here)", "Key lookup unless index covers query"], ["Best for", "Range scans / the primary access path", "Selective secondary lookups"]] },
      { kind: "text", text: "Choose the clustered key for the dominant range/order access (often the primary key); add non-clustered (ideally covering) indexes for other selective filters." }
    ],
    oneLiner: "A clustered index orders the actual rows (one per table); a non-clustered index is a separate tree of key + locator needing a lookup unless it covers the query."
  },
  "l3-t-8": {
    answer: [
      { kind: "text", text: "Partitioning splits one logical table into multiple physical segments by a partition key, so the engine can skip whole partitions (partition pruning) and manage data at the partition level." },
      { kind: "table", title: "Partitioning strategies", headers: ["Type", "How rows are assigned"], rows: [["Range", "By value ranges (e.g. one partition per month of order_date)"], ["List", "By discrete values (e.g. region = 'EU' / 'US' / 'APAC')"], ["Hash", "By a hash of the key, for even distribution when there is no natural range"]] },
      { kind: "text", text: "Benefits: pruning cuts IO on partition-key filters, bulk operations become cheap (DROP/SWITCH a partition instead of a mass DELETE), and maintenance (rebuild, archive) is localized. It helps only when queries filter on the partition key." }
    ],
    oneLiner: "Partitioning splits a table by key (range/list/hash) so queries prune irrelevant segments and bulk load/archive works per partition — effective only when queries filter on the partition key."
  },
  "l3-t-9": {
    answer: [
      { kind: "text", text: "A regular view is just a stored query that runs every time it is referenced — always current, no storage, but no speedup. A materialized view stores the query's precomputed result on disk, so reads are fast, but the data is a snapshot that must be refreshed (on demand or on a schedule) and can be stale." },
      { kind: "table", title: "Trade-offs", headers: ["Aspect", "Regular view", "Materialized view"], rows: [["Data freshness", "Always live", "As of last refresh (can be stale)"], ["Read cost", "Re-runs the query each time", "Fast (reads stored result)"], ["Storage", "None", "Stores the result set"], ["Best for", "Simplifying access to current data", "Expensive aggregations read often"]] }
    ],
    oneLiner: "A regular view re-runs its query (always live, no storage); a materialized view stores precomputed results (fast reads but stale until refreshed) — use it for costly aggregations queried often."
  },
  "l3-t-10": {
    answer: [
      { kind: "text", text: "OLTP (Online Transaction Processing) systems run many small, short read/write transactions for day-to-day operations; they are normalized and tuned for fast, concurrent single-row access. OLAP (Online Analytical Processing) systems run large, complex read-mostly aggregations over historical data for analytics/reporting; they are often denormalized (star schema) and columnar." },
      { kind: "table", title: "OLTP vs OLAP", headers: ["Aspect", "OLTP", "OLAP"], rows: [["Workload", "Many short transactions", "Few large analytical queries"], ["Operations", "Read + write", "Mostly read/aggregate"], ["Schema", "Normalized", "Denormalized / star schema"], ["Optimized for", "Concurrency, low latency", "Scan/aggregate throughput"]] }
    ],
    oneLiner: "OLTP handles many short read/write transactions on normalized data (operations); OLAP runs large read-mostly aggregations on denormalized/columnar data (analytics)."
  },
  "l3-t-11": {
    answer: [
      { kind: "text", text: "Vertical scaling (scale up) means giving one server more CPU/RAM/IO — simple but bounded by hardware and a single point of failure. Horizontal scaling (scale out) means adding more servers and spreading load; it scales further but adds coordination complexity." },
      { kind: "text", text: "Sharding is horizontal scaling of data: the rows of a large table are partitioned across independent database nodes by a shard key (e.g. customer_id hash), so each node holds a subset. It boosts write/read throughput and capacity, but cross-shard queries, joins, and transactions become hard, and choosing a good shard key (to avoid hotspots) is critical." },
      { kind: "table", title: "Scaling", headers: ["Approach", "Idea", "Main cost"], rows: [["Vertical", "Bigger single machine", "Hardware ceiling, single point of failure"], ["Horizontal", "More machines", "Coordination/complexity"], ["Sharding", "Split data by shard key across nodes", "Hard cross-shard joins/txns; hotspot risk"]] }
    ],
    oneLiner: "Vertical scaling adds power to one machine (bounded); horizontal adds more machines; sharding spreads a table's rows across nodes by a shard key for throughput, at the cost of hard cross-shard joins/transactions."
  },
  "l3-t-12": {
    answer: [
      { kind: "text", text: "The optimizer estimates the cost of each join algorithm from table sizes, statistics, indexes, and available memory, then picks the cheapest for that step." },
      { kind: "table", title: "Join algorithms", headers: ["Join", "Best when"], rows: [["Nested loop", "One input is small and the inner side has an index on the join key"], ["Hash join", "Large, unsorted inputs with an equality join and no useful index"], ["Merge join", "Both inputs are already sorted (or cheaply sortable) on the join key"]] },
      { kind: "text", text: "Because the choice is estimate-driven, stale statistics or skewed data can make the optimizer pick a poor join (e.g. a nested loop over millions of rows). Keeping statistics current is the main lever." }
    ],
    oneLiner: "The cost-based optimizer picks nested loop (small input + indexed inner), hash join (large unsorted equality joins), or merge join (pre-sorted inputs) from statistics — stale stats cause bad choices."
  },
  "l3-t-13": {
    answer: [
      { kind: "text", text: "Locks serialize access to protect data. Granularity trades concurrency against overhead: row locks allow high concurrency but many locks; table locks are cheap but block everyone. Concurrency strategy is orthogonal:" },
      { kind: "table", title: "Locking", headers: ["Dimension", "Option", "Meaning"], rows: [["Granularity", "Row", "Lock individual rows — high concurrency"], ["Granularity", "Table", "Lock the whole table — simple, low concurrency"], ["Strategy", "Pessimistic", "Lock up front; block others until commit"], ["Strategy", "Optimistic", "No lock; check a version/timestamp at write and retry on conflict"]] },
      { kind: "text", text: "Pessimistic locking suits high-contention writes; optimistic locking (version columns) suits low-contention, read-heavy workloads where conflicts are rare." }
    ],
    oneLiner: "Locks vary by granularity (row = concurrent but many, table = cheap but blocking) and strategy (pessimistic locks up front; optimistic checks a version at write and retries on conflict)."
  },
  "l3-t-14": {
    answer: [
      { kind: "text", text: "To avoid recompiling every statement, engines cache compiled execution plans keyed by the query text/handle and reuse them for subsequent executions with different parameter values. This saves compilation cost." },
      { kind: "text", text: "Parameter sniffing is the side effect: the plan is built and cached using the parameter values of the FIRST execution. If that value is atypical (e.g. a rare value that suggests a seek, later reused for a common value needing a scan), the cached plan can be badly suited to other values. Fixes include recompile hints, optimizing for a representative/unknown value, or parameterizing carefully." }
    ],
    oneLiner: "Plan caching reuses a compiled plan across executions to skip recompilation; parameter sniffing means that plan is shaped by the first run's parameter values and may misfit later ones — fix with recompile/optimize-for hints."
  },
  "l3-t-15": {
    answer: [
      { kind: "text", text: "For tables in the billions of rows, design so no operation ever touches the whole table. Partition by a natural key (usually time) to enable pruning and cheap archival via partition drop/switch. Index narrowly and use covering indexes for hot queries; avoid over-indexing given write cost." },
      { kind: "text", text: "Operationally: batch large DML in chunks to avoid huge locks and log growth, keep statistics current, archive or roll off cold data, and consider columnar storage or a separate OLAP store for analytics. Sharding or read replicas spread load when a single node is no longer enough." }
    ],
    oneLiner: "Never scan the whole thing: partition (usually by time) for pruning/archival, use narrow covering indexes, batch large DML, roll off cold data, and scale out with replicas/sharding or a columnar OLAP store."
  },
  "l3-t-16": {
    answer: [
      { kind: "text", text: "SQL injection happens when untrusted input is concatenated into a query string so it changes the query's structure. The primary defense is parameterized queries / prepared statements: the SQL text and the data are sent separately, so input is always treated as a value, never as code." },
      { kind: "sql", lines: ["-- VULNERABLE: string concatenation", "-- \"SELECT * FROM users WHERE name = '\" + input + \"'\"", "", "-- SAFE: parameterized (placeholder bound as a value)", "SELECT * FROM users WHERE name = ?;   -- bind: input"] },
      { kind: "text", text: "Defense in depth: use ORM/parameter binding everywhere, validate/allow-list inputs (especially for identifiers that cannot be parameterized), grant least-privilege database accounts, and avoid dynamic SQL; if unavoidable, quote/escape identifiers via built-in helpers." }
    ],
    oneLiner: "Never concatenate input into SQL — use parameterized queries/prepared statements so input is bound as data, plus input validation, least-privilege accounts, and avoiding dynamic SQL."
  },

  "l3-c-17": {
    answer: [
      { kind: "text", text: "SUM() as a window function with ORDER BY produces a running total: for each row it sums from the first row up to the current one (the default frame is unbounded preceding to current row)." },
      { kind: "sql", lines: ["SELECT sale_date, amount,", "       SUM(amount) OVER (", "         ORDER BY sale_date", "         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW", "       ) AS running_total", "FROM sales;"] },
      { kind: "table", title: "Demo result", headers: ["sale_date", "amount", "running_total"], rows: [["2026-01-01", "100", "100"], ["2026-01-02", "50", "150"], ["2026-01-03", "80", "230"]] }
    ],
    oneLiner: "SUM(amount) OVER (ORDER BY date) gives a cumulative running total; add PARTITION BY to restart it per group."
  },
  "l3-c-18": {
    answer: [
      { kind: "text", text: "Ranking functions over an ORDER BY assign positions; pick the one matching your tie policy. Here we rank employees by salary." },
      { kind: "sql", lines: ["SELECT name, salary,", "       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,", "       RANK()       OVER (ORDER BY salary DESC) AS rnk,", "       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk", "FROM employees;"] },
      { kind: "table", title: "Demo result", headers: ["name", "salary", "row_num", "rnk", "dense_rnk"], rows: [["Asha", "100", "1", "1", "1"], ["Ravi", "90", "2", "2", "2"], ["Meera", "90", "3", "2", "2"], ["Neha", "80", "4", "4", "3"]] }
    ],
    oneLiner: "ROW_NUMBER (unique), RANK (ties share a rank, gaps follow), DENSE_RANK (ties share, no gaps) all rank over an OVER(ORDER BY ...) clause."
  },
  "l3-c-19": {
    answer: [
      { kind: "text", text: "LAG fetches a prior row's value and LEAD the next, within the ordered window — ideal for period-over-period comparisons without a self-join." },
      { kind: "sql", lines: ["SELECT month, revenue,", "       LAG(revenue) OVER (ORDER BY month) AS prev_month,", "       revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change", "FROM monthly_revenue;"] },
      { kind: "table", title: "Demo result", headers: ["month", "revenue", "prev_month", "mom_change"], rows: [["2026-01", "1000", "NULL", "NULL"], ["2026-02", "1200", "1000", "200"], ["2026-03", "900", "1200", "-300"]] }
    ],
    oneLiner: "LAG()/LEAD() OVER (ORDER BY period) read the previous/next row's value so you can compute period-over-period change without a self-join."
  },
  "l3-c-20": {
    answer: [
      { kind: "text", text: "Gaps and islands: number the sequence with ROW_NUMBER per user, then subtract it from the date/number. Consecutive values share the same difference, so grouping by that difference yields each island; the boundaries reveal the gaps." },
      { kind: "sql", lines: ["WITH marked AS (", "  SELECT user_id, activity_date,", "         activity_date - (", "           ROW_NUMBER() OVER (", "             PARTITION BY user_id ORDER BY activity_date", "           ) * INTERVAL '1 day'", "         ) AS grp", "  FROM activity", ")", "SELECT user_id, MIN(activity_date) AS island_start,", "       MAX(activity_date) AS island_end, COUNT(*) AS days", "FROM marked", "GROUP BY user_id, grp;"] },
      { kind: "table", title: "Demo — one user, a gap on 01-03", headers: ["island_start", "island_end", "days"], rows: [["2026-01-01", "2026-01-02", "2"], ["2026-01-04", "2026-01-05", "2"]] }
    ],
    oneLiner: "Subtract ROW_NUMBER() (per user, by date) from the date so consecutive rows share a constant grouping key, then GROUP BY it to collapse each island and expose gaps."
  },
  "l3-c-21": {
    answer: [
      { kind: "text", text: "Partition the ranking by department and filter to the Nth rank. DENSE_RANK is tie-safe (the Nth distinct salary); use ROW_NUMBER if you want exactly one row." },
      { kind: "sql", lines: ["WITH ranked AS (", "  SELECT name, dept_id, salary,", "         DENSE_RANK() OVER (", "           PARTITION BY dept_id ORDER BY salary DESC", "         ) AS rnk", "  FROM employees", ")", "SELECT name, dept_id, salary", "FROM ranked WHERE rnk = 2;   -- 2nd highest per dept"] },
      { kind: "table", title: "Demo — 2nd highest per dept", headers: ["name", "dept_id", "salary"], rows: [["Ravi", "1", "90000"], ["Omar", "2", "72000"]] }
    ],
    oneLiner: "DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) then filter rnk = N gives the Nth highest salary per department, tie-safe."
  },
  "l3-c-22": {
    answer: [
      { kind: "text", text: "A recursive CTE walks a hierarchy: the anchor member selects the starting rows (e.g. the top manager), and the recursive member joins the CTE back to the table to fetch each next level, until no more rows are added." },
      { kind: "sql", lines: ["WITH RECURSIVE org AS (", "  SELECT id, name, manager_id, 1 AS lvl", "  FROM employees WHERE manager_id IS NULL   -- anchor: top", "  UNION ALL", "  SELECT e.id, e.name, e.manager_id, o.lvl + 1", "  FROM employees e", "  JOIN org o ON e.manager_id = o.id          -- recurse down", ")", "SELECT id, name, lvl FROM org ORDER BY lvl, id;"] },
      { kind: "table", title: "Demo result", headers: ["id", "name", "lvl"], rows: [["1", "CEO", "1"], ["2", "VP Sales", "2"], ["5", "Rep", "3"]] }
    ],
    oneLiner: "WITH RECURSIVE anchors at the root then repeatedly joins the CTE to the table to descend each level of the hierarchy, tracking depth with lvl + 1."
  },
  "l3-c-23": {
    answer: [
      { kind: "text", text: "Pivot turns rows into columns. Portably, use conditional aggregation: one CASE-wrapped SUM per target column, grouped by the row key. (SQL Server also has a PIVOT operator.)" },
      { kind: "sql", lines: ["SELECT product,", "  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) AS jan,", "  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) AS feb,", "  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) AS mar", "FROM sales", "GROUP BY product;"] },
      { kind: "table", title: "Demo result", headers: ["product", "jan", "feb", "mar"], rows: [["Widget", "100", "120", "90"], ["Gadget", "60", "80", "70"]] }
    ],
    oneLiner: "Pivot rows to columns with conditional aggregation — one SUM(CASE WHEN month = ... ) per column, grouped by the row key (or the vendor PIVOT operator)."
  },
  "l3-c-24": {
    answer: [
      { kind: "text", text: "NTILE(n) splits the ordered rows into n roughly equal buckets and labels each row 1..n — used for quartiles (4), deciles (10), or percentile bands." },
      { kind: "sql", lines: ["SELECT name, score,", "       NTILE(4) OVER (ORDER BY score DESC) AS quartile", "FROM students;"] },
      { kind: "table", title: "Demo — 4 buckets by score", headers: ["name", "score", "quartile"], rows: [["Asha", "95", "1"], ["Ravi", "88", "1"], ["Meera", "70", "2"], ["Neha", "40", "4"]] }
    ],
    oneLiner: "NTILE(4) OVER (ORDER BY col) assigns each row a bucket 1..4, splitting the ordered set into near-equal quartiles (use NTILE(10) for deciles, etc.)."
  },
  "l3-c-25": {
    answer: [
      { kind: "text", text: "MERGE (a.k.a. UPSERT) reconciles a target with a source in one statement: update rows that match, insert those that do not. Portable dialects offer INSERT ... ON CONFLICT (Postgres) or ON DUPLICATE KEY UPDATE (MySQL)." },
      { kind: "sql", lines: ["-- ANSI / SQL Server MERGE", "MERGE INTO customers t", "USING staging s ON t.id = s.id", "WHEN MATCHED THEN", "  UPDATE SET t.name = s.name, t.email = s.email", "WHEN NOT MATCHED THEN", "  INSERT (id, name, email) VALUES (s.id, s.name, s.email);", "", "-- PostgreSQL equivalent", "INSERT INTO customers (id, name, email)", "SELECT id, name, email FROM staging", "ON CONFLICT (id) DO UPDATE", "  SET name = EXCLUDED.name, email = EXCLUDED.email;"] }
    ],
    oneLiner: "MERGE INTO target USING source ON key WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT upserts in one pass (Postgres: INSERT ... ON CONFLICT DO UPDATE)."
  },
  "l3-c-26": {
    answer: [
      { kind: "text", text: "With no built-in median, use PERCENTILE_CONT(0.5) where available, or a portable window approach: number rows ascending and descending, then average the middle one or two (which handles both odd and even counts)." },
      { kind: "sql", lines: ["-- portable median via symmetric row numbers", "WITH ordered AS (", "  SELECT salary,", "         ROW_NUMBER() OVER (ORDER BY salary)      AS asc_n,", "         ROW_NUMBER() OVER (ORDER BY salary DESC) AS desc_n", "  FROM employees", ")", "SELECT AVG(salary) AS median", "FROM ordered", "WHERE asc_n IN (desc_n, desc_n + 1, desc_n - 1);", "", "-- where supported:", "-- SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) FROM employees;"] },
      { kind: "table", title: "Demo — even count {40,60,80,100}", headers: ["middle values", "median"], rows: [["60, 80", "70"]] }
    ],
    oneLiner: "Median: use PERCENTILE_CONT(0.5) if available, else number rows ascending and descending and average the middle one/two — handling odd and even counts."
  },
  "l3-c-27": {
    answer: [
      { kind: "text", text: "Consecutive-days / streaks are a gaps-and-islands problem: subtract a per-user ROW_NUMBER from the date to form a constant group per unbroken run, then count days per group; the longest streak is the max count." },
      { kind: "sql", lines: ["WITH islands AS (", "  SELECT user_id, login_date,", "         login_date - (", "           ROW_NUMBER() OVER (", "             PARTITION BY user_id ORDER BY login_date", "           ) * INTERVAL '1 day'", "         ) AS grp", "  FROM logins", ")", "SELECT user_id, MAX(streak) AS longest_streak", "FROM (", "  SELECT user_id, grp, COUNT(*) AS streak", "  FROM islands GROUP BY user_id, grp", ") s", "GROUP BY user_id;"] },
      { kind: "table", title: "Demo result", headers: ["user_id", "longest_streak"], rows: [["7", "5"], ["9", "2"]] }
    ],
    oneLiner: "Streaks are gaps-and-islands: date minus per-user ROW_NUMBER groups each unbroken run; COUNT per group is a streak length and MAX is the longest."
  },
  "l3-c-28": {
    answer: [
      { kind: "text", text: "Compute growth as (current - previous) / previous, pulling the previous period with LAG over the ordered periods. Guard against divide-by-zero with NULLIF." },
      { kind: "sql", lines: ["SELECT month, revenue,", "  ROUND(", "    100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))", "    / NULLIF(LAG(revenue) OVER (ORDER BY month), 0)", "  , 1) AS mom_growth_pct", "FROM monthly_revenue;"] },
      { kind: "table", title: "Demo result", headers: ["month", "revenue", "mom_growth_pct"], rows: [["2026-01", "1000", "NULL"], ["2026-02", "1200", "20.0"], ["2026-03", "1080", "-10.0"]] }
    ],
    oneLiner: "Growth % = 100 * (current - LAG(value)) / NULLIF(LAG(value), 0) over ordered periods; use PARTITION BY year for MoM-within-year or lag 12 periods for YoY."
  },
  "l3-c-29": {
    answer: [
      { kind: "text", text: "Rank each customer's orders by date with ROW_NUMBER and keep the first, or use a correlated subquery on MIN(order_date). The window version is usually cleaner and returns the whole first-order row." },
      { kind: "sql", lines: ["WITH ranked AS (", "  SELECT customer_id, order_id, order_date, amount,", "         ROW_NUMBER() OVER (", "           PARTITION BY customer_id ORDER BY order_date, order_id", "         ) AS rn", "  FROM orders", ")", "SELECT customer_id, order_id, order_date, amount", "FROM ranked WHERE rn = 1;"] },
      { kind: "table", title: "Demo result", headers: ["customer_id", "order_id", "order_date"], rows: [["1", "500", "2026-01-04"], ["2", "512", "2026-02-11"]] }
    ],
    oneLiner: "PARTITION BY customer_id ORDER BY order_date with ROW_NUMBER and keep rn = 1 to get each customer's first order (tie-break on id for determinism)."
  },
  "l3-c-30": {
    answer: [
      { kind: "text", text: "To keep the latest record per key, ROW_NUMBER partitioned by the key ordered by the recency column DESC, then keep rn = 1. This is the read-side de-dupe; the same pattern drives a DELETE to purge older copies." },
      { kind: "sql", lines: ["WITH ranked AS (", "  SELECT *,", "         ROW_NUMBER() OVER (", "           PARTITION BY customer_id ORDER BY updated_at DESC", "         ) AS rn", "  FROM customer_snapshots", ")", "SELECT * FROM ranked WHERE rn = 1;   -- latest per customer"] },
      { kind: "table", title: "Demo — latest kept per customer", headers: ["customer_id", "updated_at", "rn", "kept?"], rows: [["1", "2026-07-10", "1", "yes"], ["1", "2026-06-01", "2", "no"], ["2", "2026-07-12", "1", "yes"]] }
    ],
    oneLiner: "ROW_NUMBER() OVER (PARTITION BY key ORDER BY updated_at DESC) and keep rn = 1 to retain the latest record per key (or DELETE rn > 1 to purge old copies)."
  },
  "l3-c-31": {
    answer: [
      { kind: "text", text: "A correlated subquery that re-runs per outer row (e.g. an EXISTS/aggregate check) can often be rewritten as a set-based JOIN or a JOIN to a pre-aggregated derived table, which the optimizer plans as a single hash/merge join instead of many lookups." },
      { kind: "sql", lines: ["-- correlated (per-row re-evaluation)", "SELECT e.name FROM employees e", "WHERE e.salary > (", "  SELECT AVG(s.salary) FROM employees s WHERE s.dept_id = e.dept_id", ");", "", "-- rewritten as a JOIN to a pre-aggregated set", "SELECT e.name", "FROM employees e", "JOIN (", "  SELECT dept_id, AVG(salary) AS avg_sal", "  FROM employees GROUP BY dept_id", ") a ON a.dept_id = e.dept_id", "WHERE e.salary > a.avg_sal;"] }
    ],
    oneLiner: "Replace a per-row correlated subquery with a JOIN to a pre-aggregated derived table so the engine computes the aggregate once and uses one set-based join."
  },
  "l3-c-32": {
    answer: [
      { kind: "text", text: "GROUP BY extensions add subtotal/grand-total rows. ROLLUP gives hierarchical subtotals (a, then a+total); CUBE gives all combinations of the grouping columns; GROUPING SETS lets you list exactly the groupings you want. GROUPING() flags the total rows." },
      { kind: "sql", lines: ["SELECT region, product, SUM(amount) AS total", "FROM sales", "GROUP BY ROLLUP (region, product);"] },
      { kind: "table", title: "Demo — ROLLUP subtotals (NULL = total)", headers: ["region", "product", "total"], rows: [["EU", "Widget", "100"], ["EU", "NULL", "100"], ["NULL", "NULL", "260"]] }
    ],
    oneLiner: "ROLLUP adds hierarchical subtotals, CUBE adds every combination, and GROUPING SETS lists exact groupings — NULLs in the grouping columns mark the subtotal/total rows."
  },
  "l3-c-33": {
    answer: [
      { kind: "text", text: "Wrap dependent statements in a transaction so they commit as a unit; roll back on error to leave the database unchanged. This is the atomic money-transfer pattern." },
      { kind: "sql", lines: ["BEGIN;", "  UPDATE accounts SET balance = balance - 100 WHERE id = 1;", "  UPDATE accounts SET balance = balance + 100 WHERE id = 2;", "  -- if a check fails or an error occurs:", "  -- ROLLBACK;", "COMMIT;"] },
      { kind: "text", text: "In application code, run the body in a try/catch: COMMIT on success, ROLLBACK in the error handler. SAVEPOINT allows partial rollback within a transaction." }
    ],
    oneLiner: "BEGIN ... statements ... COMMIT executes them atomically; ROLLBACK on error undoes everything, and SAVEPOINT allows partial rollback within the transaction."
  },
  "l3-c-34": {
    answer: [
      { kind: "text", text: "A stored procedure encapsulates parameterized logic callable with EXEC/CALL. Below (SQL Server style) it returns the employees of a given department." },
      { kind: "sql", lines: ["CREATE PROCEDURE GetEmployeesByDept", "  @dept_id INT", "AS", "BEGIN", "  SELECT id, name, salary", "  FROM employees", "  WHERE dept_id = @dept_id", "  ORDER BY salary DESC;", "END;", "", "EXEC GetEmployeesByDept @dept_id = 2;"] },
      { kind: "text", text: "MySQL/Postgres use CREATE PROCEDURE p(IN dept_id INT) ... and CALL p(2); parameters can be IN, OUT, or INOUT." }
    ],
    oneLiner: "CREATE PROCEDURE with typed parameters encapsulates reusable logic; invoke it via EXEC/CALL passing arguments (IN/OUT/INOUT)."
  },
  "l3-c-35": {
    answer: [
      { kind: "text", text: "A trigger runs automatically on a table event (INSERT/UPDATE/DELETE). An AFTER INSERT/UPDATE trigger is the classic audit-log pattern: it writes the changed row to a history table. NEW references the incoming row (OLD the prior values on update/delete)." },
      { kind: "sql", lines: ["-- PostgreSQL: trigger function + trigger", "CREATE FUNCTION log_salary_change() RETURNS trigger AS $$", "BEGIN", "  INSERT INTO salary_audit (emp_id, old_salary, new_salary, changed_at)", "  VALUES (NEW.id, OLD.salary, NEW.salary, NOW());", "  RETURN NEW;", "END;", "$$ LANGUAGE plpgsql;", "", "CREATE TRIGGER trg_salary_audit", "AFTER UPDATE ON employees", "FOR EACH ROW EXECUTE FUNCTION log_salary_change();"] },
      { kind: "text", text: "MySQL inlines the body: CREATE TRIGGER trg AFTER UPDATE ON employees FOR EACH ROW INSERT INTO salary_audit ... using NEW/OLD directly." }
    ],
    oneLiner: "An AFTER INSERT/UPDATE trigger fires per row and writes OLD/NEW values into an audit table — the standard change-logging pattern."
  }
};
