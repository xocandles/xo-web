import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Api } from '@/services/service';
import { useRouter } from 'next/router';
import { MdNavigateNext } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Drawer, Typography, IconButton, Button } from '@mui/material';
// import {
//     Drawer,
//     Button,
//     Typography,
//     IconButton,
// } from "@material-tailwind/react";
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Head from "next/head";
// import Card from '@/components/Card';

const sortByData = [
    // {
    //     name: 'Featured',
    //     value: 'featured'
    // },
    // {
    //     name: 'Best selling',
    //     value: 'is_top'
    // },
    {
        name: 'Alphabetically, A-Z',
        value: 'a_z'
    },
    {
        name: 'Alphabetically, Z-A',
        value: 'z_a'
    },
    {
        name: 'Price, low to high',
        value: 'low'
    },
    {
        name: 'Price, high to low',
        value: 'high'
    },
    {
        name: 'Date, old to new',
        value: 'old'
    },
    {
        name: 'Date, new to old',
        value: 'new'
    },
]


const priceData = [
    {
        name: 'Essential (13)',
    },
    {
        name: 'Premium (15)',
    },
]

// const brandData = [
//     {
//         name: 'Adidas (1)',
//     },
//     {
//         name: 'AS Colour (5)',
//     },
//     {
//         name: 'Carhartt (1)',
//     },
//     {
//         name: 'Merchwell (15)',
//     },
//     {
//         name: 'New Era (1)',
//     },
//     {
//         name: 'Nike (1)',
//     },
//     {
//         name: 'Richardson (1)',
//     },
//     {
//         name: 'The North Face (4)',
//     },
// ]

const genderData = [
    {
        name: "Male",
    },
    {
        name: "Female",
    },
    {
        name: 'Unisex',
    },
]

