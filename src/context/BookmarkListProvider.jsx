import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [bookmarks, setBookmarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    setIsLoading(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        currentBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
export default BookmarkListProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
