/**
 * Skills shown on the interactive 3D globe.
 * Only technologies confirmed on the resume.
 */
export type GlobeSkill = {
  name: string;
  category: string;
  description: string;
};

export const globeSkills: GlobeSkill[] = [
  // Languages
  { name: 'Java', category: 'Languages', description: 'Backend services and Spring microservices.' },
  { name: 'Python', category: 'Languages', description: 'FastAPI services and AI pipelines.' },
  { name: 'JavaScript', category: 'Languages', description: 'Client and Node.js application logic.' },
  { name: 'TypeScript', category: 'Languages', description: 'Typed React and service code.' },
  { name: 'Go', category: 'Languages', description: 'Event-driven services for asynchronous updates.' },
  // Frontend
  { name: 'React', category: 'Frontend', description: 'Reusable UI for customer and admin apps.' },
  { name: 'Redux', category: 'Frontend', description: 'Standardized frontend state management.' },
  // Backend
  { name: 'Spring Boot', category: 'Backend', description: 'Independently deployable Java microservices.' },
  { name: 'Spring Security', category: 'Backend', description: 'Authentication and authorization controls.' },
  { name: 'FastAPI', category: 'Backend', description: 'High-volume Python API services.' },
  { name: 'Node.js', category: 'Backend', description: 'RESTful service layer for full-stack apps.' },
  { name: 'Express.js', category: 'Backend', description: 'HTTP routing for Node.js APIs.' },
  { name: 'GraphQL', category: 'Backend', description: 'Efficient data-fetching for React clients.' },
  { name: 'Hibernate', category: 'Backend', description: 'ORM mapping with Spring Data JPA.' },
  // Data
  { name: 'PostgreSQL', category: 'Databases', description: 'Relational store for transactional workflows.' },
  { name: 'Redis', category: 'Databases', description: 'Caching for frequent pharmacy and API data.' },
  { name: 'Kafka', category: 'Databases', description: 'Event-driven messaging across services.' },
  // Cloud
  { name: 'Docker', category: 'Cloud & DevOps', description: 'Container packaging for service releases.' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', description: 'Orchestration for microservice deployments.' },
  { name: 'Azure', category: 'Cloud & DevOps', description: 'Cloud identity, Key Vault, OpenAI, and AKS.' },
  { name: 'Git', category: 'Cloud & DevOps', description: 'Source control across all projects.' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', description: 'CI/CD workflows for automated delivery.' },
  { name: 'Jenkins', category: 'Cloud & DevOps', description: 'CI automation for service pipelines.' },
  // Testing / observability
  { name: 'Pytest', category: 'Testing', description: 'Unit and integration tests for Python APIs.' },
  { name: 'JUnit', category: 'Testing', description: 'Unit testing for Java services.' },
  { name: 'Jest', category: 'Testing', description: 'Frontend unit testing.' },
  { name: 'Cypress', category: 'Testing', description: 'End-to-end browser testing.' },
  { name: 'Prometheus', category: 'Testing', description: 'Production metrics and diagnostics.' },
  { name: 'Grafana', category: 'Testing', description: 'Observability dashboards for services.' },
  // AI/ML
  { name: 'LangChain', category: 'AI/ML', description: 'Orchestration for production RAG flows.' },
  { name: 'Azure OpenAI', category: 'AI/ML', description: 'LLM inference for grounded inquiry answers.' },
  { name: 'Pinecone', category: 'AI/ML', description: 'Vector retrieval for pharmacy knowledge.' },
  { name: 'PyTorch', category: 'AI/ML', description: 'Deep learning model development.' },
  { name: 'Hugging Face', category: 'AI/ML', description: 'Transformers ecosystem for ML workflows.' },
];

export function fibonacciSphere(count: number, radius: number) {
  const points: [number, number, number][] = [];
  for (let i = 0; i < count; i += 1) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    points.push([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ]);
  }
  return points;
}
