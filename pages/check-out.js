import React, { useState } from 'react'
import { RxCrossCircled } from 'react-icons/rx'

function CheckOut() {
    const [showcart, setShowcart] = useState(false);
    const [shippingAddressData, setShippingAddressData] = useState({
        phoneNumber: "",
        country: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
    });

    const createProductRquest = (e) => {
        e.preventDefault();
        // if (cartData?.length === 0) {
        //     props.toaster({ type: "warning", message: 'Your cart is empty' });
        //     return
        // }
        let data = []

        cartData.forEach(element => {
            data.push({
                product: element?._id,
                image: element.selectedColor?.image,
                color: element.selectedColor?.color,
                total: element.total,
                price: element.price,
                qty: element.qty,
                seller_id: element.userid,
            })
        });
        let newData = {
            productDetail: data,
            total: CartTotal.toFixed(2),
            shiping_address: shippingAddressData
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
                    localStorage.removeItem("addCartDetail");
                    props.toaster({ type: "success", message: res.data?.message });
                    setShowcart(false)
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

    return (
        <div className="bg-white w-full md:min-h-screen">
            <div className="relative w-[300px] md:w-1/2 h-auto  bg-white rounded-[15px] m-auto">
                {/* <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                    onClick={() => { setShowcart(false) }}
                >
                    <RxCrossCircled className="h-full w-full font-semibold " />
                </div> */}

                <form className='md:px-0 px-5 md:py-10 py-5' onSubmit={createProductRquest}>
                    <p className='text-black font-bold text-2xl mb-5'>Contact</p>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Email or mobile phone number"
                            required
                            value={shippingAddressData.phoneNumber}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    phoneNumber: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <p className='text-black font-bold text-2xl mb-5'>Delivery</p>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Country"
                            required
                            value={shippingAddressData.country}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    country: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="First Name"
                            required
                            value={shippingAddressData.firstName}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    firstName: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Last Name"
                            required
                            value={shippingAddressData.lastName}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    lastName: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="Address"
                            required
                            value={shippingAddressData.address}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    address: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="City"
                            required
                            value={shippingAddressData.city}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    city: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="text" placeholder="State"
                            required
                            value={shippingAddressData.state}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    state: text.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="number" placeholder="Pin Code"
                            required
                            value={shippingAddressData.pinCode}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    pinCode: text.target.value,
                                });
                            }}
                        />
                    </div>

                    {/* <div className='w-full'>
                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5" type="number" placeholder="Phone number"
                            required
                            value={shippingAddressData.phoneNumber}
                            onChange={(text) => {
                                setShippingAddressData({
                                    ...shippingAddressData,
                                    phoneNumber: text.target.value,
                                });
                            }}
                        />
                    </div> */}





                    <div className='flex md:justify-start justify-center'>
                        <button className='bg-black w-full md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base' type="submit">Place Order</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CheckOut
