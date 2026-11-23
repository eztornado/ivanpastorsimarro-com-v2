import { Card, Group, Stack, Text } from '@mantine/core';
import type { Social } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export function SocialCard({ social }: { social: Social }) {
  return (
    <Card
      component="a"
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Group wrap="nowrap" gap="md">
        <SocialIcon id={social.id} size={28} />
        <Stack gap={0}>
          <Text fw={600}>{social.label}</Text>
          <Text c="dimmed" fz="sm">{social.handle}</Text>
        </Stack>
      </Group>
    </Card>
  );
}
