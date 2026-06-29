// Python Backend Developer interview-prep track. Track: python-backend
export const ROADMAP = [
  {
    id: "pyb-1",
    title: "Stage 1: Python Deep Dive",
    duration: "2-3 weeks",
    description: "The language internals every backend interview probes: the data model, mutability, decorators, generators, context managers, closures, the GIL, and type hints.",
    sections: [
      {
        id: "1.1",
        title: "Data Model & Object Semantics",
        items: [
          "Everything is an object; id(), is vs ==, and the small-int/string interning cache",
          "Dunder methods (__init__, __repr__, __str__, __eq__, __hash__, __len__, __getitem__)",
          "Mutable vs immutable types and the mutable-default-argument trap",
          "Truthiness, __bool__/__len__, and falsy values",
          "Pass-by-object-reference: how arguments are actually bound"
        ]
      },
      {
        id: "1.2",
        title: "Functions, Closures & Decorators",
        items: [
          "*args / **kwargs, positional-only (/) and keyword-only (*) params",
          "Closures, the late-binding gotcha, and nonlocal",
          "Decorators (with and without arguments) and functools.wraps",
          "functools.lru_cache, partial, and reduce",
          "First-class functions and higher-order patterns"
        ]
      },
      {
        id: "1.3",
        title: "Iterators, Generators & Comprehensions",
        items: [
          "Iterator protocol (__iter__/__next__) and StopIteration",
          "Generators, yield, lazy evaluation, and memory efficiency",
          "Generator expressions vs list/dict/set comprehensions",
          "yield from, sub-generators, and infinite sequences",
          "itertools (chain, islice, groupby, count, cycle)"
        ]
      },
      {
        id: "1.4",
        title: "Context Managers, GIL, Memory & Typing",
        items: [
          "Context managers: __enter__/__exit__ and contextlib.contextmanager",
          "The GIL: what it protects, why threads don't parallelize CPU, when it's released",
          "Reference counting, garbage collection, and reference cycles",
          "Type hints, typing module, Optional/Union, Generics, Protocol",
          "mypy static checking and runtime cost (hints are not enforced)"
        ]
      }
    ]
  },
  {
    id: "pyb-2",
    title: "Stage 2: OOP & Design in Python",
    duration: "2 weeks",
    description: "Pythonic object orientation and design: inheritance and MRO, dataclasses, ABCs, composition over inheritance, SOLID, and idiomatic design patterns.",
    sections: [
      {
        id: "2.1",
        title: "Classes & Attributes",
        items: [
          "Instance vs class vs static methods (@classmethod, @staticmethod)",
          "Properties, getters/setters, and computed attributes",
          "__slots__ for memory and attribute control",
          "Class variables vs instance variables and shared-state pitfalls",
          "Name mangling (__x) and the single-underscore convention"
        ]
      },
      {
        id: "2.2",
        title: "Inheritance, MRO & ABCs",
        items: [
          "Single vs multiple inheritance and the diamond problem",
          "Method Resolution Order (C3 linearization) and super()",
          "Abstract base classes (abc.ABC, @abstractmethod)",
          "Composition over inheritance and mixins",
          "Duck typing and structural typing with Protocol"
        ]
      },
      {
        id: "2.3",
        title: "Dataclasses & Modern Modeling",
        items: [
          "@dataclass, field(), default_factory, frozen, eq/order",
          "__post_init__ and validation",
          "Dataclass vs namedtuple vs Pydantic vs plain class",
          "Enums and the enum module"
        ]
      },
      {
        id: "2.4",
        title: "SOLID & Design Patterns",
        items: [
          "SOLID principles applied in Python",
          "Pythonic patterns: Strategy (functions), Factory, Singleton (module), Adapter",
          "Dependency injection without a framework",
          "Avoiding over-engineering; favoring simplicity and duck typing"
        ]
      }
    ]
  },
  {
    id: "pyb-3",
    title: "Stage 3: Async & Concurrency",
    duration: "2-3 weeks",
    description: "How Python does concurrency: the asyncio event loop, coroutines and await, tasks and gather, and choosing between threading, multiprocessing, and asyncio.",
    sections: [
      {
        id: "3.1",
        title: "asyncio Fundamentals",
        items: [
          "Coroutines, async def, await, and the event loop",
          "asyncio.run, the loop, and why blocking calls break it",
          "Tasks vs coroutines; asyncio.create_task and scheduling",
          "asyncio.gather, wait, as_completed, and TaskGroup",
          "Timeouts, cancellation, and async context managers / async for"
        ]
      },
      {
        id: "3.2",
        title: "Threads, Processes & the GIL",
        items: [
          "Threading and where the GIL is released (I/O, C extensions)",
          "Multiprocessing for CPU-bound parallelism (separate interpreters)",
          "concurrent.futures: ThreadPoolExecutor vs ProcessPoolExecutor",
          "Bridging blocking code with run_in_executor / asyncio.to_thread",
          "When to choose asyncio vs threads vs processes"
        ]
      },
      {
        id: "3.3",
        title: "Synchronization & Pitfalls",
        items: [
          "Race conditions, locks, semaphores, and asyncio.Lock",
          "Deadlocks and starvation",
          "Queues for producer/consumer (queue.Queue, asyncio.Queue)",
          "Common asyncio mistakes (forgetting await, blocking the loop)"
        ]
      }
    ]
  },
  {
    id: "pyb-4",
    title: "Stage 4: FastAPI",
    duration: "2-3 weeks",
    description: "Building modern async APIs with FastAPI: path/query/body params, Pydantic validation, dependency injection, middleware, background tasks, auth, and OpenAPI docs.",
    sections: [
      {
        id: "4.1",
        title: "Routing & Request Parsing",
        items: [
          "Path, query, and body parameters and automatic validation",
          "Pydantic models for request/response and response_model",
          "Status codes, error handling, and HTTPException",
          "Sync vs async endpoints and how FastAPI runs them",
          "Automatic OpenAPI/Swagger docs generation"
        ]
      },
      {
        id: "4.2",
        title: "Pydantic & Validation",
        items: [
          "Pydantic v2 BaseModel, field types, and constraints",
          "Validators (field_validator, model_validator) and computed fields",
          "Settings management with pydantic-settings / BaseSettings",
          "Serialization, aliases, and model_dump / model_validate"
        ]
      },
      {
        id: "4.3",
        title: "Dependency Injection & Middleware",
        items: [
          "Depends() and dependency injection (DB sessions, current user)",
          "Dependencies with yield for setup/teardown",
          "Middleware and CORS",
          "Background tasks and when to use a real task queue instead"
        ]
      },
      {
        id: "4.4",
        title: "Auth & Security",
        items: [
          "OAuth2 password flow and Bearer tokens",
          "JWT creation, verification, and expiry",
          "Password hashing (bcrypt/passlib) and never storing plaintext",
          "Securing routes with dependencies and scopes"
        ]
      }
    ]
  },
  {
    id: "pyb-5",
    title: "Stage 5: Django & Flask",
    duration: "2-3 weeks",
    description: "The two other major frameworks: Django's batteries-included ORM/DRF stack, Flask's minimalism with app factory and blueprints, and when to choose which.",
    sections: [
      {
        id: "5.1",
        title: "Django Core & ORM",
        items: [
          "MVT architecture and the request lifecycle",
          "Models, migrations (makemigrations/migrate), and the ORM",
          "QuerySets, lazy evaluation, select_related vs prefetch_related",
          "Views (FBV vs CBV), URLs, and templates",
          "Middleware and the settings module"
        ]
      },
      {
        id: "5.2",
        title: "Django REST Framework",
        items: [
          "Serializers and ModelSerializer",
          "APIView, ViewSets, and routers",
          "Authentication and permissions",
          "Pagination, filtering, and throttling"
        ]
      },
      {
        id: "5.3",
        title: "Flask",
        items: [
          "App factory pattern and application/request context",
          "Blueprints for modular apps",
          "Request lifecycle and the WSGI model",
          "Extensions (SQLAlchemy, Marshmallow) vs Django batteries-included"
        ]
      },
      {
        id: "5.4",
        title: "Choosing a Framework",
        items: [
          "Django vs Flask vs FastAPI tradeoffs",
          "Sync (WSGI) vs async (ASGI) implications",
          "Monolith vs microservice fit",
          "Ecosystem, admin, and time-to-market considerations"
        ]
      }
    ]
  },
  {
    id: "pyb-6",
    title: "Stage 6: Databases & ORMs",
    duration: "2-3 weeks",
    description: "Talking to relational databases the right way: SQLAlchemy Core vs ORM, sessions and the unit of work, relationships, the N+1 problem, Alembic, pooling, and transactions.",
    sections: [
      {
        id: "6.1",
        title: "SQLAlchemy Core & ORM",
        items: [
          "Core (expression language) vs ORM and when to use each",
          "Engine, connection, and the Session (unit of work)",
          "Declarative models, columns, and relationships",
          "Identity map and flush vs commit",
          "Querying with select() and the 2.0 style API"
        ]
      },
      {
        id: "6.2",
        title: "Relationships & Performance",
        items: [
          "One-to-many, many-to-many, and back_populates",
          "Lazy vs eager loading (selectinload, joinedload)",
          "The N+1 query problem and how to fix it",
          "Indexes, EXPLAIN, and avoiding full scans"
        ]
      },
      {
        id: "6.3",
        title: "Transactions, Pooling & Migrations",
        items: [
          "Transactions, ACID, isolation levels, and rollback",
          "Connection pooling (pool_size, max_overflow, pre_ping)",
          "Alembic migrations (autogenerate, upgrade/downgrade)",
          "Async DB drivers (asyncpg) and AsyncSession"
        ]
      }
    ]
  },
  {
    id: "pyb-7",
    title: "Stage 7: APIs, Caching & Tasks",
    duration: "2-3 weeks",
    description: "Production API concerns: REST design, pagination and rate limiting, Redis caching, Celery task queues, websockets, idempotency, and API versioning.",
    sections: [
      {
        id: "7.1",
        title: "REST API Design",
        items: [
          "Resource modeling, HTTP verbs, and status codes",
          "Pagination strategies (offset vs cursor/keyset)",
          "API versioning (URL, header, media type)",
          "Idempotency and idempotency keys for safe retries"
        ]
      },
      {
        id: "7.2",
        title: "Caching & Rate Limiting",
        items: [
          "Redis as a cache; cache-aside pattern and TTLs",
          "Cache invalidation and the thundering-herd problem",
          "Rate limiting algorithms (token bucket, sliding window)",
          "ETags / conditional requests and HTTP caching"
        ]
      },
      {
        id: "7.3",
        title: "Task Queues & Realtime",
        items: [
          "Celery: broker, worker, result backend, and task flow",
          "Retries, idempotent tasks, and at-least-once delivery",
          "Scheduled/periodic tasks (Celery beat)",
          "WebSockets for realtime vs request/response"
        ]
      }
    ]
  },
  {
    id: "pyb-8",
    title: "Stage 8: Testing & Deployment",
    duration: "2-3 weeks",
    description: "Shipping with confidence: pytest fixtures and mocking, coverage, ASGI/WSGI servers, Docker, configuration, structured logging, observability, and CI/CD.",
    sections: [
      {
        id: "8.1",
        title: "Testing with pytest",
        items: [
          "Fixtures, scope, conftest.py, and dependency setup/teardown",
          "Parametrize for table-driven tests",
          "Mocking with unittest.mock / monkeypatch and patch targets",
          "Testing FastAPI/Flask apps with a test client",
          "Coverage and what to actually test (behavior, not lines)"
        ]
      },
      {
        id: "8.2",
        title: "Servers & Containers",
        items: [
          "WSGI vs ASGI and gunicorn vs uvicorn",
          "Worker models (uvicorn workers under gunicorn)",
          "Dockerizing a Python app (slim images, layer caching)",
          "12-factor config: environment variables and secrets"
        ]
      },
      {
        id: "8.3",
        title: "Observability & CI/CD",
        items: [
          "Structured logging and log levels",
          "Metrics, tracing, and health/readiness checks",
          "CI/CD pipelines (lint, test, build, deploy)",
          "Graceful shutdown and zero-downtime deploys"
        ]
      }
    ]
  }
];
