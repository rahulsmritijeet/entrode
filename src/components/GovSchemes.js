'use client';

const schemes = [
  {
    name: 'Startup India',
    description: 'Tax reliefs, faster IPR, easier compliance for DPIIT-recognized startups.',
    link: 'https://www.startupindia.gov.in',
    funding: 'Up to ₹10 Cr',
    tag: 'Central'
  },
  {
    name: 'MUDRA Yojana',
    description: 'Collateral-free loans to micro and small businesses across sectors.',
    link: 'https://www.mudra.org.in',
    funding: 'Up to ₹10 Lakh',
    tag: 'MSME'
  },
  {
    name: 'Atal Innovation Mission',
    description: 'Incubation, mentorship, and grants through the national innovation network.',
    link: 'https://aim.gov.in',
    funding: 'Grant up to ₹10 Cr',
    tag: 'Innovation'
  },
  {
    name: 'SAMRIDH Scheme',
    description: 'Accelerator support for product startups with matched funding.',
    link: 'https://samridh.gov.in',
    funding: 'Up to ₹40 Lakh',
    tag: 'Accelerator'
  },
  {
    name: 'ASPIRE',
    description: 'Support for rural entrepreneurship and agri-business incubation.',
    link: 'https://aspire.msme.gov.in',
    funding: 'Up to ₹1 Cr',
    tag: 'Rural'
  },
  {
    name: 'Stand-Up India',
    description: 'Loans for women and SC/ST entrepreneurs for greenfield enterprises.',
    link: 'https://www.standupmitra.in',
    funding: '₹10 Lakh – ₹1 Cr',
    tag: 'Inclusion'
  }
];

export default function GovSchemes() {
  return (
    <section className="schemes">
      <div className="container-main">
        <div className="schemes-header">
          <h2 className="schemes-title gradient-text">Government Programmes</h2>
          <p className="schemes-sub">Curated support to build, launch, and scale with India’s policy backbone</p>
        </div>

        <div className="scheme-grid">
          {schemes.map((s, i) => (
            <div key={i} className="scheme-card hover-target">
              <div className="scheme-head">
                <div className="scheme-brand">
                  <div className="scheme-icon">{s.name.slice(0,1)}</div>
                  <div className="scheme-name">{s.name}</div>
                </div>
                <span className="scheme-pill">{s.tag}</span>
              </div>

              <div className="scheme-body">{s.description}</div>
              <div className="scheme-rows">
                <div className="scheme-row">
                  <span>Support</span>
                  <b>{s.funding}</b>
                </div>
              </div>

              <div className="scheme-divider" />
              <div className="scheme-meta">
                <div className="scheme-amount">{s.funding}</div>
                <a href={s.link} target="_blank" rel="noreferrer" className="scheme-cta">Learn More</a>
              </div>

              <div className="scheme-hover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
