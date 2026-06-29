// Generative AI Engineer — interview-prep track. Track: genai
export const ROADMAP = [
  {
    id: "genai-1",
    title: "Stage 1: Python for AI",
    duration: "2-3 weeks",
    description: "Core Python you need before any NLP/ML work: syntax, data structures, functional tools, OOP, and environments.",
    sections: [
      {
        id: "1.1",
        title: "Language Core",
        items: [
          "Syntax, indentation, dynamic typing",
          "Numbers, strings, bool, None",
          "Mutable vs immutable types",
          "Lists, tuples, sets, dicts and when to use each",
          "Slicing and indexing"
        ]
      },
      {
        id: "1.2",
        title: "Functions & Functional Tools",
        items: [
          "Functions, *args / **kwargs, default args",
          "List / dict / set comprehensions",
          "lambda, map, filter, reduce",
          "Generators and yield",
          "Decorators (intro)"
        ]
      },
      {
        id: "1.3",
        title: "OOP & Modules",
        items: [
          "Classes, __init__, self, instance vs class attributes",
          "Inheritance, super(), method overriding",
          "Dunder methods (__str__, __repr__, __len__)",
          "Modules, packages, import system",
          "pip, virtualenv, conda environments"
        ]
      },
      {
        id: "1.4",
        title: "I/O & Errors",
        items: [
          "File operations and context managers (with)",
          "Reading/writing JSON and CSV",
          "Exception handling try/except/finally",
          "Custom exceptions"
        ]
      }
    ]
  },
  {
    id: "genai-2",
    title: "Stage 2: NLP Foundations",
    duration: "1-2 weeks",
    description: "Classical text preprocessing with NLTK: tokenization, normalization, tagging and named entities.",
    sections: [
      {
        id: "2.1",
        title: "Tokenization & Normalization",
        items: [
          "Word vs sentence tokenization",
          "Stemming (Porter, Snowball)",
          "Lemmatization (WordNet)",
          "Stemming vs lemmatization trade-offs",
          "Stopword removal and lowercasing"
        ]
      },
      {
        id: "2.2",
        title: "Tagging & Entities",
        items: [
          "Parts-of-speech (POS) tagging",
          "Named Entity Recognition (NER)",
          "Chunking and chinking",
          "Building an NLTK preprocessing pipeline"
        ]
      }
    ]
  },
  {
    id: "genai-3",
    title: "Stage 3: Text Representation",
    duration: "2 weeks",
    description: "Turning text into vectors: from One-Hot and BoW to TF-IDF and Word2Vec embeddings.",
    sections: [
      {
        id: "3.1",
        title: "Count-based Representations",
        items: [
          "One-Hot Encoding",
          "Bag of Words (BoW)",
          "N-grams (unigram, bigram, trigram)",
          "TF-IDF: term frequency x inverse document frequency",
          "Sparsity and out-of-vocabulary problems"
        ]
      },
      {
        id: "3.2",
        title: "Word Embeddings",
        items: [
          "Why dense embeddings beat sparse vectors",
          "Word2Vec: CBOW vs Skip-Gram",
          "Negative sampling and the window size",
          "Average Word2Vec for sentences",
          "Pros/cons of each representation"
        ]
      }
    ]
  },
  {
    id: "genai-4",
    title: "Stage 4: Deep Learning for NLP",
    duration: "3 weeks",
    description: "Sequence models: ANN vs RNN, BPTT, vanishing gradients, LSTM/GRU gates, and embedding layers in Keras.",
    sections: [
      {
        id: "4.1",
        title: "RNN Fundamentals",
        items: [
          "ANN vs RNN: why sequence order matters",
          "RNN forward pass and hidden state",
          "Backpropagation Through Time (BPTT)",
          "Vanishing and exploding gradients"
        ]
      },
      {
        id: "4.2",
        title: "Gated Architectures",
        items: [
          "LSTM cell: forget, input, output gates",
          "Cell state vs hidden state",
          "GRU: update and reset gates",
          "LSTM vs GRU trade-offs",
          "Bidirectional RNN"
        ]
      },
      {
        id: "4.3",
        title: "Keras Embedding Layers",
        items: [
          "Embedding layer and input_dim/output_dim",
          "Padding and masking sequences",
          "Pre-trained vs trainable embeddings"
        ]
      }
    ]
  },
  {
    id: "genai-5",
    title: "Stage 5: Transformers & Attention",
    duration: "3 weeks",
    description: "The architecture behind modern LLMs: attention, multi-head attention, positional encoding and the full encoder-decoder.",
    sections: [
      {
        id: "5.1",
        title: "Attention Mechanism",
        items: [
          "Seq2seq encoder-decoder and the bottleneck problem",
          "Attention as weighted context",
          "Self-attention: Query, Key, Value",
          "Scaled dot-product attention softmax(QK^T/sqrt(d_k))V",
          "Multi-head attention"
        ]
      },
      {
        id: "5.2",
        title: "Transformer Building Blocks",
        items: [
          "Positional encoding (sinusoidal)",
          "Layer normalization and residual connections",
          "Position-wise feed-forward network",
          "Full encoder stack"
        ]
      },
      {
        id: "5.3",
        title: "Decoder & Output",
        items: [
          "Masked (causal) self-attention",
          "Encoder-decoder cross attention",
          "Final linear + softmax head",
          "Encoder-only vs decoder-only vs encoder-decoder"
        ]
      }
    ]
  },
  {
    id: "genai-6",
    title: "Stage 6: LLM Fundamentals",
    duration: "2 weeks",
    description: "How LLMs are trained and used: pretraining/SFT/RLHF, tokens and context, decoding parameters, hallucinations, embeddings.",
    sections: [
      {
        id: "6.1",
        title: "Concepts & Training",
        items: [
          "AI vs ML vs DL vs Generative AI",
          "Pretraining, supervised fine-tuning (SFT), RLHF",
          "Tokens, context window, parameters",
          "Evolution of LLMs (n-gram -> RNN -> Transformer -> GPT)"
        ]
      },
      {
        id: "6.2",
        title: "Generation & Limitations",
        items: [
          "Temperature, top-p (nucleus), top-k sampling",
          "Greedy vs sampling decoding",
          "Hallucinations: causes and mitigations",
          "Embeddings and cosine similarity for semantic search"
        ]
      }
    ]
  },
  {
    id: "genai-7",
    title: "Stage 7: LangChain Ecosystem",
    duration: "3 weeks",
    description: "Building LLM apps with LangChain: loaders, splitters, embeddings, vector stores, retrievers, chains, LCEL, memory and observability.",
    sections: [
      {
        id: "7.1",
        title: "Data Connection",
        items: [
          "Document loaders (PDF, web, JSON, CSV)",
          "Text splitters: recursive, character, HTML, JSON",
          "Embeddings: OpenAI, Ollama, HuggingFace",
          "Vector stores: FAISS, ChromaDB",
          "Retrievers and similarity search"
        ]
      },
      {
        id: "7.2",
        title: "Chains & LCEL",
        items: [
          "Prompt templates and few-shot prompts",
          "LCEL pipe (|) composition and Runnables",
          "Output parsers",
          "Memory and chat history"
        ]
      },
      {
        id: "7.3",
        title: "Tooling & Deployment",
        items: [
          "LangSmith tracing and evaluation",
          "Groq API for fast inference",
          "LangServe for serving chains"
        ]
      }
    ]
  },
  {
    id: "genai-8",
    title: "Stage 8: Retrieval-Augmented Generation (RAG)",
    duration: "3 weeks",
    description: "End-to-end RAG: pipeline, chunking, conversational RAG, hybrid search, re-ranking, evaluation, and Graph RAG.",
    sections: [
      {
        id: "8.1",
        title: "RAG Pipeline",
        items: [
          "Why RAG vs fine-tuning",
          "Ingest -> chunk -> embed -> store -> retrieve -> generate",
          "Chunking strategies and overlap",
          "Conversational RAG with chat history"
        ]
      },
      {
        id: "8.2",
        title: "Advanced Retrieval",
        items: [
          "Hybrid search (dense + sparse/BM25)",
          "Reciprocal Rank Fusion (RRF)",
          "Re-ranking with cross-encoders",
          "RAG evaluation (faithfulness, relevancy, RAGAS)"
        ]
      },
      {
        id: "8.3",
        title: "Graph RAG",
        items: [
          "Knowledge graphs and entities/relations",
          "Neo4j and Cypher basics",
          "When Graph RAG beats vector RAG"
        ]
      }
    ]
  },
  {
    id: "genai-9",
    title: "Stage 9: AI Agents & Tools",
    duration: "3 weeks",
    description: "Agents that reason and act: function calling, the ReAct loop, LangChain agents, LangGraph workflows, multi-agent and MCP.",
    sections: [
      {
        id: "9.1",
        title: "Agent Foundations",
        items: [
          "What is an agent vs a chain",
          "Function calling / tool use",
          "The ReAct loop (Reason + Act + Observe)",
          "Structured output with Pydantic / TypedDict"
        ]
      },
      {
        id: "9.2",
        title: "Frameworks",
        items: [
          "LangChain agents and AgentExecutor",
          "LangGraph: nodes, edges, state, cycles",
          "Building a chatbot and tool-using agent",
          "Multi-agent systems"
        ]
      },
      {
        id: "9.3",
        title: "Integration",
        items: [
          "MCP (Model Context Protocol)",
          "Search-engine / web-browsing agents",
          "Tracing and guardrails for agents"
        ]
      }
    ]
  },
  {
    id: "genai-10",
    title: "Stage 10: Fine-tuning & Deployment",
    duration: "3 weeks",
    description: "Adapting and shipping models: quantization, LoRA/QLoRA, custom-data fine-tuning, AWS Bedrock/SageMaker, and production lifecycle.",
    sections: [
      {
        id: "10.1",
        title: "Efficient Fine-tuning",
        items: [
          "Quantization (8-bit, 4-bit NF4)",
          "LoRA: low-rank adapters A and B",
          "QLoRA: 4-bit base + LoRA adapters",
          "Fine-tuning with custom data (PEFT)"
        ]
      },
      {
        id: "10.2",
        title: "Cloud Deployment",
        items: [
          "AWS Bedrock foundation models",
          "SageMaker endpoints",
          "HuggingFace Spaces and Streamlit",
          "GenAI project lifecycle on AWS"
        ]
      },
      {
        id: "10.3",
        title: "Production Concerns",
        items: [
          "Cost control (caching, batching, model choice)",
          "Guardrails and content filtering",
          "Monitoring, latency, and evaluation"
        ]
      }
    ]
  }
];
