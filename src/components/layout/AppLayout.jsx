function AppLayout({ children, showHeader = true, showBottomNav = true }) {
  return (
    <div className="app-layout">
      <div className="app-container">
        {showHeader && <div className="app-header-space" />}

        <main className="app-main">{children}</main>

        {showBottomNav && <div className="app-bottom-space" />}
      </div>
    </div>
  );
}

export default AppLayout;