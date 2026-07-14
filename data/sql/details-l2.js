// data/sql/details-l2.js — worked answers for Level 2 (Mid, 3 yrs) SQL questions.
// Original explanations, queries, and demo/result tables.
// answer block kinds: {kind:"text",text} | {kind:"sql",lines:[...]} | {kind:"table",title,headers,rows}

export const DETAILS = {
  "l2-t-1": {
    answer: [
      { kind: "text", text: "An index is a separate, ordered data structure that lets the engine find rows by key value without scanning the whole table. It trades extra storage and slower writes (every INSERT/UPDATE/DELETE must maintain the index) for much faster reads and range scans. The default structure is a balanced B-tree, which keeps lookups at O(log n)." },
      { kind: "table", title: "Common index types", headers: ["Type", "What it does"], rows: [["Clustered", "Physically orders the table rows by the key; one per table (the table IS the index)"], ["Non-clustered", "Separate structure holding key + a pointer/row-locator back to the table; many allowed"], ["Composite", "Indexes multiple columns in order; helps queries filtering on a leading prefix"], ["Unique", "Enforces uniqueness while also speeding lookups"], ["B-tree", "The default balanced-tree layout behind most of the above"]] },
      { kind: "text", text: "Because a composite index is ordered left to right, an index on (a, b) helps WHERE a = ? and WHERE a = ? AND b = ?, but not a query filtering on b alone." }
    ],
    oneLiner: "An index is an ordered structure (usually a B-tree) that speeds reads at the cost of storage and slower writes; clustered orders the table itself, non-clustered points back to it."
  },
  "l2-t-2": {
    answer: [
      { kind: "text", text: "Normalization organizes columns and tables to reduce redundancy and update anomalies by ensuring every fact is stored in exactly one place. Each normal form builds on the previous one." },
      { kind: "table", title: "Normal forms", headers: ["Form", "Rule"], rows: [["1NF", "Atomic column values; no repeating groups or arrays in a cell"], ["2NF", "1NF + no partial dependency: non-key columns depend on the WHOLE composite key"], ["3NF", "2NF + no transitive dependency: non-key columns depend on nothing but the key"], ["BCNF", "Stricter 3NF: every determinant (left side of a dependency) must be a candidate key"]] },
      { kind: "text", text: "BCNF handles the edge cases 3NF misses, such as tables with overlapping candidate keys where a non-prime attribute determines part of a key." }
    ],
    oneLiner: "Normalization removes redundancy step by step: 1NF atomic values, 2NF no partial key dependency, 3NF no transitive dependency, BCNF every determinant is a candidate key."
  },
  "l2-t-3": {
    answer: [
      { kind: "text", text: "Denormalization deliberately reintroduces redundancy — duplicated columns, pre-joined tables, or stored aggregates — to avoid expensive joins and speed up reads. It is a read-optimization that costs write complexity and storage." },
      { kind: "text", text: "Use it for read-heavy reporting/analytics workloads, dashboards, or hot paths where a join is measurably too slow. The cost is that duplicated data must be kept in sync (via triggers, application logic, or scheduled jobs), so it is appropriate only after a normalized design and indexing prove insufficient." }
    ],
    oneLiner: "Denormalization adds controlled redundancy to speed up reads, trading write/consistency overhead — used for read-heavy reporting once a normalized design is too slow."
  },
  "l2-t-4": {
    answer: [
      { kind: "text", text: "ACID is the set of guarantees a transaction provides so that concurrent, failure-prone operations still leave the database correct." },
      { kind: "table", title: "ACID", headers: ["Property", "Guarantee"], rows: [["Atomicity", "All statements in the transaction commit together or none do (all-or-nothing)"], ["Consistency", "A transaction moves the DB from one valid state to another, respecting all constraints"], ["Isolation", "Concurrent transactions do not see each other's uncommitted intermediate state"], ["Durability", "Once committed, changes survive crashes (written to durable storage / the log)"]] }
    ],
    oneLiner: "ACID = Atomicity (all-or-nothing), Consistency (constraints upheld), Isolation (no interference between concurrent txns), Durability (committed data survives crashes)."
  },
  "l2-t-5": {
    answer: [
      { kind: "text", text: "A JOIN combines columns from multiple tables into one wider result set. A subquery is a query nested inside another that returns a scalar, a list, or a table used by the outer query. They often express the same intent, and the optimizer can rewrite one into the other." },
      { kind: "text", text: "Use a JOIN when you need columns from both tables in the output. Use a subquery for existence/membership tests or when you only need a single derived value (e.g. compared against an aggregate). JOINs are frequently easier for the optimizer to plan well." },
      { kind: "sql", lines: ["-- same result, two styles", "SELECT e.name FROM employees e", "JOIN departments d ON e.dept_id = d.id WHERE d.name = 'Sales';", "", "SELECT name FROM employees", "WHERE dept_id = (SELECT id FROM departments WHERE name = 'Sales');"] }
    ],
    oneLiner: "A JOIN merges columns from tables; a subquery is a nested query returning a value/list/table — use JOINs when you need columns from both sides, subqueries for membership or single derived values."
  },
  "l2-t-6": {
    answer: [
      { kind: "text", text: "A correlated subquery references a column from the outer query, so it cannot be evaluated once on its own — logically it re-runs for each candidate outer row. A normal (non-correlated) subquery is independent and can be evaluated a single time up front." },
      { kind: "sql", lines: ["-- correlated: inner refers to outer alias e", "SELECT e.name FROM employees e", "WHERE e.salary > (", "  SELECT AVG(s.salary) FROM employees s", "  WHERE s.dept_id = e.dept_id   -- depends on the outer row", ");"] },
      { kind: "text", text: "Correlated subqueries are expressive but can be slow at scale; the optimizer often rewrites them as joins or window functions." }
    ],
    oneLiner: "A correlated subquery references the outer query's columns so it conceptually re-evaluates per outer row, unlike a normal subquery that runs once independently."
  },
  "l2-t-7": {
    answer: [
      { kind: "text", text: "EXISTS tests whether a subquery returns any row and can short-circuit on the first match; it is typically preferred when the subquery is correlated and may return many rows. IN compares a value against a materialized list of values." },
      { kind: "text", text: "For large or correlated inner sets, EXISTS is usually as fast or faster and, crucially, is not broken by NULLs the way NOT IN is. For small static lists, IN is simplest and just as good." },
      { kind: "sql", lines: ["SELECT c.name FROM customers c", "WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);"] }
    ],
    oneLiner: "EXISTS checks for any matching row (short-circuits, correlated, NULL-safe); IN matches against a value list — prefer EXISTS for large/correlated sets, IN for small static lists."
  },
  "l2-t-8": {
    answer: [
      { kind: "text", text: "NOT IN evaluates x NOT IN (list) as x <> v1 AND x <> v2 AND .... If any value in the list is NULL, one of those comparisons yields UNKNOWN, so the whole AND can never be TRUE — meaning NOT IN returns no rows (or silently drops rows) whenever the list contains a NULL." },
      { kind: "sql", lines: ["-- if orders.customer_id can be NULL, this may return NOTHING:", "SELECT * FROM customers", "WHERE id NOT IN (SELECT customer_id FROM orders);", "", "-- NULL-safe rewrite:", "SELECT c.* FROM customers c", "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);"] }
    ],
    oneLiner: "A NULL in the NOT IN list makes a comparison UNKNOWN, so the whole predicate is never true and rows silently disappear — use NOT EXISTS or filter out NULLs instead."
  },
  "l2-t-9": {
    answer: [
      { kind: "text", text: "A view is a named, stored SELECT query that behaves like a virtual table — it holds no data itself but runs its definition each time it is queried. Advantages: it hides complexity (encapsulating joins/filters behind a simple name), provides a stable interface if underlying tables change, and improves security by exposing only certain columns/rows." },
      { kind: "sql", lines: ["CREATE VIEW active_customers AS", "SELECT id, name, email", "FROM customers", "WHERE status = 'active';", "", "SELECT * FROM active_customers;   -- query it like a table"] }
    ],
    oneLiner: "A view is a stored query that acts as a virtual table — it hides complexity, gives a stable interface, and can restrict which columns/rows users see."
  },
  "l2-t-10": {
    answer: [
      { kind: "text", text: "Both are stored, reusable database routines, but they differ in purpose and where they can be used." },
      { kind: "table", title: "Procedure vs function", headers: ["Aspect", "Stored procedure", "Function"], rows: [["Returns", "Zero or more result sets / OUT params", "A single value (or a table, if table-valued)"], ["Called from", "EXEC / CALL statement", "Inside a SELECT/WHERE expression"], ["Side effects", "Can INSERT/UPDATE/DELETE, manage transactions", "Usually read-only, no DML/transaction control"], ["Use case", "Business operations, batch logic", "Reusable computed values"]] }
    ],
    oneLiner: "A procedure is invoked with CALL/EXEC and can perform DML and return result sets; a function returns a value and is used inside expressions, generally without side effects."
  },
  "l2-t-11": {
    answer: [
      { kind: "text", text: "A CTE (Common Table Expression) is a named temporary result set defined with WITH that exists only for the duration of a single query. It improves readability by naming intermediate steps, lets you reference the same subquery multiple times, and enables recursion (WITH RECURSIVE) for hierarchical data." },
      { kind: "sql", lines: ["WITH dept_avg AS (", "  SELECT dept_id, AVG(salary) AS avg_sal", "  FROM employees GROUP BY dept_id", ")", "SELECT e.name, e.salary, d.avg_sal", "FROM employees e", "JOIN dept_avg d ON e.dept_id = d.dept_id", "WHERE e.salary > d.avg_sal;"] }
    ],
    oneLiner: "A CTE is a WITH-defined named temporary result set that makes queries readable, reusable within one statement, and enables recursion for hierarchies."
  },
  "l2-t-12": {
    answer: [
      { kind: "text", text: "All three are ranking window functions over an ordered partition, differing only in how they handle ties. ROW_NUMBER gives every row a distinct sequential number. RANK gives tied rows the same rank then skips the next value(s). DENSE_RANK gives tied rows the same rank with no gap." },
      { kind: "table", title: "Demo — ORDER BY salary DESC", headers: ["salary", "ROW_NUMBER", "RANK", "DENSE_RANK"], rows: [["100", "1", "1", "1"], ["90", "2", "2", "2"], ["90", "3", "2", "2"], ["80", "4", "4", "3"]] }
    ],
    oneLiner: "ROW_NUMBER is always distinct; RANK repeats on ties and leaves gaps; DENSE_RANK repeats on ties without gaps."
  },
  "l2-t-13": {
    answer: [
      { kind: "text", text: "A window function computes a value across a set of rows related to the current row (its window) WITHOUT collapsing them — each input row still appears in the output. An aggregate with GROUP BY collapses each group into a single row. Window functions use OVER (PARTITION BY ... ORDER BY ...)." },
      { kind: "sql", lines: ["-- aggregate: one row per dept", "SELECT dept_id, AVG(salary) FROM employees GROUP BY dept_id;", "", "-- window: every employee row kept, plus its dept average", "SELECT name, dept_id, salary,", "       AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg", "FROM employees;"] }
    ],
    oneLiner: "A window function computes across related rows via OVER() while keeping every row; an aggregate with GROUP BY collapses each group to one row."
  },
  "l2-t-14": {
    answer: [
      { kind: "text", text: "A self-join joins a table to itself using two aliases, treating it as if it were two tables. It is useful for comparing rows within the same table — hierarchies (employee to manager), finding pairs, or comparing a row to others sharing a value." },
      { kind: "sql", lines: ["-- each employee with their manager's name", "SELECT e.name AS employee, m.name AS manager", "FROM employees e", "LEFT JOIN employees m ON e.manager_id = m.id;"] }
    ],
    oneLiner: "A self-join joins a table to itself with two aliases to compare rows within the same table — e.g. employee-to-manager hierarchies."
  },
  "l2-t-15": {
    answer: [
      { kind: "text", text: "These describe keys in terms of uniqueness and their role in identifying a row." },
      { kind: "table", title: "Key terminology", headers: ["Key", "Meaning"], rows: [["Super key", "Any column set that uniquely identifies a row (may include extra columns)"], ["Candidate key", "A minimal super key — no column can be removed and still stay unique"], ["Primary key", "The one candidate key chosen to identify rows"], ["Alternate key", "A candidate key not chosen as the primary key"], ["Composite key", "A key made of two or more columns together"]] }
    ],
    oneLiner: "Super key = any unique column set; candidate key = a minimal one; the chosen candidate is the primary key, the rest are alternate keys; a composite key spans multiple columns."
  },
  "l2-t-16": {
    answer: [
      { kind: "text", text: "Referential integrity is the guarantee that a foreign key value always refers to an existing row in the parent table (or is NULL). The database enforces it by rejecting child inserts/updates that point to a missing parent, and by restricting or cascading parent deletes/updates via ON DELETE / ON UPDATE rules." },
      { kind: "text", text: "This prevents orphaned rows — for example, an order row that references a customer_id no longer present in the customers table." }
    ],
    oneLiner: "Referential integrity guarantees every foreign key points to an existing parent row (or is NULL), preventing orphaned records via FK constraints and cascade/restrict rules."
  },
  "l2-t-17": {
    answer: [
      { kind: "text", text: "GROUP BY reduces many rows into one row per group, so only grouped columns and aggregates can appear. PARTITION BY (used inside a window function's OVER clause) divides rows into groups for the calculation but keeps every original row in the output." },
      { kind: "sql", lines: ["-- GROUP BY: 1 row per dept", "SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id;", "", "-- PARTITION BY: all rows, with per-dept count attached", "SELECT name, dept_id,", "       COUNT(*) OVER (PARTITION BY dept_id) AS dept_count", "FROM employees;"] }
    ],
    oneLiner: "GROUP BY collapses each group to one row; PARTITION BY groups rows for a window calculation while keeping every row in the result."
  },

  "l2-c-18": {
    answer: [
      { kind: "text", text: "Take the maximum salary that is strictly below the overall maximum — this yields the 2nd distinct highest and ignores ties at the top." },
      { kind: "sql", lines: ["SELECT MAX(salary) AS second_highest", "FROM employees", "WHERE salary < (SELECT MAX(salary) FROM employees);"] },
      { kind: "table", title: "Demo — employees.salary", headers: ["salary", "note"], rows: [["100000", "top (excluded)"], ["100000", "tie at top (excluded)"], ["90000", "second highest ✓"], ["80000", ""]] }
    ],
    oneLiner: "MAX(salary) WHERE salary < (SELECT MAX(salary)) returns the second-highest distinct salary, tie-safe."
  },
  "l2-c-19": {
    answer: [
      { kind: "text", text: "Two robust approaches: DENSE_RANK (handles ties, gives the Nth distinct salary) or ORDER BY with LIMIT/OFFSET (positional). Shown for N = 3." },
      { kind: "sql", lines: ["-- DENSE_RANK: Nth distinct salary (tie-safe)", "SELECT DISTINCT salary FROM (", "  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk", "  FROM employees", ") t WHERE rnk = 3;", "", "-- LIMIT/OFFSET: skip N-1 distinct rows", "SELECT DISTINCT salary FROM employees", "ORDER BY salary DESC", "LIMIT 1 OFFSET 2;"] }
    ],
    oneLiner: "Use DENSE_RANK() OVER (ORDER BY salary DESC) filtered to rnk = N (tie-safe), or ORDER BY DESC with LIMIT 1 OFFSET N-1."
  },
  "l2-c-20": {
    answer: [
      { kind: "text", text: "Compare each row's salary against a scalar subquery returning the overall average." },
      { kind: "sql", lines: ["SELECT name, salary", "FROM employees", "WHERE salary > (SELECT AVG(salary) FROM employees);"] },
      { kind: "table", title: "Demo — avg = 70000", headers: ["name", "salary", "kept?"], rows: [["Asha", "90000", "yes"], ["Ravi", "60000", "no"], ["Meera", "80000", "yes"]] }
    ],
    oneLiner: "Filter WHERE salary > (SELECT AVG(salary) FROM employees) using a scalar subquery."
  },
  "l2-c-21": {
    answer: [
      { kind: "text", text: "Group by the columns that define a duplicate and keep groups that appear more than once." },
      { kind: "sql", lines: ["SELECT email, COUNT(*) AS occurrences", "FROM users", "GROUP BY email", "HAVING COUNT(*) > 1;"] },
      { kind: "table", title: "Demo result", headers: ["email", "occurrences"], rows: [["a@x.com", "3"], ["b@x.com", "2"]] }
    ],
    oneLiner: "GROUP BY the duplicate-defining columns and HAVING COUNT(*) > 1 to surface repeated values."
  },
  "l2-c-22": {
    answer: [
      { kind: "text", text: "Number rows within each duplicate group, then delete everything except row number 1. This keeps exactly one copy per group." },
      { kind: "sql", lines: ["WITH ranked AS (", "  SELECT id,", "         ROW_NUMBER() OVER (", "           PARTITION BY email ORDER BY id", "         ) AS rn", "  FROM users", ")", "DELETE FROM users", "WHERE id IN (SELECT id FROM ranked WHERE rn > 1);"] },
      { kind: "table", title: "Demo — rn assigned per email", headers: ["id", "email", "rn", "action"], rows: [["1", "a@x.com", "1", "keep"], ["2", "a@x.com", "2", "delete"], ["3", "b@x.com", "1", "keep"]] }
    ],
    oneLiner: "ROW_NUMBER() OVER (PARTITION BY dup_cols ORDER BY id) then delete rows where rn > 1, keeping one per group."
  },
  "l2-c-23": {
    answer: [
      { kind: "text", text: "A CASE expression maps a numeric range into labeled buckets, evaluated top to bottom (first matching branch wins)." },
      { kind: "sql", lines: ["SELECT name, salary,", "  CASE", "    WHEN salary < 50000 THEN 'Low'", "    WHEN salary < 90000 THEN 'Medium'", "    ELSE 'High'", "  END AS band", "FROM employees;"] },
      { kind: "table", title: "Demo result", headers: ["name", "salary", "band"], rows: [["Ravi", "40000", "Low"], ["Asha", "70000", "Medium"], ["Meera", "120000", "High"]] }
    ],
    oneLiner: "CASE WHEN ... THEN ... ELSE ... END buckets values into labels, first matching branch winning."
  },
  "l2-c-24": {
    answer: [
      { kind: "text", text: "COALESCE returns the first non-NULL of its arguments and is the ANSI-standard, multi-argument choice. ISNULL(x, y) is a two-argument SQL Server variant (MySQL has IFNULL)." },
      { kind: "sql", lines: ["SELECT name,", "       COALESCE(phone, mobile, 'N/A') AS contact", "FROM customers;"] },
      { kind: "table", title: "Demo result", headers: ["name", "phone", "mobile", "contact"], rows: [["Asha", "NULL", "555-1", "555-1"], ["Ravi", "NULL", "NULL", "N/A"], ["Meera", "555-9", "555-2", "555-9"]] }
    ],
    oneLiner: "COALESCE(a, b, c) returns the first non-NULL argument (portable, multi-arg); ISNULL/IFNULL are two-argument vendor variants."
  },
  "l2-c-25": {
    answer: [
      { kind: "text", text: "Self-join the table on the shared value and keep pairs whose ids differ, so each grouping of equal values surfaces the matching partners. The a.id < b.id condition avoids listing each pair twice." },
      { kind: "sql", lines: ["SELECT a.name AS student_a, b.name AS student_b, a.gpa", "FROM students a", "JOIN students b", "  ON a.gpa = b.gpa AND a.id < b.id;"] },
      { kind: "table", title: "Demo result — students sharing a GPA", headers: ["student_a", "student_b", "gpa"], rows: [["Asha", "Ravi", "9.1"], ["Meera", "Neha", "8.7"]] }
    ],
    oneLiner: "Self-join ON the shared value with a.id < b.id to list distinct pairs of rows that have the same GPA/salary."
  },
  "l2-c-26": {
    answer: [
      { kind: "text", text: "Group by the category and take MAX of the measure. If you also need the row that owns the max (e.g. the top earner's name), use a window function or a correlated filter instead." },
      { kind: "sql", lines: ["SELECT dept_id, MAX(salary) AS top_salary", "FROM employees", "GROUP BY dept_id;"] },
      { kind: "table", title: "Demo result", headers: ["dept_id", "top_salary"], rows: [["1", "120000"], ["2", "95000"], ["3", "80000"]] }
    ],
    oneLiner: "GROUP BY dept_id with MAX(salary) gives the max per group; use a window function if you also need the owning row's other columns."
  },
  "l2-c-27": {
    answer: [
      { kind: "text", text: "Join employees to departments to get the department name, then SUM salaries per department." },
      { kind: "sql", lines: ["SELECT d.name AS department, SUM(e.salary) AS payroll", "FROM employees e", "JOIN departments d ON e.dept_id = d.id", "GROUP BY d.name;"] },
      { kind: "table", title: "Demo result", headers: ["department", "payroll"], rows: [["Sales", "260000"], ["Engineering", "410000"], ["HR", "150000"]] }
    ],
    oneLiner: "JOIN to bring in the department name, then GROUP BY it with SUM(salary) for total payroll per department."
  },
  "l2-c-28": {
    answer: [
      { kind: "text", text: "LIMIT sets the page size and OFFSET skips prior pages. Always ORDER BY a stable, unique key so pages do not overlap or drop rows. For page P (1-based) of size S, OFFSET = (P-1) * S." },
      { kind: "sql", lines: ["-- page 3, 10 rows per page (skip 20)", "SELECT id, name FROM products", "ORDER BY id", "LIMIT 10 OFFSET 20;"] },
      { kind: "text", text: "Large offsets are slow because the engine still walks and discards the skipped rows; keyset pagination (WHERE id > :last_id) scales better." }
    ],
    oneLiner: "ORDER BY a unique key then LIMIT page_size OFFSET (page-1)*page_size; prefer keyset pagination (WHERE id > last_seen) for large offsets."
  },
  "l2-c-29": {
    answer: [
      { kind: "text", text: "Two idioms: a LEFT JOIN keeping only rows where the right side is NULL, or NOT EXISTS. Prefer these over NOT IN, which breaks on NULLs." },
      { kind: "sql", lines: ["SELECT c.id, c.name", "FROM customers c", "LEFT JOIN orders o ON o.customer_id = c.id", "WHERE o.customer_id IS NULL;"] },
      { kind: "table", title: "Demo — customers with no order", headers: ["id", "name"], rows: [["4", "Neha"], ["7", "Omar"]] }
    ],
    oneLiner: "LEFT JOIN the other table and keep rows WHERE the joined key IS NULL (or use NOT EXISTS) to find unmatched records."
  },
  "l2-c-30": {
    answer: [
      { kind: "text", text: "Rank rows within each category using ROW_NUMBER (or RANK for ties) partitioned by the category, then keep the top N in an outer query." },
      { kind: "sql", lines: ["WITH ranked AS (", "  SELECT name, category, price,", "         ROW_NUMBER() OVER (", "           PARTITION BY category ORDER BY price DESC", "         ) AS rn", "  FROM products", ")", "SELECT name, category, price", "FROM ranked WHERE rn <= 3;"] },
      { kind: "table", title: "Demo — top per category (rn shown)", headers: ["category", "name", "price", "rn"], rows: [["Books", "Atlas", "80", "1"], ["Books", "Novel", "25", "2"], ["Toys", "Drone", "150", "1"]] }
    ],
    oneLiner: "PARTITION BY category ORDER BY measure DESC with ROW_NUMBER (or RANK for ties), then filter rn <= N."
  },
  "l2-c-31": {
    answer: [
      { kind: "text", text: "ROW_NUMBER assigns a 1-based sequence within each partition following the ORDER BY. It is the building block for de-duplication, top-N, and latest-per-key patterns." },
      { kind: "sql", lines: ["SELECT name, dept_id, hire_date,", "       ROW_NUMBER() OVER (", "         PARTITION BY dept_id ORDER BY hire_date", "       ) AS seniority_rank", "FROM employees;"] },
      { kind: "table", title: "Demo result", headers: ["name", "dept_id", "seniority_rank"], rows: [["Asha", "1", "1"], ["Ravi", "1", "2"], ["Meera", "2", "1"]] }
    ],
    oneLiner: "ROW_NUMBER() OVER (PARTITION BY key ORDER BY col) gives each row a 1-based sequence within its partition."
  },
  "l2-c-32": {
    answer: [
      { kind: "text", text: "A simple CTE names an intermediate result with WITH, then queries it in the main statement — clearer than nesting the subquery inline." },
      { kind: "sql", lines: ["WITH high_earners AS (", "  SELECT name, salary FROM employees WHERE salary > 100000", ")", "SELECT name FROM high_earners ORDER BY salary DESC;"] }
    ],
    oneLiner: "WITH cte AS (SELECT ...) SELECT ... FROM cte names an intermediate set for a cleaner main query."
  },
  "l2-c-33": {
    answer: [
      { kind: "text", text: "Set several columns in one UPDATE and use CASE (or the WHERE clause) to apply conditional logic per column." },
      { kind: "sql", lines: ["UPDATE employees", "SET salary = salary * 1.10,", "    grade = CASE WHEN salary * 1.10 > 100000", "                 THEN 'senior' ELSE grade END", "WHERE dept_id = 2;"] },
      { kind: "text", text: "Assignments read the pre-update values, so all right-hand sides refer to the row's original data." }
    ],
    oneLiner: "One UPDATE can set multiple columns at once, using CASE for per-column conditional logic and WHERE to scope the rows."
  },
  "l2-c-34": {
    answer: [
      { kind: "text", text: "Delete from one table based on a match in another. MySQL names the target table before the join; PostgreSQL uses DELETE ... USING; SQL Server uses DELETE alias FROM ... JOIN." },
      { kind: "sql", lines: ["-- MySQL", "DELETE o FROM orders o", "JOIN customers c ON o.customer_id = c.id", "WHERE c.status = 'closed';", "", "-- PostgreSQL", "DELETE FROM orders o", "USING customers c", "WHERE o.customer_id = c.id AND c.status = 'closed';"] }
    ],
    oneLiner: "Join the tables and name the delete target: MySQL DELETE o FROM ... JOIN, PostgreSQL DELETE ... USING, SQL Server DELETE alias FROM ... JOIN."
  },
  "l2-c-35": {
    answer: [
      { kind: "text", text: "For the last N rows, ORDER BY the key DESC and LIMIT N. For the first half, use NTILE(2) and keep tile 1. Ordering must be explicit." },
      { kind: "sql", lines: ["-- last 10 rows by id", "SELECT * FROM logs ORDER BY id DESC LIMIT 10;", "", "-- first 50% of rows", "SELECT id, msg FROM (", "  SELECT id, msg, NTILE(2) OVER (ORDER BY id) AS half", "  FROM logs", ") t WHERE half = 1;"] }
    ],
    oneLiner: "Last N: ORDER BY key DESC LIMIT N. First 50%: NTILE(2) OVER (ORDER BY key) and keep tile 1."
  },
  "l2-c-36": {
    answer: [
      { kind: "text", text: "CREATE INDEX builds a B-tree on the chosen column(s) to speed lookups and range scans on those columns. Composite indexes list columns in priority order." },
      { kind: "sql", lines: ["CREATE INDEX idx_emp_dept ON employees (dept_id);", "", "-- composite + unique variants", "CREATE INDEX idx_emp_dept_salary ON employees (dept_id, salary);", "CREATE UNIQUE INDEX idx_users_email ON users (email);"] }
    ],
    oneLiner: "CREATE INDEX idx_name ON table (col[, col2 ...]); add UNIQUE for uniqueness, list columns in query-priority order for composites."
  },
  "l2-c-37": {
    answer: [
      { kind: "text", text: "CREATE TABLE ... AS SELECT (CTAS) makes a new table populated by a query — great for snapshots. Note it copies data and column types but typically NOT indexes, keys, or constraints. To copy structure only, add a WHERE that matches nothing." },
      { kind: "sql", lines: ["-- data + structure copy", "CREATE TABLE employees_backup AS", "SELECT * FROM employees;", "", "-- structure only (no rows)", "CREATE TABLE employees_empty AS", "SELECT * FROM employees WHERE 1 = 0;"] }
    ],
    oneLiner: "CREATE TABLE copy AS SELECT * FROM src clones data and columns (not indexes/keys); use WHERE 1=0 to copy structure only."
  }
};
