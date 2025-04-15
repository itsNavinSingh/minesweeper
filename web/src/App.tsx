import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRoutePath } from "./constants/routepath";

const App: React.FC = () => {
  const routes = createBrowserRouter(MainRoutePath);
  return (
    <RouterProvider router={routes} />
  );
}
export default App;