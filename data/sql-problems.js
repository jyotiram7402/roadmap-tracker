// data/sql-problems.js — SQL / Database question catalog for the "Prepare SQL" studio.
// Questions grouped by experience LEVEL and TYPE (theory / coding). Worked answers
// (explanation + SQL + demo/result tables) live in per-level files under data/sql/
// and are LAZY-LOADED when a question is opened.

const RAW = {
  "Level 1 · Junior (1–2 yrs)": {
    theory: [
      { n: 1, q: "What is SQL, and what are DDL, DML, DCL, and TCL commands?", d: "easy", hot: true },
      { n: 2, q: "Difference between WHERE and HAVING?", d: "easy", hot: true },
      { n: 3, q: "What is a Primary Key? Can it be NULL?", d: "easy", hot: true },
      { n: 4, q: "What is a Foreign Key?", d: "easy", hot: true },
      { n: 5, q: "Difference between DELETE, TRUNCATE, and DROP?", d: "easy", hot: true },
      { n: 6, q: "Difference between UNION and UNION ALL?", d: "easy", hot: true },
      { n: 7, q: "What are the types of JOINs (INNER, LEFT, RIGHT, FULL, CROSS)?", d: "easy", hot: true },
      { n: 8, q: "Difference between INNER JOIN and LEFT JOIN?", d: "easy", hot: true },
      { n: 9, q: "Difference between CHAR and VARCHAR?", d: "easy" },
      { n: 10, q: "What is a NULL value? How is it different from 0 or blank?", d: "easy", hot: true },
      { n: 11, q: "Difference between COUNT(*) and COUNT(column_name)?", d: "easy", hot: true },
      { n: 12, q: "What are aggregate functions? (SUM, AVG, MIN, MAX, COUNT)", d: "easy", hot: true },
      { n: 13, q: "Difference between DISTINCT and GROUP BY?", d: "easy" },
      { n: 14, q: "What is a constraint? (NOT NULL, UNIQUE, CHECK, DEFAULT)", d: "easy" },
      { n: 15, q: "What is the logical order of execution of an SQL query?", d: "medium", hot: true }
    ],
    coding: [
      { n: 16, q: "Select all columns / specific columns from a table.", d: "easy", hot: true },
      { n: 17, q: "Filter rows using WHERE (e.g. salary > 50000).", d: "easy", hot: true },
      { n: 18, q: "Fetch unique values of a column (DISTINCT).", d: "easy", hot: true },
      { n: 19, q: "Sort results with ORDER BY (ascending and descending together).", d: "easy", hot: true },
      { n: 20, q: "Count total rows and count per group.", d: "easy", hot: true },
      { n: 21, q: "Find the average / max / min / sum of a column.", d: "easy", hot: true },
      { n: 22, q: "Use LIKE for pattern matching (starts with 'A', ends with 'a', a fixed position).", d: "easy", hot: true },
      { n: 23, q: "Use IN / NOT IN to filter a list of values.", d: "easy", hot: true },
      { n: 24, q: "Use BETWEEN for a range.", d: "easy" },
      { n: 25, q: "Concatenate first and last name into one column.", d: "easy" },
      { n: 26, q: "String functions: UPPER, LOWER, SUBSTRING, REPLACE, LENGTH, INSTR.", d: "easy" },
      { n: 27, q: "GROUP BY a column and count members per group.", d: "easy", hot: true },
      { n: 28, q: "GROUP BY + HAVING (e.g. groups with fewer than 4 members).", d: "medium", hot: true },
      { n: 29, q: "Basic INNER JOIN across two tables.", d: "medium", hot: true },
      { n: 30, q: "LEFT JOIN to include unmatched rows (NULL fill).", d: "medium", hot: true },
      { n: 31, q: "INSERT, UPDATE, DELETE statements.", d: "easy", hot: true },
      { n: 32, q: "Top N rows by a column (ORDER BY ... LIMIT N).", d: "easy", hot: true },
      { n: 33, q: "Show odd / even rows using id % 2.", d: "medium" },
      { n: 34, q: "Fetch the first row / last row of a table.", d: "easy" },
      { n: 35, q: "Count distinct values in a column (COUNT(DISTINCT ...)).", d: "easy" }
    ]
  },
  "Level 2 · Mid (3 yrs)": {
    theory: [
      { n: 1, q: "What is an index? Types (clustered vs non-clustered, composite, unique, B-tree)?", d: "medium", hot: true },
      { n: 2, q: "What is normalization? Explain 1NF, 2NF, 3NF, BCNF.", d: "medium", hot: true },
      { n: 3, q: "What is denormalization and when is it used?", d: "medium" },
      { n: 4, q: "What are the ACID properties of a transaction?", d: "medium", hot: true },
      { n: 5, q: "Difference between a subquery and a JOIN?", d: "medium", hot: true },
      { n: 6, q: "What is a correlated subquery? How does it differ from a normal one?", d: "medium", hot: true },
      { n: 7, q: "When to use EXISTS vs IN?", d: "medium", hot: true },
      { n: 8, q: "Why can NOT IN give wrong results with NULLs?", d: "medium" },
      { n: 9, q: "What is a view? Advantages of views?", d: "medium", hot: true },
      { n: 10, q: "What is a stored procedure vs a function?", d: "medium", hot: true },
      { n: 11, q: "What is a CTE (Common Table Expression) and why use it?", d: "medium", hot: true },
      { n: 12, q: "Difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?", d: "medium", hot: true },
      { n: 13, q: "What is a window function (vs an aggregate function)?", d: "medium", hot: true },
      { n: 14, q: "What is a self-join and when is it useful?", d: "medium" },
      { n: 15, q: "What is a candidate key, super key, alternate key, composite key?", d: "medium" },
      { n: 16, q: "What is referential integrity?", d: "medium" },
      { n: 17, q: "Difference between GROUP BY and PARTITION BY?", d: "medium", hot: true }
    ],
    coding: [
      { n: 18, q: "Find the 2nd highest salary (subquery + MAX).", d: "medium", hot: true },
      { n: 19, q: "Find the Nth highest salary (LIMIT/OFFSET or correlated subquery).", d: "medium", hot: true },
      { n: 20, q: "Find employees earning more than the average salary.", d: "medium", hot: true },
      { n: 21, q: "Find duplicate records (GROUP BY ... HAVING COUNT(*) > 1).", d: "medium", hot: true },
      { n: 22, q: "Delete duplicate rows, keeping one (CTE + ROW_NUMBER()).", d: "hard", hot: true },
      { n: 23, q: "CASE statement to bucket values (Low / Medium / High).", d: "medium", hot: true },
      { n: 24, q: "Use COALESCE / ISNULL to handle NULLs.", d: "medium", hot: true },
      { n: 25, q: "Self-join: find records with the same value (same GPA / salary).", d: "medium", hot: true },
      { n: 26, q: "Max value per group (max salary per department).", d: "medium", hot: true },
      { n: 27, q: "Total (SUM) per group with a JOIN (salary expense per department).", d: "medium", hot: true },
      { n: 28, q: "Pagination with LIMIT + OFFSET.", d: "medium", hot: true },
      { n: 29, q: "List records with no match in another table (NOT IN / LEFT JOIN ... IS NULL).", d: "medium", hot: true },
      { n: 30, q: "Top 3 per category / top N per group.", d: "hard", hot: true },
      { n: 31, q: "Basic window function: ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...).", d: "medium", hot: true },
      { n: 32, q: "Simple CTE query.", d: "medium" },
      { n: 33, q: "Update multiple columns conditionally.", d: "easy" },
      { n: 34, q: "Delete rows across joined tables.", d: "medium" },
      { n: 35, q: "Fetch the first 50% / last N records of a table.", d: "medium" },
      { n: 36, q: "Create an index on a column.", d: "easy" },
      { n: 37, q: "Create a clone/copy of a table (CREATE TABLE x AS SELECT ...).", d: "easy" }
    ]
  },
  "Level 3 · Senior (4+ yrs)": {
    theory: [
      { n: 1, q: "How do you optimize a slow-running query?", d: "hard", hot: true },
      { n: 2, q: "How do you read an execution plan / use EXPLAIN?", d: "hard", hot: true },
      { n: 3, q: "What is a SARGable query and why does it matter?", d: "hard", hot: true },
      { n: 4, q: "Impact of missing indexes; downsides of too many indexes?", d: "hard", hot: true },
      { n: 5, q: "Transaction isolation levels and their anomalies (dirty / non-repeatable / phantom reads).", d: "hard", hot: true },
      { n: 6, q: "What is a deadlock? How do you detect and prevent it?", d: "hard", hot: true },
      { n: 7, q: "Clustered vs non-clustered index internals; when each is chosen.", d: "hard", hot: true },
      { n: 8, q: "What is table partitioning (range / list / hash) and its benefits?", d: "hard" },
      { n: 9, q: "Materialized view vs regular view — trade-offs.", d: "hard", hot: true },
      { n: 10, q: "Difference between OLTP and OLAP systems.", d: "medium" },
      { n: 11, q: "What is sharding / horizontal vs vertical scaling of databases?", d: "hard" },
      { n: 12, q: "How does the optimizer choose between nested loop / hash / merge joins?", d: "hard" },
      { n: 13, q: "Locking mechanisms (row / table / optimistic / pessimistic).", d: "hard", hot: true },
      { n: 14, q: "What is query plan caching / parameter sniffing?", d: "hard" },
      { n: 15, q: "Strategies to handle very large tables (billions of rows).", d: "hard", hot: true },
      { n: 16, q: "How do you prevent SQL injection?", d: "medium", hot: true }
    ],
    coding: [
      { n: 17, q: "Running total / cumulative sum with SUM() OVER (ORDER BY ...).", d: "hard", hot: true },
      { n: 18, q: "RANK() / DENSE_RANK() / ROW_NUMBER() in a real ranking query.", d: "hard", hot: true },
      { n: 19, q: "LAG() / LEAD() — compare a row to previous/next (month-over-month change).", d: "hard", hot: true },
      { n: 20, q: "Detect gaps in a sequence of dates/numbers per user (gaps & islands).", d: "hard", hot: true },
      { n: 21, q: "Nth highest salary per department (window function + filter).", d: "hard", hot: true },
      { n: 22, q: "Recursive CTE — traverse a hierarchy (employee → manager).", d: "hard", hot: true },
      { n: 23, q: "Pivot / unpivot rows into columns (e.g. sales by month).", d: "hard", hot: true },
      { n: 24, q: "NTILE() — split rows into quartiles / percentiles.", d: "hard" },
      { n: 25, q: "MERGE / UPSERT — insert-or-update from a staging table.", d: "hard", hot: true },
      { n: 26, q: "Median of a column (no built-in function).", d: "hard", hot: true },
      { n: 27, q: "Consecutive-events problem (users active N days in a row, longest streak).", d: "hard", hot: true },
      { n: 28, q: "Year-over-year / month-over-month growth %.", d: "hard", hot: true },
      { n: 29, q: "Find the first order per customer (correlated subquery / window).", d: "hard", hot: true },
      { n: 30, q: "De-dupe keeping the latest record per key (window ROW_NUMBER).", d: "hard", hot: true },
      { n: 31, q: "Rewrite a correlated subquery as a JOIN for performance.", d: "hard" },
      { n: 32, q: "Aggregation with ROLLUP / CUBE / GROUPING SETS.", d: "hard" },
      { n: 33, q: "Transaction block with BEGIN / COMMIT / ROLLBACK.", d: "medium", hot: true },
      { n: 34, q: "Create and use a stored procedure with parameters.", d: "medium" },
      { n: 35, q: "Create a trigger (audit log on insert/update).", d: "hard" }
    ]
  }
};

export const LEVELS = Object.keys(RAW);
export const TYPES = ["theory", "coding"];

const LEVEL_KEY = { "Level 1 · Junior (1–2 yrs)": "l1", "Level 2 · Mid (3 yrs)": "l2", "Level 3 · Senior (4+ yrs)": "l3" };

export const SQL_PROBLEMS = [];
for (const level of LEVELS) {
  for (const type of TYPES) {
    for (const item of RAW[level][type] || []) {
      const id = `${LEVEL_KEY[level]}-${type[0]}-${item.n}`;
      SQL_PROBLEMS.push({
        key: id,
        id,
        n: item.n,
        title: item.q,
        level,
        type,
        difficulty: item.d,
        hot: !!item.hot,
      });
    }
  }
}

const LEVEL_LOADERS = {
  "Level 1 · Junior (1–2 yrs)": () => import("./sql/details-l1.js"),
  "Level 2 · Mid (3 yrs)": () => import("./sql/details-l2.js"),
  "Level 3 · Senior (4+ yrs)": () => import("./sql/details-l3.js"),
};

export async function loadLevelDetails(level) {
  const loader = LEVEL_LOADERS[level];
  if (!loader) return {};
  try { return (await loader()).DETAILS || {}; } catch { return {}; }
}
