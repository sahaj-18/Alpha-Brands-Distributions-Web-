import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();
  
  return (
    <div
      className={clsx(sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-filter"}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  About Us
                </Link>
              </li>
            </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
