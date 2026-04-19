import manifest from '../../public-graph.manifest.json';

type Boundary = 'public' | 'local_first' | 'landing_only';
type SiteId =
  | 'homepage'
  | 'scportal'
  | 'liora_benchmarks'
  | 'mrna_intersection'
  | 'iaode_pages'
  | 'iaode_workspace'
  | 'mccvae';

type PublicGraphSite = {
  id: SiteId;
  name: string;
  canonical_url: string;
  role: string;
  boundary: Boundary;
};

type PublicGraphManifest = {
  sites: PublicGraphSite[];
};

export type ExternalGraphLink = {
  id: SiteId;
  name: string;
  href: string;
  role: string;
};

const graph = manifest as PublicGraphManifest;
const siteById = new Map(graph.sites.map((site) => [site.id, site]));

const ensure = <T,>(value: T | undefined, message: string): T => {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
};

const resolvePublicSite = (id: SiteId): ExternalGraphLink => {
  const site = ensure(siteById.get(id), `Missing public graph site: ${id}.`);

  if (site.boundary !== 'public') {
    throw new Error(`Public graph site ${id} is not a public-boundary destination.`);
  }

  return {
    id,
    name: site.name,
    href: site.canonical_url,
    role: site.role,
  };
};

export const homepageLink = resolvePublicSite('homepage');
export const scportalLink = resolvePublicSite('scportal');
export const lioraBenchmarksLink = resolvePublicSite('liora_benchmarks');
export const relatedPublicToolLinks = [
  resolvePublicSite('mrna_intersection'),
  resolvePublicSite('iaode_pages'),
];

export const externalShellLinks = [scportalLink, homepageLink];
