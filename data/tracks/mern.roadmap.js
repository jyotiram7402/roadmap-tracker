// MERN Stack interview-prep track. Track: mern
export const ROADMAP = [
  {
    id: "mern-1",
    title: "Stage 1: JavaScript & TypeScript Foundations",
    duration: "2-3 weeks",
    description: "Core language mechanics that every MERN interview probes: closures, async, the event loop, ES6+, and TypeScript typing.",
    sections: [
      {
        id: "1.1",
        title: "JavaScript Core",
        items: [
          "Scope, hoisting, and the temporal dead zone (var vs let vs const)",
          "Closures and practical use cases (data privacy, factories, memoization)",
          "this binding, call/apply/bind, and arrow function lexical this",
          "Prototypes, prototype chain, and class syntax sugar",
          "Value vs reference, shallow vs deep copy, structuredClone"
        ]
      },
      {
        id: "1.2",
        title: "Asynchronous JavaScript & Event Loop",
        items: [
          "Callbacks, Promises, and async/await semantics",
          "Microtask vs macrotask queues and event-loop ordering",
          "Promise.all / allSettled / race / any differences",
          "Error handling with try/catch in async functions",
          "Debounce, throttle, and avoiding blocking the main thread"
        ]
      },
      {
        id: "1.3",
        title: "ES6+ Features",
        items: [
          "Destructuring, spread/rest, default parameters",
          "Modules (import/export), optional chaining, nullish coalescing",
          "Map/Set/WeakMap, iterators, generators",
          "Template literals, tagged templates, Symbol"
        ]
      },
      {
        id: "1.4",
        title: "TypeScript Essentials",
        items: [
          "Types vs interfaces, union/intersection, literal types",
          "Generics and generic constraints",
          "Utility types (Partial, Pick, Omit, Record, Readonly)",
          "Type narrowing, guards, unknown vs any, type assertions",
          "Typing async functions and Express/React with TS"
        ]
      }
    ]
  },
  {
    id: "mern-2",
    title: "Stage 2: Node.js Core",
    duration: "2-3 weeks",
    description: "How Node actually runs: single-threaded event loop on libuv, streams, buffers, modules, EventEmitter, and clustering.",
    sections: [
      {
        id: "2.1",
        title: "Runtime & Event Loop",
        items: [
          "V8 + libuv architecture; single thread vs thread pool",
          "Event loop phases (timers, pending, poll, check, close)",
          "process.nextTick vs setImmediate vs setTimeout",
          "Blocking vs non-blocking I/O and CPU-bound work pitfalls",
          "worker_threads vs cluster vs child_process"
        ]
      },
      {
        id: "2.2",
        title: "Modules, Streams & Buffers",
        items: [
          "CommonJS vs ES Modules (require vs import, interop)",
          "Streams: readable, writable, duplex, transform; backpressure",
          "Buffers and binary data handling",
          "EventEmitter pattern and memory-leak warnings",
          "fs, path, and the util.promisify helper"
        ]
      },
      {
        id: "2.3",
        title: "Errors, Scaling & Tooling",
        items: [
          "Synchronous vs async error handling; uncaughtException/unhandledRejection",
          "Operational vs programmer errors and graceful shutdown",
          "cluster module and load balancing across CPU cores",
          "npm vs npx, package.json, semver, lockfiles",
          "Environment variables and the process object"
        ]
      }
    ]
  },
  {
    id: "mern-3",
    title: "Stage 3: Express.js",
    duration: "2-3 weeks",
    description: "Building REST APIs with Express: routing, the middleware chain, error middleware, validation, file upload, and security hardening.",
    sections: [
      {
        id: "3.1",
        title: "Routing & Middleware",
        items: [
          "App vs Router, route params, query strings",
          "Middleware signature (req, res, next) and execution order",
          "Built-in, third-party, and custom middleware",
          "Error-handling middleware (4-arg) and async error forwarding",
          "Request lifecycle from listen to response"
        ]
      },
      {
        id: "3.2",
        title: "REST API Design & Validation",
        items: [
          "Resource naming, HTTP verbs, and status codes",
          "Idempotency, pagination, filtering, versioning",
          "Input validation with Joi / express-validator / Zod",
          "Centralized response and error shape",
          "File upload with multer (memory vs disk storage)"
        ]
      },
      {
        id: "3.3",
        title: "Security & Performance",
        items: [
          "helmet, cors, and express-rate-limit",
          "Preventing NoSQL injection and XSS",
          "Compression, caching headers, and gzip",
          "Auth middleware and protecting routes",
          "Logging with morgan / pino and request tracing"
        ]
      }
    ]
  },
  {
    id: "mern-4",
    title: "Stage 4: MongoDB & Mongoose",
    duration: "3-4 weeks",
    description: "Document modeling and querying: CRUD, the aggregation pipeline, indexes, embed vs reference, transactions, and Mongoose ODM.",
    sections: [
      {
        id: "4.1",
        title: "MongoDB Fundamentals",
        items: [
          "Documents, collections, BSON, and the _id/ObjectId",
          "CRUD operators ($set, $inc, $push, $pull, upsert)",
          "Query operators ($in, $gte, $regex, projection)",
          "Indexes: single, compound, multikey, text, TTL",
          "Replica sets, sharding, and the WiredTiger storage engine"
        ]
      },
      {
        id: "4.2",
        title: "Aggregation & Data Modeling",
        items: [
          "Aggregation pipeline stages ($match, $group, $lookup, $project)",
          "$unwind, $facet, $bucket, and pipeline optimization",
          "Embedding vs referencing; one-to-few vs one-to-many",
          "Schema design patterns and anti-patterns",
          "Multi-document ACID transactions"
        ]
      },
      {
        id: "4.3",
        title: "Mongoose ODM",
        items: [
          "Schemas, models, SchemaTypes, and validation",
          "Middleware/hooks (pre/post save, find)",
          "populate() and virtual populate for references",
          "lean() queries and performance",
          "Indexes, plugins, and discriminators"
        ]
      }
    ]
  },
  {
    id: "mern-5",
    title: "Stage 5: React",
    duration: "3-4 weeks",
    description: "Modern React with hooks: state, context, performance optimization, routing, forms, and data fetching with React Query.",
    sections: [
      {
        id: "5.1",
        title: "Components, Hooks & State",
        items: [
          "Function components, JSX, and the virtual DOM/reconciliation",
          "useState, useEffect, dependency arrays, cleanup",
          "useRef, useReducer, and custom hooks",
          "Controlled vs uncontrolled components",
          "Keys, lists, and conditional rendering"
        ]
      },
      {
        id: "5.2",
        title: "Context & Performance",
        items: [
          "Context API and avoiding prop drilling",
          "React.memo, useMemo, useCallback (and when NOT to)",
          "Re-render causes and how to diagnose them",
          "Code splitting with lazy and Suspense",
          "Error boundaries and the rules of hooks"
        ]
      },
      {
        id: "5.3",
        title: "Routing, Forms & Data Fetching",
        items: [
          "React Router (routes, params, navigation, protected routes)",
          "Forms with controlled inputs and react-hook-form",
          "Data fetching patterns and race-condition handling",
          "React Query / TanStack Query (caching, invalidation, mutations)",
          "Optimistic updates and stale-while-revalidate"
        ]
      }
    ]
  },
  {
    id: "mern-6",
    title: "Stage 6: Full-Stack Integration",
    duration: "2-3 weeks",
    description: "Wiring React to Express end-to-end: JWT auth flow, cookies vs localStorage, CORS, file uploads, websockets, and global state.",
    sections: [
      {
        id: "6.1",
        title: "API Consumption & Auth",
        items: [
          "Calling the REST API from React (fetch/axios, interceptors)",
          "JWT auth flow front-to-back (login, refresh, logout)",
          "Access vs refresh tokens and where to store them",
          "Cookies (httpOnly, SameSite) vs localStorage trade-offs",
          "CORS with credentials and preflight requests"
        ]
      },
      {
        id: "6.2",
        title: "Realtime & State Management",
        items: [
          "WebSockets and Socket.IO (rooms, broadcast, ack)",
          "File uploads from React to Express with multer",
          "Redux Toolkit (slices, thunks, RTK Query)",
          "Zustand and lightweight global state",
          "Server-sent events vs websockets vs polling"
        ]
      }
    ]
  },
  {
    id: "mern-7",
    title: "Stage 7: Testing & Quality",
    duration: "2 weeks",
    description: "Confidence through tests: Jest, React Testing Library, supertest for Express, mocking strategies, and end-to-end with Playwright.",
    sections: [
      {
        id: "7.1",
        title: "Unit & Integration Testing",
        items: [
          "Jest fundamentals (matchers, describe/it, setup/teardown)",
          "Mocking modules, timers, and network with jest.mock",
          "React Testing Library: queries, user-event, async findBy",
          "Testing hooks and avoiding implementation-detail tests",
          "supertest for Express route/integration tests"
        ]
      },
      {
        id: "7.2",
        title: "E2E, Coverage & Strategy",
        items: [
          "The testing pyramid and what to test where",
          "Playwright e2e (selectors, fixtures, auth state)",
          "Test database strategy (mongodb-memory-server)",
          "Coverage metrics and meaningful thresholds",
          "Flaky tests, CI integration, and test isolation"
        ]
      }
    ]
  },
  {
    id: "mern-8",
    title: "Stage 8: Deployment & DevOps",
    duration: "2-3 weeks",
    description: "Shipping MERN apps: env config, PM2, Docker, MongoDB Atlas, CI/CD, hosting on Vercel/Render, and observability.",
    sections: [
      {
        id: "8.1",
        title: "Configuration & Process Management",
        items: [
          "12-factor config, dotenv, and secrets management",
          "PM2 for clustering, restarts, and zero-downtime reloads",
          "Graceful shutdown and health checks",
          "Build pipelines for React (Vite) and serving static assets",
          "MongoDB Atlas setup, connection strings, and IP allowlists"
        ]
      },
      {
        id: "8.2",
        title: "Containers & CI/CD",
        items: [
          "Dockerizing a Node app (multi-stage builds, .dockerignore)",
          "docker-compose for Node + MongoDB locally",
          "CI/CD with GitHub Actions (test, build, deploy)",
          "Deploying to Vercel (frontend) and Render/Railway (backend)",
          "Environment promotion and rollback strategy"
        ]
      },
      {
        id: "8.3",
        title: "Observability & Reliability",
        items: [
          "Structured logging (pino/winston) and log aggregation",
          "Monitoring, metrics, and uptime/error alerting",
          "Performance: clustering, caching, and CDN",
          "Security in production (HTTPS, headers, dependency audits)",
          "Scaling strategies and load balancing"
        ]
      }
    ]
  }
];
