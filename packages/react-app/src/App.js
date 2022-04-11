import Header from "./Components/menu";
import { Route, Routes } from "react-router-dom";
import Maze from "./Components/maze";
import Rules from "./Components/rules";

function App() {
  return (
    <>
      <Header></Header>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Maze</h1>
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
