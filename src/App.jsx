import { Outlet } from "react-router-dom"
import Header from "./components/layout/header"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/context/auth.context"
import axios from "./util/axios.customize";
import { Spin } from "antd";
import Footer from "./components/layout/footer";


function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {

    const fetchAccount = async () => {
      setAppLoading(true);
      const res = await axios.get(`/v1/api/account`);
      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
            address: res.address,
            role: res.role
          }
        })
      }
      setAppLoading(false);
    }
    fetchAccount();
  }, [])

  return (
    <div>
      {
        appLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}>
            <Spin />

          </div>
          :
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
      }
    </div>
  )
}

export default App
