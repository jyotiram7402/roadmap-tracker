// data/prep-roadmap.js — the "Crack PBCs 2026" preparation roadmap, rendered as
// a graphical mind-map. Node: { label, color?, link?:{label,q}, children?:[] }.
// `q` on a link becomes a Google search so we don't ship broken/guessed URLs.

export const PREP_ROADMAP = {
  label: "What to prepare to crack PBCs in 2026 (My Actual Roadmap)",
  root: true,
  children: [
    {
      label: "Agentic AI",
      color: "#34d399", // emerald
      children: [
        { label: "Python Crash Course on Youtube (any would work)", link: { label: "Course", q: "Python crash course youtube" } },
        { label: "Krish Naik – Complete Agentic AI Bootcamp with LangGraph and Langchain", link: { label: "Course Link", q: "Krish Naik Agentic AI Bootcamp LangGraph Langchain" } },
        { label: "Krish Naik – 11 hrs Free Youtube Course", link: { label: "Course Link", q: "Krish Naik Agentic AI 11 hours free youtube" } },
        { label: "Free Agentic AI Complete A2Z Course – 24 hrs", link: { label: "Course Link", q: "Free Agentic AI complete A2Z course 24 hours" } },
      ],
    },
    {
      label: "DSA",
      color: "#e879f9", // fuchsia
      children: [
        { label: "Strivers A2Z Sheet", link: { label: "Link to Sheet", q: "Strivers A2Z DSA Sheet takeuforward" } },
        { label: "Leetcode Daily Practice Problems (Pattern Wise)", link: { label: "LeetCode", q: "leetcode patterns daily practice" } },
        { label: "Weekly / Virtual Contests", link: { label: "Contests", q: "leetcode weekly virtual contest" } },
        { label: "Concept & Coding by Shrayansh Jain", link: { label: "Playlist Link", q: "Concept and Coding Shrayansh Jain DSA playlist" } },
        { label: "TechPrep (Interview Centric Problems)", link: { label: "Playlist Link", q: "TechPrep interview centric problems playlist" } },
      ],
    },
    {
      label: "System Design",
      color: "#60a5fa", // blue
      children: [
        {
          label: "HLD",
          children: [
            {
              label: "10 Must-Do Questions to Understand Core Concepts",
              children: [
                { label: "Messaging App", children: [{ label: "Real-time systems" }, { label: "WebSockets" }, { label: "Delivery guarantees" }, { label: "Distributed coordination" }] },
                { label: "Ticketing System / Hotel Reservation", children: [{ label: "Concurrency Control" }, { label: "Distributed Locking" }, { label: "Idempotency" }] },
                { label: "Instagram", children: [{ label: "Fan-out strategies" }, { label: "Feed Generation" }, { label: "Media Storage / CDN" }] },
                { label: "Distributed Task Scheduler", children: [{ label: "Distributed Scheduling" }, { label: "Leader Election" }, { label: "Fault Tolerance" }, { label: "Exactly-once vs At-least-once execution" }] },
                { label: "Video Streaming (Youtube)", children: [{ label: "Video Processing" }, { label: "Adaptive Bitrate Streaming" }, { label: "CDN" }, { label: "Object Storage" }] },
                { label: "E-Commerce Platform", children: [{ label: "Distributed Transactions" }, { label: "Saga" }, { label: "Inventory Consistency" }, { label: "Payment workflows" }] },
                { label: "Proximity Service", children: [{ label: "Geospatial Indexing" }, { label: "Geohash / H3" }, { label: "Nearest-Neighbor Search" }, { label: "Matching" }] },
                { label: "Tinder", children: [{ label: "Matching" }, { label: "Recommendation" }, { label: "Ranking" }, { label: "Location-based filtering" }] },
                { label: "Uber", children: [{ label: "Real-time Dispatch" }, { label: "Location Tracking" }, { label: "Event-driven Architecture" }, { label: "State Management" }] },
                { label: "Twitter", children: [{ label: "Massive Fan-out" }, { label: "Hot Partitions" }, { label: "Feed Scalability" }, { label: "Celebrity Problem" }] },
              ],
            },
          ],
        },
        {
          label: "LLD",
          children: [
            {
              label: "Must-Do Questions to Understand Patterns",
              children: [
                { label: "Distributed Job Scheduler", children: [{ label: "Strategy" }, { label: "Command" }, { label: "Observer" }] },
                { label: "Library Management System", children: [{ label: "Observer" }, { label: "State" }, { label: "Association / Aggregation" }] },
                { label: "Movie Booking System", children: [{ label: "Concurrency" }, { label: "State Machine" }, { label: "Factory" }, { label: "Payment System" }] },
                { label: "Car Rental System", children: [{ label: "Strategy" }, { label: "State" }, { label: "Factory" }] },
                { label: "Parking Lot", children: [{ label: "Factory" }, { label: "Abstract Factory" }, { label: "Strategy" }, { label: "Singleton" }] },
                { label: "Inventory Management System", children: [{ label: "Observer" }, { label: "Strategy" }, { label: "State" }] },
                { label: "Ride Sharing Application", children: [{ label: "Strategy" }, { label: "Observer" }, { label: "State" }, { label: "Calculations" }] },
                { label: "Rate Limiter", children: [{ label: "Strategy" }, { label: "Algorithms and Encapsulation" }] },
                { label: "Snake And Ladders", children: [{ label: "Factory" }, { label: "Strategy" }, { label: "State" }] },
                { label: "Elevator System", children: [{ label: "State" }, { label: "Strategy" }, { label: "Command" }] },
                { label: "Vending Machine", children: [{ label: "State Pattern" }, { label: "State Transition" }] },
              ],
            },
          ],
        },
        { label: "Design Patterns by Prateek Narang", link: { label: "Course Link", q: "Design Patterns Prateek Narang course" } },
        { label: "Concept && Coding by Shrayansh Jain", link: { label: "Playlist Link", q: "Concept and Coding Shrayansh Jain LLD system design playlist" } },
        { label: "Rate your Code by ChatGPT", children: [{ label: "Ask Improvements and Implement" }, { label: "Repeat" }] },
      ],
    },
  ],
};

export const PREP_NOTES = [
  {
    title: "For DSA Rounds", color: "#a855f7",
    items: [
      "Brute Force.",
      "Discuss on TC and SC.",
      "Convey cleanly that brute force would break on high-traffic situations.",
      "Show you are now optimizing from your brute-force solution.",
      "Most Imp — do a dry run with the given input before submitting your solution.",
    ],
  },
  {
    title: "For HLD Rounds", color: "#3b82f6",
    items: [
      "Functional and Non-Functional Requirements gathering.",
      "Most Imp — then start with Back-of-the-envelope Estimations.",
      "Design a basic flow and then make it extendable.",
      "Discuss deeply on scaling and cross-region connections (Interviewers love this).",
      "Don't hurry into the design — it results in negative impact.",
      "Keep interacting with the interviewer constantly so they feel involved and won't ask many cross questions.",
    ],
  },
  {
    title: "For LLD Rounds", color: "#8b7355",
    items: [
      "Start with the UML diagram.",
      "Don't ask too many questions, otherwise the interviewer will say yes to every requirement.",
      "Start with a basic model, then extend it and make it scalable.",
      "Explain concurrency management while coding (Interviewers are most interested).",
      "Discuss race conditions with the interviewer and implement locking wherever required.",
      "Naming must be on point — it matters a lot.",
    ],
  },
];
