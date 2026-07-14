// data/sql/details-l1.js — worked answers for Level 1 (Junior) SQL questions.
// Original explanations, queries, and demo/result tables.
// answer block kinds: {kind:"text",text} | {kind:"sql",lines:[...]} | {kind:"table",title,headers,rows}

export const DETAILS = {
  "l1-t-1": {
    answer: [
      { kind: "text", text: "SQL (Structured Query Language) is the standard language for defining, manipulating, and querying relational databases. Its commands split into families by purpose:" },
      { kind: "text", text: "DDL (Data Definition) — structure: CREATE, ALTER, DROP, TRUNCATE. DML (Data Manipulation) — data: SELECT, INSERT, UPDATE, DELETE. DCL (Data Control) — permissions: GRANT, REVOKE. TCL (Transaction Control) — transactions: COMMIT, ROLLBACK, SAVEPOINT." }
    ],
    oneLiner: "DDL defines structure, DML changes data, DCL controls access, TCL manages transactions."
  },
  "l1-t-2": {
    answer: [
      { kind: "text", text: "WHERE filters individual rows BEFORE grouping and cannot use aggregate functions. HAVING filters GROUPS AFTER aggregation and is used with GROUP BY to filter on aggregate results." },
      { kind: "sql", lines: ["-- WHERE filters rows, HAVING filters groups", "SELECT dept, COUNT(*) AS cnt", "FROM employees", "WHERE active = 1            -- row filter (before grouping)", "GROUP BY dept", "HAVING COUNT(*) > 5;        -- group filter (after aggregation)"] }
    ],
    oneLiner: "WHERE filters rows before grouping; HAVING filters groups after aggregation."
  },
  "l1-t-3": {
    answer: [
      { kind: "text", text: "A primary key uniquely identifies each row in a table. It cannot contain NULLs and must be unique; a table has at most one primary key (which may span multiple columns — a composite key). It automatically creates a unique index." },
      { kind: "text", text: "No — a primary key can never be NULL, because NULL means 'unknown' and could not reliably identify a row." }
    ],
    oneLiner: "A primary key uniquely identifies each row; it is unique and never NULL."
  },
  "l1-t-4": {
    answer: [
      { kind: "text", text: "A foreign key is a column (or set) in one table that references the primary key of another, enforcing referential integrity — you cannot insert a child row pointing to a parent that doesn't exist, and (depending on rules) you cannot delete a parent that still has children." },
      { kind: "sql", lines: ["CREATE TABLE orders (", "  id INT PRIMARY KEY,", "  customer_id INT,", "  FOREIGN KEY (customer_id) REFERENCES customers(id)", ");"] }
    ],
    oneLiner: "A foreign key links a child table to a parent's key, enforcing referential integrity."
  },
  "l1-t-5": {
    answer: [
      { kind: "text", text: "DELETE removes rows one by one (can use WHERE), is logged, fires triggers, and can be rolled back. TRUNCATE removes ALL rows quickly by deallocating pages, resets identity, minimally logged, cannot use WHERE. DROP removes the entire table (structure + data)." },
      { kind: "table", title: "Comparison", headers: ["", "DELETE", "TRUNCATE", "DROP"], rows: [["Removes", "chosen rows", "all rows", "table itself"], ["WHERE", "yes", "no", "no"], ["Rollback", "yes", "limited", "no (usually)"], ["Speed", "slow", "fast", "fast"], ["Type", "DML", "DDL", "DDL"]] }
    ],
    oneLiner: "DELETE = row-by-row (WHERE, logged); TRUNCATE = wipe all fast; DROP = delete the table entirely."
  },
  "l1-t-6": {
    answer: [
      { kind: "text", text: "Both combine the result sets of two SELECTs (which must have matching column counts/types). UNION removes duplicate rows (an extra sort/hash step); UNION ALL keeps every row including duplicates and is therefore faster. Use UNION ALL when you know there are no duplicates or you want them." }
    ],
    oneLiner: "UNION removes duplicates (slower); UNION ALL keeps all rows (faster)."
  },
  "l1-t-7": {
    answer: [
      { kind: "text", text: "INNER JOIN returns only rows matching in both tables. LEFT JOIN returns all left rows + matched right rows (NULLs where no match). RIGHT JOIN is the mirror. FULL OUTER JOIN returns all rows from both sides (NULLs where no match). CROSS JOIN returns the Cartesian product (every left row × every right row)." },
      { kind: "table", title: "At a glance", headers: ["JOIN", "Returns"], rows: [["INNER", "matches in both"], ["LEFT", "all left + matched right"], ["RIGHT", "all right + matched left"], ["FULL", "all rows, both sides"], ["CROSS", "every combination"]] }
    ],
    oneLiner: "INNER = matches only; LEFT/RIGHT = keep one side fully; FULL = keep both; CROSS = every combination."
  },
  "l1-t-8": {
    answer: [
      { kind: "text", text: "INNER JOIN returns only rows that have a match in both tables. LEFT JOIN returns every row from the left table, filling right-side columns with NULL where there is no match — useful for 'find rows with/without a related record'." }
    ],
    oneLiner: "INNER keeps only matches; LEFT keeps all left rows, NULL-filling unmatched right columns."
  },
  "l1-t-9": {
    answer: [
      { kind: "text", text: "CHAR(n) is fixed-length — always stores n characters, padding with spaces (fast, good for codes of constant length like country codes). VARCHAR(n) is variable-length — stores only the characters used plus a small length prefix (space-efficient for varying text like names)." }
    ],
    oneLiner: "CHAR is fixed-length (space-padded); VARCHAR is variable-length (stores only what's used)."
  },
  "l1-t-10": {
    answer: [
      { kind: "text", text: "NULL represents an unknown or missing value — not zero and not an empty string. Any comparison with NULL using =, <, > yields UNKNOWN (not true), so you must use IS NULL / IS NOT NULL. 0 is a real number and '' is a real (empty) string; both are known values, NULL is the absence of a value." }
    ],
    oneLiner: "NULL means 'unknown/absent' — unlike 0 or ''; compare it only with IS NULL / IS NOT NULL."
  },
  "l1-t-11": {
    answer: [
      { kind: "text", text: "COUNT(*) counts all rows including those with NULLs. COUNT(column_name) counts only rows where that column is NOT NULL. So they differ whenever the column contains NULLs." },
      { kind: "sql", lines: ["-- if 2 of 5 rows have a NULL phone:", "SELECT COUNT(*), COUNT(phone) FROM customers;   -- 5, 3"] }
    ],
    oneLiner: "COUNT(*) counts every row; COUNT(col) skips NULLs in that column."
  },
  "l1-t-12": {
    answer: [
      { kind: "text", text: "Aggregate functions compute a single value over a set of rows: SUM (total), AVG (mean), MIN / MAX (extremes), COUNT (number of rows). They are typically used with GROUP BY to produce one result per group, and (except COUNT(*)) ignore NULLs." }
    ],
    oneLiner: "SUM/AVG/MIN/MAX/COUNT collapse many rows into one value, usually per GROUP BY group."
  },
  "l1-t-13": {
    answer: [
      { kind: "text", text: "Both can remove duplicates. DISTINCT simply returns unique rows/values. GROUP BY groups rows so you can apply aggregates (COUNT, SUM…) per group. If you're only deduplicating, DISTINCT is clearer; if you need per-group aggregates, use GROUP BY. SELECT DISTINCT col is equivalent to SELECT col GROUP BY col." }
    ],
    oneLiner: "DISTINCT just dedupes; GROUP BY groups rows to aggregate them."
  },
  "l1-t-14": {
    answer: [
      { kind: "text", text: "A constraint is a rule enforced on column values to protect data integrity. NOT NULL — value required. UNIQUE — no duplicates allowed. CHECK — value must satisfy a condition (e.g. age >= 18). DEFAULT — value used when none is supplied. (Plus PRIMARY KEY and FOREIGN KEY.)" },
      { kind: "sql", lines: ["CREATE TABLE users (", "  id INT PRIMARY KEY,", "  email VARCHAR(100) UNIQUE NOT NULL,", "  age INT CHECK (age >= 18),", "  status VARCHAR(10) DEFAULT 'active'", ");"] }
    ],
    oneLiner: "Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT) enforce rules that keep data valid."
  },
  "l1-t-15": {
    answer: [
      { kind: "text", text: "Although you write SELECT first, the database evaluates a query in this logical order: FROM (and JOINs) → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT." },
      { kind: "text", text: "This explains two common gotchas: you cannot use a SELECT alias in WHERE (SELECT runs later), and you cannot use aggregates in WHERE (grouping hasn't happened yet — use HAVING)." }
    ],
    oneLiner: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT (why aliases/aggregates fail in WHERE)."
  },

  "l1-c-16": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees;                 -- all columns", "SELECT name, salary FROM employees;      -- specific columns"] }
    ],
    oneLiner: "SELECT * for all columns; list the names for specific columns."
  },
  "l1-c-17": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees WHERE salary > 50000;"] },
      { kind: "table", title: "Demo — employees", headers: ["name", "salary"], rows: [["Asha", "60000  ✓"], ["Ravi", "45000  ✗"], ["Meera", "72000  ✓"]] }
    ],
    oneLiner: "WHERE keeps only rows where the condition is true."
  },
  "l1-c-18": {
    answer: [
      { kind: "sql", lines: ["SELECT DISTINCT department FROM employees;"] },
      { kind: "table", title: "Demo", headers: ["department (raw)", "→ DISTINCT"], rows: [["Sales, Sales, HR, IT, HR", "Sales, HR, IT"]] }
    ],
    oneLiner: "DISTINCT returns each unique value once."
  },
  "l1-c-19": {
    answer: [
      { kind: "sql", lines: ["SELECT name, dept, salary", "FROM employees", "ORDER BY dept ASC, salary DESC;   -- dept A→Z, then salary high→low"] }
    ],
    oneLiner: "ORDER BY sorts; add ASC/DESC per column, applied left to right."
  },
  "l1-c-20": {
    answer: [
      { kind: "sql", lines: ["SELECT COUNT(*) AS total FROM employees;          -- total rows", "", "SELECT dept, COUNT(*) AS per_dept", "FROM employees GROUP BY dept;                     -- count per group"] },
      { kind: "table", title: "Demo — count per dept", headers: ["dept", "per_dept"], rows: [["Sales", "2"], ["HR", "2"], ["IT", "1"]] }
    ],
    oneLiner: "COUNT(*) for the total; GROUP BY + COUNT(*) for counts per group."
  },
  "l1-c-21": {
    answer: [
      { kind: "sql", lines: ["SELECT AVG(salary) AS avg_sal,", "       MAX(salary) AS max_sal,", "       MIN(salary) AS min_sal,", "       SUM(salary) AS total_sal", "FROM employees;"] }
    ],
    oneLiner: "One SELECT can return AVG, MAX, MIN, and SUM together."
  },
  "l1-c-22": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees WHERE name LIKE 'A%';     -- starts with A", "SELECT * FROM employees WHERE name LIKE '%a';     -- ends with a", "SELECT * FROM employees WHERE name LIKE '_____a'; -- 6th char is 'a'"] },
      { kind: "text", text: "% matches any number of characters; _ matches exactly one character." }
    ],
    oneLiner: "LIKE with % (any chars) and _ (one char): 'A%' starts-with, '%a' ends-with."
  },
  "l1-c-23": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees WHERE dept IN ('Sales','IT');", "SELECT * FROM employees WHERE dept NOT IN ('HR');"] },
      { kind: "text", text: "Caution: NOT IN with a list that contains NULL returns no rows — prefer NOT EXISTS in that case." }
    ],
    oneLiner: "IN / NOT IN filter against a list of values (watch NULLs with NOT IN)."
  },
  "l1-c-24": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM students WHERE gpa BETWEEN 9.00 AND 9.99;"] },
      { kind: "text", text: "BETWEEN is inclusive on both bounds — equivalent to gpa >= 9.00 AND gpa <= 9.99." }
    ],
    oneLiner: "BETWEEN a AND b is an inclusive range on both ends."
  },
  "l1-c-25": {
    answer: [
      { kind: "sql", lines: ["SELECT CONCAT(first_name, ' ', last_name) AS full_name", "FROM employees;"] },
      { kind: "text", text: "In some databases use || (Oracle/Postgres) or + (SQL Server) instead of CONCAT." }
    ],
    oneLiner: "CONCAT(first, ' ', last) joins columns into one; syntax varies by DB (|| or +)."
  },
  "l1-c-26": {
    answer: [
      { kind: "sql", lines: ["SELECT UPPER(name)               AS upper_name,", "       LOWER(name)               AS lower_name,", "       SUBSTRING(name, 1, 3)     AS first3,", "       REPLACE(name, 'a', '@')   AS replaced,", "       LENGTH(name)              AS len,", "       INSTR(name, 'a')          AS pos_of_a", "FROM employees;"] }
    ],
    oneLiner: "UPPER/LOWER change case, SUBSTRING slices, REPLACE swaps, LENGTH counts, INSTR finds a position."
  },
  "l1-c-27": {
    answer: [
      { kind: "sql", lines: ["SELECT dept, COUNT(*) AS members", "FROM employees", "GROUP BY dept;"] }
    ],
    oneLiner: "GROUP BY dept + COUNT(*) gives members per department."
  },
  "l1-c-28": {
    answer: [
      { kind: "sql", lines: ["SELECT major, COUNT(*) AS cnt", "FROM students", "GROUP BY major", "HAVING COUNT(*) < 4;      -- keep only small majors"] },
      { kind: "table", title: "Demo", headers: ["major", "cnt", "kept? (< 4)"], rows: [["CS", "10", "no"], ["Art", "3", "yes"], ["Math", "2", "yes"]] }
    ],
    oneLiner: "GROUP BY then HAVING filters groups on their aggregate (here, majors with < 4 people)."
  },
  "l1-c-29": {
    answer: [
      { kind: "sql", lines: ["SELECT e.name, d.dept_name", "FROM employees e", "INNER JOIN departments d ON e.dept_id = d.id;"] },
      { kind: "table", title: "Demo result", headers: ["name", "dept_name"], rows: [["Asha", "Sales"], ["Ravi", "IT"]] }
    ],
    oneLiner: "INNER JOIN on the matching key returns rows present in both tables."
  },
  "l1-c-30": {
    answer: [
      { kind: "sql", lines: ["SELECT e.name, d.dept_name", "FROM employees e", "LEFT JOIN departments d ON e.dept_id = d.id;"] },
      { kind: "table", title: "Demo — employee with no dept shows NULL", headers: ["name", "dept_name"], rows: [["Asha", "Sales"], ["Ravi", "IT"], ["Meera", "NULL"]] }
    ],
    oneLiner: "LEFT JOIN keeps every left row; unmatched right columns come back NULL."
  },
  "l1-c-31": {
    answer: [
      { kind: "sql", lines: ["INSERT INTO employees (name, salary) VALUES ('Neha', 55000);", "", "UPDATE employees SET salary = 60000 WHERE name = 'Neha';", "", "DELETE FROM employees WHERE name = 'Neha';"] },
      { kind: "text", text: "Always include a WHERE on UPDATE/DELETE — without it you change/remove every row." }
    ],
    oneLiner: "INSERT adds rows, UPDATE...WHERE changes them, DELETE...WHERE removes them."
  },
  "l1-c-32": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees", "ORDER BY salary DESC", "LIMIT 5;                 -- top 5 earners"] },
      { kind: "text", text: "SQL Server uses SELECT TOP 5 ...; Oracle uses FETCH FIRST 5 ROWS ONLY." }
    ],
    oneLiner: "ORDER BY the column then LIMIT N (or TOP N / FETCH FIRST N) for the top rows."
  },
  "l1-c-33": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees WHERE id % 2 = 1;   -- odd ids", "SELECT * FROM employees WHERE id % 2 = 0;   -- even ids"] },
      { kind: "text", text: "MOD(id, 2) works where % isn't supported. To number rows regardless of id, use ROW_NUMBER()." }
    ],
    oneLiner: "Filter on id % 2 (or MOD(id,2)) for odd/even rows."
  },
  "l1-c-34": {
    answer: [
      { kind: "sql", lines: ["SELECT * FROM employees ORDER BY id ASC  LIMIT 1;   -- first", "SELECT * FROM employees ORDER BY id DESC LIMIT 1;   -- last"] },
      { kind: "text", text: "'First'/'last' only mean something with an explicit ORDER BY — table row order is not guaranteed." }
    ],
    oneLiner: "ORDER BY a key ASC/DESC + LIMIT 1 for the first / last row."
  },
  "l1-c-35": {
    answer: [
      { kind: "sql", lines: ["SELECT COUNT(DISTINCT dept) AS num_depts FROM employees;"] }
    ],
    oneLiner: "COUNT(DISTINCT col) counts how many unique values a column has."
  }
};
