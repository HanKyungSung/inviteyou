import React, { ReactHTML, useEffect, useState } from 'react';
import { Navigation, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Input, Radio, Notification, Modal } from '@mantine/core';
import { sendRsvpApi } from '../utils/rsvpUtils';
import { getIcsFile } from '../utils/calendarUtils';
import visualImg from '../assets/img/visual-han.jpg';
import iconTel2 from '../assets/img/icon-tel2.png';
import IconSlash from '../assets/img/icon-slash.png';
import titleDeco from '../assets/img/section-tit-deco-han.png';
import imgHan from '../assets/img/img-han.png';
import imgLee from '../assets/img/img-lee.png';
import map from '../assets/img/map-han.png';
import soundOn from '../assets/img/icon-sound-on.png';
import soundOff from '../assets/img/icon-sound-off.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface HanSung {
  subdomain: string;
}

interface SubmitInfo {
  name: string;
  rsvp: string;
  menu: string;
  note: string;
}
interface ModalInfo {
  opened: boolean;
  submitInfo: SubmitInfo;
}

const radioGroupStyle = {
  root: {
    fontFamily: "KoPub Batang",
    marginBottom: "16px !important"
  },
  required: {
    color: 'red !important'
  },
  label: {
    marginBottom: "16px !important"
  },
  error: {
    color: 'red !important',
    fontFamily: "KoPub Batang",
    marginTop: "10px !important"
  }
};

const radioButtonStyle = {
  body: {
    cursor: "pointer"
  },
  icon: {
    color: "#C9736E",
    width: "12px",
    height: "12px",
    top: "calc(50% - 6px)",
    left: "calc(50% - 6px)",
    cursor: "pointer"
  },
  radio: {
    cursor: "pointer",
    ":checked": {
      backgroundColor: "#fff",
      border: "1px solid #C9736E"
    },
    "&::after": {
      backgroundColor: "#C9736E",
      borderColor: "#C9736E"
    }
  },
  inner: {
    cursor: "pointer"
  },
  label: {
    paddingLeft: "10px !important",
    fontFamily: "KoPub Batang",
    cursor: "pointer"
  }
};

const NAME_INPUT_ERROR = "필수로 입력하세요";
const RSVP_INPUT_ERROR = "참석여부를 골라주세요";
const MENU_INPUT_ERROR = "메인메뉴를 골라주세요";

const initModalInfo: ModalInfo = {
  opened: false,
  submitInfo: {
    name: "",
    rsvp: "",
    menu: "",
    note: ""
  }
};

