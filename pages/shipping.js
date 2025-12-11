import React from 'react'

function Shipping() {
    return (
        <div className="bg-white w-full md:min-h-screen">
            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                    <div className='md:w-1/2 w-full'>
                        <p className='text-black md:text-[34px] text-2xl font-normal text-center'>Shipping policy</p>
                        <p className='text-black font-normal text-base pt-5'>We offer free shipping worldwide on all orders over $50 AUD.</p>
                        <p className='text-black font-normal text-base pt-3'>For orders within Australia and New Zealand please allow up to 10 business days after your order has shipped.</p>
                        <p className='text-black font-normal text-base pt-3'>For all other orders, please allow up to 20 business days for your order to arrive.</p>
                        <p className='text-black font-bold text-base pt-5'>SHIPPING TIMES</p>
                        <p className='text-black font-normal text-base pt-3'>We generally process orders within 3 business days (Monday-Friday). Shipping times are typically 2-3 business days once an order ships from our studio. You will receive an email confirmation from us when your order ships that will include your tracking information. </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shipping
