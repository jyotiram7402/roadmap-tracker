// Data Engineer interview-prep track. Track: data-engineer
export const ROADMAP = [
  {
    id: "de-1",
    title: "Stage 1: Advanced SQL",
    duration: "3-4 weeks",
    description: "The single most-tested data-engineering skill: window functions, CTEs, query optimization, EXPLAIN plans, indexing, and partitioning.",
    sections: [
      {
        id: "1.1",
        title: "Window Functions & Analytics",
        items: [
          "ROW_NUMBER vs RANK vs DENSE_RANK and tie handling",
          "PARTITION BY, ORDER BY, and the window frame (ROWS vs RANGE)",
          "Running totals, moving averages, LAG/LEAD for period-over-period",
          "NTILE, FIRST_VALUE/LAST_VALUE, and percentiles",
          "Deduplication and top-N-per-group with ROW_NUMBER"
        ]
      },
      {
        id: "1.2",
        title: "CTEs, Subqueries & Set Logic",
        items: [
          "CTEs vs subqueries vs derived tables; readability and reuse",
          "Recursive CTEs for hierarchies and date spines",
          "Correlated vs non-correlated subqueries",
          "EXISTS vs IN vs JOIN and NULL semantics",
          "UNION vs UNION ALL, INTERSECT, EXCEPT"
        ]
      },
      {
        id: "1.3",
        title: "Query Optimization & Indexing",
        items: [
          "Reading EXPLAIN / EXPLAIN ANALYZE plans (scans, joins, sorts)",
          "Index types: B-tree, hash, composite, covering indexes",
          "Index selectivity, sargability, and why functions kill indexes",
          "Join algorithms: nested loop, hash join, merge join",
          "Partition pruning, partitioning strategies, and clustering"
        ]
      }
    ]
  },
  {
    id: "de-2",
    title: "Stage 2: Data Modeling & Warehousing",
    duration: "3-4 weeks",
    description: "How analytical data is structured: OLTP vs OLAP, dimensional modeling, star vs snowflake, slowly changing dimensions, and Kimball vs Inmon.",
    sections: [
      {
        id: "2.1",
        title: "OLTP vs OLAP & Normalization",
        items: [
          "OLTP vs OLAP workloads, schemas, and storage (row vs columnar)",
          "Normalization (1NF/2NF/3NF) vs denormalization trade-offs",
          "Why analytics denormalizes for read performance",
          "Surrogate keys vs natural/business keys",
          "Grain of a fact table and why it matters"
        ]
      },
      {
        id: "2.2",
        title: "Dimensional Modeling",
        items: [
          "Fact tables (additive, semi-additive, non-additive) and dimensions",
          "Star schema vs snowflake schema trade-offs",
          "Conformed dimensions and the enterprise bus matrix",
          "Fact types: transaction, periodic snapshot, accumulating snapshot",
          "Factless facts, degenerate dimensions, junk dimensions"
        ]
      },
      {
        id: "2.3",
        title: "SCD & Methodologies",
        items: [
          "Slowly Changing Dimensions Type 1 (overwrite)",
          "SCD Type 2 (history with effective dates / current flag)",
          "SCD Type 3 (limited prior-value column)",
          "Kimball (bottom-up dimensional) vs Inmon (top-down 3NF) approaches",
          "Data vault overview and when each model fits"
        ]
      }
    ]
  },
  {
    id: "de-3",
    title: "Stage 3: Python for Data Engineering",
    duration: "3-4 weeks",
    description: "The glue language of data pipelines: pandas, columnar file formats, working with APIs, and an on-ramp to PySpark.",
    sections: [
      {
        id: "3.1",
        title: "pandas & Data Wrangling",
        items: [
          "Series vs DataFrame, dtypes, and memory footprint",
          "groupby/agg, merge/join, pivot, melt, and apply pitfalls",
          "Vectorization vs Python loops; chunked reads for large files",
          "Handling nulls, type coercion, and date parsing",
          "When pandas stops scaling and you reach for Spark/Polars"
        ]
      },
      {
        id: "3.2",
        title: "File Formats",
        items: [
          "CSV/JSON vs columnar (Parquet/ORC) vs row (Avro)",
          "Parquet internals: columnar storage, predicate pushdown, encoding",
          "Avro schema evolution and use in Kafka pipelines",
          "Compression codecs (snappy, gzip, zstd) and splittability",
          "Choosing a format by workload (analytics vs streaming)"
        ]
      },
      {
        id: "3.3",
        title: "APIs & PySpark Basics",
        items: [
          "Consuming REST APIs: pagination, rate limits, retries, backoff",
          "Idempotent extraction and incremental pulls",
          "PySpark SparkSession, DataFrame API, reading/writing formats",
          "select/filter/withColumn/groupBy and UDFs (and their cost)",
          "Local pandas vs distributed Spark mental model"
        ]
      }
    ]
  },
  {
    id: "de-4",
    title: "Stage 4: Apache Spark",
    duration: "4-5 weeks",
    description: "Distributed processing internals: RDD vs DataFrame, lazy evaluation, shuffles, broadcast joins, caching, the Catalyst optimizer, and skew handling.",
    sections: [
      {
        id: "4.1",
        title: "Core Model & Execution",
        items: [
          "RDD vs DataFrame vs Dataset; when to use each",
          "Transformations vs actions and lazy evaluation",
          "Narrow vs wide transformations and what triggers a shuffle",
          "Jobs, stages, tasks, and the DAG scheduler",
          "Driver vs executors, partitions, and parallelism"
        ]
      },
      {
        id: "4.2",
        title: "Performance & Optimization",
        items: [
          "The shuffle: cost, spill, and how to minimize it",
          "Broadcast joins and the broadcast threshold",
          "Caching/persistence levels and when to cache",
          "Catalyst optimizer, predicate pushdown, and AQE",
          "repartition vs coalesce and partition sizing"
        ]
      },
      {
        id: "4.3",
        title: "Skew & Streaming",
        items: [
          "Detecting data skew and salting hot keys",
          "Spill, OOM, and memory tuning fundamentals",
          "Spark Structured Streaming model and triggers",
          "Watermarks, windowing, and late data",
          "Output modes and checkpointing for fault tolerance"
        ]
      }
    ]
  },
  {
    id: "de-5",
    title: "Stage 5: Kafka & Streaming",
    duration: "3-4 weeks",
    description: "Event streaming foundations: brokers, topics, partitions, offsets, consumer groups, exactly-once, log compaction, schema registry, and stream vs batch.",
    sections: [
      {
        id: "5.1",
        title: "Kafka Architecture",
        items: [
          "Brokers, topics, partitions, replicas, and the leader/ISR model",
          "Producers, keys, and partition assignment",
          "Offsets, committed offsets, and retention",
          "Consumer groups, partition assignment, and rebalancing",
          "Log compaction vs time/size retention"
        ]
      },
      {
        id: "5.2",
        title: "Delivery Guarantees & Schema",
        items: [
          "At-most-once, at-least-once, and exactly-once semantics",
          "Idempotent producer and transactions for exactly-once",
          "Consumer offset management and the read-process-commit problem",
          "Schema Registry, Avro, and compatibility modes",
          "Dead-letter topics and poison-message handling"
        ]
      },
      {
        id: "5.3",
        title: "Streaming Concepts",
        items: [
          "Stream vs batch processing trade-offs",
          "Event time vs processing time and watermarks",
          "Tumbling, sliding, and session windows",
          "Stateful processing and changelog state stores",
          "Kafka Streams / Flink awareness and when to choose them"
        ]
      }
    ]
  },
  {
    id: "de-6",
    title: "Stage 6: Orchestration & ETL/ELT",
    duration: "3-4 weeks",
    description: "Building reliable pipelines: Airflow DAGs/operators/sensors/XCom/backfill, dbt models and tests, idempotency, and incremental loads.",
    sections: [
      {
        id: "6.1",
        title: "Airflow",
        items: [
          "DAGs, tasks, operators, and dependencies",
          "Sensors, deferrable operators, and pokes vs reschedule",
          "XCom for passing data between tasks (and its size limits)",
          "Scheduling, execution_date/logical_date, catchup and backfill",
          "Idempotent tasks, retries, SLAs, and the executor model"
        ]
      },
      {
        id: "6.2",
        title: "dbt & Transformation",
        items: [
          "dbt models, materializations (view/table/incremental/ephemeral)",
          "ref/source, the DAG, and lineage",
          "Tests (unique, not_null, relationships) and assertions",
          "Incremental models and the is_incremental pattern",
          "Snapshots for SCD Type 2 in dbt"
        ]
      },
      {
        id: "6.3",
        title: "Pipeline Design",
        items: [
          "ETL vs ELT and why ELT dominates the cloud warehouse era",
          "Idempotency, exactly-once load, and reprocessing safely",
          "Full vs incremental loads; CDC and high-watermark patterns",
          "Backfills, late-arriving data, and partition overwrite",
          "Batch ETL pipeline design end to end"
        ]
      }
    ]
  },
  {
    id: "de-7",
    title: "Stage 7: Cloud Data Platforms",
    duration: "3-4 weeks",
    description: "Where modern data lives: Snowflake architecture, BigQuery, Redshift, S3 data lakes, and the lakehouse (Delta Lake / Iceberg).",
    sections: [
      {
        id: "7.1",
        title: "Cloud Warehouses",
        items: [
          "Snowflake architecture: separation of storage and compute, virtual warehouses",
          "Snowflake micro-partitions, clustering, and time travel",
          "BigQuery serverless model, slots, and partitioning/clustering",
          "Redshift cluster/RA3, distribution keys, sort keys, and VACUUM",
          "Cost models and compute auto-suspend/scaling"
        ]
      },
      {
        id: "7.2",
        title: "Data Lakes & Lakehouse",
        items: [
          "S3 data lake layout, partitioning, and the small-files problem",
          "Lakehouse concept: warehouse semantics on lake storage",
          "Delta Lake transaction log, ACID, and time travel",
          "Apache Iceberg table format, hidden partitioning, and snapshots",
          "Open table formats vs proprietary warehouse storage"
        ]
      },
      {
        id: "7.3",
        title: "Cost & Performance",
        items: [
          "Partitioning and clustering for scan reduction",
          "File compaction and OPTIMIZE/Z-ordering",
          "Caching layers and result reuse",
          "Right-sizing compute and concurrency scaling",
          "Monitoring spend and avoiding runaway queries"
        ]
      }
    ]
  },
  {
    id: "de-8",
    title: "Stage 8: Data Quality, Governance & Reliability",
    duration: "2-3 weeks",
    description: "Making pipelines trustworthy: data quality checks, Great Expectations, lineage, idempotent/retryable design, monitoring/SLAs, and GDPR/PII.",
    sections: [
      {
        id: "8.1",
        title: "Data Quality & Testing",
        items: [
          "Dimensions of data quality (completeness, accuracy, freshness, uniqueness)",
          "Great Expectations: expectations, suites, and checkpoints",
          "Schema validation and contract testing between producers/consumers",
          "Anomaly detection on volume and distribution",
          "Quarantine vs fail-fast strategies for bad data"
        ]
      },
      {
        id: "8.2",
        title: "Reliability & Observability",
        items: [
          "Idempotent and retryable pipeline design",
          "Data lineage, cataloging, and impact analysis",
          "Monitoring, alerting, and freshness/volume SLAs",
          "Data observability (the five pillars)",
          "Recovering from failures and safe backfills"
        ]
      },
      {
        id: "8.3",
        title: "Governance & Scale",
        items: [
          "GDPR/CCPA, PII handling, masking, and right-to-be-forgotten",
          "Access control, row/column-level security, and tokenization",
          "Partitioning strategy for scale and query performance",
          "Retention policies and data lifecycle management",
          "Cost and reliability trade-offs at scale"
        ]
      }
    ]
  }
];
