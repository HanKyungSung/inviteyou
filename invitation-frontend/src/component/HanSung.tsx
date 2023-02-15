import React, { useEffect, useState } from 'react';
import { Input, Radio, Modal } from '@mantine/core';
import { sendRsvpApi } from '../utils/rsvpUtils';
import { getIcsFile } from '../utils/calendarUtils';
import iconTel2 from '../assets/img/icon-tel2.png';
import IconSlash from '../assets/img/icon-slash.png';
import titleDeco from '../assets/img/section-tit-deco-han.png';
import surveyDeco from '../assets/img/visuan-han-deco1.png';
import imgHan from '../assets/img/hansung/img-han.png';
import imgLee from '../assets/img/hansung/img-lee.png';
import map from '../assets/img/map-han.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import soundOn from '../assets/img/icon-sound-on.png';
import soundOff from '../assets/img/icon-sound-off.png';

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
  },
  description: {
    fontSize: "14px !important",
    marginLeft: "12px !important",
    marginTop:"5px !important",
    fontFamily: "KoPub Batang",
    color: "#39393b !important"
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
  const { subdomain } = props;
  const [audio] = useState(new Audio(require("../assets/music/SnapInsta.io - sarah vaughan - A Lover's concerto (128 kbps).mp3")));
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
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
    audio.loop = true;
    audio.autoplay = true;
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

  const handleMusicPlaying = () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const imgs: string[] = [
    require('../assets/img/hansung/DSC_0735.jpg'),
    require('../assets/img/hansung/DSC_0799.jpg'),
    require('../assets/img/hansung/DSC_0932.jpg'),
    require('../assets/img/hansung/DSC_1020.jpg'),
    require('../assets/img/hansung/DSC_1219.jpg'),
    require('../assets/img/hansung/DSC_1304.jpg'),
    require('../assets/img/hansung/DSC_1336.jpg'),
    require('../assets/img/hansung/DSC_1364.jpg'),
    require('../assets/img/hansung/DSC_1590.jpg'),
    require('../assets/img/hansung/DSC_1780.jpg'),
    require('../assets/img/hansung/DSC_2035.jpg'),
    require('../assets/img/hansung/DSC_2070.jpg'),
    require('../assets/img/hansung/DSC_2203.jpg'),
    require('../assets/img/hansung/DSC_2231.jpg'),
    require('../assets/img/hansung/DSC_2284.jpg'),
    require('../assets/img/hansung/0D1A1871_.jpg'),
    require('../assets/img/hansung/0D1A1955_.jpg'),
    require('../assets/img/hansung/0D1A1985_.jpg'),
    require('../assets/img/hansung/0D1A2036_.jpg'),
    require('../assets/img/hansung/0D1A2075_.jpg'),
    require('../assets/img/hansung/0D1A2132_.jpg'),
    require('../assets/img/hansung/0D1A2205_.jpg'),
    require('../assets/img/hansung/0D1A2243_.jpg'),
    require('../assets/img/hansung/0D1A2326_.jpg'),
    require('../assets/img/hansung/0D1A2342_.jpg'),
  ];

  const slides: JSX.Element[] = imgs.map((img) => {
    return (
      <div key={`side-${img}`}>
        <img src={img} alt={`Slide $(item)`} />
      </div>
    )
  });

  return (
    <>
      <Modal
        centered
        onClose={() => setModalInfo({ ...initModalInfo, opened: false })}
        opened={modalInfo.opened}
        title={`${modalInfo.submitInfo.name}님 설문 참여가 완료되었습니다 :)`}
        styles={{
          title: {
            fontFamily: "KoPub Batang",
            color: "#444",
            fontWeight: 700,
            margin: 0
          },
          body: {
            fontFamily: "KoPub Batang",
            fontSize: '14px',
            lineHeight: '1.5',
            color: "#666"
          }
        }}
      >
        {modalInfo.submitInfo.rsvp === "yes" ?
          <div className="survey-comment">
            <p>
              결혼식에 참석해주셔서 감사합니다.
              <br /><br />
              작성하신 설문 내용 확인 후, <br />
              수정사항이 있으시거나 참석이 어려우실 경우, <br />
              <a href={`tel:604-779-5421`} style={{color: '#666', textDecoration: 'none'}}>236.777.5421</a>로 문자 부탁드립니다. <br />
            </p>
            <p style={{color: '#ED8986', fontWeight: 700, marginTop: 50, fontSize: 16}}>
              참석 여부 : {modalInfo.submitInfo.rsvp}<br />
              메뉴 : {modalInfo.submitInfo.menu}<br />
              기타사항 : {modalInfo.submitInfo.note}
            </p>
            <figure style={{position:'absolute', right: 0, bottom: 0, margin: 0}}>
              <img src={surveyDeco} alt="surveyDeco" style={{maxHeight: 180}}/>
            </figure>
          </div>
          :
          <div className="survey-comment">
            <p>
              결혼식에서 뵙지 못해 아쉽습니다.
              <br /><br />
              응원에 힘입어 이쁜 신혼생활 하는 모습 <br />
              보여 드리겠습니다. ^^
              <br /><br />
              수정사항이 있으시거나 참석이 가능하실 경우, <br />
              <a href={`tel:604-779-5421`} style={{color: '#666', textDecoration: 'none'}}>236.777.5421</a>로 문자 부탁드립니다.     
            </p>
            <p style={{color: '#ED8986', fontWeight: 700, marginTop: 50, fontSize: 16}}>
              참석 여부 : {modalInfo.submitInfo.rsvp}<br />
              기타사항 : {modalInfo.submitInfo.note}
            </p>
            <figure style={{position:'absolute', right: 0, bottom: 0, margin: 0}}>
              <img src={surveyDeco} alt="surveyDeco" style={{maxHeight: 180}}/>
            </figure>
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
          <div className="wedding-details">
            <p className="wedding-name">이다연 그리고 성한경</p>
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
                label="메뉴"
                required
                orientation="vertical"
                value={menu}
                styles={radioGroupStyle}
                onChange={(menu) => handleOnChangeMenuInput(menu)}
                error={menu === "" && !initForm ? MENU_INPUT_ERROR : ""}
              >
                <Radio
                  name="menu"
                  label="Beef"
                  value="beef"
                  description="Pomme Puree, Seasonal Vegetables, Fig Jus (GF)"
                  styles={radioButtonStyle}
                />
                <Radio
                  name="menu"
                  label="Fish"
                  value="fish"
                  description="Quinoa, Seasonal Vegetables, Baby Shrimp, Sun dried Tomato sauce, Basil & Mint Vinagrette (GF)"
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
                placeholder="알러지 등 기타 사항을 작성해주세요."
                onChange={(e) => setNote(e.currentTarget.value)}
              ></textarea>
            </span>
            <button className='custom-button' type="submit">설문지 제출하기</button>
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
            <Carousel
              showArrows={true}
              useKeyboardArrows={true}
              dynamicHeight={true}
              showStatus={false}
              showIndicators={false}
            >
              {slides}
            </Carousel>
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
          <div>
            <dl>
              <dt>Hart House Restaurant</dt>
              <dd>6664 Deer Lake Ave, Burnaby, BC</dd>
              <dd>V5E 4H3, Canada</dd>
              <dd>604. 298. 4278</dd>
            </dl>
            <figure className="map">
              <img src={map} alt="map" />
            </figure>
            <button className="custom-button">
              <a href="https://goo.gl/maps/i4espr2pBkWbwCjH6">
                지도에서 위치 확인하기
              </a>
            </button>
          </div>
        </section>
        <div className="sound" onClick={() => handleMusicPlaying()}>
          {!isMusicPlaying ? (
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
