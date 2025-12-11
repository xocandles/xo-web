import { useState, useEffect, createContext } from "react";
import "@/styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";
import Head from "next/head";
export const userContext = createContext();
export const cartContext = createContext();
// export const openCartContext = createContext();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  // const [openCart, setOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (router.route === "/") {
      router.replace("/");
    }
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    let cart = localStorage.getItem("addCartDetail");
    if (cart) {
      setCartData(JSON.parse(cart));
    }
    const user = localStorage.getItem("userDetail");
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/icons/logo2.png" type="image/png" sizes="32x32" />
      </Head>

      <ToastContainer />
      <userContext.Provider value={[user, setUser]}>
        {/* <openCartContext.Provider value={[openCart, setOpenCart]}> */}
        <cartContext.Provider value={[cartData, setCartData]}>
          <Layout loader={setOpen} constant={data} toaster={(t) => toast(t.message)}>
            {open && <Loader open={open} />}

            <Component
              toaster={(t) => toast(t.message)}
              {...pageProps}
              loader={setOpen}
              user={user}
            />
          </Layout>
        </cartContext.Provider>
        {/* </openCartContext.Provider> */}
      </userContext.Provider>
    </div>
  )
}
