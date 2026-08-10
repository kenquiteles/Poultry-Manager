import { NavLink } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import styles from "./Topbar.module.css";

const Topbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <div className={styles.dashboardBox}>
        <NavLink to="/dashboard"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg><span className={styles.navText}> Dashboard</span></NavLink>
      </div>

      <div className={styles.poultryBox}>
        <NavLink to="/poultry"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m334-80-74-30 58-141q-106-28-172-114T80-560v-160q0-66 47-113t113-47q22 0 42 7.5t40 15.5l238 97-160 60v60l440 280 40 200h-80l-40-80H560v160h-80v-160h-80L334-80Zm66-240h353l-63-40H400q-66 0-113-47t-47-113h80q0 33 23.5 56.5T400-440h165L320-596v-124q0-33-23.5-56.5T240-800q-33 0-56.5 23.5T160-720v160q0 100 70 170t170 70ZM211.5-691.5Q200-703 200-720t11.5-28.5Q223-760 240-760t28.5 11.5Q280-737 280-720t-11.5 28.5Q257-680 240-680t-28.5-11.5ZM400-360Z" /></svg><span className={styles.navText}> Poultry</span></NavLink>
      </div>

      <div className={styles.inventoryBox}>
        <NavLink to="/inventory"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" /></svg><span className={styles.navText}> Inventory</span></NavLink>
      </div>

      {user?.role === 'owner' && (
        <div className={styles.financeBox}>
          <NavLink to="/finance"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z" /></svg><span className={styles.navText}> Finance</span></NavLink>
        </div>
      )}

      <div className={styles.productionBox}>
        <NavLink to="/production"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M281.5-201.5Q200-283 200-400q0-77 25.5-155t66-141.5Q332-760 382-800t98-40q49 0 98.5 40t90 103.5Q709-633 734.5-555T760-400q0 117-81.5 198.5T480-120q-117 0-198.5-81.5Zm340-57Q680-317 680-400q0-57-19.5-120t-49-116.5Q582-690 547-725t-66.5-35q-31.5 0-67 35t-65 88.5Q319-583 299.5-520T280-400q0 83 58.5 141.5T480-200q83 0 141.5-58.5ZM520-240q17 0 28.5-11.5T560-280q0-17-11.5-28.5T520-320q-50 0-85-35t-35-85q0-17-11.5-28.5T360-480q-17 0-28.5 11.5T320-440q0 83 58.5 141.5T520-240Zm-40-240Z" /></svg><span className={styles.navText}> Production</span></NavLink>
      </div>

      <button onClick={logout} className={styles.logoutBtn}> Logout </button>
    </nav>
  );
}

export default Topbar