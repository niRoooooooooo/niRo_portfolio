import type { ResearchItem } from "@/types";

export const research: ResearchItem[] = [
  {
    id: "r1",
    number: "01",
    title: "Efficient Federated Learning Under Non-IID Data Distributions",
    abstract:
      "We propose a novel aggregation strategy that reduces communication rounds by 34% in heterogeneous federated settings, while maintaining model accuracy within 1.2% of centralised baselines across five benchmark datasets.",
    keywords: ["Federated Learning", "Machine Learning", "Privacy", "Distributed Systems"],
    venue: "ICML Workshop on Federated Learning",
    year: "2024",
    status: "under-review",
    accentColor: "amber",
    href: "#",
  },
  {
    id: "r2",
    number: "02",
    title: "Automated Vulnerability Detection in Smart Contracts via Static Analysis",
    abstract:
      "A static analysis pipeline combining dataflow analysis and symbolic execution to detect reentrancy, integer overflow, and access-control vulnerabilities. Achieves 91.4% precision on the SWC benchmark, outperforming existing tools by 7 points.",
    keywords: ["Smart Contracts", "Security", "Static Analysis", "Blockchain"],
    venue: "IEEE Transactions on Dependable and Secure Computing",
    year: "2023",
    status: "published",
    accentColor: "teal",
    href: "#",
  },
  {
    id: "r3",
    number: "03",
    title: "Context-Aware Code Completion Using Retrieval-Augmented Generation",
    abstract:
      "Augmenting code LLMs with a dense retrieval index over project-specific codebases to improve in-file and cross-file completion accuracy. Preliminary results show a 21% improvement in exact-match on HumanEval over base Codex.",
    keywords: ["LLMs", "RAG", "Code Generation", "NLP"],
    venue: "ACL Student Research Workshop",
    year: "2024",
    status: "in-progress",
    accentColor: "purple",
  },
];
