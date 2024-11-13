import {
    createBrowserRouter,
  } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { ErrorPage } from "../pages/user/ErrorPage";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { RestaurantDetails } from "../pages/user/RestaurantDetails";
import { Menu } from "../pages/user/Menu";
import { MenuItem } from "../pages/user/MenuItem";
import { Review } from "../pages/user/Review";
import { LoginPage } from "../pages/shared/LoginPage";
import { ProtectRoute } from "./ProtectRoute";
import { Restaurants } from "../pages/user/Restaurants";
import { ProfilePage } from "../pages/user/ProfilePage";
import Cart from "../pages/user/Cart";
import { PaymentCancelled } from "../pages/user/PaymentCancelled";
import OrderDetails from "../pages/user/OrderDetails";
import { Orders } from "../pages/user/Orders";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import { SignupPage } from "../pages/shared/SignupPage";
import { AdminLayout } from "../layout/AdminLayout";
import { EditMenu } from "../pages/admin/EditMenu";
import { EditRestaurant } from "../pages/admin/EditRestaurant";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { AdminLogin } from "../pages/admin/AdminLogin";




export const router = createBrowserRouter([
    {
      path: "",
      element:<UserLayout />,
      errorElement:<ErrorPage />,
      children:[
        {
          path:"/signup",
          element: <SignupPage />
        },
        {
          path:"/login",
          element: <LoginPage />
        },
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/about",
          element: <About />
        },
        {
          path:"/restaurants",
          element: <Restaurants />
        },
        {
          path:"/menu",
          element: <Menu />
        },
        {
          path:"/restaurant/:id",
          element: <RestaurantDetails />
        },
        {
          path:"/menu/:id",
          element: <MenuItem />
        },
        {
          path:"/user",
          element: <ProtectRoute />,
          children:[
            {
              path:"profile",
              element:<ProfilePage />
            },
            {
              path:"orders",
              element: <Orders />
            },
            {
              path:"orderDetails/:id",
              element:<OrderDetails />
            },
            {
              path:"payment/success",
              element: <PaymentSuccess />
            },
            {
              path:"payment/cancel",
              element:< PaymentCancelled />
            },
            {
              path:"cart",
              element: <Cart />
            },
            {
              path:"review",
              element:<Review />
            }, 
          ]
        }  
      ]
    },
    {
      path:"",
      element:<AdminLayout />,
      children:[
        {
          path:"/admin/signup",
          element:<SignupPage />
        },
        {
          path:"/admin/login",
          element:<AdminLogin />
        },
        /*{
          path:"/admin",
          element: <ProtectRoute />,
          children:[
            {
              path:"menu",
              element: <EditMenu />
            },
            {
              path:"restaurant",
              element: <EditRestaurant />
            },
            {
              path:"profile",
              element:<AdminProfile />
            },
          ]
        },*/
      ]
    },
  ]
  );  