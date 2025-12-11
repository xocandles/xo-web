import React, { useContext, useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import { produce } from 'immer';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import { IoCloseCircleOutline } from "react-icons/io5";
import Color from 'color';  // Import color library
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';



function ProductDetails(props) {
    const router = useRouter();
    const [productsId, setProductsId] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [selecteSize, setSelecteSize] = useState({});
    const [selectedImageList, setSelectedImageList] = useState([]);
    const [fragranceList, setFragranceList] = useState([]);
    const [selectFragranceSearch, setSelectFragranceSearch] = useState([]);
    const [selectFragranceList, setSelectFragranceList] = useState([]);

    const [selectedColor, setSelectedColor] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);
    // const [selectedColor, setSelectedColor] = useState(null); 


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
        Api("get", `getProductById/${router?.query?.id}`, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                res.data.qty = 1
                setProductsId(res.data);
                console.log(res?.data?.minQuantity)
                res.data?.varients[0].selected.forEach(ele => {
                    ele.request = 0
                })

                // setSelectedColor(res.data?.varients[0]?.color[0])
                setSelectedColors(res.data?.varients[0].color)

                console.log("Colors data:", res.data?.varients[0]?.color);
                setSelectedImageList(res.data?.varients[0].image)
                setSelectedImage(res.data?.varients[0].image[0])
                setSelectedSize(res.data?.varients[0].size)
                setSelecteSize(res.data?.varients[0].size[0])
                if (res?.data?.selectedFragrance) {
                    setFragranceList(res?.data?.selectedFragrance.map(f => { return { ...f, value: f._id } }))
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

    const handleSizeChange = (e) => setSelectedSize(e.target.value);



    const handleColorChange = (e) => {
        const selectedValue = e.target.value; // Get the selected color (hex code)
        setSelectedColor({ color: selectedValue }); // Update the selected color
        console.log('Selected Color:', selectedValue); // Log selected color (optional)
    };

    const closeIcons = (imagesArr, i) => {
        let d = selectFragranceList
        let d1 = selectFragranceSearch
        if (i !== -1) {
            d.splice(i, 1);
            d1.splice(i, 1);
        }
        setSelectFragranceList([...d])
        setSelectFragranceSearch([...d1])
        console.log(d)
    }

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
                                            // imageOnError()
                                        }} />
                                        {/* md:p-5 p-2 md:h-[167px] h-[93px]  */}
                                    </div>
                                    ))}
                                </div>
                                <div className="col-span-2  md:order-2 order-1  w-full bg-custom-offWhite flex flex-col justify-center items-center md:h-max">
                                    <InnerImageZoom src={selectedImage || '/default-product-image.png'} zoomSrc={selectedImage || '/default-product-image.png'} />

                                    {/* <img className=" w-full  object-contain" src={selectedImage || '/default-product-image.png'} onError={imageOnError} /> */}
                                </div>
                            </div>

                            {productsId?.type === 'XO Candles' && fragranceList.length > 0 &&
                                <div className='md:px-0 px-5 md:block hidden'>
                                    <p className='text-black text-[13px] font-bold mb-2 md:mt-0 mt-5'>Choose Fragrance</p>
                                    <SelectSearch search={true} options={fragranceList}
                                        value={selectFragranceSearch}
                                        onChange={((e) => {
                                            console.log('category=================>', e)
                                            let c = fragranceList.find(f => f._id === e)
                                            if (productsId?.itemQty > 1) {
                                                console.log(selectFragranceSearch.length, productsId?.itemQty + 1)
                                                if (selectFragranceSearch.length < productsId?.itemQty) {
                                                    const d = selectFragranceSearch

                                                    if (!d.includes(e)) {
                                                        const d1 = selectFragranceList
                                                        d1.push(c)
                                                        setSelectFragranceList([...d1])
                                                        console.log(d1)
                                                        d.push(e)
                                                        console.log(d)
                                                        setSelectFragranceSearch([...d])
                                                    }
                                                } else {
                                                    props.toaster({ type: "warning", message: `You can choose only ${productsId?.itemQty} fragrances` });
                                                }

                                            } else {
                                                setSelectFragranceSearch([e])
                                                setSelectFragranceList([c])

                                            }
                                        })} name="language" placeholder="Choose your fragrance list" />
                                </div>
                            }

                            <div className="md:grid md:grid-cols-2 grid-cols-1 w-full md:gap-5 gap-5 md:pb-10 md:p-0 p-5 mt-5 hidden">
                                {selectFragranceList.map((item, i) => (
                                    <div key={i} className="bg-custom-offWhite w-full rounded-[20px]  p-5 !gap-5 relative">
                                        <IoCloseCircleOutline className='text-red-700 cursor-pointer h-5 w-5 absolute top-[20px] right-[20px]' onClick={() => { closeIcons(item, i) }} />
                                        <p className="text-lg	text-black font-normal">{item?.name}</p>
                                        <p className="text-lg font-normal text-black">{item?.ingredients}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className='flex flex-col justify-start items-start md:px-20 px-5 md:pt-5 pb-5'>
                            {/* <p className='text-black text-[13px] font-normal'>N° 4</p> */}
                            <p className='text-black md:text-3xl md:leading-[40px] text-base font-normal md:pt-0 pt-0'>{productsId?.name}</p>
                            {/* <p className='text-black text-xs font-normal w-[50px] md:pt-5 pt-3'>soften expand love</p> */}
                            {/* <p className='text-black text-sm font-normal md:pt-10 pt-3'>Heart Chakra Perfume Oil</p> */}
                            <p className='text-black text-xl font-normal md:pt-5 pt-3'>${productsId?.price} AUD</p>

                            <div className='pt-5 w-full'>
                                <p className='text-black text-[13px] font-bold pt-2'>Size</p>
                                <div className='px-3 w-full border border-custom-offWhite rounded mt-2 '>
                                    <select value={selecteSize?.size} className='w-full md:h-[42px] h-[40px] outline-none font-normal text-base text-black' placeholder='7ml Extrait de Parfum' onChange={(text) => {
                                        const selectedVlaue = selectedSize.find(f => f.size === text?.target.value)
                                        setSelecteSize(selectedVlaue)
                                    }} >
                                        {selectedSize.map((item, i) => (<option key={i} value={item?.size} className='p-5'>{item?.size}</option>))}
                                    </select>
                                </div>

                                {productsId?.type === 'XO Candles' && selectedColors?.length > 0 && <p className="text-black text-[13px] font-bold pt-3">Colour</p>}
                                {productsId?.type === 'XO Candles' && selectedColors?.length > 0 && <div>
                                    {/* Dropdown for color selection */}
                                    {<div className="px-3 w-full border border-custom-offWhite rounded mt-2">
                                        <select
                                            value={selectedColor?.color || ''} // Set the selected color
                                            className="w-full md:h-[42px] h-[40px] outline-none font-normal text-base text-black"
                                            onChange={handleColorChange} // Handle color change on dropdown selection
                                        >
                                            <option value="">Select Colour</option> {/* Default empty option */}
                                            {selectedColors?.map((item, i) => (
                                                <option key={i} value={item.color} className="p-5">
                                                    {item.color}
                                                    {/* {getColorNameFromHex(item.color)} Show color name */}
                                                </option>
                                            ))}
                                        </select>
                                    </div>}
                                </div>}
                                {productsId?.type === 'XO Candles' && fragranceList.length > 0 &&
                                    <div className='md:hidden block'>
                                        <p className='text-black text-[13px] font-bold mb-2 md:mt-0 mt-5'>Choose Fragrance</p>
                                        <SelectSearch search={true} options={fragranceList}
                                            value={selectFragranceSearch}
                                            onChange={((e) => {

                                                console.log('category=================>', e)
                                                let c = fragranceList.find(f => f._id === e)
                                                if (productsId?.itemQty > 1) {
                                                    console.log(selectFragranceSearch.length, productsId?.itemQty + 1)
                                                    if (selectFragranceSearch.length < productsId?.itemQty) {
                                                        const d = selectFragranceSearch

                                                        if (!d.includes(e)) {
                                                            const d1 = selectFragranceList
                                                            d1.push(c)
                                                            setSelectFragranceList([...d1])
                                                            console.log(d1)
                                                            d.push(e)
                                                            console.log(d)
                                                            setSelectFragranceSearch([...d])
                                                        }
                                                    } else {
                                                        props.toaster({ type: "warning", message: `You can choose only ${productsId?.itemQty} fragrances` });
                                                    }

                                                } else {
                                                    setSelectFragranceSearch([e])
                                                    setSelectFragranceList([c])

                                                }
                                            })} name="language" placeholder="Choose your fragrance list" />
                                    </div>
                                }

                                <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-5 gap-5 md:pb-10 md:p-0 p-0 mt-5 md:hidden">
                                    {selectFragranceList.map((item, i) => (
                                        <div key={i} className="bg-custom-offWhite w-full rounded-[20px]  p-5 !gap-5 relative">
                                            <IoCloseCircleOutline className='text-red-700 cursor-pointer h-5 w-5 absolute top-[20px] right-[20px]' onClick={() => { closeIcons(item, i) }} />
                                            <p className="text-lg	text-black font-normal">{item?.name}</p>
                                            <p className="text-lg font-normal text-black">{item?.ingredients}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div className='mt-5  flex justify-start items-center border border-custom-offWhite px-5 py-2'>
                                <IoIosRemove className='w-5 h-5 text-custom-darkBlack'
                                    onClick={() => {
                                        if (productsId.qty > 1) {
                                            productsId.qty = productsId.qty - 1;
                                            productsId.total = (productsId?.price * productsId.qty).toFixed(2)
                                            setProductsId({ ...productsId })
                                        }
                                    }}
                                />
                                <p className='text-black text-base font-normal text-center mx-5' >{productsId?.qty || 0}</p>
                                {/* outline-none w-[50px] h-[50px] */}
                                <IoIosAdd className='w-5 h-5 text-custom-darkBlack'
                                    onClick={() => {
                                        console.log(productsId)
                                        productsId.qty = productsId.qty + 1;
                                        productsId.total = (productsId?.price * productsId.qty).toFixed(2)
                                        setProductsId({ ...productsId })
                                    }}
                                />
                            </div>

                            <button
                                className='w-[217px] h-[44px] border border-black text-black text-base font-bold mt-5'
                                onClick={() => {
                                    // Log the selected color and size for debugging purposes
                                    if (selectedColors.length > 0 && !selectedColor?.color && productsId?.type === 'XO Candles') {
                                        props.toaster({ type: "warning", message: `Please choose color from the list` });
                                        return
                                    }
                                    if (fragranceList.length > 0 && selectFragranceSearch?.length === 0) {
                                        props.toaster({ type: "warning", message: `Please select fragrance from the list` });
                                        return
                                    }
                                    console.log("Selected Color:", selectedColor?.color);  // Logs the selected color
                                    console.log("Selected Size:", selecteSize?.size);      // Logs the selected size

                                    const d = cartData;
                                    const c = cartData.find(f => f._id === productsId?._id);

                                    if (!c) {
                                        const nextState = produce(cartData, draft => {
                                            draft.push({
                                                ...productsId,
                                                fragrance: selectFragranceSearch,  // Fragrance data
                                                size: selecteSize,        // Only selected size here
                                                color: selectedColor,       // Only selected color here
                                                total: productsId?.price * productsId.qty  // Calculating total price
                                            });
                                        });
                                        setCartData(nextState);
                                        setSelectedColor({})
                                        setSelectFragranceSearch([])
                                        localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                        console.log('Added to Cart:', { size: selectedSize, color: selectedColor });

                                    }

                                    // Redirect to the cart page
                                    router.push('/cart');
                                }}
                            >
                                Add to Cart
                            </button>

                            {/* <p className='text-black text-sm font-bold pt-5 text-end w-full underline underline-offset-4'>More payment options</p> */}
                            <p className='text-black text-base font-normal italic pt-5'>{productsId?.short_description}</p>



                        </div>
                    </div>

                    {/* <div className="grid md:grid-cols-3 grid-cols-1 w-full md:gap-5 gap-5 md:pb-10 md:p-0 p-5">
                        {selectFragranceList.map((item, i) => (
                            <div key={i} className="bg-custom-offWhite w-full rounded-[20px]  p-5 !gap-5 relative">
                                <IoCloseCircleOutline className='text-red-700 cursor-pointer h-5 w-5 absolute top-[20px] right-[20px]' onClick={() => { closeIcons(item, i) }} />
                                <p className="text-lg	text-black font-normal">{item?.name}</p>
                                <p className="text-lg font-normal text-black">{item?.ingredients}</p>
                            </div>
                        ))}
                    </div> */}

                    <p className='text-black text-base font-normal md:pb-10 pb-5 md:px-0 px-5' dangerouslySetInnerHTML={{ __html: productsId?.long_description }}></p>
                </div>
            </section>




        </div>
    )
}

export default ProductDetails
