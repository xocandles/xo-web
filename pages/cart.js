import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import { produce } from 'immer';
import { RxCrossCircled } from 'react-icons/rx'
import { Api } from '@/services/service';
import {
    Elements,
    useElements,
    useStripe,
    ElementProps,
    PaymentElement,
    Ele,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '@/components/Checkout/stripe';
import { cartContext, userContext } from './_app';
import Swal from "sweetalert2";
import { IoIosRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import { hex } from 'color-name';
import Color from 'color';  // Import color library
import Head from 'next/head';
import { contryLength } from '@/components/countryLenght';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

function Cart(props) {
    console.log(contryLength)
    const router = useRouter();
    const [cartData, setCartData] = useContext(cartContext);
    const [CartTotal, setCartTotal] = useState(0);
    const [CartItem, setCartItem] = useState(0);
    const [CountryList, setCountryList] = useState([]);
    console.log("Cart Data :: ", cartData);


    const [showcart, setShowcart] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [shippingCharge, setShippingCharge] = useState(0)
    const [mainTotal, setMainTotal] = useState(0)

    const [shippingAddressData, setShippingAddressData] = useState({
        firstName: "",
        address: "",
        pinCode: "",
        phoneNumber: "",
        city: "",
        country: "",
    });
    const [user, setUser] = useContext(userContext);
    const [showQuestion, setShowQuestion] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState({
        isSafeparcel: '',
        issign: '',
    })
    const [orderId, setOrderId] = useState('');
    // const colorName = hex('#e71313'); // This would return 'red'


    // const planid = router.query.planid
    // const month = router.query.month
    // const price = router.query.price
    // const currency = router.query.currency
    // const clientSecret = router.query.clientSecret

    useEffect(() => {
        let cart = localStorage.getItem("addCartDetail");
        if (cart) {
            setCartData(JSON.parse(cart));
        }
        setCountryList(contryLength.map(f => { return { ...f, value: f.code, name: f.label } }))

    }, []);

    useEffect(() => {
        if (router.query.clientSecret) {
            setShowPayment(false)
            createProductRquest()
        }
    }, [router]);

    const getColorNameFromHex = (hex) => {
        try {
            const color = Color(hex);
            // This will return a string like 'red', 'blue', etc.
            return color.keyword() || 'Unknown Color';
        } catch (e) {
            return 'Unknown Color';  // If invalid hex, return 'Unknown Color'
        }
    };

    const profile = () => {
        props.loader(true);
        Api("get", "getProfile", "", router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShippingAddressData(res.data?.shipping_address);
                } else {
                    console.log(res?.data?.message);
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.data?.message });
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    useEffect(() => {
        const sumWithInitial = cartData.reduce(
            (accumulator, currentValue) => accumulator + Number(currentValue?.total || 0),
            0,
        );
        const sumWithInitial1 = cartData?.reduce(
            (accumulator, currentValue) => accumulator + Number(currentValue?.qty || 0),
            0,
        );
        setCartItem(sumWithInitial1)
        setCartTotal(sumWithInitial)
        let charge = sumWithInitial > 90 ? 0 : 10
        setShippingCharge(charge)
        setMainTotal(charge + sumWithInitial)
    }, [cartData])

    const cartClose = (item, i) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete this from the cart ?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        })
            .then(function (result) {
                if (result.isConfirmed) {
                    const nextState = produce(cartData, draftState => {
                        if (i !== -1) {
                            draftState.splice(i, 1);
                        }
                    })
                    setCartData(nextState)
                    localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                } else if (result.isDenied) {
                    // setFullUserDetail({})
                }
            });
    }



    const createProductRquest = () => {
        let data = []
        let cart = localStorage.getItem("addCartDetail");
        const address = localStorage.getItem("shippingAddressData");
        let d = JSON.parse(cart)
        d.forEach(element => {
            console.log(element)
            console.log(element?.color); // Logs the color data for each product in the cart

            data.push({
                product: element?._id,
                image: element.varients[0]?.image[0],
                color: element.selectedColor?.color,
                total: element.total,
                price: element.price,
                qty: element.qty,
                seller_id: element.userid,
                size: element?.size.size,
                fragrance: element?.fragrance,
                color: element?.color?.color
            })
        });
        const sumWithInitial = d.reduce(
            (accumulator, currentValue) => accumulator + Number(currentValue?.total || 0),
            0,
        );

        let charge = sumWithInitial > 90 ? 0 : 10
        setShippingCharge(charge)
        setMainTotal(charge + sumWithInitial)
        // const sumWithInitial1 = d?.reduce(
        //     (accumulator, currentValue) => accumulator + Number(currentValue?.qty || 0),
        //     0,
        // );
        let newData = {
            productDetail: data,
            total: (charge + sumWithInitial).toFixed(2),
            shipping_address: JSON.parse(address),
            shipping_charge: charge,
        }

        console.log(data)
        console.log(newData)
        props.loader(true);
        Api("post", 'createProductRquest', newData, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                if (res.status) {
                    setCartData([]);
                    setCartTotal(0);
                    setMainTotal(0);
                    setOrderId(res?.data?.order?._id)
                    localStorage.removeItem("addCartDetail");
                    localStorage.removeItem("shippingAddressData");
                    props.toaster({ type: "success", message: res.data?.message });
                    // setShowcart(false)
                    setShowQuestion(true)

                    // router.push('/orders')
                }
                else {
                    props.toaster({ type: "error", message: res?.data?.message });
                }

            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const updateProductRquest = () => {
        if (selectedAnswer.isSafeparcel === '' || selectedAnswer.issign === '') {
            props.toaster({ type: "error", message: 'Please provide all required detail.' });
            return
        }
        props.loader(true);
        Api("post", `updateProductRequest/${orderId}`, selectedAnswer, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                if (res.status) {
                    props.toaster({ type: "success", message: res.data?.message });
                    setShowQuestion(false)
                    router.push('/orders')
                }

                else {
                    props.toaster({ type: "error", message: res?.data?.message });
                }

            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    }

    const appearance = {
        theme: "stripe",
        // theme: "default",
        // layout: "tabs",
        // paymentMethodOrder: ["apple_pay", "google_pay", "card"],
    };

    const options = {
        clientSecret,
        appearance,
    };

    const payment = (e) => {
        e.preventDefault();
        if (!shippingAddressData.contrycode) {
            props.toaster({ type: "error", message: 'Please select country from the list' });
            return
        }
        localStorage.setItem("shippingAddressData", JSON.stringify(shippingAddressData));
        const cur = {
            "$": "USD",
            "£": "GBP",
            "€": "EUR"
        }

        const data = {
            price: mainTotal.toFixed(2),
            currency: 'AUD',
            shipping: {
                name: shippingAddressData.firstName,
                address: {
                    line1: shippingAddressData.address,
                    city: shippingAddressData.city,
                    // state: 'CA',
                    country: shippingAddressData.contrycode,
                    postal_code: shippingAddressData.pinCode,
                },
            }
        };
        console.log(data);
        // console.log(storydata)
        props.loader(true);
        Api("post", `poststripe`, data, router).then(
            (res) => {
                props.loader(false);
                console.log("Payment called", res);

                setShowcart(false)
                setShowPayment(true)
                setClientSecret(res.clientSecret);
                // router.push(
                //     `/payment?clientSecret=${res.clientSecret}&price=${res.price}&planid=${id}&month=${month}&currency=${currency}`
                // );
                // setPrice(res.price);
                // setratingno(res.data.newresponse.rating)
            },
            (err) => {
                console.log(err);
                props.loader(false);
                props.toaster({ type: "error", message: err?.message });
            }
        );
        // }
    };

    const imageOnError = (event) => {
        event.currentTarget.src = '/default-product-image.png';
        // event.currentTarget.className = "error";
    };

    return (
        <div className="bg-white w-full md:min-h-screen">

            {/* Meta title */}
            <Head>
                <title>XO Candles Cart | Review & Checkout Your Selections</title>
                <meta name='description' content="View and adjust your cart at XO Candles! Ensure you have the perfect selection of our handmade candles and fragrances before checking out for a delightful experience." />

                <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/cart`} />
            </Head>

            {cartData?.length === 0 && <section className="bg-white md:h-96 w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-0 py-5 md:px-0 px-5">
                    <p className='text-black font-normal md:text-[32px] text-2xl'>Shopping Cart</p>
                    <p className='text-black font-normal text-base pt-2'>Your cart is currently empty.</p>
                    <button className='text-black font-bold text-base bg-white w-[209px] md:h-[54px] h-[44px] border-2 border-black md:mt-10 mt-5' onClick={() => { router.push('/') }}>Continue Shopping</button>
                </div>
            </section>}

            {cartData?.length > 0 && <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5">
                    <p className='text-black font-normal text-2xl pb-5'>Shopping Cart</p>
                    <div className='grid md:grid-cols-4 grid-cols-1 w-full md:gap-5'>
                        <div className='col-span-3 w-full'>
                            <div className='md:grid grid-cols-5 w-full bg-white h-[58px]  border-b border-b-[#00000050] hidden'>
                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-medium text-base'>Product</p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-medium text-base'>Price</p>
                                </div>


                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-medium text-base'>Color</p>
                                </div>

                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-medium text-base'>Quantity</p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-black font-medium text-base'>Subtotal</p>
                                </div>
                            </div>
                            {cartData.map((item, i) => (<div key={i} className='md:grid grid-cols-5 w-full gap-2 bg-white md:pt-5 pt-5  border-b border-b-[#00000050]'>
                                <div className='flex flex-row  justify-start md:items-center gap-1'>
                                    <img className='md:h-[160px] text-gray-500 h-[100px] md:w-full w-[100px]'
                                        src={item?.varients?.[0].image[0] || '/default-product-image.png'}
                                        alt={item?.category?.name == "Candles" || "Fragrance" ? "Variety of XO Candles’ handmade soy candles, fragrances, and perfumes" : ""}
                                        onError={imageOnError} />
                                    <div className='w-full '>
                                        <p className='text-black font-normal md:text-base text-xs md:ml-5 md:pt-0 pt-2'>{item?.name}</p>
                                        <div className='md:hidden block mt-2'>
                                            <div className='flex justify-end items-center'>
                                                <p className='text-black font-normal md:text-base text-xs md:text-start text-end'>${item?.price} AUD</p>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <p className="text-black font-normal md:text-base text-xs md:text-start text-end">
                                                    {/* Convert hex color to a name getColorNameFromHex(item?.color?.color) */}
                                                    {item?.color?.color ? item?.color?.color : '-'}

                                                </p>
                                            </div>
                                            <div className='flex justify-end items-center'>

                                                <div className='flex justify-start items-center border border-custom-offWhite md:px-5 px-2 py-2'>
                                                    <IoIosRemove className='w-5 h-5 text-custom-darkBlack'
                                                        onClick={() => {
                                                            if (item.qty > 1) {

                                                                const nextState = produce(cartData, draft => {
                                                                    draft[i].qty = draft[i].qty - 1
                                                                    draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                                                                })
                                                                setCartData(nextState)
                                                                localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                                            }

                                                        }}
                                                    />
                                                    <p className='text-black text-base font-normal text-center md:mx-5 mx-2' >{item?.qty || 0}</p>
                                                    <IoIosAdd className='w-5 h-5 text-custom-darkBlack'
                                                        onClick={() => {

                                                            const nextState = produce(cartData, draft => {
                                                                draft[i].qty = draft[i].qty + 1
                                                                draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                                                            })
                                                            setCartData(nextState)
                                                            localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-row  justify-end items-center gap-1'>
                                                <p className='text-black font-normal md:text-base text-xs md:text-start text-center'>${Number(item?.total)?.toFixed(2)} AUD</p>
                                                <AiFillDelete className='w-[23px] h-[23px] text-red-600 md:ml-10 md:pt-0 ' onClick={() => { cartClose(item, i) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:flex justify-center items-center hidden '>
                                    <p className='text-black font-normal md:text-base text-xs md:text-start text-center'>${item?.price} AUD</p>
                                </div>
                                <div className="md:flex justify-center items-center hidden">
                                    <p className="text-black font-normal md:text-base text-xs md:text-start text-center">
                                        {/* Convert hex color to a name getColorNameFromHex(item?.color?.color) */}
                                        {item?.color?.color ? item?.color?.color : '-'}

                                    </p>
                                </div>
                                <div className='md:flex justify-center items-center hidden'>

                                    <div className='flex justify-start items-center border border-custom-offWhite md:px-5 px-2 py-2'>
                                        <IoIosRemove className='w-5 h-5 text-custom-darkBlack'
                                            onClick={() => {
                                                if (item.qty > 1) {

                                                    const nextState = produce(cartData, draft => {
                                                        draft[i].qty = draft[i].qty - 1
                                                        draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                                                    })
                                                    setCartData(nextState)
                                                    localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                                }

                                            }}
                                        />
                                        <p className='text-black text-base font-normal text-center md:mx-5 mx-2' >{item?.qty || 0}</p>
                                        <IoIosAdd className='w-5 h-5 text-custom-darkBlack'
                                            onClick={() => {

                                                const nextState = produce(cartData, draft => {
                                                    draft[i].qty = draft[i].qty + 1
                                                    draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                                                })
                                                setCartData(nextState)
                                                localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='md:flex flex-row  justify-center items-center gap-1 hidden'>
                                    <p className='text-black font-normal md:text-base text-xs md:text-start text-center'>${Number(item?.total)?.toFixed(2)} AUD</p>
                                    <AiFillDelete className='w-[23px] h-[23px] text-red-600 md:ml-10 md:pt-0 ' onClick={() => { cartClose(item, i) }} />
                                </div>
                            </div>))}
                        </div>

                        <div className='bg-custom-lightGrayColors w-full p-5 flex flex-col justify-start items-end md:mt-0 mt-5'>
                            {/* h-[319px] */}
                            <p className='text-black md:text-[33px] text-2xl font-semibold text-center'>Cart Totals</p>
                            <div className='md:pt-16 pt-5 flex'>
                                <p className='text-black text-base font-medium'>Subtotal</p>
                                <p className='text-black text-base font-medium ml-5'>${CartTotal.toFixed(2)} AUD</p>
                            </div>
                            <div className='md:pt-5 pt-2 flex'>
                                <p className='text-black text-base font-medium'>Shipping Charge</p>
                                <p className='text-black text-base font-medium ml-5'>${shippingCharge.toFixed(2)} AUD </p>
                            </div>
                            <div className='md:pt-5 pt-2 flex'>
                                <p className='text-black text-base font-medium'>Total</p>
                                <p className='text-black md:text-[21px] text-lg font-medium ml-5'>${mainTotal.toFixed(2)} AUD</p>
                            </div>
                            <button className='bg-custom-lightGrayColors border-2 border-black rounded-[16px] md:h-[50px] h-[40px] w-[234px] text-black md:text-[21px] text-base font-normal md:mt-10 mt-5'
                                onClick={() => {

                                    if (cartData?.length === 0) {
                                        props.toaster({ type: "warning", message: 'Your cart is empty' });
                                        return
                                    } else {
                                        if (user?.email) {
                                            setShowcart(true)
                                            profile()
                                        } else {
                                            props.toaster({ type: "success", message: 'Login required' });
                                            router.push(`/auth/signIn?from=cart`);
                                            return
                                        }
                                    }

                                }}>Check Out</button>
                        </div>
                    </div>
                </div>
            </section>}

            {showQuestion && <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
                <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
                    {/* <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                        onClick={() => { setShowQuestion(false) }}
                    >
                        <RxCrossCircled className="h-full w-full font-semibold " />
                    </div> */}
                    <div className='px-5 py-5'>
                        <p className='text-black font-normal text-base'>Would you like your parcel to be left in a safe place?</p>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(text, value) => {
                                    console.log(text, value)
                                    setSelectedAnswer({ ...selectedAnswer, isSafeparcel: value })
                                }}
                                value={selectedAnswer.isSafeparcel}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>


                        <p className='text-black font-normal text-base pt-5'>Signature required?</p>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(text, value) => {
                                    console.log(text, value)
                                    setSelectedAnswer({ ...selectedAnswer, issign: value })
                                }}
                                value={selectedAnswer.issign}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>

                        <div className='flex md:justify-start justify-center mt-5'>
                            <button className='bg-black w-full md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base' onClick={updateProductRquest}>Submit</button>
                        </div>

                    </div>

                </div>
            </div>}

            {showcart && <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
                <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
                    <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                        onClick={() => { setShowcart(false) }}
                    >
                        <RxCrossCircled className="h-full w-full font-semibold " />
                    </div>

                    <form className='px-5 py-5' onSubmit={payment}>

                        <p className='text-black font-bold text-2xl mb-5'>Shipping Address</p>

                        <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded border border-custom-newGray font-normal  text-base text-black outline-none mb-2" type="text" placeholder="First Name"
                                required
                                value={shippingAddressData?.firstName}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        firstName: text.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded border border-custom-newGray font-normal  text-base text-black outline-none mb-2" type="text" placeholder="Address"
                                required
                                value={shippingAddressData?.address}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        address: text.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded border border-custom-newGray font-normal  text-base text-black outline-none mb-2" type="number" placeholder="Pin Code"
                                required
                                value={shippingAddressData?.pinCode}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        pinCode: text.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded border border-custom-newGray font-normal  text-base text-black outline-none mb-2" type="number" placeholder="Phone number"
                                required
                                value={shippingAddressData?.phoneNumber}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        phoneNumber: text.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded border border-custom-newGray font-normal  text-base text-black outline-none mb-2" type="text" placeholder="City"
                                required
                                value={shippingAddressData?.city}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        city: text.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className='mb-5'>
                            <SelectSearch search={true} options={CountryList}
                                value={shippingAddressData?.contrycode}
                                onChange={((e) => {
                                    console.log('category=================>', e)
                                    let c = CountryList.find(f => f.code === e)
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        country: c.label,
                                        contrycode: c.code
                                    });
                                })} name="language" placeholder="Choose your Country" />
                        </div>

                        {/* <div className='w-full'>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Country"
                                required
                                value={shippingAddressData?.country}
                                onChange={(text) => {
                                    setShippingAddressData({
                                        ...shippingAddressData,
                                        country: text.target.value,
                                    });
                                }}
                            />
                        </div> */}

                        <div className='flex md:justify-start justify-center'>
                            <button className='bg-black w-full md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base' type="submit">Place Order</button>
                        </div>

                    </form>
                </div>
            </div>}

            {/* {clientSecret && ( */}
            {showPayment && <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
                <div className="relative w-max h-auto  bg-white rounded-[15px] mx-auto">
                    <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                        onClick={() => { setShowPayment(false) }}
                    >
                        <RxCrossCircled className="h-full w-full font-semibold " />
                    </div>
                    <div>
                        <Elements options={options} stripe={stripePromise} key={clientSecret}>
                            {/* <PaymentElement
                  options={{
                    layout: "tabs",
                    paymentMethodOrder: ["apple_pay", "google_pay", "card"],
                  }}
                > */}
                            <CheckoutForm
                                price={mainTotal.toFixed(2)}
                                loader={props.loader}
                                clientSecret={clientSecret}
                                // currency={settings.settingsData.currency}
                                currency={'$'}
                            // planid={planid}
                            // month={month}
                            />
                            {/* </PaymentElement> */}
                        </Elements>
                    </div>
                </div>
            </div>
            }

        </div>
    )
}

export default Cart
