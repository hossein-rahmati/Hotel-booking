import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelsContext = createContext();

export default function HotelsProvider({ chidlren }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {chidlren}
    </HotelsContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelsContext);
}
