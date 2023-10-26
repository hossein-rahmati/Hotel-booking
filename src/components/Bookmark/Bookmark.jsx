import Map from "../Map/Map";

export default function Bookmark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        {/* <Outlet /> */}
        <div>bookmark list</div>
      </div>
      <Map markerLocations={[]} />
    </div>
  );
}
