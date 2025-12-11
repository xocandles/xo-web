import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiArrowSortedUp } from "react-icons/ti";
import { useContext } from "react";
import { cartContext, userContext } from "@/pages/_app";
import Swal from "sweetalert2";
import { LuLogIn } from "react-icons/lu";
import { Api } from "@/services/service";
import { FaSortDown } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { Drawer, Typography, IconButton, Button } from '@mui/material';
import { MdNavigateNext } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { FaUserCircle } from "react-icons/fa";

const Navbar = (props) => {
  console.log(props)
  const [navbar, setNavbar] = useState(false);
  const [showHover, setShowHover] = useState(true);
  const [showSub, setShowSub] = useState("");
  const router = useRouter();
  const [user, setUser] = useContext(userContext);
  console.log(user)
  const [services, setServices] = useState([]);
  const [list, setList] = useState([
    { href: "/profile", title: "Profile" },
    { href: "/history", title: "History" },
  ]);
  const [currentCity, setCurrentCity] = useState('');

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [serchData, setSearchData] = useState('')
  const [showCategory, setShowCategory] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const [showCategory1, setShowCategory1] = useState(false);
  const [cartData, setCartData] = useContext(cartContext);

  const closeDrawer1 = async () => {
    setShowCategory1(false);
  }

  const closeDrawer = async () => {
    inputRef1.current.blur();
    setTimeout(() => {
      setShowCategory(false);
    }, 500);
  }

  useEffect(() => {
    getCategory()
  }, [])

  const getproductByCategory = async (text) => {
    let parmas = {}
    let url = `productsearch?key=${text}`

    Api("get", url, "", router, parmas).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setProductsList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getCategory = async () => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        const d = []
        // res.data.forEach(element => {
        //   d.push({
        //     href: `/categories?cat_id=${element._id}`, title: element?.name
        //   })
        // });
        setServices(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };



  const menuItems = [
    {
      href: `/`,
      title: "Home",
      sub: false,
    },
    // {
    //   href: "/categories",
    //   title: "Categories",
    //   sub: true,
    //   list: services,
    // },
    {
      href: "/categories",
      title: "Categories",
      sub: false,
    },
    {
      href: "/about-us",
      title: "About us",
      sub: false,
    },
    {
      href: "/contact",
      title: "Contact us",
      sub: false,
    },
  ];

  useEffect(() => { }, [user])
  console.log(router.pathname);

  const imageOnError = (event) => {
    event.currentTarget.src = '/default-product-image.png';
    // event.currentTarget.className = "error";
  };

  return (
    <div>
      <nav className="flex justify-center flex-col md:h-24 min-h-max h-auto drop-shadow-md bg-white w-full z-50 md:p-0 p-3">
        <div className="flex  max-w-7xl  mx-auto w-full z-50">

          <div className="grid md:grid-cols-2 grid-cols-1 w-full">
            <div className="flex justify-start items-center gap-5">
              <img className="md:h-[60px] h-[40px] md:w-[60px] w-[40px] object-contain md:block hidden cursor-pointer" src="/logo-1.png" onClick={() => { router.push('/') }} />
            </div>

            <div className="flex w-full">
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center gap-5">
                  <img className="md:h-[80px] h-[40px] md:w-[80px] w-[40px] object-contain md:hidden cursor-pointer" src="/logo-1.png" onClick={() => { router.push('/') }} />
                  <img className="md:h-[80px] h-[50px] md:w-[80px] w-[50px] object-contain cursor-pointer" src="/logo.png" onClick={() => { router.push('/') }} />
                </div>
                <div className="flex justify-end items-center gap-5">
                  <div className="relative group md:block hidden">
                    {/* {router.pathname !== '/xoxo-type/[type]' && */}
                    <button className="font-semibold text-[14px] text-black border-2 border-black w-[120px] h-[40px] rounded-[60px]" onClick={() => { setShowHover(true) }}>Shop Now</button>
                    {/* } */}
                    {showHover && (<div className={` lg:absolute top-4 right-0 lg:min-w-[250px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block`}>
                      <div className="bg-black  lg:shadow-inner rounded-md lg:mt-8 shadow-inner">
                        <TiArrowSortedUp
                          className={`group-hover:lg:block lg:hidden h-5 w-5 text-black  absolute top-5 right-0`}
                        />
                        <ul>
                          <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                            <Link
                              href={"/xoxo-type/xo_candles"}
                              onClick={() => {
                                setShowHover(false);
                              }}
                              className="block px-5  py-1  pl-0  text-white text-left font-semibold text-base"
                              aria-current="page"
                            >
                              {("XO Candles")}
                            </Link>
                          </li>

                          <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                            <Link
                              href={"/xoxo-type/xo_Fragrance"}
                              onClick={() => {
                                setShowHover(false);
                              }}
                              className="block px-5 py-1 pl-0 text-white text-left font-semibold text-base"
                              aria-current="page"
                            >
                              {("XO Fragrances")}
                            </Link>
                          </li>


                        </ul>
                      </div>
                    </div>
                    )}
                  </div>
                  <div className="flex justify-start items-center"
                    onClick={() => {
                      setShowCategory(true)
                      setTimeout(() => {
                        inputRef2.current.focus();
                      }, 200);
                    }}>
                    <FiSearch className="w-6 h-6 text-custom-black" />
                    <p type="text" ref={inputRef1}
                      className="flex justify-start items-center"
                    > {serchData}</p>
                  </div>
                  <Badge badgeContent={cartData.length} color="primary">
                    <PiShoppingCartSimpleFill className="w-6 h-6 text-custom-black mr-3" onClick={() => router.push('/cart')} />
                  </Badge>
                  {user?.token && <div className="bg-black text-white  h-[40px] w-[40px] rounded-full  items-center justify-center md:justify-self-end cursor-pointer md:flex hidden relative group"
                    onClick={() => { setShowHover(true) }}
                  >
                    <p className="font-bold text-white text-base	text-center capitalize">
                      {user?.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </p>
                    {showHover && (

                      <div
                        className={` lg:absolute top-4 right-0 lg:min-w-[250px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block`}
                      >
                        <div className="bg-black  lg:shadow-inner rounded-md lg:mt-8 shadow-inner">
                          <TiArrowSortedUp
                            className={`group-hover:lg:block lg:hidden h-5 w-5 text-black  absolute top-5 right-0`}
                          />
                          <ul>

                            <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                              <Link
                                href={"/orders"}
                                onClick={() => {
                                  setShowHover(false);
                                }}
                                className="block px-5 py-1 pl-0 text-white text-left font-semibold text-base"
                                aria-current="page"
                              >
                                {("My orders")}
                              </Link>
                            </li>

                            {/* Profile code */}
                            <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                              <Link
                                href={"/profile"}
                                onClick={() => {
                                  setShowHover(false);
                                }}
                                className="block px-5 py-1 pl-0 text-white text-left font-semibold text-base"
                                aria-current="page"
                              >
                                {("Profile")}
                              </Link>
                            </li>
                             {/* Profile code */}

                            <li className="px-5 shadow-inner feature1  py-2">
                              <div
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "Do you want to signout?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes",
                                    cancelButtonText: "No",
                                  }).then(function (result) {
                                    if (result.isConfirmed) {
                                      setUser({})
                                      setShowHover(false);
                                      localStorage.removeItem(
                                        "userDetail"
                                      );
                                      localStorage.removeItem("token");
                                      router.push('/auth/signIn')
                                    }
                                  })
                                }}

                                className="block px-5 py-1  pl-0 text-white text-left font-semibold text-base"
                                aria-current="page"
                              >
                                {("Sign out")}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>
                  }
                  {!user?.token &&
                    <div className="bg-black text-white  h-[40px] w-[40px] rounded-full md:flex justify-center items-center hidden" onClick={() => { router.push("/auth/signIn") }}>
                      {/* <LuLogIn className="text-white text-xl" /> */}
                      <FaUserCircle className="text-white h-[40px] w-[40px]" />
                    </div>
                  }
                </div>
              </div>

              <div className="lg:hidden flex order-1">
                <button
                  onClick={() => setNavbar(!navbar)}
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden  focus:outline-none focus:ring-2"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6 bg-black"
                    aria-hidden="true"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>
        <div className="flex justify-center  md:h-[35px] min-h-max h-auto drop-shadow-md bg-black w-full -!z-40">
          <div className="flex  max-w-7xl  mx-auto w-full justify-between items-center ">
            <div className="container flex  flex-wrap items-center justify-between mx-auto ">

              <div className="flex justify-between  w-full lg:w-auto lg:order-2 order-4 ">
                <div
                  className={`flex-1 justify-self-center  lg:block pb-0 lg:mt-0 ${navbar ? "block" : "hidden"
                    }`}
                >
                  <ul className="flex lg:items-center flex-col items-start  mt-1  rounded-lg bg-transparent lg:flex-row lg:space-x-12 lg:mt-0 lg:text-sm lg:font-medium lg:border-0  lg:pl-0 pl-3">
                    {menuItems.map((menu, i) => (
                      <li key={i}>
                        {menu?.sub ? (
                          <div className="group relative">
                            <div
                              className="flex md:text-md  font-nunito font-normal  xl:text-lg py-1  pl-0 text-black   md:text-center   relative group items-center"
                              onClick={() => {
                                if (showSub === menu?.title) {
                                  setShowSub("");
                                } else {
                                  setShowSub(menu.title);
                                }
                              }}
                              aria-current="page"
                            >
                              {menu.title === "Account" ? (
                                <>
                                  {props?.user?.token !== undefined && (
                                    <div className="flex justify-center items-center h-10 w-10 bg-black rounded-full mr-5 ">
                                      <p className="text-white">
                                        {props?.user?.username
                                          ?.charAt(0)
                                          .toUpperCase()}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ) : (
                                menu.title
                              )}
                              {<FaSortDown className="text-custom-clientGray ml-2 " />}
                            </div>
                            {menu?.sub && showHover && (
                              <div>
                                <div
                                  className={`lg:absolute top-5 left-0 lg:min-w-[300px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block z-50 ${showSub === menu?.title
                                    ? "group-hover:block hover:block"
                                    : "group-hover:hidden hover:hidden"
                                    }`}
                                >
                                  <div className="bg-black py-0 lg:shadow-inner z-10 rounded-md lg:mt-8">
                                    {menu.title === 'Account' && <ul>
                                      {menu?.list?.map((item) => (
                                        <li key={item?.title}>
                                          {item?.title === "Signout" ? (
                                            <div
                                              onClick={() => {
                                                Swal.fire({
                                                  title: "Are you sure?",
                                                  text: "Do you want to signout?",
                                                  icon: "warning",
                                                  showCancelButton: true,
                                                  cancelButtonColor: "#d33",
                                                  confirmButtonText: "Yes",
                                                  cancelButtonText: "No",
                                                }).then(function (result) {
                                                  if (result.isConfirmed) {
                                                    setNavbar(!navbar);
                                                    props.setUser({});
                                                    setShowHover(false);
                                                    setTimeout(() => {
                                                      setShowHover(true);
                                                    }, 1000);
                                                    localStorage.removeItem(
                                                      "userDetail"
                                                    );
                                                    localStorage.removeItem("token");
                                                    router.push('/')
                                                  }
                                                })
                                              }}
                                              className="block font-nunito font-semibold hover:font-bold md:text-md cursor-pointer  text-lg py-1  pl-0  text-black   text-left "
                                            >
                                              {item.title}
                                            </div>
                                          ) : (
                                            <Link
                                              href={item?.href}
                                              onClick={() => {
                                                setNavbar(!navbar);
                                                setShowHover(false);
                                                setTimeout(() => {
                                                  setShowHover(true);
                                                }, 1000);
                                              }}
                                              className="block font-nunito font-semibold hover:font-bold md:text-md  text-lg py-1  pl-0  text-black   text-left"
                                              aria-current="page"
                                            >
                                              {item.title}
                                            </Link>
                                          )}
                                        </li>
                                      ))}
                                    </ul>}
                                    {menu.title === 'Categories' && <ul>
                                      {menu?.list?.map((item) => (
                                        <li key={item?.title} className="border-b-2 border-white px-5">
                                          <Link
                                            href={item?.href}
                                            onClick={() => {
                                              setNavbar(!navbar);
                                              setShowHover(false);
                                              setTimeout(() => {
                                                setShowHover(true);
                                              }, 1000);
                                            }}
                                            className="block font-nunito font-semibold hover:font-bold md:text-md  text-base md:py-3 py-1  pl-0  text-white   text-left"
                                            aria-current="page"
                                          >
                                            {item.title}

                                          </Link>

                                        </li>
                                      ))}
                                    </ul>}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {menu.title !== 'Categories' && <Link
                              href={menu.href}
                              onClick={() => setNavbar(!navbar)}
                              className="block text-md font-nunito font-normal xl:text-base py-1  pl-0  text-white   md:text-center"
                              aria-current="page"
                            >
                              {menu.title}
                            </Link>}
                            {menu.title === 'Categories' && <div
                              onClick={() => { setNavbar(!navbar); setShowCategory1(true) }}
                              className="block text-md font-nunito font-normal xl:text-base py-1  pl-0  text-white   md:text-center cursor-pointer"
                              aria-current="page"
                            >
                              Categories
                            </div>}
                          </>
                        )}
                      </li>
                    ))}

                    <ul className="md:hidden">
                      <li className="shadow-inner feature1">
                        <Link
                          href={"/xoxo-type/xo_candles"}
                          onClick={() => setNavbar(!navbar)}
                          className="block px-5  py-1  pl-0  text-white text-left font-normal text-base"
                          aria-current="page"
                        >
                          {("XO Candles")}
                        </Link>
                      </li>

                      <li className="shadow-inner feature1">
                        <Link
                          href={"/xoxo-type/xo_Fragrance"}
                          onClick={() => setNavbar(!navbar)}
                          className="block px-5 py-1 pl-0 text-white text-left font-normal text-base"
                          aria-current="page"
                        >
                          {("XO Fragrances")}
                        </Link>
                      </li>

                      {!user?.token && <li className="shadow-inner feature1">
                        <Link
                          href={'/auth/signIn'}
                          onClick={() => setNavbar(!navbar)}
                          className="block px-5 py-1 pl-0 text-white text-left font-normal text-base"
                          aria-current="page"
                        >
                          {("Sign in")}
                        </Link>
                      </li>}
                      {user?.token && <p
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "Do you want to signout?",
                            icon: "warning",
                            showCancelButton: true,
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                          }).then(function (result) {
                            if (result.isConfirmed) {
                              setUser({})
                              setShowHover(false);
                              localStorage.removeItem(
                                "userDetail"
                              );
                              localStorage.removeItem("token");
                              router.push('/auth/signIn');
                              setNavbar(!navbar);
                            }
                          })
                        }}
                        className="block px-5 py-1 pl-0 text-white text-left font-normal text-base"
                        aria-current="page"
                      >
                        Sign out
                      </p>}

                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Drawer open={showCategory} anchor="top" onClose={closeDrawer} >
        <div className=' max-w-7xl  mx-auto w-full relative'>
          <div className="flex items-center justify-between border-b border-custom-offWhite p-5 gap-5">
            {/* <p className='text-black text-2xl font-normal AbrilFatface'>Filters</p> */}
            <input type="text"
              ref={inputRef2}
              value={serchData}
              onChange={(text) => {
                setSearchData(text.target.value);
                if (text.target.value) {
                  getproductByCategory(text.target.value)
                } else {
                  setProductsList([])
                }
              }}
              placeholder="Search for products..."
              className="bg-custom-offWhite px-5 h-10 w-full rounded-[62px] outline-none  text-black" />
            <IconButton variant="text" color="blue-gray" onClick={() => { setShowCategory(false); setSearchData('') }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>

          </div>
          <div>
            <section className="w-full ">
              <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:py-5 py-5">
                <p className="md:text-[30px] text-2xl text-black font-normal text-center">Products</p>
                <div className="md:py-10 py-5 grid md:grid-cols-4 grid-cols-1 gap-5 w-full">
                  {productsList.map((item, i) => (
                    <div key={i} className="w-full bg-white flex flex-col justify-center items-center border border-custom-offWhite" onClick={() => { router.push(`/product-details/${item?._id}`); setShowCategory(false); setSearchData(''); setProductsList([]) }}>
                      <img className="h-full w-full md:my-10 my-5 object-contain" src={item?.varients[0]?.image[0] || '/default-product-image.png'} onError={imageOnError} />
                      <p className="text-black md:text-xl text-lg font-normal border-t border-t-custom-offWhite w-full text-center pt-3">{item?.name}</p>
                      <p className="text-[#00000070] font-normal md:text-lg text-base md:pb-5 pb-3 pt-3">From ${item?.price} AUD</p>
                    </div>))}
                </div>
                {productsList?.length === 0 && <p className="text-2xl text-black font-normal text-center">No Products</p>}
              </div>
            </section>
          </div>


        </div>

      </Drawer>

      <Drawer open={showCategory1} onClose={closeDrawer1} >
        <div className='w-[310px] relative'>
          <div className="flex items-center justify-between border-b border-custom-newLightGray p-5">
            <p className='text-black text-2xl font-normal AbrilFatface'>Categories</p>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer1}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>

          <div className='w-full p-5 pb-[70px]'>

            <div className='border-b border-custom-newLightGray'>
              {services.map((items, i) => (<div className='flex flex-col  w-full  pb-5'>
                <p className='text-black text-lg font-bold'>{items?._id}</p>

                {items.category.map((item) => (<div key={item._id} className='flex justify-between items-center cursor-pointer' onClick={() => { router.push(`/categories/${item?.name}`); setShowCategory1(false) }}>
                  <p className={`text-bas font-normal AnonymousPro text-[#00000060] `}>{item.name}</p>
                  <MdNavigateNext className={`text-xl  text-[#00000060] `} />
                </div>))}
              </div>))}
            </div>

          </div>
        </div>
      </Drawer>

    </div>
  );
};

export default Navbar;
