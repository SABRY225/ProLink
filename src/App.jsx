
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './Redux/Story';
import {LayoutAPP,LayoutAuth,JustFirst} from "./Layout/index";
import {  SignUp } from './Components/Auth/index';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Home from './Components/Home/Home.jsx';
import {BackImage, ExplorPages, InfoUser, Profile,Setting, UserImage,Friends, Messages, Notification, Default,Otp,ForgotPassword,ResetPassword, NewPasswordRouter, CVProfile, JobPages, Explor} from './Components/ImportFile/index.jsx';
import HomePages from './Pages/HomePages.jsx';



const routers = createBrowserRouter([
  {
    path: "/",
    element: <JustFirst />,
    children: [
      { index: true, element: <SignUp /> },
      { path: "signin", element: <SignUp /> },
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
      { path: "/", element: <HomePages /> ,children:[
        {path:"home",element:<Home />,children:[
          {index:true,element:<Default />},
          { path: "explor", element: <ExplorPages />,children:[
            { index:true, element: <Explor />}
          ]},
          { path: "friend", element: <Friends />},
          { path: "message", element: <Messages />},
          { path: "notification", element: <Notification /> },
          { path: "Jobs", element: <JobPages /> }
        ]},
        {
          path: "profile/:id", element: <Profile />
        },
        {path: "profileAccount/:id", element: <Profile />},
        { path: "ProfileUser", element: <Profile/>},
        {path:"setting",element:<Setting />,children:[
          {path:"UserImage",element:<UserImage />},
          {index:true,element:<InfoUser />},
          {path:"BackImage",element:<BackImage />},
          {path:"CV_Profile",element:<CVProfile />},
          {path:"NewPasswordRouter",element:<NewPasswordRouter />},
          
        ]},
        
      ],},

      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      // { path: "signin", element: <SignUp /> },
      { path: "signup", element: <SignUp /> },
      { path: "verify-otp", element: <Otp /> },
      { path: "forgot-password", element: <ForgotPassword />},
      { path:  "new-password",element:<ResetPassword />},
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
