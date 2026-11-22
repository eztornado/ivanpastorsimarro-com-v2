import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { toLocale } from '../i18n';

const SECTIONS = [
  { id: 'proyectos', key: 'nav.projects' },
  { id: 'redes', key: 'nav.socials' },
  { id: 'about', key: 'nav.about' },
  { id: 'contacto', key: 'nav.contact' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, setOpened] = useState(false);
  const { toggleColorScheme } = useMantineColorScheme();
  // Mantine v8: sin opciones; el hook lee el esquema del provider/matchMedia
  const colorScheme = useComputedColorScheme('light');

  function scrollToSection(id: string) {
    setOpened(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const langSwitch = (
    <SegmentedControl
      size="xs"
      value={toLocale(i18n.language)}
      onChange={(lng) => i18n.changeLanguage(lng)}
      data={[
        { value: 'es', label: 'ES' },
        { value: 'en', label: 'EN' },
        { value: 'ja', label: 'JA' },
      ]}
    />
  );

  const themeToggle = (
    <ActionIcon variant="default" size="lg" onClick={() => toggleColorScheme()} aria-label="Toggle theme">
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--mantine-color-default-border)',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <Group h={60} px="md" justify="space-between">
        <Anchor
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('inicio');
          }}
          style={{ textDecoration: 'none' }}
        >
          <Title order={3} style={{ fontFamily: "'Reenie Beanie', cursive", fontSize: 34 }}>
            ip.
          </Title>
        </Anchor>

        <Group gap="md" visibleFrom="sm">
          {SECTIONS.map((s) => (
            <Anchor
              key={s.id}
              c="dimmed"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id);
              }}
            >
              {t(s.key)}
            </Anchor>
          ))}
          {langSwitch}
          {themeToggle}
        </Group>

        <Group gap="sm" hiddenFrom="sm">
          {langSwitch}
          {themeToggle}
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" />
        </Group>
      </Group>

      <Drawer opened={opened} onClose={() => setOpened(false)} position="top" size="auto">
        <Stack gap="md">
          {SECTIONS.map((s) => (
            <Anchor key={s.id} fz="xl" onClick={() => scrollToSection(s.id)}>
              {t(s.key)}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
