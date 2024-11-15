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
import { SignupPage } from "../pages/shared/SignupPage";
import { ProtectRoute } from "./ProtectRoute";
import { Restaurants } from "../pages/user/Restaurants";
import Cart from "../pages/user/Cart";
import OrderDetails from "../pages/user/OrderDetails";
import { Orders } from "../pages/user/Orders";
import { PaymentSuccess } from "../pages/user/PaymentSuccess";
import { AdminLayout } from "../layout/AdminLayout";
import { ProfilePage } from "../pages/user/ProfilePage";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { UserLoginPage } from "../pages/user/UserLoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { EditRestaurant } from "../pages/admin/EditRestaurant";
import { EditMenu } from "../pages/admin/EditMenu";


export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <UserLoginPage /> },
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/restaurants", element: <Restaurants /> },
      { path: "/menu", element: <Menu /> },
      { path: "/restaurant/:id", element: <RestaurantDetails /> },
      { path: "/menu/:id", element: <MenuItem /> },
      {
        path: "/user",
        element: <ProtectRoute />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "orders", element: <Orders /> },
          { path: "orderDetails/:id", element: <OrderDetails /> },
          { path: "payment/success", element: <PaymentSuccess /> },
          { path: "payment/cancel", element: <Cart /> },
          { path: "cart", element: <Cart /> },
          { path: "review", element: <Review /> },
        ],
      },
    ],
  },
  {
    path:"",
    element:<AdminLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"/admin/signup",
        element:<SignupPage />
      },
      {
        path:"/admin/login",
        element:<AdminLoginPage />
      },
      {
        path:"/admin",
        element:<ProtectRoute />,
        children:[
          {
            path:"profile",
            element:<AdminProfile />
          },
          {
            path:"restaurants",
            element:<EditRestaurant />
          },
          {
            path:"menu",
            element:<EditMenu />
          },
        ]
      }
    ]
  },
],{
  future: {
    v7_skipActionErrorRevalidation: true, // Opt into v7 behavior
  }
});
