import React, { useState } from 'react'
import { useRouter } from "next/router";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { Api } from '@/services/service';
import Head from 'next/head';

function forgotPassword(props) {
    const router = useRouter();
    const [eyeIcon, setEyeIcon] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState();

    const sendOtp = () => {
        if (email === "") {
            props.toaster({ type: "error", message: "Email is required" });
            return;
        }

        const data = {
            email: email,
        };
        console.log(data);
        props.loader(true);
        Api("post", "sendOTP", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(false);
                    setShowOtp(true);
                    setShowPassword(false);
                    setToken(res?.data?.token);
                    props.toaster({ type: "success", message: res?.data?.message });
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

    const verifyOtp = () => {
        if (otp === "") {
            props.toaster({ type: "error", message: "OTP is required" });
            return;
        }

        const data = {
            otp,
            token,
        };

        console.log(data);
        props.loader(true);
        Api("post", "verifyOTP", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(false);
                    setShowOtp(false);
                    setShowPassword(true);
                    setToken(res?.data?.token);
                    props.toaster({ type: "success", message: res?.data?.message });
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

    const Submit = () => {
        if (confirmPassword !== password) {
            props.toaster({
                type: "error",
                message: "Your password is not matched with confirm password",
            });
            return;
        }

        if (password === "") {
            props.toaster({ type: "error", message: "New Password is required" });
            return;
        }
        if (confirmPassword === "") {
            props.toaster({ type: "error", message: "Confirm Password is required" });
            return;
        }

        const data = {
            password,
            token,
        };
        Api("post", "changePassword", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(true);
                    setShowOtp(false);
                    setShowPassword(false);
                    props.toaster({ type: "success", message: res?.data?.message });
                    router.push("/auth/signIn");
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
            {/* <Head>
                <title>Forgot Password</title>
                <meta
                    name="description"
                    content="Forgot Password"
                />
                <link
                    rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/auth/forgotPassword`}
                />
            </Head> */}

            <div className="bg-white w-full h-[534px]">
                <section className="bg-white w-full flex flex-col justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                        <div className="flex flex-col justify-center md:w-1/2 w-full">
                            <p className="md:text-3xl text-2xl text-black font-bold pb-5 text-center">Forgot Password</p>

                            {showEmail && (<input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="Email"
                                value={email}
                                onChange={(text) => {
                                    setEmail(text.target.value);
                                }}
                            />)}

                            {showOtp && (<input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="number" placeholder="OTP"
                                value={otp}
                                onChange={(text) => {
                                    setOtp(text.target.value);
                                }} />)}


                            {showPassword && (<div>
                                <div className='relative'>
                                    <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-10" placeholder="New Password"
                                        type={!eyeIcon ? "password" : "text"}
                                        value={password}
                                        onChange={(text) => {
                                            setPassword(text.target.value);
                                        }}
                                    />
                                    <div className='absolute top-[10px] right-[12px]'>
                                        {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                        {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                    </div>
                                </div>

                                <div className='relative'>
                                    <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-10" placeholder="Confirm Password"
                                        type={!eyeIcon ? "password" : "text"}
                                        value={confirmPassword}
                                        onChange={(text) => {
                                            setConfirmPassword(text.target.value);
                                        }}
                                    />
                                    <div className='absolute top-[14px] right-[12px]'>
                                        {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                        {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                    </div>
                                </div>
                            </div>)}

                            {showEmail && (<button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={sendOtp}>Send OTP</button>)}
                            {showOtp && (<button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={verifyOtp}>Verify</button>)}
                            {showPassword && (<button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={Submit}>Submit</button>)}
                            <p className="md:text-lg text-base text-custom-gray font-normal">
                                Already have an account <span className="font-bold text-black cursor-pointer" onClick={() => {
                                    router.push("/auth/signIn");
                                }}>sign in</span>
                            </p>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}

export default forgotPassword
