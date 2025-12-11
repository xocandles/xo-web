import { Api } from '@/services/service';
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Head from 'next/head';

function XoxoType(props) {
    const router = useRouter();
    console.log(router)
    const [productsList, setProductsList] = useState([]);
    const [meta, setMeta] = useState({
        title: '',
        description: ""
    });

    useEffect(() => {
        if (router?.query?.type) {
            getProduct()
            if (router?.query?.type === 'xo_candles') {
                setMeta({
                    title: 'XO Candles | Pure Soy Wax Candles, Crafted for Cozy Ambiance',
                    description: 'Discover XO Candles: handmade soy candles with unique fragrances to elevate your space. Crafted for relaxation, elegance, and ambiance with eco-friendly ingredients.'
                })
            } else {
                setMeta({
                    title: 'XO Candles Fragrances | Premium Soy Wax Scents for Elegant Spaces',
                    description: "Elevate your space with XO Candles' luxurious, handcrafted scents. Enjoy rich, lasting aromas that bring warmth, elegance, and a calming ambiance to any room."
                })
            }
        }
    }, [router?.query?.type])

    const getProduct = async () => {
        props.loader(true);
        const key = router?.query?.type === 'xo_candles' ? 'XO Candles' : 'XO Fragrance'
        Api("get", `getProduct?type=${key}`, "", router).then(
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

    const imageOnError = (event) => {
        event.currentTarget.src = '/default-product-image.png';
        // event.currentTarget.className = "error";
    };

    return (
        <div className="bg-white w-full md:min-h-screen">
            <Head>
                <title>{meta.title}</title>
                <meta name='signIn' content={meta.description} />
                <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/xoxo-type/${router?.query?.type}`} />
            </Head>
            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5">
                        {/* <div className="w-full"> */}
                        {productsList.map((item, i) => (<div key={i} className={`w-full ${router?.query?.type === 'XO Candles' ? 'bg-white border border-custom-offWhite' : 'bg-white border border-[#00000040]'} flex flex-col justify-center items-center `} onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                            <img className="md:h-[300px] h-full w-full md:my-10 my-0 object-contain" src={item?.varients[0]?.image[0] || '/default-product-image.png'} onError={imageOnError} />
                            <p className="text-black md:text-xl text-lg font-normal border-t border-t-custom-offWhite w-full text-center pt-3">{item?.name}</p>
                            <p className="text-[#00000070] font-normal md:text-lg text-base md:pb-5 pb-3 pt-3">From ${item?.price} AUD</p>
                        </div>))}
                        {/* </div> */}

                        {/* <div className="w-full">
                {productsLists.map((item, i) => (<div key={i} className="w-full bg-custom-offWhite flex flex-col justify-center items-center border border-[#00000040]" onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                  <img className="md:h-[300px] h-full w-full md:my-10 my-5 object-contain" src={item?.varients[0]?.image[0]} />
                  <p className="text-black md:text-4xl text-xl	font-normal border-t border-t-[#00000040] w-full text-center pt-3">{item?.name}</p>
                  <p className="text-[#00000070] font-normal md:text-2xl text-base md:pb-5 pb-3 pt-3">From ${item?.price}</p>
                </div>))}
              </div>
   */}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default XoxoType
