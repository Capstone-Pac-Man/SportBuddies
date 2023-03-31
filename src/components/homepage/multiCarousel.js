import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function MultiCarousel({ items }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1380 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1380, min: 1024 },
      items: 3,
    },
    smalltablet: {
      breakpoint: { max: 1024, min: 730 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 730, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      style={{ maxWidth: "100%" }}
      containerClass={
        items.length === 1
          ? "one-items"
          : items.length === 2
          ? "two-items"
          : "react-multi-carousel-list"
      }
      responsive={responsive}
      infinite={true}>
      {items.map((item) => {
        return item;
      })}
    </Carousel>
  );
}
