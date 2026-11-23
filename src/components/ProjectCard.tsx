import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Badge, Box, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import type { Project } from '../data/projects';
import { toLocale } from '../i18n';
import { TechBadge } from './TechBadge';

export function ProjectCard({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const locale = toLocale(i18n.language);

  function bannerSrc() {
    if (project.banner.type === 'youtube') {
      return `https://img.youtube.com/vi/${project.banner.id}/hqdefault.jpg`;
    }
    return project.banner.src;
  }

  return (
    <Card
      component={Link}
      to={`/projects/${project.slug}`}
      className="glass-card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <Card.Section>
        <Box style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <Image src={bannerSrc()} fit="cover" w="100%" h="100%" alt={project.title} />
        </Box>
      </Card.Section>
      <Stack gap="xs" mt="md">
        <Group justify="space-between" wrap="nowrap" gap="sm">
          <Title order={4}>{project.title}</Title>
          <Badge variant="light" color="accent" style={{ flexShrink: 0 }}>
            {project.year === 'IN PROGRESS' ? t('project.inProgress') : project.year}
          </Badge>
        </Group>
        <Text c="dimmed" fz="sm" lineClamp={3}>
          {project.summary[locale]}
        </Text>
        <Group gap="xs" mt="xs">
          {project.tech.slice(0, 4).map((label) => (
            <TechBadge key={label} label={label} />
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
