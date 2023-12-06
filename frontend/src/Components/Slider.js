import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = ({ data }) => {
  // data is the product
  const settings = {
    infinte: true,
    accessibility: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    swipeToSlide: true,
  };
  return (
    <>
      <Slider {...settings}>
        {data.images.map((imageSrc) => (
          <div className="imageContainer">
            <img
              src={imageSrc}
              alt={data.name}
              className="w-full max-h-44 p-1 object-cover "
            ></img>
          </div>
        ))}
      </Slider>
      <style>{`
        .slick-prev {
          left: 0;
          z-index: 1;
        }

        .slick-next {
          right: 0;
          z-index: 1;
        }
.slick-prev:before {
    content: '←';
    color:black;
}
    .slick-next:before {
    content: '→';
    color: black;
}
.slick-dots{
  bottom:7px;
}
      `}</style>
    </>
  );
};

export default SliderComponent;
