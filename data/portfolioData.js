/**
 * Portfolio Data File - Clean Minimal Terminal Edition
 * Ali Mirzaei | AI Enthusiast & Data Scientist
 */

const portfolioData = {
  personal: {
    title: "AI & Data Enthusiast // Machine Learning Researcher",
    passionTag: "Driven by curiosity in data intelligence & autonomous agentic systems",
    bio: "Passionate about exploring complex data patterns, extracting strategic value from large-scale datasets, and engineering practical machine learning systems. Deeply focused on deep neural architectures, time-series forecasting, computer vision, and building autonomous multi-agent AI workflows.",
    social: {
      github: "https://github.com/alipmirzaei",
      linkedin: "https://linkedin.com/in/alipmirzaei",
      telegram: "https://t.me/alipmirzaei",
      email: "alipmirzaei@gmail.com",
      twitter: "https://x.com/alipmirzaei"
    }
  },

  skills: [
    {
      category: "Deep Learning & Neural Architectures",
      items: [
        "PyTorch & TensorFlow Ecosystem",
        "CNNs, ResNet & Vision Transformers (ViT)",
        "RNN, LSTM, GRU & Temporal Models",
        "Transformer Models & Self-Attention Mechanisms",
        "Statistical Machine Learning & Scikit-Learn"
      ]
    },
    {
      category: "Agentic AI & Autonomous Systems",
      items: [
        "Autonomous Multi-Agent Orchestration",
        "LangChain, LangGraph & Multi-Agent Workflows",
        "Retrieval-Augmented Generation (RAG) & Vector DBs (Chroma/FAISS)",
        "Structured Reasoning Chains & Prompt Engineering",
        "Open-Source & Cloud LLM Integrations"
      ]
    },
    {
      category: "Time-Series & Anomaly Modeling",
      items: [
        "Multi-Horizon Sequence & Trend Forecasting",
        "Deep Temporal Anomaly Detection Pipelines",
        "Seasonal Decomposition & Signal Processing",
        "Statistical & Deep State-Space Models"
      ]
    },
    {
      category: "Computer Vision & NLP",
      items: [
        "Object Detection & Tracking (YOLO / OpenCV)",
        "Semantic Segmentation & Feature Extraction",
        "Contextual Embeddings & Semantic Search",
        "Topic Categorization & Sentiment Analysis (BERT/Transformers)"
      ]
    },
    {
      category: "Data Engineering & Core Tooling",
      items: [
        "Python (NumPy, Pandas, SciPy, Polars)",
        "Interactive Visual Analytics (Plotly, Matplotlib, Seaborn)",
        "Linux CLI & Bash Scripting",
        "Docker Containerization, Git & CI/CD Pipelines"
      ]
    }
  ],

  projects: [
    {
      index: "01",
      title: "Autonomous Agentic AI Intelligence Workflow",
      description: "Multi-agent cognitive architecture implementing dynamic task decomposition, real-time web discovery, vector RAG retrieval, and autonomous problem synthesis.",
      tags: ["Agentic AI", "LangGraph", "PyTorch", "RAG", "Vector DB"],
      github: "https://github.com/alipmirzaei",
      demo: "https://alipmirzaei.github.io"
    },
    {
      index: "02",
      title: "Deep Temporal Time-Series & Anomaly Forecasting",
      description: "High-precision temporal deep learning framework for multi-horizon sequence forecasting, seasonal trend decomposition, and real-time anomaly isolation in continuous data streams.",
      tags: ["Time-Series", "LSTM / Transformers", "PyTorch", "Pandas", "Scipy"],
      github: "https://github.com/alipmirzaei",
      demo: "https://alipmirzaei.github.io"
    },
    {
      index: "03",
      title: "Computer Vision Object Detection & Scene Understanding",
      description: "End-to-end vision pipeline utilizing modern CNN backbones and Vision Transformers for feature extraction, semantic segmentation, and real-time tracking.",
      tags: ["Computer Vision", "YOLO", "OpenCV", "ViT", "PyTorch"],
      github: "https://github.com/alipmirzaei",
      demo: "https://alipmirzaei.github.io"
    },
    {
      index: "04",
      title: "NLP Semantic Text Processing & Embedding Intelligence",
      description: "Advanced NLP engine for contextual embeddings, semantic text similarity, topic categorization, and sentiment distillation across multi-lingual datasets.",
      tags: ["NLP", "Transformers", "BERT / LLMs", "HuggingFace", "Python"],
      github: "https://github.com/alipmirzaei",
      demo: "https://alipmirzaei.github.io"
    }
  ],

  experience: [
    {
      period: "2025 — Present",
      role: "M.Sc. in Data Mining & Artificial Intelligence",
      org: "Shahid Beheshti University (SBU)",
      description: "Academic & applied research on deep neural architectures, multi-horizon time-series modeling, and autonomous multi-agent AI systems."
    },
    {
      period: "2020 — 2025",
      role: "B.Sc. in Computer Science",
      org: "Ferdowsi University of Mashhad (FUM)",
      description: "Completed comprehensive 10-semester foundational curriculum covering algorithm design, computational theory, linear algebra, data structures, and statistical machine learning."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
