import Header from "./Components/menu";
import { Route, Routes, useLocation } from "react-router-dom";
import Maze from "./Components/maze";
import Rules from "./Components/rules";
import { useEffect, useState } from "react";
import RouteIndex from "./routesIndex";

function App() {
  let location = useLocation();
  const [currPage, setCurrPage] = useState("");
  useEffect(() => {
    RouteIndex.map((route) => {
      if (route.href == location.pathname) {
        setCurrPage(route.name);
      }
    });
  }, [location]);

  return (
    <>
      <Header></Header>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{currPage}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <Routes>
            <Route path="/" element={<Maze />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="*" element={<p>There's nothing here! Shoo Shoo</p>} />
          </Routes>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}

export default App;
