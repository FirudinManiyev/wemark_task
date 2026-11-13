const navigation = ["About", "Services", "Case Studies", "Career", "Blog", "xSchool"];

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Site header">
      <div className="site-header__logo" aria-label="Wemark">wemark</div>
      <nav className="site-header__navigation" aria-label="Main navigation">
        {navigation.map((item) => <span key={item}>{item}</span>)}
      </nav>
      <span className="site-header__talk">Let’s Talk</span>
      <span className="site-header__menu">Menu</span>
    </header>
  );
}
