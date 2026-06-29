// Forward Deployed Engineer (FDE) interview-prep track.
// FDE = customer-facing engineer who deploys, integrates, and customizes
// software at customer sites, bridging product/eng and the customer.
export const ROADMAP = [
  {
    id: "fde-1",
    title: "Stage 1: Coding Fundamentals",
    duration: "2-3 weeks",
    description: "Python + SQL for data wrangling, scripting, API calls, and JSON/CSV parsing. FDEs code daily — breadth over depth.",
    sections: [
      {
        id: "1.1",
        title: "Python for scripting & data wrangling",
        items: [
          "Idiomatic Python: comprehensions, dict/set, enumerate, zip, generators",
          "Reading/writing JSON and CSV (json, csv, pathlib modules)",
          "String parsing, regex basics, datetime handling and timezones",
          "Error handling, try/except, and writing small CLI scripts (argparse)",
          "pandas basics: DataFrame, filtering, groupby, merge, apply, to_csv"
        ]
      },
      {
        id: "1.2",
        title: "SQL for analytics & joins",
        items: [
          "SELECT/WHERE/GROUP BY/HAVING/ORDER BY and aggregate functions",
          "INNER vs LEFT/RIGHT/FULL joins; joining messy multi-source data",
          "Window functions: ROW_NUMBER, RANK, LAG/LEAD, running totals",
          "CTEs and subqueries for readable multi-step transforms",
          "Deduplication, NULL handling, and basic query performance intuition"
        ]
      },
      {
        id: "1.3",
        title: "Coding-screen problem solving",
        items: [
          "Hash maps, arrays, strings — common interview patterns",
          "Time/space complexity (Big-O) reasoning out loud",
          "Parsing/transforming a file or API payload under time pressure",
          "Writing clean, testable functions and verbalizing edge cases"
        ]
      }
    ]
  },
  {
    id: "fde-2",
    title: "Stage 2: APIs & Integrations",
    duration: "3-4 weeks",
    description: "REST, auth, webhooks, pagination, rate limits, retries/idempotency, and the ETL glue code that connects customer + 3rd-party systems.",
    sections: [
      {
        id: "2.1",
        title: "REST & HTTP fundamentals",
        items: [
          "HTTP methods, status codes, headers, idempotency semantics",
          "Designing and consuming REST endpoints; query vs path vs body",
          "Content types, JSON payloads, and versioning strategies",
          "Using requests/httpx; reading and writing API client code"
        ]
      },
      {
        id: "2.2",
        title: "Auth, security & secrets",
        items: [
          "API keys, Basic auth, Bearer tokens",
          "OAuth 2.0 flows (client credentials, auth code) and token refresh",
          "Storing secrets safely; never hardcoding customer credentials",
          "HMAC webhook signature verification"
        ]
      },
      {
        id: "2.3",
        title: "Reliable integration patterns",
        items: [
          "Pagination (offset, cursor, link-header) and full extraction",
          "Rate limits, backoff with jitter, and respecting 429/Retry-After",
          "Retries, timeouts, idempotency keys, and at-least-once delivery",
          "Webhooks vs polling; dead-letter queues and replay",
          "Writing resilient ETL glue between customer and 3rd-party systems"
        ]
      }
    ]
  },
  {
    id: "fde-3",
    title: "Stage 3: Data & Pipelines",
    duration: "3-4 weeks",
    description: "Data modeling, joining messy customer data, building ingestion pipelines, data quality, SQL analytics, and basic Spark/warehouse awareness.",
    sections: [
      {
        id: "3.1",
        title: "Data modeling & messy joins",
        items: [
          "Normalized vs denormalized; star schema and fact/dimension basics",
          "Choosing keys; surrogate vs natural keys; handling fuzzy matches",
          "Reconciling inconsistent customer data (formats, encodings, dupes)",
          "Schema evolution and contract changes from upstream systems"
        ]
      },
      {
        id: "3.2",
        title: "Ingestion pipelines & quality",
        items: [
          "Batch vs streaming ingestion; idempotent/incremental loads",
          "Building a pipeline: extract, validate, transform, load",
          "Data quality checks: nulls, ranges, referential integrity, freshness",
          "Orchestration concepts (Airflow-style DAGs), retries, backfills"
        ]
      },
      {
        id: "3.3",
        title: "Analytics, Spark & warehouse awareness",
        items: [
          "SQL analytics for customer insight and validation",
          "Columnar warehouses (Snowflake/BigQuery/Redshift) at a high level",
          "When to reach for Spark; partitions, shuffles, lazy evaluation basics",
          "File formats (Parquet, CSV, JSON) and partitioning strategy"
        ]
      }
    ]
  },
  {
    id: "fde-4",
    title: "Stage 4: Systems & Debugging in the Field",
    duration: "3-4 weeks",
    description: "Reading logs, distributed tracing, reproducing customer bugs, root-cause analysis, performance triage, networking, and Docker/K8s deploy at customer sites.",
    sections: [
      {
        id: "4.1",
        title: "Observability & debugging",
        items: [
          "Reading logs effectively; structured logging and correlation IDs",
          "Metrics, traces, and the three pillars of observability",
          "Reproducing a customer bug from partial information",
          "Systematic root-cause analysis and bisecting the problem"
        ]
      },
      {
        id: "4.2",
        title: "Performance & networking",
        items: [
          "Performance triage: CPU, memory, I/O, latency vs throughput",
          "Profiling and finding the bottleneck before optimizing",
          "Networking basics: DNS, TLS, ports, proxies, firewalls, NAT",
          "Diagnosing connectivity issues at locked-down customer networks"
        ]
      },
      {
        id: "4.3",
        title: "Containers & deploy at customer",
        items: [
          "Docker: images, layers, Dockerfile, environment config",
          "Kubernetes basics: pods, deployments, services, configmaps/secrets",
          "Deploying into an air-gapped or restricted customer environment",
          "Rollbacks, health checks, and config-driven environment differences"
        ]
      }
    ]
  },
  {
    id: "fde-5",
    title: "Stage 5: Solution Architecture",
    duration: "3-4 weeks",
    description: "Gathering requirements, designing a customer deployment, trade-offs, security/compliance, on-prem vs cloud, and scoping MVPs.",
    sections: [
      {
        id: "5.1",
        title: "Requirements & scoping",
        items: [
          "Eliciting real requirements vs stated requests; finding constraints",
          "Scoping an MVP and sequencing toward the full solution",
          "Identifying integration points and data sources up front",
          "Surfacing assumptions, risks, and unknowns early"
        ]
      },
      {
        id: "5.2",
        title: "Designing the deployment",
        items: [
          "On-prem vs cloud vs hybrid trade-offs for a given customer",
          "Reference architecture: ingestion, processing, storage, serving",
          "Designing for the customer's scale, latency, and reliability needs",
          "Make-vs-buy and reusing platform capabilities vs custom build"
        ]
      },
      {
        id: "5.3",
        title: "Security, compliance & trade-offs",
        items: [
          "Data residency, PII handling, encryption in transit/at rest",
          "Compliance contexts (SOC 2, HIPAA, GDPR) at a working level",
          "Network isolation, least privilege, and audit requirements",
          "Articulating trade-offs and defending a design decision"
        ]
      }
    ]
  },
  {
    id: "fde-6",
    title: "Stage 6: Communication & Stakeholder Management",
    duration: "2-3 weeks",
    description: "Translating business to technical, managing expectations, demos, handling ambiguity, prioritization, working with non-technical users, and incident comms.",
    sections: [
      {
        id: "6.1",
        title: "Translation & expectation-setting",
        items: [
          "Translating business goals into technical scope (and back)",
          "Setting and managing expectations on timelines and trade-offs",
          "Saying no / re-scoping without damaging the relationship",
          "Writing clear status updates for mixed audiences"
        ]
      },
      {
        id: "6.2",
        title: "Demos, ambiguity & prioritization",
        items: [
          "Running an effective demo; tailoring to the audience",
          "Operating under ambiguity and making progress without full specs",
          "Prioritization frameworks (impact vs effort, RICE) in the field",
          "Working with non-technical users and gathering feedback"
        ]
      },
      {
        id: "6.3",
        title: "Incident & escalation comms",
        items: [
          "Incident communication: what to say, to whom, how often",
          "Escalating internally while keeping the customer confident",
          "Blameless postmortems and following up on commitments",
          "Building trust as the customer's technical point of contact"
        ]
      }
    ]
  },
  {
    id: "fde-7",
    title: "Stage 7: Behavioral & Case Studies",
    duration: "2-3 weeks",
    description: "Ownership, unhappy customers, ambiguous problems, deployments that went wrong, prioritizing under pressure, and scoping a customer project end-to-end.",
    sections: [
      {
        id: "7.1",
        title: "Core behavioral themes",
        items: [
          "Ownership and bias to action with concrete STAR stories",
          "Dealing with an unhappy or frustrated customer",
          "Navigating an ambiguous, under-specified problem",
          "Prioritizing under pressure with competing demands"
        ]
      },
      {
        id: "7.2",
        title: "Deployment war stories",
        items: [
          "\"Tell me about a deployment that went wrong\" — structured answer",
          "A time you disagreed with product/eng and how you resolved it",
          "A time you had to learn a new domain fast for a customer",
          "Balancing customization requests vs the standard product"
        ]
      },
      {
        id: "7.3",
        title: "End-to-end case studies",
        items: [
          "Scoping a customer project end-to-end in an interview",
          "Walking through a hypothetical messy integration live",
          "Questions to ask the interviewer about the customer/problem",
          "Closing strong: summarizing trade-offs and next steps"
        ]
      }
    ]
  }
];
