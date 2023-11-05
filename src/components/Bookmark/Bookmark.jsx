import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarkListProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarks();

  const handleDeleteBookmark = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>There is no bookmarked location yet.</p>;

  return (
    <div>
      <h2>Bookmark list</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button>
                  <HiTrash
                    onClick={(e) => handleDeleteBookmark(e, item.id)}
                    className="trash"
                  />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
