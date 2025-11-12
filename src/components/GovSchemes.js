'use client';

const schemes = [
  {
    name: 'Startup India',
    description: 'Tax benefits, easier compliance, IPR fast-tracking',
    link: 'https://www.startupindia.gov.in',
    funding: 'Up to ₹10 Cr'
  },
  {
    name: 'MUDRA Yojana',
    description: 'Collateral-free loans for micro enterprises',
    link: 'https://www.mudra.org.in',
    funding: 'Up to ₹10 Lakh'
  },
  {
    name: 'Atal Innovation Mission',
    description: 'Incubation support and mentorship',
    link: 'https://aim.gov.in',
    funding: 'Grant up to ₹10 Cr'
  },
  {
    name: 'SAMRIDH Scheme',
    description: 'Accelerator for product startups',
    link: 'https://samridh.in',
    funding: 'Up to ₹40 Lakh'
  },
  {
    name: 'ASPIRE',
    description: 'Rural entrepreneurship and agri-business',
    link: 'https://aspire.msme.gov.in',
    funding: 'Up to ₹1 Cr'
  },
  {
    name: 'Stand-Up India',
    description: 'For women and SC/ST entrepreneurs',
    link: 'https://www.standupmitra.in',
    funding: '₹10 Lakh to ₹1 Cr'
  }
];

export default function GovSchemes() {
  return (
    <section className="py-20">
      <div className="container-main">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Government Support Programmes
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, idx) => (
            <div key={idx} className="scheme-card">
              <h3 className="text-xl font-bold mb-2 theme-accent">
                {scheme.name}
              </h3>
              <p className="theme-text-secondary mb-4 text-sm">
                {scheme.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">
                  {scheme.funding}
                </span>
                <a 
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm theme-accent hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}