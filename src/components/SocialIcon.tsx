import { IconBrandGithub, IconBrandLinkedin, IconBrandSpotify, IconBrandX } from '@tabler/icons-react';
import type { Social } from '../data/socials';

const ICONS = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  spotify: IconBrandSpotify,
  x: IconBrandX,
} as const;

export function SocialIcon({ id, size = 20 }: { id: Social['id']; size?: number }) {
  const Icon = ICONS[id];
  return <Icon size={size} stroke={1.5} />;
}
