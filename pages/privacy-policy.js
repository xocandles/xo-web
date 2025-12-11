import React from 'react'
import Head from 'next/head'

function PrivacyPolicy() {
    return (
        <div className="bg-white w-full md:min-h-screen">

            {/* add meta title */}
            <Head>
                <title>XO Candles Privacy Policy | Protecting Your Personal Information</title>
                <meta name='description' content="Delve into XO Candles' Privacy Policy to understand how we manage your information. We are dedicated to safeguarding your data and respecting your privacy." />

                <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/privacy-policy`} />
            </Head>

            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                    <div className='md:w-1/2 w-full'>
                        <p className='text-black md:text-[34px] text-2xl font-normal text-center'>PRIVACY POLICY</p>
                        <p className='text-black font-normal text-base md:pt-5 pt-3'>We are committed to protecting your personal information collected by XO. If you do not wish to have your personal information collected, or if you would like to change information you have already provided to us, please let us know. This policy applies only to the business information you have provided to us and to the information we collect on our website. XO complies with the Privacy Act 1998 (Cth)("the Act")and any code approved by the Privacy Commissioner under Section 18DD of Act, including the National Privacy Principles introduced on 21 December 2001.</p>
                        <p className='text-black font-normal text-base pt-3'>For further information and enquiries, please contact our support team at <a className='font-bold' href="mailto:demiana@xocandles.com">Demiana@xocandles.com</a></p>
                        <p className='text-black font-normal text-base pt-3'>Thank you.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PrivacyPolicy
