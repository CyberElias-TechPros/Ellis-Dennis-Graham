export function getPublishableArtifacts(project) {
  const artifacts = project?.proof?.artifacts;
  if (!Array.isArray(artifacts)) return [];
  return artifacts.filter((artifact) => artifact?.verifiedByOwner === true && artifact?.safeToPublish === true);
}

export function safeEvidenceHref(value) {
  if (typeof value !== 'string') return null;
  const href = value.trim();
  if (!href || href.startsWith('//') || href.includes('\\')) return null;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  try {
    const parsed = new URL(href);
    return parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}
