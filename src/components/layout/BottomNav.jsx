import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

const navItems = [
  {
    path: ROUTES.HOME,
    label: "홈",
    icon: "⌂",
  },
  {
    path: ROUTES.CREATE,
    label: "만들기",
    icon: "+",
  },
  {
    path: ROUTES.MYPAGE,
    label: "마이",
    icon: "○",
  },
];

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "bottom-nav-item bottom-nav-item-active" : "bottom-nav-item"
          }
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;