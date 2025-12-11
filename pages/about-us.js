import React from 'react'
import Head from 'next/head'

function AboutUs() {
    return (
        // <div className='bg-white w-full min-h-screen py-10'>
        //     <p className='text-black md:text-[34px] text-2xl font-normal text-center'>About us</p>
        // </div>
        <div className="bg-white w-full md:min-h-screen">

            {/* Meta Title */}
            <Head>
                <title>About XO Candles | Handmade Designer Candles & Fragrances</title>
                <meta name="description" content="XO Candles, where artisan craftsmanship meets luxury. Our handmade soy wax candles and unique fragrances are designed to elevate your ambiance and relaxation." />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/about-us`} />
            </Head>
            {/* Meta Title */}

            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full flex flex-col justify-center items-center md:py-10 py-5 md:px-0 px-5">
                    <div className='md:w-1/2 w-full'>
                        <p className='text-black md:text-[34px] text-2xl font-normal text-center'>ABOUT US</p>
                        <p className='text-black font-normal text-base md:pt-5 pt-3'>Welcome to XO, where all of our designer candles and fragrances are handmade and designed by Demiana, the creator and founder of the XO brand. XO produces a unique and special type of art, style, design, and aroma signature that will leave you satisfied. Most of our product ingredients and materials are sourced from Canada, the United States, and Australia, providing you with quality ingredients and a longer lasting aroma.</p>
                        <p className='text-black font-normal text-base pt-3'>XO Fragrances art of perfumery has evolved over time, with advancements in chemistry allowing for the creation of more complex and diverse scents. There is a wide variety of fragrances available ranging from floral and fruity to woody and musky. Each fragrance is composed of various notes that combine to create a unique olfactory experience.</p>
                        <p className='text-black font-normal text-base pt-3'>XO Candles has been popular for bringing a sense of ambiance, warmth, and fragrance to homes since 2018. The practice of burning candles for relaxation, meditation and aromatherapy has been embraced by many. XO scented candles come in a variety of fragrances, from fruity and floral scents to woody and spicy notes, catering to a wide range of preferences.</p>
                        <p className='text-black font-normal text-base pt-3'>The most appealing aspect of XO Candles is their ability to create a cozy and inviting atmosphere in any space. The soft glow of a candle, paired with a soothing fragrance, can instantly transform a room into a peaceful sanctuary. XO Candles help individuals unwind after a long day, meditate, or simply enjoy a quiet moment of relaxation.</p>
                        <p className='text-black font-normal text-base pt-3'>XO Candles are a fantastic way to elevate the atmosphere of a room, encourage relaxation, and enhance overall well-being. Whether you enjoy floral, fruity, or spicy scents, there is a candle to suit every taste and preference. So why not light a candle, sit back, and indulge in the calming benefits from the comfort of your own home?</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
