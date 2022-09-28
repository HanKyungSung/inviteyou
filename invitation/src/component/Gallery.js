import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import  { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import galleryImg from "../assets/img/img-gallery.jpg";

import { FreeMode, Navigation, Thumbs } from "swiper";

const Gallery = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <section className="gallery">
            <h2 className="section-tit">our gallery</h2>
            {/* gallery */}
            <div className="swiperType01">
                <Swiper
                    style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={false}
                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="swiperType01-main"
                >
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="swiperType01-thumb "
                >
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={galleryImg} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default Gallery