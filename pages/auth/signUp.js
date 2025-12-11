import React, { useState } from 'react'
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Head from 'next/head';
// import ReCAPTCHA from "react-google-recaptcha";


function signUp(props) {
    const router = useRouter();
    const [userDetail, setUserDetail] = useState({
        name: "",
        email: "",
        // company: "",
        phoneNumber: "",
        password: "",
    });
    const [eyeIcon, setEyeIcon] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        props.loader(true);
        const data = {
            email: userDetail.email.toLowerCase(),
            username: userDetail.name,
            // company: userDetail.company,
            password: userDetail.password,
            number: userDetail.phoneNumber,
            type: "USER",
        };
        Api("post", "signUp", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.success) {
                    if (router?.query?.from === 'cart') {
                        router.replace("/cart");
                    } else {
                        router.push("/auth/signIn");
                    }
                    setUserDetail({
                        name: "",
                        email: "",
                        // company: "",
                        phoneNumber: "",
                        password: "",
                    });
                    props.toaster({ type: "success", message: 'Register successfully' });
                } else {
                    console.log(res?.data?.message);
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    return (
        <>


            <div className="bg-white w-full h-[534px]">
                <section className="bg-white w-full flex flex-col justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                        <form className="md:w-1/2 w-full" onSubmit={submit}>
                            <div className="flex flex-col justify-center">
                                <p className="md:text-3xl text-2xl text-black font-bold pb-5 text-center">Sign up</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="Name"
                                    required
                                    value={userDetail.name}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            name: text.target.value,
                                        });
                                    }} />


                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="Email"
                                    required
                                    value={userDetail.email}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            email: text.target.value,
                                        });
                                    }} />

                                {/* <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="Company"
                                    required
                                    value={userDetail.company}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            company: text.target.value,
                                        });
                                    }} /> */}


                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none mb-5" type="number" placeholder="Phone Number"
                                    required
                                    value={userDetail.phoneNumber}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            phoneNumber: text.target.value,
                                        });
                                    }} />
                                <div className='relative'>
                                    <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-custom-gray font-normal md:text-lg text-base text-black outline-none" placeholder="*********"
                                        required
                                        type={!eyeIcon ? "password" : "text"}
                                        value={userDetail.password}
                                        onChange={(text) => {
                                            setUserDetail({
                                                ...userDetail,
                                                password: text.target.value,
                                            });
                                        }} />
                                    <div className='absolute top-[10px] right-[12px]'>
                                        {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                        {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                    </div>
                                </div>


                                <button className="bg-black md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5 mt-5" type="submit">Sign up</button>
                                <p className="md:text-lg text-base text-custom-gray font-normal">
                                    Already have an account <span className="font-bold text-black cursor-pointer" onClick={() => {
                                        if (router?.query?.from === 'cart') {
                                            router.replace("/auth/signIn?from=cart")
                                        } else {
                                            router.push("/auth/signIn");
                                        }

                                    }}>sign in</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}

export default signUp
