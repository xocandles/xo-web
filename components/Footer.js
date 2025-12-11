import React, { useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import moment from 'moment';
import { FaTiktok } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";

const cards = [
  {
    path: '/cards/amex.svg'
  },
  {
    path: '/cards/master.svg'
  },
  {
    path: '/cards/paypal.svg'
  },
  {
    path: '/cards/a.png'
  },
  // {
  //   path: '/cards/union.svg'
  // },
  {
    path: '/cards/visa.svg'
  },
]

function Footer(props) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState({
    subscriber: "",
  });



  const addSubscriber = (e) => {
    e.preventDefault();
    const data = {
      email: userDetail?.subscriber,
    }
    props.loader(true);
    Api("post", "add-subscriber", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.status) {
          setUserDetail({
            subscriber: "",
          });
          props.toaster({ type: "success", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
      }
    );
  };

  return (
    <div className="bg-black relative md:py-10 py-5 md:px-0 px-5">
      <div className="max-w-7xl  mx-auto h-full">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-5">
          <div className="flex flex-col md:justify-start justify-center md:items-start items-center">
            <p className="text-white text-sm font-bold pb-5 border-b border-white w-full uppercase md:text-start text-center">Social</p>
            <div className="flex flex-row gap-5 pt-5">
              {/* <AiFillFacebook className="w-6 h-6 text-white" /> */}
              <FaInstagram className="w-6 h-6 text-white cursor-pointer" onClick={() => window.open("https://www.instagram.com/xo_candles/", "_blank")} />

              {/* <img className="w-[15px] h-[15px]" src="/facebookImg.png" /> */}
              {/* <img className="w-[15px] h-[15px]" src="/instagramImg.png" /> */}
              {/* onClick={() => window.open("https://www.instagram.com/octopus_gifts_us", "_blank")} */}
            </div>
          </div>

          <div className="flex flex-col md:justify-start justify-center md:items-center items-center">
            <div className="flex flex-col md:items-start items-center w-full">
              <p className="text-white text-sm font-bold pb-5 uppercase border-b border-white w-full md:text-start text-center">Support</p>
              <p className="text-white text-sm font-normal cursor-pointer py-5 uppercase" onClick={() => { router.push('/contact') }}>Contact Us</p>
              {/* <p className="text-white text-sm font-normal cursor-pointer pb-5 uppercase" onClick={() => { router.push('/shipping') }}>Shipping</p> */}
              <p className="text-white text-sm font-normal cursor-pointer pb-5 uppercase" onClick={() => { router.push('/refund-shipping-policy') }}>REFUND & SHIPPING POLICY</p>
              <p className="text-white text-sm font-normal cursor-pointer pb-5 uppercase" onClick={() => { router.push('/terms-service') }}>Terms of Service</p>
              <p className="text-white text-sm font-normal cursor-pointer uppercase" onClick={() => { router.push('/privacy-policy') }}>Privacy Policy</p>

            </div>
          </div>

          <div className="flex flex-col md:justify-start justify-center md:items-center items-center">
            <div className="flex flex-col md:items-start items-center w-full">
              <p className="text-white text-sm font-bold pb-5 uppercase border-b border-white w-full md:text-start text-center">Disclaimer</p>
              <p className="text-white text-sm font-normal cursor-pointer pt-5 md:text-start text-center" >Our products are not intended to diagnose, cure or prevent any disease. If a
                condition persists, please contact your physician or health care provider. The
                information provided by our website or our company is not a substitute for a
                face-to-face consultation with a health care provider, and should not be
                construed as individual medical advice.</p>
            </div>
            <div className="w-full mt-10 flex justify-end gap-3">
              {cards.map((card, i) => (<div className="h-8 w-12 " key={i}>
                <img src={card.path} className="rounded-md h-max object-cover" height={'100%'} width={'100%'} />
              </div>))}

            </div>
          </div>

        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto h-full md:pb-0 pb-20"></div> */}
    </div>
  );
}

export default Footer;
