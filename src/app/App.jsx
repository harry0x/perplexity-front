import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import routes from "./app.routes";
import { useAuth } from "../features/auth/hook/useAuth";

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handleGetMe();
  }, []);

  return <RouterProvider router={routes} />;
};

export default App;
