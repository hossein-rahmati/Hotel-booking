import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext();
const BASE_URL = "http://localhost:5000";
const INITIAL_STATE = {
  bookmarks: [],
  currentBookmark: {},
  isLoading: false,
  error: null,
};

const bookmarkReducer = (state, { type, payload }) => {
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, payload],
      };
    case "bookmarks/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default: {
      throw new Error("Unexpected action");
    }
  }
};

function BookmarkListProvider({ children }) {
  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({
          type: "rejected",
          payload: "An error occurred in loading bookmarks",
        });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "An error occurred in fetching single bookmark",
      });
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "An error occurred in creating new bookmark",
      });
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmarks/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: "rejected",
        payload: "An error occurred in deleting bookmark",
      });
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
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
