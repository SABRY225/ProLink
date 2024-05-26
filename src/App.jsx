
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
import {LayoutAPP,LayoutAuth,JustFirst} from "./Layout/index";
import {  SignIn,SignUp } from './Components/Auth/index';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Home from './Components/Home/Home.jsx';
import {Profile,Setting} from './Components/ImportFile/index.jsx';
import HomePages from './Pages/HomePages.jsx';


const routers = createBrowserRouter([
  {
    path: "/",
    element: <JustFirst />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "signin", element: <SignIn /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LayoutAPP />
      </ProtectedRoutes>
    ),
    children: [
      { path: "home", element: <HomePages /> ,children:[
        {index:true,element:<Home />},
        {path:"profile",element:<Profile />},
        {path:"setting",element:<Setting />}
      ],},
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={routers} />
    </Provider>
  );
}

export default App;