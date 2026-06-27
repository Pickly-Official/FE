import Header from "../common/Header";
import BottomNav from "./BottomNav";

function AppLayout({
  children,
  showHeader = true,
  showBottomNav = false,
  headerTitle = "Pickly",
  showBack = false,
  headerRightContent,
}) {
  return (
    <div className="app-layout">
      <div className="app-container">
        {showHeader && (
          <Header title={headerTitle} showBack={showBack} rightContent={headerRightContent} />
        )}

        <main
          className={[
            "app-main",
            showHeader ? "has-header" : "",
            showBottomNav ? "has-bottom-nav" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </main>

        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}

export default AppLayout;