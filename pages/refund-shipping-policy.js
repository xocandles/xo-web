import React from 'react'
import Head from 'next/head'

function RefundShippingPolicy() {
    return (
        <div className="bg-white w-full md:min-h-screen">

              <Head>
                    <title>Refund & Shipping Policy | XO Candles - Shop with Confidence</title>
                    <meta name='description' content="Review XO Candles' refund and shipping policy for a seamless shopping experience. Learn about our commitment to quality, shipping times, and easy returns."/>

                    <link rel='canonical' href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/refund-shipping-policy`} />

                </Head>

            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                    <div className='md:w-1/2 w-full'>
                        <p className='text-black md:text-[34px] text-2xl font-normal text-center'>REFUND & SHIPPING POLICY</p>
                        <p className='text-black font-normal text-base md:pt-5 pt-3'>If there is a problem with your order please contact us with in 24 hours of delivery.</p>
                        <p className='text-black font-normal text-base pt-3'>If you are dissatisfied with our products, you may return them for a full refund within 7 days of purchase. Items must be in their original packaging and completely unaccustomed.</p>
                        <p className='text-black font-normal text-base pt-3'>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                        <p className='text-black font-normal text-base pt-3'>Thank you.</p>

                        {/* <p className='text-black md:text-[34px] text-2xl font-normal text-center'>Refund policy</p>
                        <p className='text-black font-normal text-base pt-5'>It is our policy to accept returns for defective or damaged products only. Personal taste in fragrance is a subjective thing, therefore we cannot accept returns for products based on a dislike of the scent. We always suggest you start with buying a sample bottle to test the scents before purchasing a full size bottle.</p>
                        <p className='text-black font-normal text-base pt-3'>If your product arrived defective or damaged, we will gladly exchange it for a new one. Please email support@xoxo.com to inform us of the problem. We might be busy preparing orders, but we promise to get back to you as soon as possible. Please allow 24 hours to receive a response, excluding weekends and holidays.</p> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RefundShippingPolicy
