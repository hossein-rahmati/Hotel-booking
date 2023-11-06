import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarkListProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, currentBookmark, isLoading } = useBookmarks();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <div className="singleBookmark">
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;{" "}
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
