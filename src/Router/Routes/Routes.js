import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../../Pages/AdminPage/AdminPage";
import AddNewResraurant from "../../Pages/AdminPage/Outlets/AddNewResraurant/AddNewResraurant";
import AllRestaurant from "../../Pages/AdminPage/Outlets/AllRestaurantList/AllRestaurant";
import ApprovedList from "../../Pages/AdminPage/Outlets/ApprovedList/ApprovedList";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";
import EditTableInfo from "../../Pages/RestaurantAdmin/Outlets/EditTableInfo/EditTableInfo";
import LiveTableTracking from "../../Pages/RestaurantAdmin/Outlets/LiveTableTracking/LiveTableTracking";
import MenuEdit from "../../Pages/RestaurantAdmin/Outlets/MenuEdit/MenuEdit";
import MyOrder from "../../Pages/RestaurantAdmin/Outlets/MyOrder/MyOrder";
import MyRestaurant from "../../Pages/RestaurantAdmin/Outlets/MyRestaurant/MyRestaurant";
import RestaurantAdmin from "../../Pages/RestaurantAdmin/RestaurantAdmin";
import ResAdminRoute from "../ResAdminRoute/ResAdminRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "/adminPage",
    element: <AdminPage></AdminPage>,
    children: [
      {
        path: "/adminPage/allRestaurantList",
        element: <AllRestaurant></AllRestaurant>,
      },
      {
        path: "/adminPage/addNewRestaurant",
        element: <AddNewResraurant></AddNewResraurant>,
      },
      {
        path: "/adminPage/approved",
        element: <ApprovedList></ApprovedList>,
      },
    ],
  },
  {
    path: "/restaurantAdmin/",
    element: (
      <ResAdminRoute>
        <RestaurantAdmin></RestaurantAdmin>
      </ResAdminRoute>
    ),
    children: [
      {
        path: "/restaurantAdmin/myRestaurant",
        element: <MyRestaurant></MyRestaurant>,
      },
      {
        path: "/restaurantAdmin/myOrders",
        element: <MyOrder></MyOrder>,
      },
      {
        path: "/restaurantAdmin/menuEdit",
        element: <MenuEdit></MenuEdit>,
      },
      {
        path: "/restaurantAdmin/editTableInfo",
        element: <EditTableInfo></EditTableInfo>,
      },
      {
        path: "/restaurantAdmin/liveTableTracking",
        element: <LiveTableTracking></LiveTableTracking>,
      },
    ],
  },
]);
