import React, { useState } from 'react'
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import Head from 'next/head';

function Contact(props) {
    const router = useRouter();
    const [contactData, setContactData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        props.loader(true);
        const data = {
            first_name: contactData.fullName,
            email: contactData.email.toLowerCase(),
            phone: contactData.phoneNumber,
            description: contactData.description,
        };
        Api("post", "getInTouch", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setContactData({
                        fullName: "",
                        phoneNumber: "",
                        email: "",
                        description: "",
                    });
                    props.toaster({ type: "success", message: "Thank you for your message. We'll get back to you within 24 hours." });
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
        <div className="bg-white w-full md:min-h-screen">
            {/* Add meta title  */}
            <Head>
                <title>Connect with XO Candles | Customer Support & Inquiries</title>
                <meta name='description' content='Have a question about our candles or fragrances? Contact XO Candles today! We value your inquiries and are here to help you with any assistance you need.' />

                <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/contact`} />
            </Head>
            {/* Add meta title  */}
            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                    <div className='md:w-1/2 w-full'>
                        <p className='text-black font-normal md:text-[32px] text-2xl'>CONTACT</p>
                        <p className='text-black font-normal text-base pt-5 pb-5 border-b border-b-custom-offWhite'>Please get in touch — customer service, collaborations, wholesale enquiries,
                            reviews, feedback, publications. We'd love to hear from you.</p>

                        <form className='pt-5 md:px-20' onSubmit={submit}>

                            {/* <div className='w-full mb-5'>
                                <p className='text-black font-normal text-base pb-2'>Subject:</p>
                                <div className='px-5 border border-custom-offWhite'>
                                    <select className="bg-white w-full md:h-[50px] h-[40px]  font-normal text-base text-black outline-none" type="text" placeholder="Customer Service"
                                    // required
                                    // value={userDetail.type}
                                    // onChange={(text) => {
                                    //     setUserDetail({
                                    //         ...userDetail,
                                    //         type: text.target.value,
                                    //     });
                                    // }}
                                    >
                                        <option value="">Customer Service</option>
                                    </select>
                                </div>
                            </div> */}

                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 border border-custom-offWhite font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Full Name"
                                required
                                value={contactData.fullName}
                                onChange={(text) => {
                                    setContactData({
                                        ...contactData,
                                        fullName: text.target.value,
                                    });
                                }}
                            />

                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 border border-custom-offWhite font-normal  text-base text-black outline-none mb-5" type="Number" placeholder="Phone Number"
                                required
                                value={contactData.phoneNumber}
                                onChange={(text) => {
                                    setContactData({
                                        ...contactData,
                                        phoneNumber: text.target.value,
                                    });
                                }}
                            />

                            <input className="bg-white w-full md:h-[50px] h-[40px] px-5 border border-custom-offWhite font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Email"
                                required
                                value={contactData.email}
                                onChange={(text) => {
                                    setContactData({
                                        ...contactData,
                                        email: text.target.value,
                                    });
                                }}
                            />

                            <textarea className="bg-white w-full px-5 py-2  border border-custom-offWhite font-normal  text-base text-black outline-none" rows={4} placeholder=""
                                value={contactData.description}
                                onChange={(e) => {
                                    setContactData({ ...contactData, description: e.target.value });
                                }}
                                required
                            />

                            {/* <div className='pt-5'>
                                <p className='text-black font-bold text-base'>Optional:</p>
                                <div className='flex justify-start items-center pt-5'>
                                    <input className='w-5 h-5 text-custom-gray' type='checkbox' />
                                    <p className='text-black font-normal text-base ml-3'>Subscribe to the newsletter</p>
                                </div>
                                <div className='w-full pt-5'>
                                    <p className='text-black font-normal text-base pb-2'>How did you hear about us:</p>
                                    <div className='px-5 border border-custom-offWhite'>
                                        <select className="bg-white w-full md:h-[50px] h-[40px]  font-normal text-base text-black outline-none" type="text" placeholder="- Pick an option -">
                                            <option value="">- Pick an option -</option>
                                        </select>
                                    </div>
                                </div> */}
                            <button className='bg-black h-[52px] w-full mt-5 text-white font-bold text-base' type="submit">Submit</button>
                            <p className='text-[#00000070] text-xs font-normal italic pt-5'>This site is protected by hCaptcha and the hCaptcha <span className='text-black cursor-pointer' onClick={() => { router.push('/privacy-policy') }}>Privacy Policy</span> and <span className='text-black cursor-pointer' onClick={() => { router.push('/terms-service') }}>Terms of Service</span> apply.</p>
                            {/* </div> */}

                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
