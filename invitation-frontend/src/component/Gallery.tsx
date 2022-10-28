import { FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { ColorResult } from 'react-color';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface GalleryProps {
  mainColor: ColorResult;
}

const Gallery = (props: GalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { mainColor } = props;
  const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`;

  const slides: string[] = [
    require('../assets/img/img-gallery1.jpg'),
    require('../assets/img/img-gallery2.jpg'),
    require('../assets/img/img-gallery3.jpg'),
    require('../assets/img/img-gallery4.jpg'),
    require('../assets/img/img-gallery5.jpg'),
    require('../assets/img/img-gallery6.jpg'),
    require('../assets/img/img-gallery7.jpg'),
    require('../assets/img/img-gallery8.jpg'),
    require('../assets/img/img-gallery9.jpg'),
    require('../assets/img/img-gallery10.jpg')
  ];

  const slide = slides.map((item) => {
    const img = item;

    return (
      <SwiperSlide key={`slide-${item}`} tag="li">
        <figure>
          <img src={img} alt={`Slide ${item}`} className="swiper-lazy" />
        </figure>
      </SwiperSlide>
    );
  });

  return (
    <section className="gallery">
      <h2 className="section-tit" style={{ color: mainColorRgb }}>
        our gallery
      </h2>
      <div className="swiperType01">
        <Swiper
          wrapperTag="ul"
          spaceBetween={10}
          navigation={false}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper ? thumbsSwiper : null
          }}
          modules={[FreeMode, Thumbs]}
          className="swiperType01-main"
        >
          {slide}
        </Swiper>
        <Swiper
          wrapperTag="ul"
          onSwiper={() => setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="swiperType01-thumb"
        >
          {slide}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
