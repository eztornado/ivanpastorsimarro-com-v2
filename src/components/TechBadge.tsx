import { Badge } from '@mantine/core';

export function TechBadge({ label }: { label: string }) {
  return <Badge variant="light" color="accent">{label}</Badge>;
}
