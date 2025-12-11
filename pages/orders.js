import { Api } from '@/services/service';
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";

function orders(props) {
    const router = useRouter();
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        getProductRequestbyUser()
    }, [])

    const getProductRequestbyUser = async () => {
        props.loader(true);
        Api("get", "getProductRequestbyUser", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setOrdersData(res.data);
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
        <div className="bg-white w-full min-h-screen">
            <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5">
                    <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                        {ordersData.map((item, i) => (<div key={i} className='grid md:grid-cols-3 grid-cols-1 w-full gap-5 bg-white shadow-2xl p-5 rounded-[10px]' onClick={() => { router.push(`/orders-details/${item?._id}?product_id=${item?.productDetail?._id}`) }}>
                            <div className='col-span-2 flex gap-5'>
                                <img className='w-20 h-20 rounded-[10px]' src={item?.productDetail?.image || '/default-product-image.png'} onError={imageOnError} />
                                <div>
                                    <p className='text-black text-base font-bold'>{item?.productDetail?.product?.name}</p>
                                    {item?.productDetail?.color && <div className='flex justify-start items-center pt-[6px]'>
                                        <p className='text-custom-gray  text-xs font-bold'>Colour: {item?.productDetail?.color}</p>
                                        {/* <p className="h-[10px] w-[10px] rounded-full border border-black ml-2" style={{ backgroundColor: item?.productDetail?.color }}></p> */}
                                    </div>}
                                    <p className='text-custom-gray text-xs font-bold pt-[6px]'>Quantity: {item?.productDetail?.qty || 1}</p>
                                    <p className='text-custom-gray text-xs font-bold pt-[6px]'>Order ID: {item?._id}</p>
                                </div>
                            </div>
                            <p className='text-black text-base font-bold text-right'>${item?.productDetail?.total} AUD</p>
                        </div>))}
                    </div>

                    {ordersData?.length === 0 && <div className="flex justify-center items-center h-[500px]">
                        <p className="text-black text-xl font-bold">No orders for now !</p>
                    </div>}

                </div>
            </section>
        </div>
    )
}

export default orders
