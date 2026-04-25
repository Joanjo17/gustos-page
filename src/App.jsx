import { Routes, Route } from "react-router";
import { Home } from "./page/Home";
import { NotFoundPage } from "./page/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
