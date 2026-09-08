import {
  siApachekafka,
  siCypress,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGithubactions,
  siGo,
  siGrafana,
  siGraphql,
  siHibernate,
  siHuggingface,
  siJavascript,
  siJenkins,
  siJest,
  siJunit5,
  siKubernetes,
  siLangchain,
  siMlflow,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrometheus,
  siPydantic,
  siPytest,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siRedux,
  siScikitlearn,
  siSpacy,
  siSpring,
  siSpringboot,
  siSpringsecurity,
  siTypescript,
} from 'simple-icons';

type SimpleIcon = {
  title: string;
  slug: string;
  hex: string;
  path: string;
};

const ICONS: Record<string, SimpleIcon> = {
  openjdk: siOpenjdk,
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  go: siGo,
  postgresql: siPostgresql,
  react: siReact,
  redux: siRedux,
  springboot: siSpringboot,
  spring: siSpring,
  springsecurity: siSpringsecurity,
  fastapi: siFastapi,
  pydantic: siPydantic,
  nodedotjs: siNodedotjs,
  express: siExpress,
  graphql: siGraphql,
  hibernate: siHibernate,
  langchain: siLangchain,
  huggingface: siHuggingface,
  pytorch: siPytorch,
  scikitlearn: siScikitlearn,
  spacy: siSpacy,
  mlflow: siMlflow,
  redis: siRedis,
  apachekafka: siApachekafka,
  kubernetes: siKubernetes,
  docker: siDocker,
  jenkins: siJenkins,
  githubactions: siGithubactions,
  git: siGit,
  junit5: siJunit5,
  pytest: siPytest,
  jest: siJest,
  cypress: siCypress,
  postman: siPostman,
  prometheus: siPrometheus,
  grafana: siGrafana,
};

interface TechIconProps {
  slug?: string;
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ slug, name, size = 28, className = '' }: TechIconProps) {
  const icon = slug ? ICONS[slug] : undefined;

  if (!icon) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded border border-border bg-bg-elevated font-mono text-[10px] font-semibold text-orange ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
        title={name}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}
