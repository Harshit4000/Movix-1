import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getUrl } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/Details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const url = useSelector(getUrl);

  useEffect(
    function () {
      const fetchApiConfig = async () => {
        const res = await fetchDataFromApi("/configuration");

        const url = {
          backdrop: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      };

      fetchApiConfig();
    },
    [dispatch]
  );

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/Search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
