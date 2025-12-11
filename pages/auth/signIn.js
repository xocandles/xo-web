import React, { useContext, useState } from 'react'
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { userContext } from '../_app';
import Head from 'next/head';

function signIn(props) {
    const router = useRouter();
    const [userDetail, setUserDetail] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useContext(userContext);
    const [eyeIcon, setEyeIcon] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        const data = {
            username: userDetail.email.toLowerCase(),
            password: userDetail.password,
        };
        props.loader(true);
        Api("post", "login", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);
                if (res?.status) {
                    if (router?.query?.from === 'cart') {
                        router.replace("/cart");
                    } else {
                        router.push("/");
                    }
                    localStorage.setItem("userDetail", JSON.stringify(res.data));
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data)
                    setUserDetail({
                        email: "",
                        password: "",
                    });
                    props.toaster({ type: "success", message: 'You are successfully logged in' });

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

    return (
        <>
            {/* <div className="bg-white w-full">
                <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full md:px-0 px-5 pt-10 md:pb-10 pb-5">
                        <form className="w-1/2 flex justify-center items-center" onSubmit={submit}>
                            <div className="flex flex-col justify-center w-full">
                                <p className="md:text-3xl text-2xl text-custom-darkGray font-bold	Lato pb-5 text-center">Log in</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-darksGray Lato font-normal md:text-lg text-base text-custom-lightGray outline-none mb-5" type="text" placeholder="Email"
                                    required
                                    value={userDetail.email}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            email: text.target.value,
                                        });
                                    }} />
                                <div className='relative'>
                                    <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-darksGray Lato font-normal md:text-lg text-base text-custom-lightGray outline-none mb-2" placeholder="*********"
                                        required
                                        type={!eyeIcon ? "password" : "text"}
                                        value={userDetail.password}
                                        onChange={(text) => {
                                            setUserDetail({
                                                ...userDetail,
                                                password: text.target.value,
                                            });
                                        }} />
                                    <div className='absolute top-[14px] right-[12px]'>
                                        {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-darksGray' onClick={() => { setEyeIcon(true); }} />}
                                        {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-darksGray' onClick={() => { setEyeIcon(false); }} />}
                                    </div>
                                </div>
                                <div className="flex justify-end items-end">
                                    <p className="md:text-lg text-base text-custom-darkGray font-bold Lato cursor-pointer md:mb-10 mb-5"
                                        onClick={() => {
                                            router.push("/auth/forgotPassword");
                                        }}>
                                        Forgot Password?
                                    </p>
                                </div>
                                <button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] Lato font-bold md:text-xl text-base text-white md:mb-10 mb-5" type="submit">Sign in</button>
                                <p className="md:text-lg text-base text-custom-darkGray font-normal Lato">
                                    Didn’t have an account  <span className="font-bold text-black cursor-pointer" onClick={() => {
                                        router.push("/auth/signUp");
                                    }}>sign up?</span>
                                </p>
                            </div>

                        </form>
                    </div>
                </section >
            </div > */}

            <div className="bg-white w-full h-[534px]">

                {/* Add meta title */}
                <Head>
                    <title>Sign In to Your XO Candles Account | Access Your Profile</title>
                    <meta name='signIn' content="Log in to your XO Candles account to manage your orders, view your favorite candles, and access exclusive offers. Join our community of fragrance enthusiasts!"/>

                    <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/auth/signIn`} />

                </Head>

                <section className="bg-white w-full flex flex-col justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                        <form className='md:w-1/2 w-full' onSubmit={submit}>
                            <p className="md:text-3xl text-2xl text-black font-bold pb-5 text-center">Log in</p>
                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="Email"
                                required
                                value={userDetail.email}
                                onChange={(text) => {
                                    setUserDetail({
                                        ...userDetail,
                                        email: text.target.value,
                                    });
                                }} />

                            <div className='relative'>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-2" placeholder="*********"
                                    required
                                    type={!eyeIcon ? "password" : "text"}
                                    value={userDetail.password}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            password: text.target.value,
                                        });
                                    }} />
                                <div className='absolute top-[14px] right-[12px]'>
                                    {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                    {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                </div>
                            </div>
                            <div className="flex justify-end items-end">
                                <p className="md:text-lg text-base text-custom-gray font-bold Lato cursor-pointer md:mb-10 mb-5"
                                    onClick={() => {
                                        router.push("/auth/forgotPassword");
                                    }}>
                                    Forgot Password?
                                </p>
                            </div>
                            <button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" type="submit">Sign in</button>
                            <p className="md:text-lg text-base text-custom-gray font-normal">
                                Didn’t have an account  <span className="font-bold text-black cursor-pointer" onClick={() => {
                                    if (router?.query?.from === 'cart') {
                                        router.replace("/auth/signUp?from=cart")
                                    } else {
                                        router.push("/auth/signUp");
                                    }

                                }}>sign up?</span>
                            </p>
                        </form>
                    </div>
                </section>
            </div>

        </>

    )
}

export default signIn
