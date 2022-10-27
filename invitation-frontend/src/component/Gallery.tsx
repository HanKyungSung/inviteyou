import { FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import  { useState } from "react";
import { ColorResult } from "react-color";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface GalleryProps {
	mainColor: ColorResult,
}

const Gallery = (props: GalleryProps) => {
	const [ thumbsSwiper, setThumbsSwiper ] = useState(null);
	const { mainColor } = props;
	const slides = [];
	const mainColorRgb = `rgb(${mainColor.rgb.r}, ${mainColor.rgb.g}, ${mainColor.rgb.b}, ${mainColor.rgb.a})`

	for (let i = 0; i < 10; i ++){
		const img = require(`../assets/img/img-gallery${i + 1}.jpg`)
		slides.push(
			<SwiperSlide key={`slide-${i}`} tag="li">
				<figure>
					<img 
					src={img}
					alt={`Slide ${i}`}
					className="swiper-lazy"
					/>
				</figure>
			</SwiperSlide>
		)
	}

	return (
		<section className="gallery">
			<h2 className="section-tit" style={{ color: mainColorRgb }}>our gallery</h2>
			<div className="swiperType01">
				<Swiper
					wrapperTag="ul"
					spaceBetween={10}
					navigation={false}
					thumbs={{swiper: thumbsSwiper && !thumbsSwiper ? thumbsSwiper : null}}
					modules={[FreeMode, Thumbs]}
					className="swiperType01-main"
				>
					{slides}	
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
					{slides}
				</Swiper>
			</div>
		</section>
	)
}

export default Gallery;
