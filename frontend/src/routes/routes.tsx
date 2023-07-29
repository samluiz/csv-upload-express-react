import { Route, Routes } from "react-router-dom";
import List from "../pages/list";
import Upload from "../pages/upload";

const AppRoutes = () => {
  return (
  <>
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  </>
  );
}
 
export default AppRoutes;