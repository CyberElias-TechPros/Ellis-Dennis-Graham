import { Icon } from './Icons.jsx';
import { getPublishableArtifacts, safeEvidenceHref } from '../evidence.js';

function artifactLink(artifact, compact = false) {
  const href = safeEvidenceHref(artifact.url);
  if (!href) return <span className="evidence-artifact-unlinked">{compact ? 'Summary only' : 'No public link attached'}</span>;
  const external = href.startsWith('https://');
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{compact ? 'View evidence' : 'Open artifact'} <Icon name="ArrowUpRight" size={14} /></a>;
}

export default function ProjectEvidenceLedger({ project }) {
  const proof = project.proof || {};
  const claims = Array.isArray(proof.claims) ? proof.claims : [];
  const withheld = proof.disclosureStatus === 'withheld';
  const visibleClaims = withheld ? [] : claims;
  const artifacts = withheld ? [] : getPublishableArtifacts(project);
  const artifactById = new Map(artifacts.map((artifact) => [artifact.id, artifact]));
  const verified = proof.ownerVerified === true;

  return (
    <section className="project-evidence-ledger" aria-labelledby={`${project.slug}-evidence-heading`}>
      <div className="project-evidence-ledger-head">
        <div>
          <span className="micro-label">04 / CLAIMS &amp; EVIDENCE</span>
          <h2 id={`${project.slug}-evidence-heading`}>Proof travels with the claim.</h2>
          <p>Only artifacts explicitly marked owner-verified and safe to publish appear in this record.</p>
        </div>
        <span className={`project-proof-status ${verified ? 'project-proof-status--verified' : ''}`}>
          <Icon name={verified ? 'BadgeCheck' : 'CircleDashed'} size={15} />
          {verified ? 'OWNER-VERIFIED RECORD' : 'OWNER REVIEW REQUIRED'}
        </span>
      </div>

      {artifacts.length > 0 ? (
        <div className="project-evidence-artifacts" aria-label="Published evidence artifacts">
          {artifacts.map((artifact) => (
            <article className="project-evidence-artifact" key={artifact.id}>
              <span className="project-evidence-artifact-icon"><Icon name="FileText" size={17} /></span>
              <div>
                <span className="micro-label">{artifact.status ? artifact.status.replaceAll('-', ' ').toUpperCase() : 'OWNER-VERIFIED EVIDENCE'}</span>
                <h3>{artifact.label}</h3>
                {artifact.summary && <p>{artifact.summary}</p>}
              </div>
              {artifactLink(artifact)}
            </article>
          ))}
        </div>
      ) : (
        <div className={`project-evidence-empty ${withheld ? 'project-evidence-empty--withheld' : ''}`}>
          <span className="project-evidence-empty-icon"><Icon name={withheld ? 'LockKeyhole' : 'FileLock2'} size={19} /></span>
          <div>
            <strong>{withheld ? 'Evidence intentionally withheld' : 'No owner-verified evidence attached'}</strong>
            <p>{withheld
              ? 'Sensitive claim details and source artifacts are suppressed here. Only an owner-approved, safe-to-share summary can be published.'
              : 'This profile is in progress. Project status, personal contribution, scope, and outcomes remain unverified until evidence is reviewed.'}</p>
            {!withheld && proof.disclosureStatus !== 'approved' && <span className="project-disclosure-note"><Icon name="Info" size={13} /> Sharing classification has not been confirmed.</span>}
          </div>
        </div>
      )}

      {visibleClaims.length > 0 && (
        <div className="project-proof-claims">
          <div className="project-proof-claims-heading">
            <div><span className="micro-label">CLAIM REGISTER</span><h3>What the record needs to substantiate.</h3></div>
            <span>{visibleClaims.filter((claim) => claim.verifiedByOwner === true).length} / {visibleClaims.length} verified</span>
          </div>
          <ul>
            {visibleClaims.map((claim) => {
              const evidenceIds = Array.isArray(claim.evidenceIds) ? claim.evidenceIds : [];
              const claimEvidence = evidenceIds.map((id) => artifactById.get(id)).filter(Boolean);
              const claimVerified = claim.verifiedByOwner === true;
              return (
                <li className="project-proof-claim" key={claim.id}>
                  <span className={`project-proof-claim-icon ${claimVerified ? 'project-proof-claim-icon--verified' : ''}`}><Icon name={claimVerified ? 'BadgeCheck' : 'CircleDashed'} size={16} /></span>
                  <div className="project-proof-claim-body">
                    <strong>{claim.label}</strong>
                    <p>{claimVerified && claim.statement ? claim.statement : 'Details await owner verification before publication.'}</p>
                    <div className="project-proof-claim-evidence">
                      {claimEvidence.length > 0
                        ? claimEvidence.map((artifact) => <span key={artifact.id}>{artifactLink(artifact, true)}</span>)
                        : <span className="evidence-artifact-unlinked">No public evidence linked</span>}
                    </div>
                  </div>
                  <span className={`project-proof-claim-status ${claimVerified ? 'project-proof-claim-status--verified' : ''}`}>{claimVerified ? 'Verified' : 'Needs review'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
