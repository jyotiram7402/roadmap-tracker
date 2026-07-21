// data/springboot-qa/ops.js — Spring Boot actuator/ops/advanced Q&A.
// Original explanations written from an interview point of view (Spring Boot 3).
export const QUESTIONS = [
  {
    q: "What are actuators in Spring Boot?",
    slug: "what-are-actuators-in-spring-boot",
    answer: [
      { kind: "text", text: "Actuator is a production-ready module (spring-boot-starter-actuator) that exposes operational information about a running app — health, metrics, environment, mappings, thread dumps — over HTTP or JMX. It turns your app into something you can monitor and manage without writing that plumbing yourself." },
      { kind: "text", text: "Interview angle: it's the 'ops' face of a Boot app. You add one starter and instantly get endpoints under /actuator that a load balancer, Prometheus, or Kubernetes probe can hit." },
      { kind: "code", lines: ["<!-- pom.xml -->", "<dependency>", "  <groupId>org.springframework.boot</groupId>", "  <artifactId>spring-boot-starter-actuator</artifactId>", "</dependency>"] },
    ],
    learn: "spring boot actuator overview production ready features",
  },
  {
    q: "What is the role of Spring Boot Actuator?",
    slug: "role-of-spring-boot-actuator",
    answer: [
      { kind: "text", text: "Its role is monitoring and management: it surfaces health checks, metrics (via Micrometer), auditing, HTTP tracing, and lets you inspect or tweak a live application. This is what lets ops teams observe the app in production and integrate it with tooling like Prometheus/Grafana or cloud health probes." },
      { kind: "note", text: "By default only /health is exposed over the web in Boot 3; you must explicitly opt in to expose the rest. This is a deliberate security default — endpoints leak internal detail." },
      { kind: "code", lines: ["# application.properties", "management.endpoints.web.exposure.include=health,info,metrics,prometheus", "management.endpoint.health.show-details=always"] },
    ],
    learn: "role of spring boot actuator monitoring management",
  },
  {
    q: "Explain the concept of Actuator endpoints.",
    slug: "actuator-endpoints-concept",
    answer: [
      { kind: "text", text: "Each endpoint is a discrete unit of ops functionality — /health, /info, /metrics, /env, /beans, /mappings, /loggers, /threaddump, /heapdump — that can be individually enabled, disabled, and exposed over web or JMX. Web endpoints live under a base path (/actuator by default)." },
      { kind: "text", text: "Interview angle: endpoints have two separate switches — 'enabled' (does the bean exist) and 'exposed' (is it reachable over web/JMX). Something can be enabled but not exposed." },
      { kind: "code", lines: ["# expose everything over web except heapdump", "management.endpoints.web.exposure.include=*", "management.endpoints.web.exposure.exclude=heapdump", "# change base path", "management.endpoints.web.base-path=/manage", "# toggle a specific endpoint", "management.endpoint.shutdown.enabled=true"] },
    ],
    learn: "spring boot actuator endpoints enable expose list",
  },
  {
    q: "Explain the concept of a health indicator in Spring Boot Actuator.",
    slug: "health-indicator-concept",
    answer: [
      { kind: "text", text: "A HealthIndicator contributes one piece of the aggregate /health status. Boot auto-configures indicators for DataSource, disk space, Redis, Mongo, etc., and rolls them up: if any is DOWN, the overall status is DOWN. You write custom ones by implementing HealthIndicator." },
      { kind: "code", lines: ["@Component", "public class QueueHealthIndicator implements HealthIndicator {", "    @Override public Health health() {", "        int depth = queue.size();", "        if (depth > 1000)", "            return Health.down().withDetail(\"depth\", depth).build();", "        return Health.up().withDetail(\"depth\", depth).build();", "    }", "}"] },
      { kind: "note", text: "Health groups let you split probes — e.g. a 'liveness' group vs a 'readiness' group for Kubernetes, exposed as /actuator/health/liveness and /readiness." },
    ],
    learn: "spring boot custom health indicator implementation",
  },
  {
    q: "How does Spring Boot support microservices?",
    slug: "spring-boot-microservices-support",
    answer: [
      { kind: "text", text: "Boot gives each service an independently deployable, self-contained jar with an embedded server, externalized config, and Actuator health/metrics out of the box. Spring Cloud builds on top for the distributed concerns: service discovery (Eureka/Consul), client-side load balancing, centralized config, API gateway, and resilience (Resilience4j)." },
      { kind: "example", text: "Think of an order service, payment service, and inventory service — each a small Boot jar. Spring Cloud Gateway routes to them, Config Server feeds them shared config, and Eureka lets them find each other by name instead of hardcoded URLs." },
      { kind: "note", text: "Interview angle: Boot alone makes ONE service easy; Spring Cloud makes MANY services work together. Don't conflate them." },
    ],
    learn: "spring boot spring cloud microservices architecture",
  },
  {
    q: "Explain the concept of circuit breakers.",
    slug: "circuit-breaker-concept",
    answer: [
      { kind: "text", text: "A circuit breaker prevents cascading failure: when calls to a downstream service keep failing, the breaker 'opens' and fails fast (or returns a fallback) instead of hammering a dead dependency and exhausting threads. After a wait it goes 'half-open' to probe recovery, then 'closed' when healthy again." },
      { kind: "example", text: "Like a household fuse — once too many faults occur it trips, protecting the rest of the circuit, and you reset it once things are safe." },
      { kind: "code", lines: ["// Spring Boot 3 uses Resilience4j (Hystrix is EOL)", "@CircuitBreaker(name = \"inventory\", fallbackMethod = \"fallback\")", "public Stock getStock(String id) {", "    return client.get(id);", "}", "public Stock fallback(String id, Throwable t) {", "    return Stock.empty();   // graceful degradation", "}"] },
    ],
    learn: "circuit breaker pattern resilience4j spring boot states",
  },
  {
    q: "How does Spring Boot support message queuing?",
    slug: "spring-boot-message-queuing-support",
    answer: [
      { kind: "text", text: "Boot provides starters that auto-configure messaging infrastructure — spring-boot-starter-amqp (RabbitMQ), spring-kafka, and JMS (ActiveMQ/Artemis). You get auto-configured connection factories, templates for sending (RabbitTemplate/KafkaTemplate), and annotation-driven listeners." },
      { kind: "code", lines: ["@Component", "public class OrderListener {", "    @RabbitListener(queues = \"orders\")", "    public void handle(Order order) {", "        // process asynchronously", "    }", "}", "", "// sending side", "rabbitTemplate.convertAndSend(\"orders\", order);"] },
      { kind: "note", text: "Interview angle: queuing decouples producers from consumers and smooths load spikes; @KafkaListener / @RabbitListener / @JmsListener are the consumer-side entry points." },
    ],
    learn: "spring boot rabbitmq kafka jms listener starter",
  },
  {
    q: "How does Spring Boot support asynchronous processing?",
    slug: "spring-boot-async-processing-support",
    answer: [
      { kind: "text", text: "Boot enables method-level async execution with @EnableAsync + @Async: a call to an @Async method returns immediately and runs on a separate thread from a TaskExecutor pool. It can return void, a Future, or a CompletableFuture for the result." },
      { kind: "code", lines: ["@SpringBootApplication", "@EnableAsync", "public class App {}", "", "@Service", "public class MailService {", "    @Async", "    public CompletableFuture<Void> send(String to) {", "        // runs off the caller's thread", "        return CompletableFuture.completedFuture(null);", "    }", "}"] },
      { kind: "note", text: "Gotcha: @Async only works through the Spring proxy — self-invocation (calling the method from within the same bean) runs synchronously." },
    ],
    learn: "spring boot enableasync async completablefuture executor",
  },
  {
    q: "What is the purpose of the @Async annotation in Spring Boot?",
    slug: "purpose-of-async-annotation",
    answer: [
      { kind: "text", text: "@Async marks a method to run in the background on a separate thread, so the caller doesn't block. Spring wraps the bean in a proxy that submits the invocation to a TaskExecutor and returns control immediately — used for emails, notifications, or any fire-and-forget/parallel work." },
      { kind: "code", lines: ["@EnableAsync", "@Configuration", "public class AsyncConfig {", "    @Bean(\"taskExecutor\")", "    public Executor taskExecutor() {", "        ThreadPoolTaskExecutor ex = new ThreadPoolTaskExecutor();", "        ex.setCorePoolSize(5);", "        ex.setMaxPoolSize(20);", "        ex.setQueueCapacity(100);", "        ex.setThreadNamePrefix(\"async-\");", "        ex.initialize();", "        return ex;", "    }", "}"] },
      { kind: "note", text: "Requires @EnableAsync. Return void or CompletableFuture — never a plain value, since the result isn't ready when the method returns. Exceptions in void methods need an AsyncUncaughtExceptionHandler." },
    ],
    learn: "spring boot async annotation thread pool executor",
  },
  {
    q: "How can you schedule tasks in Spring Boot?",
    slug: "how-to-schedule-tasks",
    answer: [
      { kind: "text", text: "Enable scheduling with @EnableScheduling, then annotate methods with @Scheduled using a fixedRate, fixedDelay, or cron expression. Spring runs them on a single-threaded scheduler by default; supply a TaskScheduler bean for parallelism." },
      { kind: "code", lines: ["@SpringBootApplication", "@EnableScheduling", "public class App {}", "", "@Component", "public class Jobs {", "    @Scheduled(cron = \"0 0 2 * * *\")   // 2 AM daily", "    public void nightlyCleanup() {}", "", "    @Scheduled(fixedDelay = 5000)      // 5s after previous finishes", "    public void poll() {}", "}"] },
      { kind: "note", text: "For distributed apps you also need locking (e.g. ShedLock) so the job runs on only ONE instance, not every replica." },
    ],
    learn: "spring boot scheduled task cron fixedRate fixedDelay",
  },
  {
    q: "What is the purpose of the @Scheduled annotation?",
    slug: "purpose-of-scheduled-annotation",
    answer: [
      { kind: "text", text: "@Scheduled declares that a method should run automatically on a timer. You pick the trigger: fixedRate (fixed interval between START times), fixedDelay (fixed gap after the previous run FINISHES), or cron (calendar-style expression, optionally with a zone)." },
      { kind: "code", lines: ["@Scheduled(fixedRate = 10000)              // every 10s, regardless of duration", "@Scheduled(fixedDelay = 10000)             // 10s after last completion", "@Scheduled(initialDelay = 2000, fixedRate = 5000)", "@Scheduled(cron = \"0 */15 * * * MON-FRI\", zone = \"Asia/Kolkata\")"] },
      { kind: "note", text: "The method must take no arguments and return void. fixedRate vs fixedDelay is a classic interview point: rate ignores how long the task takes, delay waits for it to finish." },
    ],
    learn: "spring scheduled annotation fixedRate vs fixedDelay cron",
  },
  {
    q: "What is the purpose of the @EnableScheduling annotation?",
    slug: "purpose-of-enablescheduling-annotation",
    answer: [
      { kind: "text", text: "@EnableScheduling is the master switch that activates Spring's scheduling infrastructure. Placed on a @Configuration/@SpringBootApplication class, it registers the post-processor that scans beans for @Scheduled methods and wires them to a TaskScheduler. Without it, @Scheduled methods are simply ignored." },
      { kind: "example", text: "Think of it as flipping the main breaker: @Scheduled defines the individual jobs, but @EnableScheduling is what powers the panel that runs them." },
    ],
    learn: "spring boot enablescheduling annotation purpose",
  },
  {
    q: "How can you configure a thread pool?",
    slug: "how-to-configure-thread-pool",
    answer: [
      { kind: "text", text: "Define a ThreadPoolTaskExecutor (for @Async) or ThreadPoolTaskScheduler (for @Scheduled) as a @Bean and tune core/max pool size and queue capacity. Behaviour: Spring uses core threads first, queues tasks up to queueCapacity, then grows to maxPoolSize, and applies a rejection policy when full." },
      { kind: "code", lines: ["@Bean", "public ThreadPoolTaskExecutor executor() {", "    ThreadPoolTaskExecutor ex = new ThreadPoolTaskExecutor();", "    ex.setCorePoolSize(8);", "    ex.setMaxPoolSize(32);", "    ex.setQueueCapacity(200);", "    ex.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());", "    return ex;", "}"] },
      { kind: "note", text: "Boot also lets you configure a default executor via properties: spring.task.execution.pool.core-size, max-size, queue-capacity. Order matters — the queue fills BEFORE maxPoolSize is used." },
    ],
    learn: "spring boot threadpooltaskexecutor core max queue capacity",
  },
  {
    q: "How can you configure connection pooling?",
    slug: "how-to-configure-connection-pooling",
    answer: [
      { kind: "text", text: "A connection pool reuses a fixed set of DB connections instead of opening one per request — opening connections is expensive. Spring Boot 3 ships HikariCP as the default pool and configures it automatically once a DataSource is on the classpath; you tune it via spring.datasource.hikari.* properties." },
      { kind: "code", lines: ["spring.datasource.hikari.maximum-pool-size=10", "spring.datasource.hikari.minimum-idle=5", "spring.datasource.hikari.connection-timeout=30000", "spring.datasource.hikari.idle-timeout=600000", "spring.datasource.hikari.max-lifetime=1800000"] },
      { kind: "note", text: "Interview angle: too small a pool starves under load; too large overwhelms the DB. Size it near the DB's connection limit, not arbitrarily high." },
    ],
    learn: "spring boot hikaricp connection pool configuration properties",
  },
  {
    q: "How can you configure a connection pool in Spring Boot?",
    slug: "configure-connection-pool-in-spring-boot",
    answer: [
      { kind: "text", text: "Just declare the datasource URL/credentials and Boot auto-configures HikariCP. To switch pools, exclude Hikari and add another implementation (Tomcat JDBC or Apache Commons DBCP2) — Boot picks whichever pool is on the classpath in a fixed preference order (Hikari first)." },
      { kind: "code", lines: ["spring.datasource.url=jdbc:postgresql://localhost:5432/app", "spring.datasource.username=app", "spring.datasource.password=secret", "# Hikari-specific settings live under the hikari namespace", "spring.datasource.hikari.pool-name=app-pool", "spring.datasource.hikari.maximum-pool-size=15"] },
      { kind: "note", text: "To force a different pool, set spring.datasource.type=org.apache.tomcat.jdbc.pool.DataSource and add that dependency." },
    ],
    learn: "spring boot configure datasource hikari switch pool type",
  },
  {
    q: "How does Spring Boot handle database connections and pooling?",
    slug: "spring-boot-database-connections-pooling",
    answer: [
      { kind: "text", text: "Boot auto-configures a DataSource from spring.datasource.* properties, wraps it in a connection pool (HikariCP by default), and exposes it for JdbcTemplate/JPA. Connections are borrowed from the pool per operation and returned — with @Transactional, the same connection is bound to the thread for the transaction's duration." },
      { kind: "text", text: "Interview angle: you rarely open/close connections yourself. Spring's transaction manager and the pool handle acquisition, reuse, and release; you just declare boundaries with @Transactional." },
      { kind: "code", lines: ["# monitor the live pool via actuator", "management.endpoints.web.exposure.include=metrics", "# then GET /actuator/metrics/hikaricp.connections.active"] },
    ],
    learn: "spring boot datasource autoconfiguration transaction connection pool",
  },
  {
    q: "How can you configure a custom data source?",
    slug: "how-to-configure-custom-data-source",
    answer: [
      { kind: "text", text: "Define your own DataSource @Bean when you need full control or multiple databases. Use @ConfigurationProperties to bind a prefix, and mark one as @Primary when there are several so Spring knows the default to inject." },
      { kind: "code", lines: ["@Bean", "@Primary", "@ConfigurationProperties(\"app.datasource.main\")", "public DataSource mainDataSource() {", "    return DataSourceBuilder.create().build();", "}", "", "@Bean", "@ConfigurationProperties(\"app.datasource.audit\")", "public DataSource auditDataSource() {", "    return DataSourceBuilder.create().build();", "}"] },
      { kind: "note", text: "Once you declare a DataSource bean, Boot backs off its auto-configuration for it. With multiple datasources you typically also define separate EntityManagerFactory and TransactionManager beans." },
    ],
    learn: "spring boot custom datasource bean multiple databases primary",
  },
  {
    q: "How does Spring Boot support database migrations (Flyway/Liquibase)?",
    slug: "spring-boot-database-migrations-flyway-liquibase",
    answer: [
      { kind: "text", text: "Boot auto-runs Flyway or Liquibase at startup if the dependency is on the classpath — versioned, repeatable schema changes tracked in a history table so every environment converges to the same schema. Flyway uses SQL scripts (V1__init.sql); Liquibase uses XML/YAML/JSON/SQL changelogs." },
      { kind: "code", lines: ["# Flyway scripts in classpath:db/migration", "#   V1__create_users.sql", "#   V2__add_email_index.sql", "spring.flyway.enabled=true", "spring.flyway.baseline-on-migrate=true", "", "# Liquibase alternative", "spring.liquibase.change-log=classpath:db/changelog/db.changelog-master.yaml"] },
      { kind: "note", text: "Interview angle: migrations give you reproducible, version-controlled schema evolution — never rely on hibernate ddl-auto=update in production." },
    ],
    learn: "spring boot flyway liquibase database migration versioned",
  },
  {
    q: "What is the purpose of the @Cacheable annotation?",
    slug: "purpose-of-cacheable-annotation",
    answer: [
      { kind: "text", text: "@Cacheable caches a method's return value keyed by its arguments. On the first call the method runs and the result is stored; subsequent calls with the same key return the cached value without executing the method — great for expensive reads that rarely change." },
      { kind: "code", lines: ["@Cacheable(value = \"products\", key = \"#id\")", "public Product findById(Long id) {", "    return repo.findById(id).orElseThrow();   // skipped on cache hit", "}", "", "@CacheEvict(value = \"products\", key = \"#p.id\")", "public void update(Product p) { repo.save(p); }"] },
      { kind: "note", text: "Same proxy gotcha as @Async: self-invocation bypasses the cache. Pair with @CacheEvict/@CachePut to keep entries fresh; use condition/unless to skip caching selectively." },
    ],
    learn: "spring boot cacheable annotation key evict cacheput",
  },
  {
    q: "How can you configure caching in a Spring Boot application?",
    slug: "how-to-configure-caching",
    answer: [
      { kind: "text", text: "Add @EnableCaching to activate the caching layer, add a cache provider, and Boot auto-configures a CacheManager. With no provider it uses a simple ConcurrentHashMap; add Caffeine, Redis, or EhCache for production-grade caching with TTL and eviction." },
      { kind: "code", lines: ["@SpringBootApplication", "@EnableCaching", "public class App {}", "", "# Caffeine example", "spring.cache.type=caffeine", "spring.cache.cache-names=products,users", "spring.cache.caffeine.spec=maximumSize=1000,expireAfterWrite=10m"] },
      { kind: "note", text: "Redis makes the cache distributed/shared across instances; Caffeine is fast but per-JVM (local). Choose based on whether the cache must be shared." },
    ],
    learn: "spring boot enablecaching cachemanager caffeine redis config",
  },
  {
    q: "How can you enable GZIP compression?",
    slug: "how-to-enable-gzip-compression",
    answer: [
      { kind: "text", text: "Turn on response compression at the embedded server with server.compression.enabled=true. Boot then GZIPs responses whose content-type matches and whose size exceeds a minimum threshold, shrinking payloads over the wire for clients that send Accept-Encoding: gzip." },
      { kind: "code", lines: ["server.compression.enabled=true", "server.compression.mime-types=application/json,application/xml,text/html,text/plain", "server.compression.min-response-size=1024"] },
      { kind: "note", text: "Compression only helps above the min-response-size threshold — GZIPing tiny responses wastes CPU. The client must advertise gzip support via the Accept-Encoding header." },
    ],
    learn: "spring boot enable gzip response compression server properties",
  },
  {
    q: "How can you create custom error pages?",
    slug: "how-to-create-custom-error-pages",
    answer: [
      { kind: "text", text: "For server-rendered apps, drop templates named after the status code under src/main/resources/templates/error/ (e.g. 404.html, 5xx.html) — Boot's default error handling picks them up. For finer control implement ErrorController or an ErrorViewResolver." },
      { kind: "text", text: "For REST APIs you usually don't render pages — you use @ControllerAdvice + @ExceptionHandler to return a structured JSON error body, or customize Boot's default /error JSON." },
      { kind: "code", lines: ["@ControllerAdvice", "public class ApiErrors {", "    @ExceptionHandler(EntityNotFoundException.class)", "    @ResponseStatus(HttpStatus.NOT_FOUND)", "    public ProblemDetail handle(EntityNotFoundException e) {", "        return ProblemDetail.forStatusAndDetail(", "            HttpStatus.NOT_FOUND, e.getMessage());", "    }", "}"] },
    ],
    learn: "spring boot custom error page controlleradvice error controller",
  },
  {
    q: "How can you handle file uploads?",
    slug: "how-to-handle-file-uploads",
    answer: [
      { kind: "text", text: "Accept a MultipartFile parameter in a controller mapped to a multipart/form-data POST. Boot auto-configures multipart resolution, so you just read the bytes/stream and persist them; tune limits with spring.servlet.multipart.* properties." },
      { kind: "code", lines: ["@PostMapping(\"/upload\")", "public String upload(@RequestParam(\"file\") MultipartFile file) throws IOException {", "    file.transferTo(Path.of(\"/data/\" + file.getOriginalFilename()));", "    return \"uploaded \" + file.getSize() + \" bytes\";", "}", "", "# limits", "spring.servlet.multipart.max-file-size=10MB", "spring.servlet.multipart.max-request-size=15MB"] },
      { kind: "note", text: "For many/large files use @RequestPart with a List<MultipartFile>, and always validate size/type and sanitize the filename to avoid path traversal." },
    ],
    learn: "spring boot file upload multipartfile max size configuration",
  },
  {
    q: "How does Spring Boot support file downloading?",
    slug: "spring-boot-file-download-support",
    answer: [
      { kind: "text", text: "Return the file as a Resource (or stream) in a ResponseEntity, setting Content-Type and the Content-Disposition header to trigger a browser download. Using a Resource (e.g. InputStreamResource/FileSystemResource) lets Spring stream without loading the whole file into memory." },
      { kind: "code", lines: ["@GetMapping(\"/download/{name}\")", "public ResponseEntity<Resource> download(@PathVariable String name) {", "    Resource file = new FileSystemResource(\"/data/\" + name);", "    return ResponseEntity.ok()", "        .contentType(MediaType.APPLICATION_OCTET_STREAM)", "        .header(HttpHeaders.CONTENT_DISPOSITION,", "                \"attachment; filename=\\\"\" + name + \"\\\"\")", "        .body(file);", "}"] },
      { kind: "note", text: "For large files prefer streaming (StreamingResponseBody or a Resource) over byte[] so you don't blow up the heap." },
    ],
    learn: "spring boot file download responseentity resource content-disposition",
  },
  {
    q: "What is the use of CommandLineRunner?",
    slug: "use-of-commandlinerunner",
    answer: [
      { kind: "text", text: "CommandLineRunner (and ApplicationRunner) is a callback that runs ONCE right after the application context is fully started, just before the app is ready to serve. Use it for startup tasks: seeding data, warming caches, validating config, or logging startup info." },
      { kind: "code", lines: ["@Component", "public class SeedData implements CommandLineRunner {", "    @Override public void run(String... args) {", "        // raw String[] args", "        repo.save(new User(\"admin\"));", "    }", "}"] },
      { kind: "note", text: "Difference: CommandLineRunner gives raw String... args; ApplicationRunner gives a parsed ApplicationArguments (option vs non-option). Use @Order to sequence multiple runners." },
    ],
    learn: "spring boot commandlinerunner applicationrunner startup task",
  },
  {
    q: "What are the various ways to create a Spring Boot application?",
    slug: "ways-to-create-spring-boot-application",
    answer: [
      { kind: "text", text: "Common ways: (1) Spring Initializr at start.spring.io — generate a preconfigured project; (2) your IDE's Spring wizard (IntelliJ/STS), which wraps Initializr; (3) Spring Boot CLI with 'spring init'; (4) manually add spring-boot-starter-parent + starters to a Maven/Gradle build." },
      { kind: "code", lines: ["# Spring Boot CLI", "spring init --dependencies=web,data-jpa --build=maven demo", "", "# or curl Initializr directly", "curl https://start.spring.io/starter.zip -d dependencies=web -o demo.zip"] },
      { kind: "note", text: "Initializr is the standard answer — it wires the parent BOM, starters, and a main class with @SpringBootApplication so you skip boilerplate." },
    ],
    learn: "ways to create spring boot application initializr cli",
  },
  {
    q: "What is Spring Boot CLI?",
    slug: "what-is-spring-boot-cli",
    answer: [
      { kind: "text", text: "The Spring Boot CLI is a command-line tool for quickly bootstrapping and running Boot apps. It can scaffold projects (spring init) and even run Groovy scripts as full Spring apps without a build file — auto-resolving dependencies from the code — which is handy for prototyping and demos." },
      { kind: "code", lines: ["spring init --list                 # show available dependencies", "spring init -d=web,data-jpa my-app # scaffold a project", "spring run app.groovy              # run a Groovy source as an app"] },
      { kind: "note", text: "Interview angle: great for rapid prototyping/learning, not typically used to build production apps — those use a proper Maven/Gradle build." },
    ],
    learn: "spring boot cli commands spring init run groovy",
  },
  {
    q: "What is Spring Boot DevTools and how does it help?",
    slug: "spring-boot-devtools",
    answer: [
      { kind: "text", text: "spring-boot-devtools is a development-time module that boosts the inner loop: automatic restart when classpath files change, LiveReload to refresh the browser, and sensible dev defaults (disabling template/resource caching). It uses two classloaders so restarts are much faster than a cold boot." },
      { kind: "code", lines: ["<dependency>", "  <groupId>org.springframework.boot</groupId>", "  <artifactId>spring-boot-devtools</artifactId>", "  <optional>true</optional>", "</dependency>"] },
      { kind: "note", text: "It's automatically disabled when running a packaged jar (production), so it never ships into a real deployment. Marked optional so it doesn't leak transitively." },
    ],
    learn: "spring boot devtools automatic restart livereload",
  },
  {
    q: "Explain the concept of lazy initialization.",
    slug: "lazy-initialization-concept",
    answer: [
      { kind: "text", text: "By default Spring eagerly creates all singleton beans at startup. Lazy initialization defers a bean's creation until it's first needed, which speeds up startup and avoids building beans that are never used — at the cost of moving any wiring errors from startup to first use." },
      { kind: "code", lines: ["// per-bean", "@Component", "@Lazy", "public class HeavyService {}", "", "# global (all beans lazy)", "spring.main.lazy-initialization=true"] },
      { kind: "note", text: "Trade-off: faster boot, but misconfigurations surface later (at first request) instead of at startup, and the first request that touches a lazy bean pays the init cost." },
    ],
    learn: "spring boot lazy initialization lazy annotation startup",
  },
  {
    q: "Explain the concept of conditional bean registration.",
    slug: "conditional-bean-registration-concept",
    answer: [
      { kind: "text", text: "Conditional registration means a bean is only added to the context if certain conditions hold. Spring provides a family of @Conditional annotations — @ConditionalOnProperty, @ConditionalOnClass, @ConditionalOnMissingBean — which is exactly how Boot's auto-configuration decides what to wire based on classpath and config." },
      { kind: "code", lines: ["@Bean", "@ConditionalOnProperty(name = \"feature.audit.enabled\", havingValue = \"true\")", "public AuditService auditService() {", "    return new AuditService();", "}"] },
      { kind: "example", text: "Like a build with feature flags: the audit module is compiled in only if the flag is set — otherwise it's absent entirely, not just disabled." },
    ],
    learn: "spring boot conditionalonproperty conditional bean registration",
  },
  {
    q: "Explain the concept of conditional bean creation.",
    slug: "conditional-bean-creation-concept",
    answer: [
      { kind: "text", text: "Same family of @Conditional annotations, viewed from the 'create only if X' angle. The most important for library/auto-config authors is @ConditionalOnMissingBean: create a default bean only if the user hasn't already defined their own — this is what makes Boot's defaults overridable." },
      { kind: "code", lines: ["@Bean", "@ConditionalOnMissingBean", "public ObjectMapper objectMapper() {", "    return new ObjectMapper();   // used only if the app didn't define one", "}", "", "@Bean", "@ConditionalOnClass(name = \"com.example.OptionalLib\")", "public Integration integration() { return new Integration(); }"] },
      { kind: "note", text: "@ConditionalOnMissingBean is the backbone of 'sensible defaults, easy overrides' — define your own bean and Boot backs off. You can also write a custom Condition by implementing the Condition interface." },
    ],
    learn: "spring boot conditionalonmissingbean conditionalonclass custom condition",
  },
  {
    q: "Explain the concept of cross-cutting concerns (AOP) in Spring Boot.",
    slug: "cross-cutting-concerns-aop",
    answer: [
      { kind: "text", text: "Cross-cutting concerns are behaviors that span many parts of an app — logging, security, transactions, metrics — that would otherwise be duplicated everywhere. AOP (Aspect-Oriented Programming) extracts them into aspects applied via pointcuts, keeping business code clean. Spring implements this with runtime proxies." },
      { kind: "code", lines: ["@Aspect", "@Component", "public class TimingAspect {", "    @Around(\"@annotation(Timed)\")", "    public Object time(ProceedingJoinPoint pjp) throws Throwable {", "        long start = System.nanoTime();", "        try { return pjp.proceed(); }", "        finally { log.info(\"{} ns\", System.nanoTime() - start); }", "    }", "}"] },
      { kind: "note", text: "Spring's own @Transactional and method-level @Async/@Cacheable are AOP under the hood — which is why self-invocation bypasses them (the proxy is only hit on external calls)." },
    ],
    learn: "spring boot aop aspect pointcut cross-cutting concerns",
  },
  {
    q: "How does Spring Boot support internationalization and localization?",
    slug: "spring-boot-i18n-l10n-support",
    answer: [
      { kind: "text", text: "Boot auto-configures a MessageSource that reads locale-specific messages_XX.properties files, and a LocaleResolver that picks the active locale (from Accept-Language header, session, or cookie). You look up messages by key and Spring returns the right translation for the resolved locale." },
      { kind: "code", lines: ["# messages.properties, messages_fr.properties, messages_hi.properties", "spring.messages.basename=messages", "spring.messages.encoding=UTF-8", "", "@Autowired MessageSource messages;", "String greeting = messages.getMessage(\"welcome\", null, locale);"] },
      { kind: "note", text: "Use a LocaleChangeInterceptor to switch locale via a request param (e.g. ?lang=fr). In templates, Thymeleaf resolves #{welcome} against the same MessageSource." },
    ],
    learn: "spring boot internationalization messagesource localeresolver",
  },
  {
    q: "How does Spring Boot support the creation of WebSocket applications?",
    slug: "spring-boot-websocket-support",
    answer: [
      { kind: "text", text: "Add spring-boot-starter-websocket and enable it with @EnableWebSocketMessageBroker to get STOMP-over-WebSocket messaging with a simple in-memory broker. You register endpoints, configure message-routing prefixes, and handle messages with @MessageMapping — ideal for chat, live dashboards, notifications." },
      { kind: "code", lines: ["@Configuration", "@EnableWebSocketMessageBroker", "public class WsConfig implements WebSocketMessageBrokerConfigurer {", "    public void registerStompEndpoints(StompEndpointRegistry r) {", "        r.addEndpoint(\"/ws\").withSockJS();", "    }", "    public void configureMessageBroker(MessageBrokerRegistry r) {", "        r.enableSimpleBroker(\"/topic\");", "        r.setApplicationDestinationPrefixes(\"/app\");", "    }", "}"] },
      { kind: "note", text: "You can also use a raw WebSocketHandler without STOMP for lower-level control. For scale-out, swap the simple broker for a real STOMP broker (RabbitMQ/ActiveMQ)." },
    ],
    learn: "spring boot websocket stomp enablewebsocketmessagebroker",
  },
  {
    q: "How does Spring Boot support reactive programming?",
    slug: "spring-boot-reactive-support",
    answer: [
      { kind: "text", text: "Spring WebFlux (spring-boot-starter-webflux) is the reactive, non-blocking web stack built on Project Reactor and running on Netty by default. Instead of one thread per request, a few event-loop threads handle many concurrent requests, and handlers return Mono/Flux — well suited to high-concurrency, I/O-bound workloads." },
      { kind: "code", lines: ["@GetMapping(\"/users/{id}\")", "public Mono<User> byId(@PathVariable String id) {", "    return userRepo.findById(id);   // reactive repository, non-blocking", "}", "", "@GetMapping(\"/users\")", "public Flux<User> all() { return userRepo.findAll(); }"] },
      { kind: "note", text: "Interview angle: WebFlux shines for I/O-bound, high-concurrency apps, but the whole chain must be non-blocking (use R2DBC, not JDBC). For typical CRUD, blocking MVC is simpler — don't reach for reactive by default." },
    ],
    learn: "spring boot webflux reactive project reactor netty",
  },
  {
    q: "Difference between Mono and Flux?",
    slug: "difference-between-mono-and-flux",
    answer: [
      { kind: "text", text: "Both are Reactor publishers in the reactive stream. Mono emits 0 or 1 element (a single result or empty) — like a reactive Optional/CompletableFuture. Flux emits 0 to N elements (a stream/sequence) — like a reactive List/Stream. Both are lazy: nothing runs until something subscribes." },
      { kind: "code", lines: ["Mono<User> one = Mono.just(user);          // 0..1", "Flux<User> many = Flux.fromIterable(list); // 0..N", "", "Mono<Long> count = many.count();           // Flux -> Mono", "Flux<String> names = many.map(User::name); // stays Flux"] },
      { kind: "example", text: "Mono = 'fetch one user by id'; Flux = 'stream all users' or 'server-sent events over time'." },
    ],
    learn: "reactor mono vs flux difference reactive stream",
  },
  {
    q: "What is Spring Boot's support for asynchronous logging?",
    slug: "spring-boot-async-logging-support",
    answer: [
      { kind: "text", text: "Boot uses Logback by default (SLF4J facade). Async logging is enabled at the logging framework level: wrap an appender in an AsyncAppender (Logback) or use Log4j2's async loggers. This offloads I/O to a separate thread and buffered queue so logging doesn't block request threads — valuable under high throughput." },
      { kind: "code", lines: ["<!-- logback-spring.xml -->", "<appender name=\"ASYNC\" class=\"ch.qos.logback.classic.AsyncAppender\">", "  <queueSize>512</queueSize>", "  <discardingThreshold>0</discardingThreshold>", "  <appender-ref ref=\"FILE\"/>", "</appender>"] },
      { kind: "note", text: "Log4j2 async loggers (via the LMAX Disruptor) typically outperform Logback's AsyncAppender. Trade-off: a bounded queue can drop or block on logs if it fills, and buffered logs may be lost on a hard crash." },
    ],
    learn: "spring boot async logging logback asyncappender log4j2",
  },
  {
    q: "How can you enable HTTPS in Spring Boot?",
    slug: "how-to-enable-https",
    answer: [
      { kind: "text", text: "Configure SSL on the embedded server: point server.ssl.* at a keystore (PKCS12/JKS) holding your certificate and private key, and set server.port to the HTTPS port. The embedded Tomcat/Netty then terminates TLS directly." },
      { kind: "code", lines: ["server.port=8443", "server.ssl.enabled=true", "server.ssl.key-store=classpath:keystore.p12", "server.ssl.key-store-type=PKCS12", "server.ssl.key-store-password=changeit", "server.ssl.key-alias=myapp"] },
      { kind: "note", text: "Boot 3.1+ also supports SSL bundles (spring.ssl.bundle.*) for reusable/rotatable certs. In production, TLS is often terminated at a load balancer/ingress instead of the app itself." },
    ],
    learn: "spring boot enable https ssl keystore server properties",
  },
  {
    q: "What is the purpose of the @RequestHeader annotation?",
    slug: "purpose-of-requestheader-annotation",
    answer: [
      { kind: "text", text: "@RequestHeader binds an HTTP request header value to a controller method parameter — for reading things like Authorization, User-Agent, Accept-Language, or a custom correlation id. You can mark it required or optional and supply a default value." },
      { kind: "code", lines: ["@GetMapping(\"/data\")", "public String get(", "    @RequestHeader(\"User-Agent\") String agent,", "    @RequestHeader(value = \"X-Trace-Id\", required = false) String traceId,", "    @RequestHeader(value = \"Accept-Language\", defaultValue = \"en\") String lang) {", "    return agent;", "}"] },
      { kind: "note", text: "Bind ALL headers at once with @RequestHeader Map<String,String> headers or an HttpHeaders parameter. If required=true (default) and the header is missing, the request fails with 400." },
    ],
    learn: "spring boot requestheader annotation required default value",
  },
  {
    q: "What are the limitations of Spring Boot?",
    slug: "limitations-of-spring-boot",
    answer: [
      { kind: "text", text: "Main criticisms: (1) heavier footprint and slower startup than a bare framework due to many auto-configured beans; (2) the 'magic' of auto-configuration can be hard to debug when it wires something unexpected; (3) transitive dependency bloat from starters; (4) a learning curve to understand what's happening under the hood." },
      { kind: "text", text: "Interview angle: it optimizes developer productivity over minimal footprint. For serverless/tight-memory scenarios, cold starts can hurt — though GraalVM native images (Spring Boot 3) and lazy init mitigate this a lot." },
      { kind: "note", text: "Use --debug or the /actuator/conditions endpoint to see the auto-configuration report and demystify what got wired and why." },
    ],
    learn: "spring boot limitations disadvantages startup time auto-configuration",
  },
];
