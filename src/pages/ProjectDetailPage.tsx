import { Link, Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandGithub, IconBrandYoutube, IconWorld } from '@tabler/icons-react';
import { getNeighbors, getProject, type Banner, type Project } from '../data/projects';
import { toLocale } from '../i18n';
import { TechBadge } from '../components/TechBadge';

const LINK_ICONS = {
  web: IconWorld,
  github: IconBrandGithub,
  youtube: IconBrandYoutube,
} as const;

function ProjectBanner({ banner, title }: { banner: Banner; title: string }) {
  if (banner.type === 'youtube') {
    return (
      <Box style={{ aspectRatio: '16 / 9' }} w="100%">
        <iframe
          src={`https://www.youtube.com/embed/${banner.id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0, borderRadius: 'var(--mantine-radius-md)' }}
        />
      </Box>
    );
  }
  if (banner.type === 'video') {
    return (
      <video
        controls
        poster={banner.poster}
        src={banner.src}
        style={{ width: '100%', borderRadius: 'var(--mantine-radius-md)' }}
      />
    );
  }
  return <Image src={banner.src} radius="md" alt={title} />;
}

function ProjectBody({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const locale = toLocale(i18n.language);
  const { prev, next } = getNeighbors(project.slug);

  return (
    <>
      <Group justify="space-between" wrap="nowrap" mt="md" mb="lg" gap="sm">
        <Title order={1}>{project.title}</Title>
        <Badge variant="light" color="accent" style={{ flexShrink: 0 }}>
          {project.year === 'IN PROGRESS' ? t('project.inProgress') : project.year}
        </Badge>
      </Group>

      <ProjectBanner banner={project.banner} title={project.title} />

      <Stack gap="md" mt="xl">
        {project.description[locale].split('\n\n').map((paragraph, i) => (
          <Text key={i}>{paragraph}</Text>
        ))}
      </Stack>

      {project.links.length > 0 && (
        <>
          <Title order={4} mt="xl" mb="sm">{t('project.links')}</Title>
          <Group gap="sm">
            {project.links.map((link) => {
              const Icon = LINK_ICONS[link.type];
              return (
                <Button
                  key={link.url}
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  color="accent"
                  leftSection={<Icon size={16} />}
                >
                  {link.label}
                </Button>
              );
            })}
          </Group>
        </>
      )}

      <Title order={4} mt="xl" mb="sm">{t('project.tech')}</Title>
      <Group gap="xs">
        {project.tech.map((label) => (
          <TechBadge key={label} label={label} />
        ))}
      </Group>

      <Group
        justify="space-between"
        mt="xl"
        pt="md"
        style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
      >
        {prev && (
          <Anchor
            component={Link}
            to={`/projects/${prev.slug}`}
            aria-label={t('project.prev')}
            fz="sm"
          >
            ← {prev.title}
          </Anchor>
        )}
        {next && (
          <Anchor
            component={Link}
            to={`/projects/${next.slug}`}
            aria-label={t('project.next')}
            fz="sm"
          >
            {next.title} →
          </Anchor>
        )}
      </Group>
    </>
  );
}

export function ProjectDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const project = getProject(slug ?? '');

  if (!project) return <Navigate to="/" replace />;

  return (
    <Container size="md" py="xl">
      <Anchor component={Link} to="/" c="dimmed" fz="sm">
        ← {t('project.back')}
      </Anchor>
      <Box className="glass-panel" mt="md">
        <ProjectBody project={project} />
      </Box>
    </Container>
  );
}
