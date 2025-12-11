import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Head from "next/head";

export default function Home(props) {
  const router = useRouter();
  const [productsList, setProductsList] = useState([]);
  const [productsLists, setProductsLists] = useState([]);
  console.log("product list Home ", productsList);


  useEffect(() => {
    getProduct()
    getProducts()
  }, [])

  const getProduct = async () => {
    props.loader(true);
    Api("get", "getProduct?type=XO Candles", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setProductsList(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getProducts = async () => {
    props.loader(true);
    Api("get", "getProduct?type=XO Fragrance", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setProductsLists(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const imageOnError = (event) => {
    event.currentTarget.src = '/default-product-image.png';
    // event.currentTarget.className = "error";
  };

  return (
    <div className="bg-white w-full md:min-h-screen">

      <Head>
        <title>XO Candles | Handmade Soy Wax Candles & Unique Fragrances</title>
        <meta name="description" content="Discover XO Candles' handmade soy wax candles and unique fragrances. Elevate your space with designer scents crafted for relaxation, elegance, and ambiance." />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}`}
        />
      </Head>

      <section className="bg-white w-full flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="md:grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5 hidden">

            <div className="w-full">
              {productsList.map((item, i) => (
                <div key={i} className="w-full bg-white flex flex-col justify-center items-center border border-custom-offWhite" onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                  {/* <div className=" w-full h-full md:h-[300px]  md:my-10 my-5 text-gray-500 "> */}
                  <img className="md:h-[300px] md:my-10 my-5 object-contain text-gray-500 text-center"
                    src={item?.varients[0]?.image[0] || '/default-product-image.png'}
                    alt={item?.category?.name == "Candles" ? "Handcrafted soy wax candles with unique fragrances and perfume notes by XO Candles" : ""}
                    onError={imageOnError}
                    width="100%"
                    height="100%"
                  />
                  {/* </div> */}
                  <p className="text-black md:text-xl text-lg md:pb-3 pb-3 font-normal border-t border-t-custom-offWhite w-full text-center pt-3">{item?.name}</p>
                  {/* <p className="text-[#00000070] font-normal md:text-2xl text-base md:pb-5 pb-3 pt-3">From ${item?.price}</p> */}
                </div>))}
            </div>

            <div className="w-full">
              {productsLists.map((item, i) => (
                <div key={i} className="w-full bg-white flex flex-col justify-center items-center border border-[#00000040]" onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                  <img className="md:h-[300px] md:my-10 my-5 object-contain"
                    src={item?.varients[0]?.image[0] || '/default-product-image.png'}
                    onError={imageOnError}
                    width="100%"
                    height="100%"
                  />
                  <p className="text-black md:text-xl text-lg	md:pb-3 pb-3 font-normal border-t border-t-[#00000040] w-full text-center pt-3">{item?.name}</p>
                  {/* <p className="text-[#00000070] font-normal md:text-2xl text-base md:pb-5 pb-3 pt-3">From ${item?.price}</p> */}
                </div>))}
            </div>

          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-10 md:hidden">

            <div className="w-full">
              <p className="text-black font-bold text-2xl py-2 px-5">XO Candles</p>
              <Carousel className="z-40"
                responsive={responsive}
                // autoPlay={true}
                infinite={true}
              >
                {productsList.map((item, i) => (<div key={i} className="w-full bg-white flex flex-col justify-center items-center border border-custom-offWhite" onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                  <img className="md:h-[300px] h-full w-full md:my-10 my-0 object-contain"
                    src={item?.varients[0]?.image[0] || '/default-product-image.png'}
                    onError={imageOnError} />
                  <p className="text-black text-lg font-normal border-t border-t-custom-offWhite w-full text-center pt-3">{item?.name}</p>
                  <p className="text-[#00000070] font-normal md:text-lg text-base md:pb-5 pb-3 pt-3">From ${item?.price} AUD</p>
                </div>))}
              </Carousel>
            </div>

            <div className="w-full">
              <p className="text-black font-bold text-2xl py-2 px-5 border-t border-t-[#00000040]">XO Fragrances</p>
              <Carousel className="z-40"
                responsive={responsive}
                // autoPlay={true}
                infinite={true}
              >
                {productsLists.map((item, i) => (<div key={i} className="w-full bg-white flex flex-col justify-center items-center border border-[#00000040]" onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                  <img className="md:h-[300px] h-full w-full md:my-10 my-0 object-contain" src={item?.varients[0]?.image[0] || '/default-product-image.png'} onError={imageOnError} />
                  <p className="text-black text-lg	font-normal border-t border-t-[#00000040] w-full text-center pt-3">{item?.name}</p>
                  <p className="text-[#00000070] font-normal md:text-lg text-base md:pb-5 pb-3 pt-3">From ${item?.price} AUD</p>
                </div>))}
              </Carousel>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
