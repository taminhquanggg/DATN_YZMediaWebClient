import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RoutersConfig } from "./routes/RoutesConfig.jsx";

import { } from "./apiHelper/connection/axiosInterceptors.js";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.css";
import "./index.css";


function App() {

  const getlstRouter = () => {
    let _lstRouters = [];

    RoutersConfig?.map((item, index) => {
      if (item != undefined && item.Function_Id != undefined) {
        _lstRouters.push({
          path: item.Function_Url,
          element: item.pageLayout ? <item.pageLayout {...item.pageContent} /> : <item.pageContent />,
        });
      }
    });

    return _lstRouters ?? [];
  };

  const router = createBrowserRouter(getlstRouter());

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="loader" id="Loader">
        <div className="image-container">
          <div className="image-container-two">{/* <img src={logo} className="image" /> */}</div>
        </div>
      </div>
    </>
  );
}

export default App;