function Categories(props) {
    console.log(props)
    const router = useRouter()
    const [category, setCategory] = useState({})
    const [categoryList, SetCategoryList] = useState([])
    const [productList, SetProductList] = useState([])
    console.log(router)
    console.log("Product  category", category);
    

    const [showCategory, setShowCategory] = React.useState(false);
    const [openData, setOpenData] = React.useState(true);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openColor, setOpenColor] = React.useState(false);
    const [openPrice, setOpenPrice] = React.useState(false);
    const [openBrand, setOpenBrand] = React.useState(false);
    const [openGender, setOpenGender] = React.useState(false);
    const [colorList, SetColorList] = useState([])
    const [selectedSortBy, setSelectedSortBy] = useState('')
    const [selectedColor, setSelectedColor] = useState([])
    const [gender, setGender] = useState()
    const [brand, setBrand] = useState('')
    const [brandData, setBrandData] = useState([])
    const [selectCategoryByMeta, setSelectCategoryByMeta] = useState('Candles');

    // useEffect(() => {
    //     getCategory()
    //     getColors()
    //     getBrands()
    // }, [router.query])

    useEffect(() => {
        if (router.query?.id) {
            getproductByCategory(router.query?.id)
        }
    }, [router.query])

    const openDrawer = async () => {
        setShowCategory(true)
    };
    const closeDrawer = async () => {
        setShowCategory(false);
    }

    const getCategory = async () => {
        props.loader(true);
        Api("get", "getCategory", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                SetCategoryList(res.data);
                if (router.query.cat_id) {
                    const d = res.data.find((f) => f._id === router.query.cat_id)
                    setCategory(d)

                } else {
                    getproductByCategory()
                    // setCategory(res.data[0])
                }

            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const getBrands = async () => {
        props.loader(true);
        Api("get", "getBrand", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setBrandData(res.data);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const getColors = async () => {
        props.loader(true);
        Api("get", "getcolors", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                SetColorList(res.data?.uniqueColors);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const getproductByCategory = async (cat) => {
        props.loader(true);
        let parmas = {}
        let url = `getProductBycategoryId`
        if (cat) {
            parmas.category = cat
        }
        if (router.query.is_top) {
            parmas.is_top = true
        }
        if (router.query.is_new) {
            parmas.is_new = true
        }
        console.log(selectedColor)
        if (selectedSortBy) {
            parmas.sort_by = selectedSortBy
        }
        if (selectedColor) {
            parmas['colors[]'] = selectedColor
            // selectedColor.forEach((f) => {
            //     parmas=parmas.Append
            //     parmas['colors[]'] = f
            // })

        }
        if (brand) {
            parmas.brand = brand
        }
        if (gender) {
            parmas.gender = gender
        }
        Api("get", url, "", router, parmas).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                SetProductList(res.data)
                setShowCategory(false);
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

    // Add meta title for category based
     
    const addMetaTitle = () => {
        if (productList.length > 0) {
            const productCategoryName = productList[0].category.name;
    
            if (productCategoryName === "Candles") {
                return {
                    title: "XO Candles | Premium Soy Wax Candles for Elegant Living",
                    description: "Experience the elegance of XO Candles’ premium soy wax candles. Hand-poured with care, our collection enhances your home with rich fragrances and inviting warmth.",
                    hreflink: `${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/categories/Candles`
                    
                };
            } else if (productCategoryName === "Fragrance") {
                return {
                    title: "XO Candles Fragrances | Premium Scents to Transform Your Space",
                    description: "Explore XO Candles' luxurious fragrance collection. Handcrafted scents designed to elevate your space with lasting, elegant aromas for a warm and inviting atmosphere.",
                    hreflink: `${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/categories/Fragrance`
                };
            }
        }
        
        return {
            title: "XO Candles | Explore Our Collection",
            description: "Discover the best in candles and fragrances",
            hreflink: `${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/categories/Candles`
        }
    }
    const { title , description, hreflink } = addMetaTitle();
    

    return (
        <div className="bg-white w-full min-h-screen">

            {/* Add meta title */}
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />

                <link rel='canonical' href={hreflink} />
             </Head>

            {/* Add meta title */}

            <section className="bg-cwhite w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5">

                    <div className='mb-5'>
                        <div className='bg-white h-max border border-[#00000010] rounded-[20px] md:w-40 w-full md:p-5 p-3' onClick={openDrawer}>
                            <div className='flex justify-between items-center'>
                                {/* border-b border-[#00000010]   pb-5*/}
                                <p className='text-xl text-black font-normal AbrilFatface'>Filters</p>
                                <img className='w-[20px] h-[18px]' src='/filtersIcon.png' />
                            </div>

                        </div>
                        {categoryList.map((item) => (<div key={item._id} className='flex justify-between items-center pt-5 cursor-pointer' onClick={() => { setCategory(item) }}>
                            <p className={`text-bas font-normal AnonymousPro ${item._id === category._id ? 'text-[#000000]' : 'text-[#00000060]'} `}>{item.name}</p>
                            <MdNavigateNext className={`text-xl ${item._id === category._id ? 'text-[#000000]' : 'text-[#00000060]'} `} />
                        </div>))}


                        <Drawer open={showCategory} onClose={closeDrawer} >
                            <div className='w-[310px] relative'>
                                <div className="flex items-center justify-between border-b border-custom-newLightGray p-5">
                                    <p className='text-black text-2xl font-normal AbrilFatface'>Filters</p>
                                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </IconButton>
                                </div>

                                <div className='w-full p-5 pb-[70px]'>

                                    <div className='border-b border-custom-newLightGray'>
                                        <div className='flex justify-between items-center w-full  pb-5'>
                                            <p className='text-black text-lg font-bold AnonymousPro'>Sort By</p>
                                            {!openData && <FaCircleChevronDown className='text-lg text-custom-newDarkGray' onClick={() => { setOpenData(true); console.log(showCategory) }} />}
                                            {openData && < FaCircleChevronUp className='text-lg text-custom-newDarkGray' onClick={() => setOpenData(false)} />}
                                        </div>
                                        {openData && <FormControl className=''>
                                            <FormGroup className='flex flex-col' >
                                                {sortByData.map((item, i) => (<FormControlLabel key={i}
                                                    control={
                                                        <Checkbox onChange={() => {
                                                            if (selectedSortBy === item?.value) {
                                                                setSelectedSortBy('')
                                                            } else {
                                                                setSelectedSortBy(item?.value)
                                                            }

                                                        }}
                                                            checked={item?.value === selectedSortBy}
                                                        />}
                                                    label={item?.name} />))}
                                            </FormGroup>
                                        </FormControl>}
                                    </div>



                                    {/* <div className='border-b border-custom-newLightGray w-full'>
                                            <div className='flex justify-between items-center w-full  py-5'>
                                                <p className='text-black text-lg font-bold AnonymousPro'>Color</p>
                                                {!openColor && <FaCircleChevronDown className='text-lg text-custom-newDarkGray' onClick={() => { setOpenColor(true) }} />}
                                                {openColor && < FaCircleChevronUp className='text-lg text-custom-newDarkGray' onClick={() => setOpenColor(false)} />}
                                            </div>
                                            <div className='flex  justify-start items-start w-full gap-3 flex-wrap mb-3 '>
                                                {openColor && colorList?.map((item, i) => (<p key={i} className={`w-5 h-5  rounded-full border border-black  ${selectedColor.includes(item) && 'outline outline-offset-2 outline-2'}`} style={{ backgroundColor: item }}
                                                    onClick={() => {
                                                        if (!selectedColor.includes(item)) {
                                                            selectedColor.push(item);
                                                            setSelectedColor([...selectedColor])
                                                        } else {
                                                            const newData = selectedColor.filter(f => f !== item)
                                                            setSelectedColor(newData)
                                                        }
                                                    }}
                                                ></p>))}
                                            </div>
                                        </div>

                                        <div className='border-b border-custom-newLightGray'>
                                            <div className='flex justify-between items-center w-full  py-5'>
                                                <p className='text-black text-lg font-bold AnonymousPro'>Brand</p>
                                                {!openBrand && <FaCircleChevronDown className='text-lg text-custom-newDarkGray' onClick={() => { setOpenBrand(true) }} />}
                                                {openBrand && < FaCircleChevronUp className='text-lg text-custom-newDarkGray' onClick={() => setOpenBrand(false)} />}
                                            </div>
                                            {openBrand && <FormControl className=''>
                                                <FormGroup className='flex flex-col' >
                                                    {brandData.map((item, i) => (<FormControlLabel key={i}
                                                        control={
                                                            <Checkbox
                                                                onChange={() => {
                                                                    if (brand === item?._id) {
                                                                        setBrand('')
                                                                    } else {
                                                                        setBrand(item?._id)

                                                                    }
                                                                }}
                                                                checked={item?._id === brand}
                                                            />}
                                                        label={item?.name} />))}
                                                </FormGroup>
                                            </FormControl>}
                                        </div>

                                        <div className='border-b border-custom-newLightGray'>
                                            <div className='flex justify-between items-center w-full  py-5'>
                                                <p className='text-black text-lg font-bold AnonymousPro'>Gender</p>
                                                {!openGender && <FaCircleChevronDown className='text-lg text-custom-newDarkGray' onClick={() => { setOpenGender(true) }} />}
                                                {openGender && < FaCircleChevronUp className='text-lg text-custom-newDarkGray' onClick={() => setOpenGender(false)} />}
                                            </div>
                                            {openGender && <FormControl className=''>
                                                <FormGroup className='flex flex-col' >
                                                    {genderData.map((item, i) => (<FormControlLabel key={i}
                                                        control={<Checkbox
                                                            onChange={() => {
                                                                if (gender === item?.name) {
                                                                    setGender('')
                                                                } else {
                                                                    setGender(item?.name)

                                                                }
                                                            }}
                                                            checked={item?.name === gender}
                                                        />}
                                                        label={item?.name} />))}
                                                </FormGroup>
                                            </FormControl>}
                                        </div> */}

                                    <div className='mt-5 !z-50 fixed bottom-0  flex justify-center items-center'>
                                        <button className='bg-black !w-[270px] h-[50px] rounded text-white text-lg font-bold flex justify-center items-center' onClick={() => getproductByCategory(router.query.id)}>Apply</button>
                                    </div>

                                </div>

                            </div>

                        </Drawer>
                    </div>

                    {/* <div className='grid md:grid-cols-4 grid-cols-1 w-full md:gap-5'> */}




                    {/* <div className='col-span-3'>
                                <div className=' '>
                                    <p className='md:text-[32px] text-2xl text-black font-normal md:mb-5 md:py-0 py-3 AbrilFatface'>{category?.name}</p> */}
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        {productList.map((item, i) => (
                            <div key={i} className={`w-full ${router?.query?.type === 'XO Candles' ? 'bg-white border border-custom-offWhite' : 'bg-white border border-[#00000040]'} flex flex-col justify-center items-center `} onClick={() => { router.push(`/product-details/${item?._id}`) }}>
                              <img className="md:h-[300px] h-full text-gray-500 w-full md:my-10 my-0 object-contain" 
                                onError={imageOnError}   src={item?.varients[0]?.image[0] || '/default-product-image.png'}
                                alt={item.category.name == "Candles" ? 'Handcrafted soy wax candles with unique fragrances and perfume notes by XO Candles':'Luxury fragrance bottles showcasing exquisite scents and perfumes from XO Candles'}
                                width="100%"
                                height="100%"
                            />
                            <p className="text-black md:text-xl text-lg font-normal border-t border-t-custom-offWhite w-full text-center pt-3">{item?.name}</p>
                            <p className="text-[#00000070] font-normal md:text-lg text-base md:pb-5 pb-3 pt-3">From ${item?.price} AUD</p>
                        </div>))}
                        {/* {productList.map((item, i) => (<Card item={item} i={i} url={`/product-details/${item?._id}?from=categories`} />))} */}
                    </div>

                    {productList?.length === 0 && <div className="flex justify-center items-center h-[500px]">
                        <p className="text-black text-xl font-bold">No product for now !</p>
                    </div>}

                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}

                </div>
            </section>
        </div>
    )
}

export default Categories
