// data/springboot-qa/core.js — Spring Boot Core & Essentials, interview Q&A.
// Original explanations written from an interview point of view.
export const QUESTIONS = [
  {
    q: "What is Spring Boot?",
    slug: "what-is-spring-boot",
    answer: [
      { kind: "text", text: "Spring Boot is an opinionated framework built on top of the Spring Framework that lets you build production-ready, stand-alone Spring applications with minimal configuration. It removes most of the boilerplate XML/Java setup by providing auto-configuration, starter dependencies, an embedded server, and production features like metrics and health checks." },
      { kind: "text", text: "Interview angle: it is NOT a replacement for Spring — it is a layer on top that wires sensible defaults so you can 'just run' the app. You write a main() with SpringApplication.run(), and Boot bootstraps the ApplicationContext, embedded Tomcat, and everything on the classpath." },
      { kind: "code", lines: ["@SpringBootApplication", "public class MyApp {", "    public static void main(String[] args) {", "        SpringApplication.run(MyApp.class, args);", "    }", "}"] },
      { kind: "example", text: "Plain Spring is like buying car parts and assembling them yourself; Spring Boot is a car that drives off the lot with sensible defaults, which you can still customise." },
    ],
    learn: "what is spring boot framework overview",
  },
  {
    q: "What are the advantages of using Spring Boot?",
    slug: "advantages-of-spring-boot",
    answer: [
      { kind: "text", text: "Key advantages: (1) auto-configuration removes boilerplate setup; (2) starter POMs give curated, version-aligned dependencies; (3) an embedded server (Tomcat/Jetty/Undertow) means no external container and a runnable fat JAR; (4) production-ready features via Actuator (health, metrics); (5) no XML — sensible defaults and convention over configuration." },
      { kind: "text", text: "Interview angle: the net effect is drastically faster setup and standardised project structure, so teams spend time on business logic rather than plumbing." },
      { kind: "note", text: "A common trap: people say it makes apps 'faster at runtime'. It mainly speeds DEVELOPMENT and setup — runtime performance is essentially the same underlying Spring." },
    ],
    learn: "advantages benefits of spring boot",
  },
  {
    q: "Explain Inversion of Control (IoC) in Spring Boot?",
    slug: "inversion-of-control-ioc",
    answer: [
      { kind: "text", text: "IoC means the control of creating and wiring objects is inverted — instead of your code doing 'new' and managing dependencies, the framework (the Spring IoC container / ApplicationContext) creates the objects (beans), manages their lifecycle, and injects them where needed." },
      { kind: "text", text: "In Spring Boot the container reads your @Component/@Bean definitions, instantiates them, resolves their dependencies, and hands them out. Your classes just declare what they need." },
      { kind: "code", lines: ["@Service", "public class OrderService {", "    private final PaymentGateway gateway;", "    // container creates PaymentGateway and passes it in", "    public OrderService(PaymentGateway gateway) {", "        this.gateway = gateway;", "    }", "}"] },
      { kind: "example", text: "At a restaurant you don't go into the kitchen to cook — you order and the kitchen (container) prepares and delivers. You describe what you need, not how it's built." },
    ],
    learn: "inversion of control ioc spring container",
  },
  {
    q: "What is Dependency Injection & how is it achieved in Spring Boot?",
    slug: "dependency-injection",
    answer: [
      { kind: "text", text: "Dependency Injection (DI) is the concrete design pattern that implements IoC: a class receives its dependencies from outside rather than creating them itself. The Spring container injects the required beans at runtime." },
      { kind: "text", text: "In Spring Boot it is achieved via @Autowired (or, preferably, constructor injection which needs no annotation on a single constructor). The container matches beans by type, then by name/@Qualifier if there is ambiguity." },
      { kind: "code", lines: ["@Service", "public class NotificationService {", "    private final EmailSender sender;", "    public NotificationService(EmailSender sender) {  // constructor DI", "        this.sender = sender;", "    }", "}"] },
      { kind: "note", text: "IoC is the principle; DI is the implementation of that principle. Prefer constructor injection — it makes dependencies final, mandatory, and testable." },
    ],
    learn: "dependency injection in spring boot types",
  },
  {
    q: "What is the difference between Spring and Spring Boot?",
    slug: "spring-vs-spring-boot",
    answer: [
      { kind: "text", text: "Spring Framework is the core: it provides IoC/DI, MVC, data access, transactions, etc., but requires you to configure a lot manually (bean definitions, dispatcher servlet, external server). Spring Boot sits on top and auto-configures those pieces with sensible defaults, bundles an embedded server, and provides starters + Actuator." },
      { kind: "code", lines: ["// Spring: manual config, external Tomcat, XML/JavaConfig", "// Spring Boot: @SpringBootApplication + embedded server + starters"] },
      { kind: "note", text: "Say it crisply: Spring gives you the tools; Spring Boot gives you the tools pre-assembled with defaults. Boot uses Spring — it does not compete with it." },
    ],
    learn: "difference between spring and spring boot",
  },
  {
    q: "What is the purpose of the @Autowired annotation in Spring Boot?",
    slug: "purpose-of-autowired",
    answer: [
      { kind: "text", text: "@Autowired tells the Spring container to inject a matching bean automatically. The container resolves the dependency by type (then by qualifier/name if ambiguous) and wires it in, so you don't manually look up or construct the bean." },
      { kind: "code", lines: ["@Service", "public class ReportService {", "    @Autowired", "    private ReportRepository repo;   // container injects the bean", "}"] },
      { kind: "note", text: "Trap: if no matching bean is found it throws NoSuchBeanDefinitionException; if more than one matches it throws NoUniqueBeanDefinitionException unless you add @Qualifier or @Primary. Use required=false to make it optional." },
    ],
    learn: "spring autowired annotation purpose",
  },
  {
    q: "What are the different ways @Autowired can be used (field, constructor, setter)?",
    slug: "autowired-field-constructor-setter",
    answer: [
      { kind: "text", text: "Three injection styles. Constructor injection (recommended) — dependencies passed via the constructor, can be final and mandatory. Setter injection — via a setter, good for optional dependencies. Field injection — @Autowired directly on a field, concise but hard to test and hides dependencies." },
      { kind: "code", lines: ["// constructor (no @Autowired needed if single constructor)", "public Svc(Repo repo) { this.repo = repo; }", "", "// setter", "@Autowired public void setRepo(Repo repo) { this.repo = repo; }", "", "// field", "@Autowired private Repo repo;"] },
      { kind: "note", text: "Interview trap: prefer constructor injection — it enforces immutability, makes dependencies explicit, and allows the object to be created without a Spring context in unit tests. Field injection can also cause circular-dependency and NPE-in-test issues." },
    ],
    learn: "constructor vs field vs setter injection spring",
  },
  {
    q: "How does Spring Boot simplify the development of Java applications?",
    slug: "how-spring-boot-simplifies-development",
    answer: [
      { kind: "text", text: "It simplifies development through: auto-configuration (beans wired based on the classpath), starter dependencies (one dependency pulls a curated, compatible set), an embedded server (run as a plain JAR, no WAR deploy), externalized configuration (properties/YAML/profiles), and Actuator for out-of-the-box monitoring." },
      { kind: "text", text: "The result is minimal boilerplate: a single @SpringBootApplication class plus a couple of starters gets you a running web app in minutes." },
      { kind: "example", text: "Instead of hand-picking and version-matching 15 libraries and writing XML, you add spring-boot-starter-web and it all just works together." },
    ],
    learn: "how spring boot simplifies java development",
  },
  {
    q: "Explain the concept of \"convention over configuration\" in Spring Boot.",
    slug: "convention-over-configuration",
    answer: [
      { kind: "text", text: "Convention over configuration means the framework assumes sensible defaults so you only configure the exceptions. If you follow expected conventions (standard project layout, default property names, classpath libraries), Spring Boot wires things automatically and you write almost no config." },
      { kind: "text", text: "Example: put an H2 driver on the classpath and Boot auto-configures an in-memory DataSource; name your file application.properties and it's picked up automatically; you only override what differs from the default." },
      { kind: "example", text: "Like a hotel room set up the standard way — bed, towels, toiletries already there. You only call the front desk (configure) for the extras you actually need." },
    ],
    learn: "convention over configuration spring boot meaning",
  },
  {
    q: "Explain the concept of auto-configuration in Spring Boot.",
    slug: "auto-configuration",
    answer: [
      { kind: "text", text: "Auto-configuration automatically configures beans based on what is on the classpath, existing beans, and property settings. Boot scans the classpath and, using conditional annotations, decides which configurations to apply — e.g. if spring-webmvc is present it configures a DispatcherServlet." },
      { kind: "text", text: "It is driven by @EnableAutoConfiguration (included in @SpringBootApplication). Auto-config classes are registered in META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports and guarded by @Conditional annotations like @ConditionalOnClass and @ConditionalOnMissingBean." },
      { kind: "code", lines: ["@Configuration", "@ConditionalOnClass(DataSource.class)", "@ConditionalOnMissingBean(DataSource.class)", "public class DataSourceAutoConfiguration {", "    // only applied when a DataSource class is present", "    // and the user hasn't defined their own", "}"] },
      { kind: "note", text: "Because of @ConditionalOnMissingBean, any bean YOU define overrides the auto-configured one. Use debug=true or the ConditionEvaluationReport to see what got auto-configured and why." },
    ],
    learn: "spring boot auto configuration how it works conditional",
  },
  {
    q: "What is the role of the @SpringBootApplication annotation?",
    slug: "role-of-springbootapplication",
    answer: [
      { kind: "text", text: "@SpringBootApplication is a convenience meta-annotation placed on the main class. It combines three annotations: @Configuration (marks it a config source), @EnableAutoConfiguration (turns on auto-config), and @ComponentScan (scans the package and sub-packages for components)." },
      { kind: "code", lines: ["@SpringBootApplication", "// = @Configuration + @EnableAutoConfiguration + @ComponentScan", "public class App {", "    public static void main(String[] args) {", "        SpringApplication.run(App.class, args);", "    }", "}"] },
      { kind: "note", text: "Trap: because @ComponentScan starts from the main class's package, keep the main class in a ROOT package. If it sits in a deeper package, components in sibling packages won't be discovered." },
    ],
    learn: "springbootapplication annotation what it does",
  },
  {
    q: "What is the purpose of the @EnableAutoConfiguration annotation?",
    slug: "purpose-of-enableautoconfiguration",
    answer: [
      { kind: "text", text: "@EnableAutoConfiguration switches on Spring Boot's auto-configuration mechanism: it tells Boot to attempt to configure beans based on the classpath dependencies and defined properties. It is what actually loads the auto-configuration classes." },
      { kind: "text", text: "You rarely use it directly because it is already included inside @SpringBootApplication. You would use it standalone only if you weren't using @SpringBootApplication." },
      { kind: "code", lines: ["@EnableAutoConfiguration(exclude = {", "    DataSourceAutoConfiguration.class   // opt out of specific config", "})", "public class App { }"] },
      { kind: "note", text: "Use the exclude attribute (or spring.autoconfigure.exclude property) to opt out of specific auto-configurations you don't want." },
    ],
    learn: "enableautoconfiguration annotation spring boot purpose",
  },
  {
    q: "How does Spring Boot handle dependency management?",
    slug: "spring-boot-dependency-management",
    answer: [
      { kind: "text", text: "Spring Boot manages dependencies through starters and a curated BOM (Bill of Materials). The spring-boot-starter-parent (or the spring-boot-dependencies BOM) predefines compatible versions of common libraries, so you add a starter WITHOUT specifying a version and get a tested, version-aligned set." },
      { kind: "code", lines: ["<dependency>", "    <groupId>org.springframework.boot</groupId>", "    <artifactId>spring-boot-starter-web</artifactId>", "    <!-- no <version> needed: managed by the parent/BOM -->", "</dependency>"] },
      { kind: "note", text: "This avoids version-conflict / dependency-hell issues. You can still override a managed version by declaring a property (e.g. <spring-framework.version>) or an explicit version." },
    ],
    learn: "spring boot dependency management starter bom parent",
  },
  {
    q: "How does Spring Boot handle authentication and authorization?",
    slug: "authentication-and-authorization",
    answer: [
      { kind: "text", text: "Spring Boot delegates this to Spring Security. Adding spring-boot-starter-security auto-configures a security filter chain that secures all endpoints by default (HTTP Basic + a generated password). Authentication verifies WHO you are; authorization decides WHAT you're allowed to do." },
      { kind: "text", text: "You customise it with a SecurityFilterChain bean: define authentication (in-memory, JDBC, or a UserDetailsService) and authorization rules (URL patterns, roles, method-level @PreAuthorize)." },
      { kind: "code", lines: ["@Bean", "SecurityFilterChain chain(HttpSecurity http) throws Exception {", "    http.authorizeHttpRequests(a -> a", "            .requestMatchers(\"/admin/**\").hasRole(\"ADMIN\")", "            .anyRequest().authenticated())", "        .httpBasic(Customizer.withDefaults());", "    return http.build();", "}"] },
      { kind: "note", text: "In Spring Security 6 / Boot 3, WebSecurityConfigurerAdapter is removed — use a SecurityFilterChain bean and the lambda DSL. Authentication = identity; authorization = permissions." },
    ],
    learn: "spring boot authentication authorization spring security",
  },
  {
    q: "How do you secure REST APIs using Spring Security and JWT?",
    slug: "secure-rest-apis-jwt",
    answer: [
      { kind: "text", text: "For stateless REST APIs you disable sessions and CSRF, and authenticate each request with a JWT (JSON Web Token) in the Authorization: Bearer header. On login the server issues a signed JWT; on each subsequent request a filter validates the token's signature and expiry and sets the SecurityContext." },
      { kind: "text", text: "Flow: (1) client logs in, server signs a JWT with a secret/private key; (2) client sends the token on every call; (3) a OncePerRequestFilter (or the built-in oauth2ResourceServer JWT support) validates it and populates the Authentication so authorization rules apply." },
      { kind: "code", lines: ["http.csrf(csrf -> csrf.disable())", "    .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))", "    .authorizeHttpRequests(a -> a", "        .requestMatchers(\"/auth/login\").permitAll()", "        .anyRequest().authenticated())", "    .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()));"] },
      { kind: "note", text: "Key points to mention: JWTs are stateless (no server session), signed not encrypted (don't put secrets in the payload), and need short expiry + refresh tokens. Always validate signature AND expiry." },
    ],
    learn: "secure rest api spring security jwt bearer token",
  },
  {
    q: "Explain the concept of externalized configuration.",
    slug: "externalized-configuration",
    answer: [
      { kind: "text", text: "Externalized configuration means keeping config values OUTSIDE the code so the same build runs in different environments by changing only the config. Spring Boot reads values from properties/YAML files, environment variables, command-line arguments, and more, and exposes them through the Environment." },
      { kind: "text", text: "You bind these values into beans with @Value for single properties or @ConfigurationProperties for a group of related properties into a typed object." },
      { kind: "code", lines: ["@ConfigurationProperties(prefix = \"app.mail\")", "public class MailProps {", "    private String host;   // binds app.mail.host", "    private int port;      // binds app.mail.port", "    // getters/setters", "}"] },
      { kind: "note", text: "Spring Boot applies a defined precedence order: command-line args > OS env vars > application-{profile}.properties > application.properties. Higher-priority sources override lower ones." },
    ],
    learn: "externalized configuration spring boot property sources",
  },
  {
    q: "What is the purpose of the application.properties or application.yml file?",
    slug: "purpose-of-application-properties",
    answer: [
      { kind: "text", text: "It is the central place to define application configuration — server port, datasource URL, logging levels, custom app properties, etc. Spring Boot loads it automatically from the classpath (or the config folder) at startup and merges it into the Environment." },
      { kind: "code", lines: ["# application.properties", "server.port=8081", "spring.datasource.url=jdbc:mysql://localhost/shop", "logging.level.org.springframework=INFO", "app.feature.new-checkout=true"] },
      { kind: "note", text: "Both files serve the same role; you pick one format. Boot looks in a defined set of locations (classpath root, /config, current dir) — later locations override earlier ones." },
    ],
    learn: "application properties yml purpose spring boot",
  },
  {
    q: "How can you override the default properties in Spring Boot?",
    slug: "override-default-properties",
    answer: [
      { kind: "text", text: "You override defaults by supplying a higher-precedence property source. The main ways: command-line arguments (--server.port=9090), OS/environment variables (SERVER_PORT=9090), profile-specific files (application-prod.properties), or your own application.properties overriding an auto-configured default." },
      { kind: "code", lines: ["# command line (highest common precedence)", "java -jar app.jar --server.port=9090", "", "# environment variable (relaxed binding)", "export SERVER_PORT=9090"] },
      { kind: "note", text: "Precedence (high to low, simplified): command-line args > java system properties > env vars > application-{profile} > application.properties > defaults. A property set in a higher source wins." },
    ],
    learn: "override default properties spring boot precedence order",
  },
  {
    q: "What are the differences between application.properties and application.yml?",
    slug: "properties-vs-yml",
    answer: [
      { kind: "text", text: "Both configure the app; the difference is format. .properties uses flat key=value lines, which are simple but repetitive. .yml (YAML) uses indented hierarchy, which is more compact and readable for nested/grouped config and supports lists naturally." },
      { kind: "code", lines: ["# properties", "spring.datasource.url=jdbc:mysql://localhost/db", "spring.datasource.username=root", "", "# yml (hierarchical)", "spring:", "  datasource:", "    url: jdbc:mysql://localhost/db", "    username: root"] },
      { kind: "note", text: "Traps: YAML is indentation-sensitive (spaces only, no tabs). If BOTH files exist, .properties takes precedence over .yml for the same key. YAML also cleanly supports multiple profiles in one file with '---' separators." },
    ],
    learn: "application properties vs yml difference spring boot",
  },
  {
    q: "Explain the concept of the Spring Boot Starter Parent.",
    slug: "spring-boot-starter-parent",
    answer: [
      { kind: "text", text: "spring-boot-starter-parent is a special parent POM you inherit in Maven. It provides dependency management (managed versions via the spring-boot-dependencies BOM), sensible plugin configuration, a default Java version, resource filtering, and UTF-8 encoding — so you get consistent, version-aligned builds with almost no setup." },
      { kind: "code", lines: ["<parent>", "    <groupId>org.springframework.boot</groupId>", "    <artifactId>spring-boot-starter-parent</artifactId>", "    <version>3.2.0</version>", "</parent>"] },
      { kind: "note", text: "If you already have a corporate parent POM and can't inherit the starter parent, import spring-boot-dependencies as a BOM in <dependencyManagement> with scope=import to still get managed versions." },
    ],
    learn: "spring boot starter parent pom purpose",
  },
  {
    q: "Explain the concept of profiles in Spring Boot.",
    slug: "profiles-in-spring-boot",
    answer: [
      { kind: "text", text: "Profiles let you define environment-specific configuration and beans (dev, test, prod) and activate the right set at runtime. Beans or config marked with a profile are only loaded when that profile is active, so one build serves many environments." },
      { kind: "text", text: "You provide profile-specific files like application-dev.properties and application-prod.properties; Boot loads application.properties plus the active profile's file, with the profile-specific values overriding the common ones." },
      { kind: "code", lines: ["# application-dev.properties", "spring.datasource.url=jdbc:h2:mem:testdb", "", "# application-prod.properties", "spring.datasource.url=jdbc:mysql://prod-db/shop"] },
      { kind: "example", text: "Like packing lists for different trips — a common base list plus a beach-specific or ski-specific add-on. You pick the trip (profile) and get the right combination." },
    ],
    learn: "spring boot profiles environment configuration",
  },
  {
    q: "What is the purpose of the @Profile annotation?",
    slug: "purpose-of-profile-annotation",
    answer: [
      { kind: "text", text: "@Profile marks a bean or configuration class to be registered ONLY when the specified profile(s) is active. It lets you swap implementations per environment — e.g. a fake/in-memory service for dev and a real one for prod." },
      { kind: "code", lines: ["@Bean", "@Profile(\"dev\")", "DataSource devDataSource() { /* H2 in-memory */ }", "", "@Bean", "@Profile(\"prod\")", "DataSource prodDataSource() { /* MySQL pool */ }"] },
      { kind: "note", text: "You can negate with @Profile(\"!prod\") (everything except prod) and combine expressions like @Profile(\"dev | test\"). Beans without any @Profile load in all profiles." },
    ],
    learn: "profile annotation spring boot conditional bean",
  },
  {
    q: "How can you enable a specific profile in Spring Boot?",
    slug: "enable-a-specific-profile",
    answer: [
      { kind: "text", text: "Activate a profile with the spring.profiles.active property, which can be set several ways: in application.properties, as a command-line argument, as an environment variable, or as a JVM system property. You can activate multiple profiles by comma-separating them." },
      { kind: "code", lines: ["# in application.properties", "spring.profiles.active=prod", "", "# command line", "java -jar app.jar --spring.profiles.active=prod", "", "# environment variable", "export SPRING_PROFILES_ACTIVE=prod"] },
      { kind: "note", text: "Command-line/env values override the value in application.properties. Multiple: --spring.profiles.active=prod,metrics." },
    ],
    learn: "activate spring profile spring.profiles.active command line",
  },
  {
    q: "How can you set a default profile in Spring Boot?",
    slug: "set-a-default-profile",
    answer: [
      { kind: "text", text: "Set the default with spring.profiles.default. This profile is used only when NO active profile is explicitly set. If nothing is configured, Spring Boot's built-in default profile is literally named 'default'." },
      { kind: "code", lines: ["# application.properties", "spring.profiles.default=dev", "# used only when spring.profiles.active is not set"] },
      { kind: "note", text: "Trap: don't confuse spring.profiles.active (what to run now) with spring.profiles.default (fallback when nothing is active). If active is set, default is ignored." },
    ],
    learn: "set default profile spring boot profiles.default",
  },
  {
    q: "What is the purpose of the @RestController annotation?",
    slug: "purpose-of-restcontroller",
    answer: [
      { kind: "text", text: "@RestController marks a class as a REST endpoint controller. It is a convenience annotation combining @Controller and @ResponseBody, so every handler method's return value is written directly to the HTTP response body (serialized to JSON/XML) instead of being resolved as a view name." },
      { kind: "code", lines: ["@RestController", "@RequestMapping(\"/api/users\")", "public class UserController {", "    @GetMapping(\"/{id}\")", "    public User get(@PathVariable Long id) {", "        return service.find(id);   // auto-serialized to JSON", "    }", "}"] },
      { kind: "note", text: "Because @ResponseBody is implied, you don't annotate each method. Use @RestController for APIs; use plain @Controller when you return HTML views." },
    ],
    learn: "restcontroller annotation purpose spring boot",
  },
  {
    q: "Difference between @RestController and @Controller?",
    slug: "restcontroller-vs-controller",
    answer: [
      { kind: "text", text: "@Controller is the classic MVC controller: by default its methods return a view NAME (resolved to a template like JSP/Thymeleaf). @RestController = @Controller + @ResponseBody, so methods return DATA that is serialized straight into the response body (JSON/XML) — ideal for REST APIs." },
      { kind: "code", lines: ["@Controller", "public class PageController {", "    @GetMapping(\"/home\")", "    public String home() { return \"home\"; }  // view name", "}", "", "@RestController", "public class ApiController {", "    @GetMapping(\"/data\")", "    public Data data() { return new Data(); } // JSON body", "}"] },
      { kind: "note", text: "With plain @Controller you can still return data by adding @ResponseBody on the method. @RestController just makes that the default for every method." },
    ],
    learn: "restcontroller vs controller difference spring",
  },
  {
    q: "What is the purpose of the @Controller annotation?",
    slug: "purpose-of-controller",
    answer: [
      { kind: "text", text: "@Controller is a stereotype annotation that marks a class as a Spring MVC controller — a web component that handles incoming HTTP requests and typically returns a logical VIEW name resolved by a ViewResolver into a rendered page (Thymeleaf, JSP)." },
      { kind: "code", lines: ["@Controller", "public class DashboardController {", "    @GetMapping(\"/dashboard\")", "    public String dashboard(Model model) {", "        model.addAttribute(\"user\", currentUser());", "        return \"dashboard\";   // resolves to dashboard.html", "    }", "}"] },
      { kind: "note", text: "It's a specialization of @Component (so it's component-scanned). Use it for server-side rendered web pages; add @ResponseBody or switch to @RestController when returning JSON." },
    ],
    learn: "controller annotation spring mvc purpose",
  },
  {
    q: "What is the purpose of the @RequestMapping annotation?",
    slug: "purpose-of-requestmapping",
    answer: [
      { kind: "text", text: "@RequestMapping maps HTTP requests to handler classes/methods. It can specify the URL path, HTTP method, produced/consumed media types, headers, and params. At class level it sets a base path; at method level it maps a specific endpoint." },
      { kind: "code", lines: ["@RestController", "@RequestMapping(\"/api/orders\")   // base path", "public class OrderController {", "    @RequestMapping(value = \"/{id}\", method = RequestMethod.GET)", "    public Order get(@PathVariable Long id) { return service.find(id); }", "}"] },
      { kind: "note", text: "The method-specific shortcuts (@GetMapping, @PostMapping, etc.) are just @RequestMapping with the method pre-set — prefer them for readability." },
    ],
    learn: "requestmapping annotation spring boot url mapping",
  },
  {
    q: "Difference between @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping?",
    slug: "get-post-put-delete-mapping",
    answer: [
      { kind: "text", text: "They are composed shortcuts for @RequestMapping with a fixed HTTP method, mapping to REST semantics: @GetMapping (read), @PostMapping (create), @PutMapping (full update/replace), @DeleteMapping (remove). Each equals @RequestMapping(method = RequestMethod.X)." },
      { kind: "code", lines: ["@GetMapping(\"/{id}\")     // read one", "@PostMapping            // create", "@PutMapping(\"/{id}\")     // replace", "@DeleteMapping(\"/{id}\")  // delete", "// there is also @PatchMapping for partial updates"] },
      { kind: "note", text: "Semantic points: GET/PUT/DELETE are idempotent, POST is not; PUT replaces the whole resource while PATCH updates part of it. GET has no request body." },
    ],
    learn: "getmapping postmapping putmapping deletemapping difference",
  },
  {
    q: "What is the purpose of @RequestParam?",
    slug: "purpose-of-requestparam",
    answer: [
      { kind: "text", text: "@RequestParam binds a query-string (or form) parameter to a method argument. It reads values like ?page=2&size=10 and supports defaults, required/optional flags, and automatic type conversion." },
      { kind: "code", lines: ["@GetMapping(\"/products\")", "public List<Product> list(", "        @RequestParam(defaultValue = \"0\") int page,", "        @RequestParam(required = false) String category) {", "    // GET /products?page=2&category=books", "    return service.search(page, category);", "}"] },
      { kind: "note", text: "Trap: by default required=true, so a missing param causes a 400 Bad Request. Use required=false or defaultValue to make it optional. It reads query/form params, NOT path segments — that's @PathVariable." },
    ],
    learn: "requestparam annotation spring boot query parameter",
  },
  {
    q: "What is the purpose of the @PathVariable annotation?",
    slug: "purpose-of-pathvariable",
    answer: [
      { kind: "text", text: "@PathVariable binds a value from the URI path template to a method parameter. It extracts dynamic segments of the URL — the parts declared with curly braces in the mapping." },
      { kind: "code", lines: ["@GetMapping(\"/users/{id}/orders/{orderId}\")", "public Order get(@PathVariable Long id,", "                 @PathVariable Long orderId) {", "    // GET /users/42/orders/7  ->  id=42, orderId=7", "    return service.find(id, orderId);", "}"] },
      { kind: "note", text: "Difference from @RequestParam: @PathVariable pulls from the path itself (/users/42), @RequestParam pulls from the query string (?id=42). If the variable name differs from the placeholder, set it: @PathVariable(\"id\")." },
    ],
    learn: "pathvariable annotation spring boot uri template",
  },
  {
    q: "What is the purpose of the @RequestBody annotation?",
    slug: "purpose-of-requestbody",
    answer: [
      { kind: "text", text: "@RequestBody binds the incoming HTTP request body to a Java object. Spring uses an HttpMessageConverter (Jackson for JSON by default) to deserialize the JSON/XML payload into the method parameter — used mainly for POST/PUT where the client sends data." },
      { kind: "code", lines: ["@PostMapping(\"/users\")", "public User create(@RequestBody @Valid UserDto dto) {", "    // JSON body -> UserDto automatically", "    return service.save(dto);", "}"] },
      { kind: "note", text: "Combine with @Valid to trigger bean validation on the deserialized object. There's only one @RequestBody per handler (a request has a single body). Malformed JSON yields a 400." },
    ],
    learn: "requestbody annotation spring boot json deserialization",
  },
  {
    q: "What is the purpose of the @ResponseBody annotation?",
    slug: "purpose-of-responsebody",
    answer: [
      { kind: "text", text: "@ResponseBody tells Spring to write the method's return value directly to the HTTP response body (serialized via an HttpMessageConverter, e.g. Jackson to JSON) instead of interpreting it as a view name to render." },
      { kind: "code", lines: ["@Controller", "public class ApiController {", "    @GetMapping(\"/status\")", "    @ResponseBody", "    public Status status() { return new Status(\"UP\"); } // -> JSON", "}"] },
      { kind: "note", text: "It's exactly what @RestController applies to every method automatically — so on a @RestController you never need @ResponseBody. You only reach for it on a plain @Controller that returns data from some methods and views from others." },
    ],
    learn: "responsebody annotation spring boot serialize response",
  },
];
