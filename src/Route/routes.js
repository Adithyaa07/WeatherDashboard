import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/credentials/SignIn.js";
import SignUp from "../components/credentials/SignUp.js";
import Main from "../components/Dashboard/Main.js";
import Farming from "../components/Dashboard/More/Farming.js";
import Planners from "../components/Dashboard/More/Planners.js";
import Travellers from "../components/Dashboard/More/Travellers.js";

export const HOME = "/";
export const SIGNUP = "/signup";
export const MAIN = "/main";
const router = createBrowserRouter([
  { path: HOME, element: <SignIn /> },
  { path: SIGNUP, element: <SignUp /> },
  { path: MAIN, element: <Main /> },
  { path: "/main/farming", element: <Farming /> },
  { path: "/main/planners", element: <Planners /> },
  { path: "/main/travellers", element: <Travellers /> },
]);

export default router;
