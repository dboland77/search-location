import { useEffect, useReducer, useRef } from "react";
import axios from "axios";

function useFetch(url, options) {
  const cache = useRef({});
  const cancelRequest = useRef(false);

  const initialState = {
    status: "init",
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "request":
        return { ...initialState, status: "fetching" };
      case "success":
        return { ...initialState, status: "fetched", data: action.payload };
      case "failure":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      dispatch({ type: "request" });

      if (cache.current[url]) {
        dispatch({ type: "success", payload: cache.current[url] });
      } else {
        try {
          const response = await axios(url, options);
          cache.current[url] = response.data;

          if (cancelRequest.current) return;

          dispatch({ type: "success", payload: response.data });
        } catch (error) {
          if (cancelRequest.current) return;

          dispatch({ type: "failure", payload: error.message });
        }
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
