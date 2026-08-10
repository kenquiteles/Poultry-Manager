import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar.jsx";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.topBar}>
      <Topbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout