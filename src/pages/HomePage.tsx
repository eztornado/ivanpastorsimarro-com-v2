import { Avatar, Box, Button, Container, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { socials } from '../data/socials';
import { ProjectCard } from '../components/ProjectCard';
import { SocialCard } from '../components/SocialCard';
import { TechBadge } from '../components/TechBadge';
import { Reveal } from '../components/Reveal';

function SectionTitle({ children }: { children: string }) {
  return (
    <Title order={2} mb="lg">
      <Text component="span" c="accent" inherit>#</Text> {children}
    </Title>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const linkedin = socials.find((s) => s.id === 'linkedin');

  return (
    <Container size="lg">
      <Group id="inicio" justify="space-between" align="center" py="xl" wrap="nowrap" gap="lg">
        <Stack gap="sm">
          <Text c="dimmed">{t('hero.intro')}</Text>
          <Title order={1}>{profile.name}</Title>
          <Text maw={520}>{t('hero.message')}</Text>
          <Text c="dimmed" fz="sm">📍 {t('hero.location')}</Text>
        </Stack>
        <Avatar
          src={profile.portrait}
          size={220}
          visibleFrom="sm"
          style={{ boxShadow: 'var(--mantine-shadow-xl)' }}
        />
      </Group>

      <Box component="section" id="proyectos" py="xl">
        <SectionTitle>{t('nav.projects')}</SectionTitle>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </SimpleGrid>
      </Box>

      <Box component="section" id="redes" py="xl">
        <SectionTitle>{t('nav.socials')}</SectionTitle>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {socials.map((social) => (
            <SocialCard key={social.id} social={social} />
          ))}
        </SimpleGrid>
      </Box>

      <Box component="section" id="about" py="xl">
        <SectionTitle>{t('nav.about')}</SectionTitle>
        <Group align="center" gap="xl">
          <Image src={profile.aboutPhoto} w={280} radius="md" visibleFrom="sm" />
          <Stack gap="sm" style={{ flex: 1 }}>
            <Text>{t('about.p1')}</Text>
            <Text>{t('about.p2')}</Text>
            <Text fw={600} mt="sm">{t('about.stack')}</Text>
            <Group gap="xs">
              {profile.techStack.map((label) => (
                <TechBadge key={label} label={label} />
              ))}
            </Group>
          </Stack>
        </Group>
      </Box>

      <Box component="section" id="contacto" py="xl">
        <SectionTitle>{t('nav.contact')}</SectionTitle>
        <Stack align="center" gap="md" py="md">
          <Text>{t('contact.text')}</Text>
          <Button
            component="a"
            href={linkedin?.url}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
          >
            {t('contact.button')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
