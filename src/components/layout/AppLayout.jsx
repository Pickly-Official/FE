import Header from "../common/Header";
import BottomNav from "./BottomNav";

function AppLayout({
  children,
  showHeader = true,
  showBottomNav = true,
  headerTitle = "Pickly",
  showBack = false,
  rightContent,
}) {
  return (
    <div className="app-layout">
      <div className="app-container">
        {showHeader && (
          <Header title={headerTitle} showBack={showBack} rightContent={rightContent} />
        )}

        <main
          className={[
            "app-main",
            showHeader ? "has-header" : "",
            showBottomNav ? "has-bottom-nav" : "",
          ].join(" ")}
        >
          {children}
        </main>

        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}

export default AppLayout;