import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { AdminLayout } from "../layout/AdminLayout";
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
import { Orders } from "../pages/user/Orders";
import { ProfilePage } from "../pages/user/ProfilePage";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { UserLoginPage } from "../pages/user/UserLoginPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { EditRestaurant } from "../pages/admin/EditRestaurant";
import { EditMenu } from "../pages/admin/EditMenu";
import { OrderDetails } from "../pages/user/OrderDetails";
import Cart from "../pages/user/Cart";
import PaymentCheckout from "../pages/user/PaymentCheckout";
import AddressPage from "../pages/user/AddressPage";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentCancel from "../pages/user/PaymentCancel";



export const router = createBrowserRouter(
  [
    // User Layout
    {
      path: "",
      element: <UserLayout />,
      errorElement: <ErrorPage />,
      children: [
        // Public routes
        { path: "/", element: <Home /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/login", element: <UserLoginPage /> },
        { path: "/about", element: <About /> },
        { path: "/restaurants", element: <Restaurants /> },
        { path: "/menu", element: <Menu /> },
        { path: "/restaurant/:id", element: <RestaurantDetails /> },
        { path: "/menu/:menuId", element: <MenuItem /> },
      

        // Protected user routes
        {
          path: "/user",
          element: <ProtectRoute />,
          children: [
            { path: "profile", element: <ProfilePage /> },
            { path: "orders", element: <Orders /> },
            { path: "orderDetails/:id", element: <OrderDetails /> },
            { path: "address", element: <AddressPage /> },
            { path: "cart", element: <Cart /> },
            { path: "payment",element: <PaymentCheckout />},
            { path: "payment/success",element: <PaymentSuccess />},
            { path: "payment/cancel",element: <PaymentCancel />},
            { path: "review", element: <Review /> },
          ],
        },
      ],
    },

    // Admin Layout
    {
      path: "",
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        // Public admin routes
        { path: "/admin/signup", element: <SignupPage /> },
        { path: "/admin/login", element: <AdminLoginPage /> },

        // Protected admin routes
        {
          path: "/admin",
          element: <ProtectRoute />,
          children: [
            { path: "profile", element: <AdminProfile /> },
            { path: "restaurants", element: <EditRestaurant /> },
            { path: "menu", element: <EditMenu /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true, // Opt into v7 behavior
    },
  }
);
