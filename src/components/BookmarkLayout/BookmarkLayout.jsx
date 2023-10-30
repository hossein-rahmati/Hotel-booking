import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../../context/BookmarkListProvider";

export default function BookmarkLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}
