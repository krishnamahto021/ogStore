import React from "react";
import Slider from "react-slick";
import ProductCard from "../Pages/Admin/ProductCard";

const HomeSlider = ({ data }) => {
  const settings = {
    infinte: true,
    accessibility: true,
    speed: 500,
    arrows: true,
    slidesToShow: data.length > 5 ? 5 : data.length,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {data?.map((p) => (
          <ProductCard product={p} />
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
    color:gray;
}
    .slick-next:before {
    content: '→';
    color: gray;
}

      `}</style>
    </>
  );
};

export default HomeSlider;
