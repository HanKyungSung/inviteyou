// import { FreeMode, Thumbs } from 'swiper';
import {
  FreeMode,
  Navigation,
  Thumbs,
  EffectCoverflow,
  Pagination
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import visualImg from '../assets/img/visual-han.jpg';
import iconTel2 from '../assets/img/icon-tel2.png';
import IconSlash from '../assets/img/icon-slash.png';
import titleDeco from '../assets/img/section-tit-deco-han.png';
import imgHan from '../assets/img/img-han.png';
import imgLee from '../assets/img/img-lee.png';
import map from '../assets/img/map-han.png';
import soundOn from '../assets/img/icon-sound-on.png';
import soundOff from '../assets/img/icon-sound-on.png';

const Test = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides: string[] = [
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg'),
    require('../assets/img/img-gallery-han-1.jpg')
  ];

  const slide = slides.map((item) => {
    const img = item;

    return (
      <SwiperSlide key={`slide-${item}`}>
        <figure>
          <img src={img} alt={`Slide ${item}`} className="swiper-lazy" />
        </figure>
      </SwiperSlide>
    );
  });

  return (
    <main className="invitation-wrap invitation-test-wrap">
      <section className="visual visualType04">
        <div className="visual-content">
          <div className="wedding-date-tit">
            <span>04</span>
            <span className="slash">
              <img src={IconSlash} alt="IconSlash" />
            </span>
            <span>29</span>
          </div>
          <p className="wedding-opening">
            <span>
              사 <br />
              랑 <br />
              이 <br />
              꽃 <br />
              피 <br />
              는 <br />
              날 <br />
            </span>
            <span>
              저 <br />
              희 <br />
              두 <br />
              사 <br />
              람 <br />
            </span>
          </p>
        </div>
        <figure className="visual-img">
          <img src={visualImg} alt="wedding visual img" />
        </figure>
        <div className="wedding-details">
          <p className="wedding-location">Hart House Restaurant</p>
          <p className="wedding-date">2023년 04월 29일 토요일 오전 11시</p>
        </div>
      </section>
      <section className="intro introType02">
        <h2 className="section-tit">모시는 글</h2>
        <span className="title-devider">
          <figure>
            <img src={titleDeco} alt="titleDeco" />
          </figure>
        </span>
        <p>
          오랜 기다림 속에서 <br />
          저희 두 사람, 한마음 되어 <br />
          참된 사랑의 결실을 맺게 되었습니다. <br />
          오셔서 축복해 주시면 큰 기쁨이겠습니다. <br />
        </p>
        <span className="wedding-character">
          <div className="character-wrap">
            <div className="parent-wrap">
              <div className="parents">성학상 · 이윤희</div>의 장남
            </div>
            <div className="character">성한경</div>
          </div>
          <div className="character-wrap">
            <div className="parent-wrap">
              <div className="parents">이민영 · 유선영</div>의 장녀
            </div>
            <div className="character">이다연</div>
          </div>
        </span>
      </section>
      <section className="calendar calendarType02">
        <div className="calendar-wrap">
          <div className="calendar-month">
            사 <br />
            월 <br />
          </div>
          <table className="calendar-table">
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
              </tr>
              <tr>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
              </tr>
              <tr>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
              </tr>
              <tr>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                <td className="current">
                  <span className="circle">29</span>
                  <span className="time">오전 11시</span>
                </td>
              </tr>
              <tr>
                <td>30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="rsvp rsvpType02">
        <h2 className="section-tit">결혼식 설문지</h2>
        <span className="title-devider">
          <figure>
            <img src={titleDeco} alt="titleDeco" />
          </figure>
        </span>
        <form action="">
          <span className="input-wrap">
            <label htmlFor="name">성함</label>
            <input type="text" name="name" placeholder="성함을 입력해주세요" />
          </span>
          <span className="input-wrap">
            <label htmlFor="">참석 여부</label>
            <span className="radio-wrap">
              <label htmlFor="yes">예</label>
              <input type="radio" name="participate" id="yes" value="yes" />
              <span className="checkmark"></span>
            </span>
            <span className="radio-wrap">
              <label htmlFor="no">아니오</label>
              <input type="radio" name="participate" id="no" value="no" />
              <span className="checkmark"></span>
            </span>
          </span>
          <span className="input-wrap">
            <label htmlFor="menu">차림표</label>
            <span className="radio-wrap">
              <label htmlFor="menu01">차림표 01</label>
              <input type="radio" name="menu" id="menu01" value="menu01" />
              <span className="checkmark"></span>
            </span>
            <span className="radio-wrap">
              <label htmlFor="menu02">차림표 02</label>
              <input type="radio" name="menu" id="menu02" value="menu02" />
              <span className="checkmark"></span>
            </span>
          </span>
          <span className="input-wrap">
            <label htmlFor="note">알러지 등 기타 사항을 작성해주세요.</label>
            <textarea
              name="note"
              id=""
              cols={30}
              rows={10}
              defaultValue="알러지 등 기타 사항을 작성해주세요."
            ></textarea>
          </span>
          <button type="submit">설문지 제출하기</button>
        </form>
      </section>
      <section className="gallery galleryType02">
        <h2 className="section-tit">우리의 기록</h2>
        <span className="title-devider">
          <figure>
            <img src={titleDeco} alt="titleDeco" />
          </figure>
        </span>
        <div className="swiperType01">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.4}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            breakpoints={{
              300: {
                slidesPerView: 1.4
              },
              600: {
                slidesPerView: 2
              }
            }}
            className="mySwiper"
          >
            {slide}
          </Swiper>
        </div>
      </section>
      <section className="contact contactType02">
        <h2 className="section-tit">인사 전할 곳</h2>
        <span className="title-devider">
          <figure>
            <img src={titleDeco} alt="titleDeco" />
          </figure>
        </span>
        <ul className="contact-lists">
          <li className="contact-list">
            <figure className="character-img">
              <img src={imgHan} alt="groomImg" />
            </figure>
            <ul className="contact-infos">
              <li className="contact-info name">
                <div className="name">
                  성한경
                  <span className="position"> / 신랑</span>
                </div>
              </li>
              <li className="contact-info tel">
                <a href={`tel:236-777-5421`}>236.777.5421</a>
              </li>
            </ul>
            <figure className="tel-img">
              <a href={`tel:604-779-5421`}>
                <img src={iconTel2} alt="phone-1" />
                <span className="mobile-hidden">인사 전하기</span>
              </a>
            </figure>
          </li>
          <li className="contact-list">
            <figure className="character-img">
              <img src={imgLee} alt="bride-1" />
            </figure>
            <ul className="contact-infos">
              <li className="contact-info name">
                <div className="name">
                  이다연
                  <span className="position"> / 신부</span>
                </div>
              </li>
              <li className="contact-info tel">
                <a href={`tel:604-77-5421`}>604.779.5421</a>
              </li>
            </ul>
            <figure className="tel-img">
              <a href={`tel:604-779-5421`}>
                <img src={iconTel2} alt="phone-1" />
                <span className="mobile-hidden">인사 전하기</span>
              </a>
            </figure>
          </li>
        </ul>
      </section>
      <section className="location locationType02">
        <h2 className="section-tit">오시는 길</h2>
        <span className="title-devider">
          <figure>
            <img src={titleDeco} alt="titleDeco" />
          </figure>
        </span>
        <div className="location-info">
          <dl>
            <dt>Hart House Restaurant</dt>
            <dd>6664 Deer Lake Ave, Burnaby, BC V5E 4H3, Canada</dd>
            <dd>604. 298. 4278</dd>
          </dl>
          <figure className="map">
            <img src={map} alt="map" />
          </figure>
          <button>
            <a href="https://goo.gl/maps/i4espr2pBkWbwCjH6">
              지도에서 위치 확인하기
            </a>
          </button>
        </div>
      </section>
      <div className="sound">
        <img src={soundOn} alt="sound-on" />
        <img src={soundOff} alt="sound-off" />
      </div>
    </main>
  );
};

export default Test;
