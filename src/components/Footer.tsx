import { Anchor, Box, Container, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { socials } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box component="footer" mt="xl" className="glass-footer">
      <Container size="lg" py="xl">
        <Group justify="space-between" wrap="wrap">
          <Text c="dimmed" fz="sm">
            © {new Date().getFullYear()} Iván Pastor Simarro
          </Text>
          <Group gap="sm">
            {socials.map((s) => (
              <Anchor
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                c="dimmed"
              >
                <SocialIcon id={s.id} size={20} />
              </Anchor>
            ))}
          </Group>
          <Text c="dimmed" fz="sm">{t('footer.made')}</Text>
        </Group>
      </Container>
    </Box>
  );
}
