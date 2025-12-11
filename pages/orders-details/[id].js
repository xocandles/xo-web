import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import { produce } from 'immer';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

function OrdersDetails(props) {
    const router = useRouter();
    console.log(router)
    const [productsId, setProductsId] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [selecteSize, setSelecteSize] = useState({});
    const [selectedImageList, setSelectedImageList] = useState([]);
    const [fragranceList, setFragranceList] = useState([]);
    const [selectFragranceSearch, setSelectFragranceSearch] = useState([]);
    const [selectFragranceList, setSelectFragranceList] = useState([]);

    useEffect(() => {
        let cart = localStorage.getItem("addCartDetail");
        if (cart) {
            setCartData(JSON.parse(cart));
        }
        if (router?.query?.id) {
            getProductById()
        }
    }, [router?.query?.id])

    useEffect(() => {
        console.log(selectFragranceList)
    }, [selectFragranceList])

    const getProductById = async () => {
        props.loader(true);
        Api("get", `getProductRequest/${router?.query?.id}`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);

                const d = res.data.productDetail.find(f => f._id === router?.query?.product_id)
                console.log(d)
                setProductsId(d);

                setSelectedImageList(d?.image)
                setSelectedImage(d.image[0])
                // setSelectedSize(res.data?.varients[0].size)
                // setSelecteSize(res.data?.varients[0].size[0])
                console.log(d?.fragrance)
                if (d?.fragrance?.length > 0) {
                    setSelectFragranceList(d?.fragrance)
                }
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
        <div className="bg-white w-full md:min-h-screen">

            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5 md:pt-10">
                        <div className='w-full'>
                            <div className='grid md:grid-cols-3 grid-cols-1 w-full md:gap-5 md:pb-10'>
                                <div className='w-full md:h-[300px] flex md:flex-col flex-row overflow-y-auto overflow-x-hidden md:order-1 order-2 md:pt-0 pt-5'>
                                    {selectedImageList?.map((item, i) => (<div key={i} className='slider  md:block flex md:gap-5 gap-2 w-full'>
                                        <img className={`md:!w-[85%] w-[93px] object-contain md:mb-5 bg-custom-offWhite rounded-[20px]  ${selectedImage === item ? 'border border-black' : ''}`} src={item || '/default-product-image.png'} onClick={() => {
                                            setSelectedImage(item)
                                            imageOnError()
                                        }} />
                                    </div>
                                    ))}
                                </div>
                                <div className="col-span-2  md:order-2 order-1  w-full bg-custom-offWhite flex flex-col justify-center items-center md:h-max">
                                    <img className=" w-full  object-contain" src={selectedImage || '/default-product-image.png'} onError={imageOnError} />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-5 gap-5 md:pb-5 md:px-0 px-5 md:pt-0 pt-5">
                                {selectFragranceList.map((item, i) => (
                                    <div key={i} className="bg-custom-offWhite w-full rounded-[20px]  p-5 !gap-5 ">
                                        <p className="text-lg	text-black font-normal">{item?.name}</p>
                                        <p className="text-lg font-normal text-black">{item?.ingredients}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-start md:px-20 px-5 md:pt-5 pb-5'>
                            <p className='text-black md:text-3xl md:leading-[40px] text-base font-normal md:pt-0 pt-0'>{productsId?.product?.name}</p>
                            <p className='text-black text-xl font-normal md:pt-5 pt-3'>${selecteSize?.rate || productsId?.price} AUD</p>
                            {productsId?.color && <div className='flex justify-start items-center pt-[6px] mt-2'>
                                <p className='text-black text-base font-normal'>Colour: <span className='font-bold'>{productsId?.color}</span></p>
                                {/* <p className="h-[20px] w-[20px] rounded-full border border-black ml-2" style={{ backgroundColor: productsId?.color }}></p> */}
                            </div>}
                            <div className='pt-5 w-full'>
                                <p className='text-black text-base font-normal'>Size <span className='font-bold'>{productsId?.size}</span></p>
                            </div>
                            <div className='mt-5  flex justify-start items-center'>
                                <p className='text-black text-base font-normal text-center'>Qty <span className='font-bold'>{productsId?.qty || 0}</span></p>
                            </div>
                            <p className='text-black text-base font-normal italic pt-5'>{productsId?.product?.short_description}</p>
                        </div>
                    </div>

                    {/* <div className="grid md:grid-cols-3 grid-cols-1 w-full md:gap-5 gap-5 md:pb-10">
                        {selectFragranceList.map((item, i) => (
                            <div key={i} className="bg-custom-offWhite w-full rounded-[20px]  p-5 !gap-5 ">
                                <p className="text-lg	text-black font-normal">{item?.name}</p>
                                <p className="text-lg font-normal text-black">{item?.ingredients}</p>
                            </div>
                        ))}
                    </div> */}
                    <p className='text-black text-base font-normal md:pb-10 pb-5 md:px-0 px-5' dangerouslySetInnerHTML={{ __html: productsId?.product?.long_description }}></p>
                </div>
            </section>




        </div>
    )
}

export default OrdersDetails
