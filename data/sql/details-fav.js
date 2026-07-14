// data/sql/details-fav.js — worked answers for the "Must-Know (Most Asked)" SQL questions.
// Original explanations, queries, and demo/result tables.
// answer block kinds: {kind:"text",text} | {kind:"sql",lines:[...]} | {kind:"table",title,headers,rows}

export const DETAILS = {
  "fav-t-1": {
    answer: [
      { kind: "text", text: "DELETE removes chosen rows (supports WHERE), is fully logged, fires triggers, and can be rolled back. TRUNCATE removes ALL rows fast by deallocating data pages, resets AUTO_INCREMENT, is minimally logged, and can't use WHERE. DROP removes the entire table — structure, data, indexes, and constraints." },
      { kind: "table", title: "Comparison", headers: ["", "DELETE", "TRUNCATE", "DROP"], rows: [["Removes", "chosen rows", "all rows", "the whole table"], ["WHERE", "yes", "no", "no"], ["Type", "DML", "DDL", "DDL"], ["Rollback", "yes", "limited", "no (usually)"], ["Resets identity", "no", "yes", "n/a"], ["Speed", "slow", "fast", "fast"]] }
    ],
    oneLiner: "DELETE = row-by-row (WHERE, logged, rollback); TRUNCATE = wipe all fast; DROP = delete the table entirely."
  },
  "fav-t-2": {
    answer: [
      { kind: "text", text: "Both enforce uniqueness. A PRIMARY KEY uniquely identifies each row: exactly one per table, never NULL, and it's the default clustered index in many engines. A UNIQUE key also forbids duplicates but you can have many per table and it permits one NULL (in most databases)." },
      { kind: "table", title: "Comparison", headers: ["", "Primary Key", "Unique Key"], rows: [["Per table", "one", "many"], ["NULLs", "never", "one allowed"], ["Purpose", "row identity", "prevent duplicates"], ["Index", "clustered (usually)", "non-clustered"]] }
    ],
    oneLiner: "Primary key: one per table, never NULL, identifies rows. Unique: many per table, allows one NULL."
  },
  "fav-t-3": {
    answer: [
      { kind: "text", text: "JOINs combine rows from two tables on a related column. INNER — only matching rows. LEFT — all left rows + matches (NULLs on the right when none). RIGHT — the mirror. FULL OUTER — all rows from both (NULLs where no match). CROSS — Cartesian product (every left × every right). SELF — a table joined to itself (e.g. employee to their manager)." },
      { kind: "sql", lines: ["SELECT e.name, m.name AS manager", "FROM employees e", "LEFT JOIN employees m ON e.manager_id = m.id;   -- SELF + LEFT JOIN"] },
      { kind: "table", title: "Quick reference", headers: ["JOIN", "Returns"], rows: [["INNER", "matches in both"], ["LEFT / RIGHT", "all of one side + matches"], ["FULL", "all rows, both sides"], ["CROSS", "every combination"], ["SELF", "table joined to itself"]] }
    ],
    oneLiner: "INNER = matches only; LEFT/RIGHT keep one side fully; FULL keeps both; CROSS = all combos; SELF joins a table to itself."
  },
  "fav-t-11": {
    answer: [
      { kind: "text", text: "WHERE filters individual rows before grouping and cannot contain aggregates. HAVING filters groups after GROUP BY aggregation, so it can reference aggregate results like COUNT(*) or SUM(...)." },
      { kind: "sql", lines: ["SELECT dept, COUNT(*) AS cnt", "FROM employees", "WHERE active = 1        -- rows (before grouping)", "GROUP BY dept", "HAVING COUNT(*) > 5;    -- groups (after aggregation)"] }
    ],
    oneLiner: "WHERE filters rows before grouping; HAVING filters groups after aggregation (can use aggregates)."
  },
  "fav-t-12": {
    answer: [
      { kind: "text", text: "All three number rows within a partition ordered by some column; they differ only on ties. ROW_NUMBER always gives distinct sequential numbers (ties broken arbitrarily). RANK gives ties the same number but then SKIPS the next values (1,1,3). DENSE_RANK gives ties the same number with NO gaps (1,1,2)." },
      { kind: "table", title: "Salaries 100, 100, 90, 80", headers: ["salary", "ROW_NUMBER", "RANK", "DENSE_RANK"], rows: [["100", "1", "1", "1"], ["100", "2", "1", "1"], ["90", "3", "3", "2"], ["80", "4", "4", "3"]] }
    ],
    oneLiner: "ROW_NUMBER = always unique; RANK = ties tie then skip (1,1,3); DENSE_RANK = ties tie, no gaps (1,1,2)."
  },
  "fav-t-13": {
    answer: [
      { kind: "text", text: "A window function computes a value across a set of rows RELATED to the current row, without collapsing them — unlike an aggregate + GROUP BY which returns one row per group. You keep every detail row and add the computed column via OVER (PARTITION BY ... ORDER BY ...)." },
      { kind: "sql", lines: ["-- each employee's salary AND their department average, side by side", "SELECT name, dept, salary,", "       AVG(salary) OVER (PARTITION BY dept) AS dept_avg,", "       RANK()      OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk", "FROM employees;"] }
    ],
    oneLiner: "Window functions compute over related rows via OVER(...) while keeping every row — aggregates collapse groups."
  },
  "fav-t-14": {
    answer: [
      { kind: "text", text: "A CTE (WITH clause) is a named temporary result you define once and reference in the main query — improving readability, enabling recursion, and letting you reuse the same derived set multiple times. A subquery is nested inline. Functionally a non-recursive CTE and a derived-table subquery are similar; CTEs win on readability and recursion, and can be self-referencing." },
      { kind: "sql", lines: ["WITH dept_avg AS (", "  SELECT dept, AVG(salary) AS avg_sal FROM employees GROUP BY dept)", "SELECT e.name, e.salary, d.avg_sal", "FROM employees e JOIN dept_avg d ON e.dept = d.dept", "WHERE e.salary > d.avg_sal;"] }
    ],
    oneLiner: "CTEs are named, reusable, readable, and support recursion; subqueries are inline. Same power for simple cases."
  },
  "fav-t-15": {
    answer: [
      { kind: "text", text: "Both test membership. IN compares against a materialized list/subquery result and works well for small lists. EXISTS stops at the FIRST matching row of a correlated subquery, so it's often faster for large or correlated checks and is NULL-safe (unlike NOT IN, which returns no rows if the list contains a NULL). Rule of thumb: EXISTS for correlated existence checks, IN for small static lists." },
      { kind: "sql", lines: ["-- customers who placed at least one order", "SELECT c.* FROM customers c", "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);"] }
    ],
    oneLiner: "IN = match a list (fine for small sets); EXISTS = stop at first correlated match (better for big/correlated, NULL-safe)."
  },
  "fav-t-16": {
    answer: [
      { kind: "text", text: "A CLUSTERED index defines the physical order of the table's rows, so the data IS the index leaf — only one per table, very fast for range scans and lookups on the key. A NON-CLUSTERED index is a separate structure holding the key + a pointer (row locator) back to the data — many per table, adds a lookup step to fetch other columns (unless the index 'covers' the query)." },
      { kind: "table", title: "Comparison", headers: ["", "Clustered", "Non-clustered"], rows: [["Per table", "one", "many"], ["Stores", "the actual rows", "key + pointer"], ["Range scans", "excellent", "extra lookups"], ["Analogy", "phone book (sorted)", "index at back of a book"]] }
    ],
    oneLiner: "Clustered = rows physically sorted by the key (one per table); non-clustered = separate key→row pointer (many)."
  },
  "fav-t-17": {
    answer: [
      { kind: "text", text: "ACID guarantees reliable transactions. Atomicity — all-or-nothing (a transfer debits and credits both or neither). Consistency — constraints/rules hold before and after. Isolation — concurrent transactions don't corrupt each other. Durability — once committed, data survives a crash (written to durable storage / WAL)." }
    ],
    oneLiner: "Atomicity (all-or-nothing), Consistency (rules hold), Isolation (no interference), Durability (survives crashes)."
  },
  "fav-t-18": {
    answer: [
      { kind: "text", text: "Isolation levels trade correctness for concurrency by controlling which anomalies are possible." },
      { kind: "table", title: "Levels vs anomalies", headers: ["Level", "Dirty read", "Non-repeatable read", "Phantom read"], rows: [["READ UNCOMMITTED", "possible", "possible", "possible"], ["READ COMMITTED", "no", "possible", "possible"], ["REPEATABLE READ", "no", "no", "possible*"], ["SERIALIZABLE", "no", "no", "no"]] },
      { kind: "text", text: "Dirty read = reading uncommitted data; non-repeatable = a row's value changes if re-read; phantom = new rows appear for the same query. (*MySQL InnoDB's REPEATABLE READ prevents phantoms via gap locks.)" }
    ],
    oneLiner: "READ UNCOMMITTED→SERIALIZABLE progressively remove dirty, non-repeatable, and phantom reads (at concurrency cost)."
  },
  "fav-t-19": {
    answer: [
      { kind: "text", text: "A deadlock is when two+ transactions each hold a lock the other needs, so neither can proceed. The DB detects the cycle and kills one as the 'victim' (rolled back). Prevention: acquire locks in a consistent global order, keep transactions short, use lower isolation where safe, add proper indexes (to lock fewer rows), and retry the victim transaction." }
    ],
    oneLiner: "Two transactions each wait on a lock the other holds; the DB kills a victim. Prevent with consistent lock ordering, short txns, retries."
  },
  "fav-t-20": {
    answer: [
      { kind: "text", text: "Two strategies for concurrent updates. Pessimistic locking locks the row up front (SELECT ... FOR UPDATE) so others wait — good for high-contention hotspots, but reduces concurrency and can deadlock. Optimistic locking takes no lock; it adds a version/timestamp column and, on update, checks the version hasn't changed — if it has, the update fails and the app retries. Good for low contention and stateless web apps." },
      { kind: "sql", lines: ["-- optimistic: update only if version matches, then retry on 0 rows", "UPDATE accounts SET balance = balance - 100, version = version + 1", "WHERE id = 5 AND version = 7;"] }
    ],
    oneLiner: "Pessimistic locks the row up front (FOR UPDATE); optimistic checks a version on write and retries on conflict."
  },
  "fav-t-21": {
    answer: [
      { kind: "text", text: "EXPLAIN shows the optimizer's chosen plan for a query. EXPLAIN ANALYZE actually runs it and reports real timings. Read it to spot: full table scans (type=ALL) instead of index use, rows examined vs returned (a big gap means poor filtering), the join order and algorithm (nested loop / hash / merge), filesort / temporary tables, and whether your indexes are used." },
      { kind: "sql", lines: ["EXPLAIN SELECT * FROM orders WHERE customer_id = 42;", "EXPLAIN ANALYZE SELECT ...;   -- also runs it and shows real time"] }
    ],
    oneLiner: "EXPLAIN reveals the plan (scans vs index use, rows examined, join type); ANALYZE runs it with real timings."
  },
  "fav-t-22": {
    answer: [
      { kind: "text", text: "Common techniques: 1) index the columns in WHERE/JOIN/ORDER BY; 2) SELECT only needed columns (never *); 3) keep predicates SARGable (no functions on indexed columns); 4) avoid N+1 by joining/batching; 5) filter early and reduce the working set; 6) use covering/composite indexes; 7) rewrite correlated subqueries as joins where cheaper; 8) paginate with keyset instead of large OFFSET; 9) read EXPLAIN and update statistics; 10) partition/archive very large tables." }
    ],
    oneLiner: "Add the right indexes, select only needed columns, keep predicates SARGable, filter early, kill N+1, and read EXPLAIN."
  },
  "fav-t-23": {
    answer: [
      { kind: "text", text: "Normalization splits data into related tables to remove redundancy and update anomalies (1NF: atomic columns; 2NF: no partial dependency on part of a composite key; 3NF: no transitive dependency). Denormalization deliberately re-introduces redundancy (duplicated columns, pre-joined tables, summary tables) to speed up reads by avoiding joins — at the cost of extra storage and write complexity. OLTP leans normalized; analytics/OLAP often denormalizes." }
    ],
    oneLiner: "Normalize to remove redundancy/anomalies (write-friendly); denormalize to avoid joins for faster reads (read-heavy)."
  },
  "fav-t-24": {
    answer: [
      { kind: "text", text: "Two MySQL storage engines. InnoDB (the modern default) supports transactions (ACID), row-level locking, foreign keys, and crash recovery — best for concurrent read/write OLTP. MyISAM is older: no transactions, table-level locking, no foreign keys, but historically fast for read-heavy/full-text workloads. Use InnoDB for almost everything today." },
      { kind: "table", title: "Comparison", headers: ["", "InnoDB", "MyISAM"], rows: [["Transactions", "yes (ACID)", "no"], ["Locking", "row-level", "table-level"], ["Foreign keys", "yes", "no"], ["Crash recovery", "yes", "weak"], ["Best for", "OLTP / concurrency", "legacy read-heavy"]] }
    ],
    oneLiner: "InnoDB = transactions + row locks + FKs (default, use this); MyISAM = older, table locks, no transactions."
  },
  "fav-t-25": {
    answer: [
      { kind: "text", text: "A B+ Tree is the balanced, multi-level index structure most relational databases use. Internal nodes hold only keys to guide the search; ALL actual data/pointers live in the leaf level, and the leaves are linked in order. That gives O(log n) point lookups AND efficient range scans (walk the linked leaves), with a shallow tree (high fan-out) that minimizes disk reads — ideal for on-disk data." }
    ],
    oneLiner: "A balanced tree with keys in internal nodes and data in linked leaves — O(log n) lookups + fast ordered range scans."
  },
  "fav-t-26": {
    answer: [
      { kind: "text", text: "The N+1 problem: you fetch N parent rows, then run one more query per parent to load its related data — 1 + N round trips, which crushes performance. It's classic with ORMs and lazy loading (looping over orders and touching each order.customer). Fix: fetch the related data in ONE query with a JOIN / JOIN FETCH, use an ORM 'eager'/batch fetch, or a single WHERE id IN (...)." },
      { kind: "sql", lines: ["-- instead of 1 + N queries, one join:", "SELECT o.*, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;"] }
    ],
    oneLiner: "1 query for parents + 1 per child = 1+N round trips; fix with a JOIN / JOIN FETCH / WHERE IN batch."
  },
  "fav-t-27": {
    answer: [
      { kind: "text", text: "In ORMs, LAZY loading defers fetching a related entity until you actually access it (a proxy triggers a query on first use) — saves work if you don't need it, but risks N+1 and 'lazy initialization' errors outside a session. EAGER loading fetches the association immediately with the parent — convenient but can over-fetch and load huge graphs. Best practice: default to LAZY and fetch what you need explicitly per query (JOIN FETCH)." }
    ],
    oneLiner: "LAZY loads a relation on first access (risk: N+1); EAGER loads it upfront (risk: over-fetch). Default LAZY + fetch per query."
  },
  "fav-t-28": {
    answer: [
      { kind: "text", text: "JPA (Jakarta Persistence API) is the SPECIFICATION — a standard set of interfaces and annotations (@Entity, EntityManager, JPQL) for ORM in Java. Hibernate is the most popular IMPLEMENTATION of JPA (plus extra features beyond the spec, like its own Session API and second-level cache). You code against JPA interfaces and Hibernate provides the engine underneath." }
    ],
    oneLiner: "JPA is the ORM specification (interfaces/annotations); Hibernate is a popular implementation of it (with extras)."
  },
  "fav-t-29": {
    answer: [
      { kind: "text", text: "@Transactional wraps a method in a database transaction via a proxy. PROPAGATION controls how it behaves relative to an existing transaction: REQUIRED (default — join or start one), REQUIRES_NEW (suspend the outer, start a fresh independent one — e.g. audit logs that must commit even if the caller rolls back), NESTED (savepoint), SUPPORTS / NOT_SUPPORTED / MANDATORY / NEVER. ISOLATION maps to the DB isolation level (READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE). Gotcha: self-invocation bypasses the proxy, and by default only unchecked exceptions trigger rollback (use rollbackFor for checked ones)." }
    ],
    oneLiner: "Propagation = how it joins/starts transactions (REQUIRED, REQUIRES_NEW, NESTED…); isolation = the DB isolation level. Watch self-invocation + rollback rules."
  },
  "fav-t-30": {
    answer: [
      { kind: "text", text: "Sketch the core entities and relationships, then discuss keys, indexes, and integrity. A minimal e-commerce/payments schema:" },
      { kind: "sql", lines: ["customers(id PK, name, email UNIQUE, created_at)", "products(id PK, name, price, stock)", "orders(id PK, customer_id FK→customers, status, total, created_at)", "order_items(id PK, order_id FK→orders, product_id FK→products, qty, unit_price)", "payments(id PK, order_id FK→orders, amount, method, status,", "         idempotency_key UNIQUE, created_at)", "-- payment_events(id, payment_id FK, type, payload, created_at)  -- audit/ledger"] },
      { kind: "text", text: "Talking points: money as DECIMAL (never float); an idempotency_key on payments so retries don't double-charge; a state machine on order/payment status (PENDING→PAID→SHIPPED / FAILED / REFUNDED); indexes on customer_id, order_id, and status for lookups; an append-only ledger/events table for auditing; and foreign keys for referential integrity." }
    ],
    oneLiner: "customers → orders → order_items → products, plus payments with an idempotency key; DECIMAL money, status state machine, FKs, and a ledger table."
  },

  "fav-c-4": {
    answer: [
      { kind: "sql", lines: ["-- Approach 1: subquery + MAX", "SELECT MAX(salary) FROM employees", "WHERE salary < (SELECT MAX(salary) FROM employees);", "", "-- Approach 2: DISTINCT + OFFSET", "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;"] },
      { kind: "table", title: "Demo — salaries 100, 90, 90, 80", headers: ["value", "note"], rows: [["100", "max"], ["90", "2nd highest ✓ (dupes collapse)"]] }
    ],
    oneLiner: "MAX below the overall MAX, or DISTINCT salaries ordered DESC with OFFSET 1."
  },
  "fav-c-5": {
    answer: [
      { kind: "sql", lines: ["-- 3rd highest = OFFSET 2", "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;", "", "-- or with DENSE_RANK (handles ties as one rank)", "SELECT salary FROM (", "  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rnk FROM employees", ") t WHERE rnk = 3;"] }
    ],
    oneLiner: "DISTINCT DESC with OFFSET 2, or DENSE_RANK() = 3 (ties count as one rank)."
  },
  "fav-c-6": {
    answer: [
      { kind: "sql", lines: ["-- generic Nth highest", "SELECT salary FROM (", "  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rnk", "  FROM employees", ") t WHERE rnk = :N;", "", "-- or LIMIT/OFFSET (N-1)", "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET (:N - 1);"] }
    ],
    oneLiner: "DENSE_RANK() = N, or DISTINCT DESC with OFFSET (N−1). DENSE_RANK is the cleanest for ties."
  },
  "fav-c-7": {
    answer: [
      { kind: "sql", lines: ["SELECT email, COUNT(*) AS cnt", "FROM users", "GROUP BY email", "HAVING COUNT(*) > 1;"] },
      { kind: "table", title: "Demo result", headers: ["email", "cnt"], rows: [["a@x.com", "3"], ["b@x.com", "2"]] }
    ],
    oneLiner: "GROUP BY the duplicate column and keep groups with HAVING COUNT(*) > 1."
  },
  "fav-c-8": {
    answer: [
      { kind: "sql", lines: ["-- keep the lowest id per duplicate group, delete the rest", "WITH ranked AS (", "  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) AS rn", "  FROM users", ")", "DELETE FROM users WHERE id IN (SELECT id FROM ranked WHERE rn > 1);"] },
      { kind: "text", text: "ROW_NUMBER numbers each duplicate group; rn = 1 is the keeper, rn > 1 are removed. (MySQL 5.x without CTEs: self-join on email with id > min(id).)" }
    ],
    oneLiner: "ROW_NUMBER() per duplicate group, keep rn = 1, delete rn > 1."
  },
  "fav-c-9": {
    answer: [
      { kind: "sql", lines: ["-- self-join employee to their manager", "SELECT e.name AS employee", "FROM employees e", "JOIN employees m ON e.manager_id = m.id", "WHERE e.salary > m.salary;"] },
      { kind: "table", title: "Demo", headers: ["employee", "emp salary", "mgr salary", "shown?"], rows: [["Asha", "90", "80", "yes ✓"], ["Ravi", "60", "80", "no"]] }
    ],
    oneLiner: "Self-join employees to managers on manager_id and keep rows where the employee's salary is higher."
  },
  "fav-c-10": {
    answer: [
      { kind: "sql", lines: ["-- max salary per department", "SELECT dept, MAX(salary) AS top_salary", "FROM employees", "GROUP BY dept;", "", "-- to also get WHO earns it, use a window function:", "SELECT name, dept, salary FROM (", "  SELECT *, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) rk", "  FROM employees", ") t WHERE rk = 1;"] },
      { kind: "table", title: "Demo result", headers: ["dept", "top_salary"], rows: [["Sales", "90"], ["IT", "120"]] }
    ],
    oneLiner: "GROUP BY dept + MAX(salary); to also get the person, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) = 1."
  }
};
