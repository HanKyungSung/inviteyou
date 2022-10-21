import { FreeMode, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import  { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface GalleryProps {
	mainColor: string
}

const Gallery = (props: GalleryProps) => {
	const [ thumbsSwiper, setThumbsSwiper ] = useState(null);
	const { mainColor } = props;

	const slides: string[] = [
		'img-gallery1.jpg', 
		'img-gallery2.jpg', 
		'img-gallery3.jpg', 
		'img-gallery4.jpg', 
		'img-gallery5.jpg', 
		'img-gallery6.jpg', 
		'img-gallery7.jpg', 
		'img-gallery8.jpg', 
		'img-gallery9.jpg', 
		'img-gallery10.jpg'
	]; 

	const slide = slides.map(item => {
		const img = require(`../assets/img/${item}`);

		return (
			<SwiperSlide key={`slide-${item}`} tag="li">
				<figure>
					<img 
					src={img}
					alt={`Slide ${item}`}
					className="swiper-lazy"
					/>
				</figure>
			</SwiperSlide>
		)
	})

	return (
		<section className="gallery">
			<h2 className="section-tit" style={{ color: mainColor }}>our gallery</h2>
			<div className="swiperType01">
				<Swiper
					wrapperTag="ul"
					spaceBetween={10}
					navigation={false}
					thumbs={{swiper: thumbsSwiper && !thumbsSwiper ? thumbsSwiper : null}}
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
	)
}

export default Gallery;
