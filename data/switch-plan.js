// Career-switch plans. SWITCH_PLANS holds ready-made, checkbox-tracked plans.
// AI_PLAN is the paid, personalised-plan pitch shown at the top of /switch.

export const AI_PLAN = {
  headline: "AI-personalised career-switch plan",
  sub:
    "Tell us where you are and where you want to be. We generate a day-by-day switch plan built around your real schedule, your current stack, and your target role — DSA + framework + domain tracks, week-by-week, with a capstone and an interview push.",
  bullets: [
    "Scheduled around your real availability (e.g. 4 office hours + weekends)",
    "Tailored to your current stack and the exact role you're switching to",
    "Week-by-week calendar, projects, and a portfolio capstone",
    "A rehearsal-ready interview-question bank for peak hiring season",
  ],
  paidNote:
    "This is a premium, hand-tuned feature — powerful and used for real switches. Send your details and the developer will build your customised plan for you.",
  devEmail: "jyotiramkamble7402@gmail.com",
};

// Each plan: sections of checkable items + reference calendar / interview / tools.
export const SWITCH_PLANS = [
  {
    id: "java-genai",
    title: "Java + GenAI Switch",
    tagline: "Office (4 hrs) + weekends, turned into a step-by-step plan.",
    timeline: "Build phase: now → December 2026 (~16 weeks). Interview push: January–March 2027 (peak hiring).",
    daily: [
      "Hour 1 (fresh): DSA",
      "Hours 2–3: Spring Boot (cloud IDE — GitHub Codespaces / Gitpod)",
      "Hour 4: GenAI (alternate with extra Spring)",
      "Weekends: deep capstone build (own laptop)",
    ],
    rules: [
      "Build from a blank file — don't just watch.",
      "AI is a tutor, not a code-writer.",
      "5 days/week, never miss two in a row.",
      "2–3 things done deeply beat 15 half-watched.",
    ],

    sections: [
      {
        id: "dsa",
        name: "Track A — DSA",
        when: "Hour 1, daily",
        icon: "code",
        note:
          "Method for every problem: (1) understand, (2) plan in plain English, (3) code, (4) dry-run on paper, (5) state Big-O. Pick ONE resource — Striver A2Z or NeetCode — practise on LeetCode (start Easy). ~4–6 problems/topic; cluster them; re-solve strugglers after 2–3 days.",
        items: [
          { t: "Java tools fluency + Big-O basics", d: "arrays, ArrayList, HashMap, HashSet, String/StringBuilder, Stack, Deque, PriorityQueue — practise each API, no problems yet." },
          { t: "Arrays & Strings", d: "Largest/smallest, reverse array, second largest, move zeroes, reverse a string" },
          { t: "Hashing", d: "Two Sum, Valid Anagram, contains duplicate, frequency count, first unique char" },
          { t: "Two Pointers", d: "Reverse string, valid palindrome, remove duplicates from sorted array, two-sum II" },
          { t: "Sliding Window", d: "Max sum subarray of size k, longest substring without repeats, max consecutive ones" },
          { t: "Binary Search", d: "Classic binary search, first/last position, search insert position, sqrt(x)" },
          { t: "Stack & Queue", d: "Valid parentheses, min stack, queue using stacks, next greater element" },
          { t: "Recursion", d: "Factorial, Fibonacci, sum of digits, power(x,n), reverse a string recursively" },
          { t: "Backtracking", d: "Subsets, permutations, combination sum, generate parentheses" },
          { t: "Linked Lists", d: "Reverse a list, detect cycle, middle node, merge two sorted lists" },
          { t: "Trees", d: "Inorder/preorder/postorder, height, level-order (BFS), validate BST" },
          { t: "Heaps / PriorityQueue", d: "Kth largest, top-k frequent, merge k sorted lists" },
          { t: "Graphs", d: "BFS, DFS, number of islands, clone graph, course schedule" },
          { t: "Dynamic Programming (basics)", d: "Climbing stairs, house robber, coin change, longest common subsequence" },
          { t: "Greedy (bonus)", d: "Activity selection, jump game, gas station — pattern recognition for interviews.", bonus: true },
          { t: "Intervals & Tries (bonus)", d: "Merge intervals, insert interval; trie insert/search for prefix problems.", bonus: true },
        ],
      },
      {
        id: "spring",
        name: "Track B — Spring Boot",
        when: "Hours 2–3, daily",
        icon: "leaf",
        note: "Resource: your Spring Boot 3 & Spring Framework 6 course. Watch the tutorial, then rebuild from a blank file.",
        items: [
          { t: "Core Java through building", d: "OOP in practice, collections, streams, exceptions, equals/hashCode (light — you know the theory)." },
          { t: "First app + REST", d: "@RestController, @GetMapping, return JSON. → Project: Todo API (in-memory), full CRUD." },
          { t: "Layers + DI", d: "@Service, constructor injection — the moment DI clicks." },
          { t: "Database (JPA)", d: "@Entity, JpaRepository, H2 → PostgreSQL, derived queries. → Project: Expense Tracker API with a real DB." },
          { t: "Production shape", d: "DTOs, validation (@Valid), global exception handling (@RestControllerAdvice), relationships (@OneToMany)." },
          { t: "Security", d: "Basic auth → JWT. Protect endpoints." },
          { t: "Testing", d: "One @SpringBootTest + one MockMvc controller test." },
          { t: "Docker + deploy", d: "Dockerfile, docker-compose, deploy a container to the cloud." },
          { t: "Scale concepts", d: "Intro to microservices; add Redis (caching) and Kafka (messaging) inside a project when it needs them — don't study them separately." },
          { t: "Observability (bonus)", d: "Spring Boot Actuator, health checks, structured logging — the production polish interviewers probe.", bonus: true },
        ],
      },
      {
        id: "genai",
        name: "Track C — GenAI",
        when: "Hour 4, alternating",
        icon: "sparkles",
        note: "Resources you own: LangChain GenAI, Master GenAI with Java & Spring Boot (Spring AI).",
        items: [
          { t: "LLM fundamentals", d: "Tokens, context window, temperature, system vs user prompts, why models hallucinate." },
          { t: "Call an LLM API directly", d: "OpenAI or Anthropic — raw request/response before any framework. → Mini-project: script that returns a structured JSON answer." },
          { t: "Prompt engineering", d: "Few-shot, chain-of-thought, forcing JSON output." },
          { t: "LangChain basics", d: "Chains, prompt templates, output parsers, document loaders." },
          { t: "Embeddings + vector DB", d: "What an embedding is, similarity search, set up Chroma (local/free). → Mini-project: semantic search over a few documents." },
          { t: "RAG", d: "Chunk → embed → store → retrieve → augment prompt → grounded answer. → Project: document Q&A with sources." },
          { t: "Agents & tool/function calling", d: "Connects to your Agentic AI interest." },
          { t: "Spring AI", d: "Call an LLM from Java/Spring Boot — the bridge to your capstone." },
          { t: "Guardrails & evaluation (bonus)", d: "Prompt-injection basics, output validation, and a simple RAG eval harness.", bonus: true },
        ],
      },
      {
        id: "capstone",
        name: "Track D — Weekend Capstone",
        when: "Weekends (starts ~Week 9)",
        icon: "rocket",
        note:
          "\"AI Knowledge Assistant\": a Spring Boot backend where a user uploads documents and asks questions, answered by an LLM grounded in those docs (RAG), with a vector DB, secured endpoints, Docker, and cloud deployment. Optional React frontend.",
        items: [
          { t: "W9–10: Spring Boot skeleton + upload endpoint + store documents" },
          { t: "W11–12: embed documents → vector DB → retrieval endpoint" },
          { t: "W13: wire retrieval into an LLM call (Spring AI) → answers with sources" },
          { t: "W14: add auth, error handling, polish" },
          { t: "W15: Dockerize + deploy live (get a public URL)" },
          { t: "W16: optional React frontend + project README + a LinkedIn post" },
        ],
      },
      {
        id: "tools",
        name: "Tools & setup checklist",
        when: "One-time",
        icon: "wrench",
        items: [
          { t: "DSA: LeetCode (browser) + one sheet (Striver A2Z or NeetCode)" },
          { t: "Spring in office: GitHub Codespaces or Gitpod (browser cloud IDE), JDK 21, Spring Boot 3" },
          { t: "GenAI: an LLM API key, Python (or Java via Spring AI), Chroma vector DB" },
          { t: "Git + GitHub — commit every project (your GitHub is your proof)" },
          { t: "Deploy: Docker + one cloud (AWS)" },
        ],
      },
      {
        id: "interview",
        name: "Interview question bank",
        when: "Rehearse (Phase 4)",
        icon: "message",
        note: "Rehearse these out loud until they're automatic.",
        items: [
          { t: "Core Java", d: "OOP pillars · == vs equals + hashCode contract · HashMap internals · ArrayList vs LinkedList · checked vs unchecked exceptions · Streams/lambdas · why String is immutable." },
          { t: "Spring Boot", d: "DI/IoC · @Component vs @Service vs @Repository · @RestController vs @Controller · @SpringBootApplication/auto-config · Spring Data JPA · @Transactional · bean lifecycle/scopes · global exception handling · REST status codes & idempotency · Spring Security flow · what/why microservices." },
          { t: "GenAI", d: "RAG vs fine-tuning · embeddings / vector search · chunking trade-offs · reducing hallucinations · what LangChain adds · context-window limits · function calling / agents · evaluating a RAG system · cost & latency · your production LLM-integration story." },
          { t: "DSA (out loud)", d: "Solve a medium two-pointer / sliding-window / tree / graph problem out loud, explaining reasoning and Big-O." },
          { t: "Design & behavioural", d: "5 SOLID principles · design a parking lot · design a URL shortener · design a RAG knowledge assistant · walk through your capstone · biggest challenge & how you solved it." },
        ],
      },
    ],

    calendar: [
      {
        phase: "Phase 1 — Foundations (Weeks 1–4, late Aug → Sep)",
        rows: [
          ["1", "Java tools fluency + Big-O", "Core Java through building", "LLM fundamentals", "Rebuild week's code from blank"],
          ["2", "Arrays & Strings", "First app + REST (Todo API)", "Call an LLM API directly", "Extend Todo API"],
          ["3", "Hashing", "Layers + DI", "Prompt engineering", "Rebuild Todo from blank"],
          ["4", "Two Pointers", "Database + JPA (start Expense API)", "LangChain basics", "Finish Expense API v1"],
        ],
      },
      {
        phase: "Phase 2 — Integration (Weeks 5–8, Oct)",
        rows: [
          ["5", "Sliding Window", "DTOs + validation", "LangChain chains/parsers", "Add validation to Expense API"],
          ["6", "Binary Search", "Exception handling + relationships", "Embeddings + vector DB", "Semantic-search mini-project"],
          ["7", "Stack & Queue", "Security (auth → JWT)", "RAG concepts", "Secure the Expense API"],
          ["8", "Recursion", "Testing + Dockerize", "Build a small RAG app", "Deploy Expense API to cloud"],
        ],
      },
      {
        phase: "Phase 3 — Capstone + depth (Weeks 9–16, Nov → Dec)",
        rows: [
          ["9", "Backtracking", "Microservices intro", "Spring AI (LLM from Java)", "Skeleton + upload endpoint"],
          ["10", "Linked Lists", "Add Redis (caching)", "Spring AI deeper", "Store documents"],
          ["11", "Trees (part 1)", "Add Kafka (messaging)", "Agents / tool calling", "Embed → vector DB"],
          ["12", "Trees (part 2)", "Refactor + clean code (SOLID)", "RAG tuning (chunking)", "Retrieval endpoint"],
          ["13", "Heaps / PriorityQueue", "LLD practice (parking lot)", "Evaluate/harden LLM app", "Wire retrieval → LLM"],
          ["14", "Graphs (part 1)", "LLD practice (rate limiter)", "Cost/latency basics", "Auth + error handling"],
          ["15", "Graphs (part 2)", "System design: RAG Q&A", "—", "Dockerize + deploy live"],
          ["16", "Dynamic Programming", "System design: URL shortener", "—", "React frontend + README + post"],
        ],
      },
      {
        phase: "Phase 4 — Interview Push (Weeks 17–28, Jan → March 2027)",
        rows: [
          ["DSA", "Timed problems daily; revise weak patterns; LeetCode contests for pressure.", "", "", ""],
          ["Spring/Java", "Review interview questions (DI, beans, JPA, @Transactional, REST, security).", "", "", ""],
          ["GenAI", "Rehearse your RAG project + production-AI story out loud.", "", "", ""],
          ["Design", "2–3 LLD + 1–2 system-design problems, including \"design a RAG system\".", "", "", ""],
          ["Mocks", "Weekly mock interviews (a friend or a platform).", "", "", ""],
          ["Job search", "Honest-strong resume + LinkedIn; apply within 24–48 hrs; ask for referrals; target fintech / AI-product / GCC roles.", "", "", ""],
        ],
      },
    ],

    footnotes: [
      "If you fall behind: don't restart — pick up the current week where you are. Missing a day is fine; never miss two in a row.",
      "When stuck >30 min: bring the error + your code to your mentor chat and fix it together.",
    ],
  },
];

export function planItemCount(plan) {
  return plan.sections.reduce((n, s) => n + s.items.length, 0);
}
