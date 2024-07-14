import Dashboard from "../pages/Dashboard/Index";
import LayoutTopMenu from "../components/layout/LayoutTopMenu";
import PostImage from "../pages/PostImage/Index"

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    Function_name: "Trang chủ",
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    pageLayout: LayoutTopMenu,
    pageContent: { component: Dashboard },
  },
  {
    Function_Id: "DASHBOARD",
    Function_name: "Trang chủ",
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/tim-anh",
    pageLayout: LayoutTopMenu,
    pageContent: { component: PostImage },
  }
];
