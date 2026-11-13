const sitemap = ["Case Studies", "Services", "About", "Career", "Blog", "News", "Vacancies"];
const social = ["Instagram", "LinkedIn", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__columns">
        <div>
          <h2>Sitemap</h2>
          {sitemap.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div>
          <h2>Follow Us On</h2>
          {social.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="site-footer__office">
          <h2>Office</h2>
          <p>Alibeyov Gardashlari 27,<br />Sabail, Sabah Residence</p>
        </div>
        <div className="site-footer__partnerships">
          <h2>For Partnerships</h2>
          <p>partnership@wemark.az<br />+994 51 555 55 55</p>
        </div>
        <span className="site-footer__up" aria-hidden="true">↑</span>
      </div>
      <div className="site-footer__wordmark" aria-hidden="true">wemark</div>
      <div className="site-footer__bottom">
        <span>COPYRIGHT © 2024 WEMARK</span>
        <span className="site-footer__terms">TERMS &amp; PRIVACY</span>
        <span className="site-footer__language">◎ &nbsp; AZƏRBAYCAN DİLİ</span>
        <span className="site-footer__back">BACK TO TOP ↑</span>
      </div>
    </footer>
  );
}