const HanSung = (props: HanSung) => {
  const audio = new Audio('../assets/music/music_han.mp3');
  const { subdomain } = props;
  const [isMusicActive, setIsMusicActive] = useState<boolean>(true);
  const [initForm, setInitForm] = useState<boolean>(true);
  const [initNameInput, setInitNameInput] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [rsvp, setRsvp] = useState<string>("");
  const [menu, setMenu] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [isRsvpValidated, setIsRsvpValidated] = useState<boolean>(false);
  const [isMenuValidated, setIsMenuValidated] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>(initModalInfo);

  useEffect(() => {
  }, []);

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // If user submit at least once, the form status no longer init.
    setInitForm(false);

    // Perform the validation
    if (!isNameValidated) {
      setName("");
    }
    
    if (!isRsvpValidated) {
      setRsvp("");
    }

    if (!isMenuValidated) {
      setMenu("");
    }

    if (isNameValidated && isRsvpValidated) {
      if (rsvp === "yes" && isMenuValidated) {
        handleSendApi();
      } else if (rsvp === "no") {
        handleSendApi();
      }
      console.log(name, rsvp, menu, note);
    }
  };

  const resetForm = () => {
    setInitForm(true);
    setInitNameInput(true);

    setName("");
    setRsvp("");
    setMenu("");
    setNote("");
    
    setIsNameValidated(false);
    setIsRsvpValidated(false);
    setIsMenuValidated(false);
  };

  const handleSendApi = () => {
    sendRsvpApi({
      name: name,
      participate: rsvp,
      menu: menu,
      note: note,
      subdomain
    });

    setModalInfo({
      opened: true,
      submitInfo: {
        name: name,
        rsvp: rsvp,
        menu: menu,
        note: note
      }
    });

    resetForm();
  };

  const handleOnChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;

    setName(newName);
    setInitNameInput(false);

    if (newName === "") {
      setIsNameValidated(false);
    } else {
      setIsNameValidated(true);
    }
  };

  const handleOnChangeRsvpInput = (answer: string) => {
    setRsvp(answer);

    if (answer === "no") {
      setMenu("");
      setIsMenuValidated(false);
    }

    if (answer === "") {
      setIsRsvpValidated(false);
    } else {
      setIsRsvpValidated(true);
    }
  };

  const handleOnChangeMenuInput = (menu: string) => {
    setMenu(menu);

    if (menu === "") {
      setIsMenuValidated(false);
    } else {
      setIsMenuValidated(true);
    }
  };

  const handleMusicPlay = () => {
    setIsMusicActive(!isMusicActive);
    if (isMusicActive) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const slides: string[] = [
    require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg'),
    // require('../assets/img/img-gallery-han-1.jpg')
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
    <>
      <Modal
        centered
        onClose={() => setModalInfo({ ...initModalInfo, opened: false })}
        opened={modalInfo.opened}
        title={`${modalInfo.submitInfo.name}님 감사합니다.`}
        styles={{
          title: {
            fontFamily: "KoPub Batang"
          },
          body: {
            fontFamily: "KoPub Batang"
          }
        }}
      >
        {modalInfo.submitInfo.rsvp === "yes" ?
          <div>
            4월29일날 뵙겠습니다.
          </div>
          :
          <div>
            아쉽지만 다음에뵙겠습니다.
          </div>
        }
      </Modal>
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
                    <span
                      className="circle"
                      onClick={() => getIcsFile('we')}
                      style={{
                        cursor: "pointer"
                      }}
                    >
                      29
                    </span>
                    <span className="time">오전 11시</span>
                  </td>
                </tr>
                <tr>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{
              color: '#888',
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '14px',
              padding: '15px 0',
              borderTop: '1px solid #eee',
              borderBottom: '1px solid #eee'
          }}>
            일자를 클릭해서 캘린더에 추가하실 수 있어요!
          </p>
        </section>
        <section className="rsvp rsvpType02">
          <h2 className="section-tit">결혼식 설문지</h2>
          <span className="title-devider">
            <figure>
              <img src={titleDeco} alt="titleDeco" />
            </figure>
          </span>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Input.Wrapper
              id="name-input"
              label="성함"
              withAsterisk
              error={name === "" && (!initNameInput || !initForm) ? NAME_INPUT_ERROR : ""}
              styles={{
                root: {
                  marginBottom: "16px !important"
                },
                required: {
                  color: 'red !important'
                },
                label: {
                  fontFamily: "KoPub Batang"
                },
                error: {
                  color: 'red !important',
                  fontFamily: "KoPub Batang",
                  marginTop: "10px !important"
                }
              }}
            >
              <Input
                id="name-input"
                placeholder="성함을 입력해주세요"
                variant="unstyled"
                name="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangeNameInput(e)}
                styles={{
                  wrapper: {
                    "input::placeholder": {
                      margin: "16px 0",
                      fontSize: "16px"
                    },
                    padding: "16px 0 10px 0 !important",
                    borderBottom: "1px solid #aaa !important"
                  },
                  input: {
                    fontSize: "16px",
                    fontFamily: "KoPub Batang"
                  }
                }}
              />
            </Input.Wrapper>
            <Radio.Group
              label="참석여부"
              required
              value={rsvp}
              styles={radioGroupStyle}
              onChange={(answer) => handleOnChangeRsvpInput(answer)}
              error={rsvp === "" && !initForm ? RSVP_INPUT_ERROR : ""}
            >
              <Radio
                name="participate"
                label="예"
                value="yes"
                styles={radioButtonStyle}
              />
              <Radio
                name="participate"
                label="아니요"
                value="no"
                styles={radioButtonStyle}
              />
            </Radio.Group>
            {/* beef chicken lasagna fish */}
            {rsvp === "yes" &&
              <Radio.Group
                label="차림표"
                required
                value={menu}
                styles={radioGroupStyle}
                onChange={(menu) => handleOnChangeMenuInput(menu)}
                error={menu === "" && !initForm ? MENU_INPUT_ERROR : ""}
              >
                <Radio
                  name="menu"
                  label="BEEF"
                  value="beef"
                  styles={radioButtonStyle}
                />
                <Radio
                  name="menu"
                  label="FISH"
                  value="fish"
                  styles={radioButtonStyle}
                />
              </Radio.Group>
            }
            <span className="input-wrap">
              <label htmlFor="note">알러지 등 기타 사항을 작성해주세요.</label>
              <textarea
                name="note"
                id="note"
                cols={30}
                rows={10}
                value={note}
                defaultValue=""
                placeholder="알러지 등 기타 사항을 작성해주세요."
                onChange={(e) => setNote(e.currentTarget.value)}
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
          <div className='carousel-wrap'>
              <Carousel>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
                <div>
                    <img src={require('../assets/img/img-gallery-han-1.jpg')} />
                </div>
              </Carousel>
            </div>
          {/* <div className="swiperType01">
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
          </div> */}
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
        <div className="sound" onClick={() => handleMusicPlay()}>
          {!isMusicActive ? (
            <img src={soundOff} alt="sound-off" />
          ) : (
            <img src={soundOn} alt="sound-on" />
          )}
        </div>
      </main>
    </>
  );
};

export default HanSung;
