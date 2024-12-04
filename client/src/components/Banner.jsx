import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { get_banners } from "../store/reducers/homeReducer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(get_banners());
  }, []);


  const CustomLeftArrow = ({ onClick }) => {

    if (window.innerWidth <= 785) return null;
    return (
    <></>
    );
  };

  return (
    <div className="w-full">
      <div className="w-[85%] lg:w-[90%] mx-auto br">
        <div className="w-full flex flex-wrap">
          <div className="w-full">
            <div className="">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={false}
                responsive={responsive}
                customLeftArrow={<CustomLeftArrow />}
              >
                <Link className="lg-md:h-[440px] h-auto w-full block">
                  <img
                    className="nex_banner_img"
                    src="http://localhost:3001/images/banner/banner_nexigo_gray_one.svg"
                    alt=""
                  />
                </Link>
                <Link className="lg-md:h-[440px] h-auto w-full block">
                  <img
                    className="nex_banner_img"
                    src="http://localhost:3001/images/banner/banner_nexigo_gold.svg"
                    alt=""
                  />
                </Link>
                <Link className="lg-md:h-[440px] h-auto w-full block">
                  <img
                    className="nex_banner_img"
                    src="http://localhost:3001/images/banner/banner_nexigo_primary.svg"
                    alt=""
                  />
                </Link>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
