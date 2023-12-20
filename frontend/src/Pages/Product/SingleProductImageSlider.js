import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleProductImageSlider = ({ data }) => {
  // data is the product
  const settings = {
    infinte: true,
    accessibility: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    swipeToSlide: true,
  };
  return (
    <>
      <Slider {...settings}>
        {data.images.map((imageSrc) => (
          <div className="imageContainer h-1/2 w-full ">
            <img
              src={imageSrc}
              alt={data.name}
              className="hover:scale-150 cursor-zoom-in duration-200 p-1 object-cover w-full aspect-square "
            ></img>
          </div>
        ))}
      </Slider>
      <style>{`
        .slick-prev {
          left: 0;
          z-index: 1;
          color:black;
        }

        .slick-next {
          right: 0;
          z-index: 1;
        }
.slick-prev:before {
    content: '←';
    color:gray;
}
    .slick-next:before {
    content: '→';
       color:gray;
}
.slick-dots{
  bottom:7px;
}
      `}</style>
    </>
  );
};

export default SingleProductImageSlider;
