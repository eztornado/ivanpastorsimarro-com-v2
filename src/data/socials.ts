export interface Social {
  id: 'github' | 'linkedin' | 'spotify' | 'x';
  label: string;
  url: string;
  handle: string;
}

export const socials: Social[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/eztornado',
    handle: '@eztornado',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/iv%C3%A1n-pastor-simarro-9b115a113/',
    handle: 'Iván Pastor Simarro',
  },
  {
    id: 'spotify',
    label: 'Spotify',
    url: 'https://open.spotify.com/user/eztornado',
    handle: 'eztornado',
  },
  {
    id: 'x',
    label: 'X / Twitter',
    url: 'https://twitter.com/eztornado_',
    handle: '@eztornado_',
  },
];
