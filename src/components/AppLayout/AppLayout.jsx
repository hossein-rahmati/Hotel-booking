import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="appLayout">
      <div className="sideBar">
        <Outlet />
      </div>
      <div className="mapContainer">map</div>
    </div>
  );
}

export default AppLayout;
