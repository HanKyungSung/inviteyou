import React, { useEffect, useState, useRef } from 'react';
import { IconPlus, IconMinus } from '@tabler/icons';
import { Input, Radio, Modal, NumberInput, NumberInputHandlers, ActionIcon, Text, MantineProvider, Container, Image } from '@mantine/core';
import { sendRsvpApiSecondVersion } from '../utils/rsvpUtils';
import { getIcsFile } from '../utils/calendarUtils';
import imgSam from '../assets/img/samhan/img-sam.png';
import imgEunhee from '../assets/img/samhan/img-eunhee.png';
import map from '../assets/img/samhan/map.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import soundOn from '../assets/img/icon-sound-on.png';
import soundOff from '../assets/img/icon-sound-off.png';
import { useMediaQuery } from '@mantine/hooks';
import { ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { SamHanStyles } from '../style/SanHan';

const useStyles = SamHanStyles();

interface SamHan {
  subdomain: string;
  min?: number;
  max?: number;
}

interface SubmitInfo {
  name: string;
  rsvp: string;
  adultCount: number;
  childCount: number;
  note: string;
}
interface ModalInfo {
  opened: boolean;
  submitInfo: SubmitInfo;
}

const radioGroupStyle = {
  root: {
    marginBottom: "16px !important"
  },
  required: {
    color: 'red !important'
  },
  label: {
    fontSize: 16,
    marginBottom: "16px !important"
  },
  error: {
    color: 'red !important',
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
    fontSize: 16,
    paddingLeft: "10px !important",
    cursor: "pointer"
  },
  description: {
    fontSize: "14px !important",
    marginLeft: "12px !important",
    marginTop:"5px !important",
    color: "#39393b !important"
  }
};

const NAME_INPUT_ERROR = "Please enter the required field";
const RSVP_INPUT_ERROR = "Please choose your attendance";
const ADULT_COUNT_ERROR = "Please enter the adult count";

const initModalInfo: ModalInfo = {
  opened: false,
  submitInfo: {
    name: "",
    rsvp: "",
    adultCount: 0,
    childCount: 0,
    note: ""
  }
};

const SamHan = (props: SamHan) => {
  let min = 0;
  let max = 10;
  const { subdomain } = props;
  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { classes } = useStyles();
  const adultCountInputHandlers = useRef<NumberInputHandlers>(null);
  const childCountInputHandlers = useRef<NumberInputHandlers>(null);
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);
  const [audio] = useState(new Audio(require("../assets/music/SnapInsta.io - Frank Sinatra   I Love You Baby (128 kbps).mp3")));
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [initForm, setInitForm] = useState<boolean>(true);
  const [initNameInput, setInitNameInput] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [rsvp, setRsvp] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [isRsvpValidated, setIsRsvpValidated] = useState<boolean>(false);
  const [isAdultCountValidated, setIsAdultCountValidated] = useState<boolean>(false);
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

    if (!isAdultCountValidated) {
      setAdultCount(0);
    }

    if (isNameValidated && isRsvpValidated) {
      if (rsvp === "yes" && isAdultCountValidated) {
        handleSendApi();
      } else if (rsvp === "no") {
        handleSendApi();
      }
      console.log(name, rsvp, note);
    }
  };

  const resetForm = () => {
    setInitForm(true);
    setInitNameInput(true);

    setName("");
    setRsvp("");
    setAdultCount(0);
    setChildCount(0);
    setNote("");
    
    setIsNameValidated(false);
    setIsRsvpValidated(false);
    setIsAdultCountValidated(false);
  };

  const handleSendApi = () => {
    sendRsvpApiSecondVersion({
      name: name,
      participate: rsvp,
      adultCount: adultCount,
      childCount: childCount,
      note: note,
      subdomain
    });

    setModalInfo({
      opened: true,
      submitInfo: {
        name: name,
        rsvp: rsvp,
        adultCount: adultCount,
        childCount: childCount,
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

    if (answer === "") {
      setIsRsvpValidated(false);
    } else {
      setIsRsvpValidated(true);
    }
  };

  const handleOnChnageAdultCount = (count: number) => {
    setAdultCount(count);

    if (count == 0) {
      setAdultCount(0);
      setIsAdultCountValidated(false);
    } else {
      setIsAdultCountValidated(true);
    }
  };

  const handleMusicPlaying = () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.currentTime = 80;
      audio.play();
    }
  };

  const imgs: string[] = [
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-51 002-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-52 003-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-53 004-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-55 005-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-56 006-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-57 007-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-58 008-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-04-59 009-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-01 010-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-02 011-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-03 012-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-05 013-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-06 014-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-07 015-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-09 016-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-10 017-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-11 018-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-12 019-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-14 020-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-15 021-min.jpeg'),
    require('../assets/img/samhan/moment_pics/2023-04-07-23-05-16 022-min.jpeg')
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
      <MantineProvider
        theme={{
          globalStyles: (_theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              fontFamily : 'Crimson Text!important'
            },
            body: {
              color: '#222'
            },
            a: {
              color: 'inherit!important',
              textDecoration: 'none'
            },
            figure : {
              margin : 0
            },
            ul : {
              listStyle: 'none',
              padding : 0
            },
            dl : {
              margin: 0
            },
            dd : {
              margin : 0
            }
          })
        }}
      >
        <Modal
          centered
          onClose={() => setModalInfo({ ...initModalInfo, opened: false })}
          opened={modalInfo.opened}
          title={`Hi! ${modalInfo.submitInfo.name}, your servey sent :)`}
          styles={{
            title: {
              color: "#444",
              fontWeight: 700,
              margin: 0
            },
            body: {
              fontSize: '14px',
              lineHeight: '1.5',
              color: "#666"
            }
          }}
        >
          {modalInfo.submitInfo.rsvp === "yes" ?
            <div className="survey-comment">
              <Text size={18}>
                Thank you, See you on our Wedding day.
              </Text>
              <p style={{color: '#2C4032', fontWeight: 700, marginTop: 50, fontSize: 16}}>
                Attendance : {modalInfo.submitInfo.rsvp}<br />
                Number of Adult : {modalInfo.submitInfo.adultCount}<br />
                Number of Kid : {modalInfo.submitInfo.childCount}<br />
                Number of Total Attendees : {modalInfo.submitInfo.adultCount + modalInfo.submitInfo.childCount}<br />
                Food Restriction Note : {modalInfo.submitInfo.note}
              </p>
              <figure style={{position:'absolute', right: 0, bottom: 0, margin: 0}}>
                <img src={require('../assets/img/samhan/sam-contact-deco.png')} alt="surveyDeco" style={{maxHeight: 180}}/>
              </figure>
            </div>
            :
            <div className="survey-comment">
              <Text size={18}>
                Sorry to hear that! See you next time.
              </Text>
              <p style={{color: '#2C4032', fontWeight: 700, marginTop: 50, fontSize: 16}}>
                Attendance : {modalInfo.submitInfo.rsvp}<br />
                Food Restriction Note : {modalInfo.submitInfo.note}
              </p>
              <figure style={{position:'absolute', right: 0, bottom: 0, margin: 0}}>
                <img src={require('../assets/img/samhan/sam-contact-deco.png')} alt="surveyDeco" style={{maxHeight: 180}}/>
              </figure>
            </div>
          }
        </Modal>
        <main className={`${classes.invitationWrap} ${classes.invitationSam}`}>
          <Container className={classes.newVisual} fluid px={0}>
            <div className={classes.inr}>
              <Text className={classes.invitationTit} size={RESPONSIVE_MOBILE ? 14 : 18}>2023 WEDDING INVITATION</Text>
              <div>
                <div className={classes.characterInfo}>
                  <Text size={RESPONSIVE_MOBILE ? 30 : 50} align='center' pr={RESPONSIVE_MOBILE ? 180 : 130}>SAM HAN</Text>
                  <Text className={classes.and} size={RESPONSIVE_MOBILE ? 145 : 245}>&</Text>
                  <Text size={RESPONSIVE_MOBILE ? 30 : 50} align='center' pl={RESPONSIVE_MOBILE ? 100: 150} pt={RESPONSIVE_MOBILE ? 20: 30}>EUNHEE JO</Text>
                </div>
                <div>
                  <Text size={RESPONSIVE_MOBILE ? 16 :  20} color='#fff' align='center'>June 17th, 2023 10:30 AM</Text>
                  <Text size={RESPONSIVE_MOBILE ? 16 :  20} color='#fff' align='center'>@ SHAUGHNESSY RESTAURANT</Text>
                </div>
              </div>
            </div>
          </Container>
          <Container className={classes.newIntro} py={50} px={0}>
            <div className={classes.sectionTitWrap}>
              <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>opening</Text>
              <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>Forever together</Text>
            </div>
            <span>
              <figure className={classes.titleDecoFigure}>
                <Image 
                  src={require('../assets/img/samhan/section-tit-deco-sam.png')}
                  className={classes.titleDecoImg}
                  width={RESPONSIVE_MOBILE ? 60 : 120}
                  height={RESPONSIVE_MOBILE ? 33 : 66}
                  alt="titleDeco" />
              </figure>
            </span>
            <div className={classes.introMessage}>
              <Text size={RESPONSIVE_MOBILE ? 16 : 26} color="#555" align='center'>
                Your presence at our wedding means a lot to all of us.<br />
                Please let us have the honor to host you on<br />
                this beautiful celebration of love and loyalty!
              </Text>
              <Text underline size={RESPONSIVE_MOBILE ? 16 : 28} color="#555" align='center' pt={50}>Sam Han & Eunhee Jo</Text>
            </div>
            <figure className={classes.introDeco1Figure}>
              <Image src={require('../assets/img/samhan/sam-intro-deco1.png')} 
                width={RESPONSIVE_MOBILE ? 85 : 170}
                height={RESPONSIVE_MOBILE ? 167 : 334}
                alt="introDeco1"
              />
            </figure>
            <figure className={classes.introDeco2Figure}>
              <Image src={require('../assets/img/samhan/sam-intro-deco2.png')} 
                width={RESPONSIVE_MOBILE ? 100 : 200}
                height={RESPONSIVE_MOBILE ? 243 : 486}
                alt="introDeco2"
              />
            </figure>
          </Container>
          <Container py={50} size={550}>
            <div>
              <div className={classes.sectionTitWrap}>
                <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>06</Text>
                <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>June</Text>
              </div>
              <Container size={RESPONSIVE_MOBILE ? 550 : 450}>
                <table className={classes.calendarTable}>
                  <thead>
                    <tr>
                      <th style={{color: '#8B5454'}}>SUN</th>
                      <th>MON</th>
                      <th>TUE</th>
                      <th>WED</th>
                      <th>THU</th>
                      <th>FRI</th>
                      <th style={{color: '#292E62'}}>SAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{color: '#8B5454'}}><span></span></td>
                      <td><span></span></td>
                      <td><span></span></td>
                      <td><span></span></td>
                      <td><span>1</span></td>
                      <td><span>2</span></td>
                      <td style={{color: '#292E62'}}><span>3</span></td>
                    </tr>
                    <tr>
                      <td style={{color: '#8B5454'}}><span>4</span></td>
                      <td><span>5</span></td>
                      <td><span>6</span></td>
                      <td><span>7</span></td>
                      <td><span>8</span></td>
                      <td><span>9</span></td>
                      <td style={{color: '#292E62'}}><span>10</span></td>
                    </tr>
                    <tr>
                      <td style={{color: '#8B5454'}}><span>11</span></td>
                      <td><span>12</span></td>
                      <td><span>13</span></td>
                      <td><span>14</span></td>
                      <td><span>15</span></td>
                      <td><span>16</span></td>
                      <td className={classes.current}
                        onClick={() => getIcsFile({ subdomain: 'sne'})}
                        style={{
                          cursor: "pointer"
                        }}>
                          <span>17</span>        
                      </td>
                    </tr>
                    <tr>
                      <td style={{color: '#8B5454'}}><span>18</span></td>
                      <td><span>19</span></td>
                      <td><span>20</span></td>
                      <td><span>21</span></td>
                      <td><span>22</span></td>
                      <td><span>23</span></td>
                      <td style={{color: '#292E62'}}><span>24</span></td>
                    </tr>
                    <tr>
                      <td style={{color: '#8B5454'}}><span>25</span></td>
                      <td><span>26</span></td>
                      <td><span>27</span></td>
                      <td><span>28</span></td>
                      <td><span>29</span></td>
                      <td style={{color: '#292E62'}}><span>30</span></td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className={classes.customAddCalendarButton}
                  type="button"
                  onClick={() => getIcsFile({ subdomain: 'sne'})}
                >
                  Click here to add the event
                </button>
              </Container>
              <div>
                <figure style={{fontSize: 0, textAlign: 'center', marginTop: '70px'}}>
                  <Image 
                    src={require('../assets/img/samhan/sam-calendar-deco1.png')} 
                    alt="calendarDeco" 
                    width={280}
                    height={80}
                    className={classes.calendarDecoImg}
                  />
                </figure>
                <div className={classes.calendarWeddingSummary}>June 17th, 2023 10:30 AM</div>
              </div>
            </div>
          </Container>
          <Container py={50} size={550}>
            <div className={classes.sectionTitWrap}>
              <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>survey</Text>
              <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>Will you join us?</Text>
            </div>
            <span>
              <figure className={classes.titleDecoFigure}>
                <Image 
                  src={require('../assets/img/samhan/section-tit-deco-sam2.png')} 
                  alt="titleDeco2" 
                  width={RESPONSIVE_MOBILE ? 72 : 145}
                  height={RESPONSIVE_MOBILE ? 54 : 108}
                  className={classes.titleDecoImg2}
                />
              </figure>
            </span>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <Input.Wrapper
                id="name-input"
                label="NAME"
                withAsterisk
                error={name === "" && (!initNameInput || !initForm) ? NAME_INPUT_ERROR : ""}
                styles={{
                  root: {
                    marginBottom: "16px !important"
                  },
                  required: {
                    color: 'red !important'
                  },
                  error: {
                    color: 'red !important',
                    marginTop: "10px !important"
                  }
                }}
              >
                <Input
                  id="name-input"
                  placeholder="Please enter your full name"
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
                      borderBottom: "1px solid #ddd !important"
                    },
                    input: {
                      fontSize: "16px",
                    }
                  }}
                />
              </Input.Wrapper>
              <Radio.Group
                label="Attendance"
                required
                value={rsvp}
                styles={radioGroupStyle}
                onChange={(answer) => handleOnChangeRsvpInput(answer)}
                error={rsvp === "" && !initForm ? RSVP_INPUT_ERROR : ""}
              >
                <Radio
                  name="Attendance"
                  label="Yes"
                  value="yes"
                  styles={radioButtonStyle}
                />
                <Radio
                  name="Attendance"
                  label="No"
                  value="no"
                  styles={radioButtonStyle}
                />
              </Radio.Group>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Input.Wrapper className={classes.countInput}>
                  <label htmlFor="">How many adults? <span style={{ color: 'red' }}>*</span></label>
                  <div className={classes.selectWrapper}>
                      <ActionIcon<'button'>
                        size={28}
                        variant="transparent"
                        onClick={() => adultCountInputHandlers.current?.decrement()}
                        disabled={adultCount === min}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <IconMinus size="1rem" stroke={1.5} />
                      </ActionIcon>
                      <NumberInput
                        required
                        error={adultCount == 0 && !initForm ? ADULT_COUNT_ERROR : ""}
                        variant="unstyled"
                        min={min}
                        max={max}
                        handlersRef={adultCountInputHandlers}
                        value={adultCount}
                        onChange={(count: number) => handleOnChnageAdultCount(count)}
                      />
                      <ActionIcon<'button'>
                        size={28}
                        variant="transparent"
                        onClick={() => adultCountInputHandlers.current?.increment()}
                        disabled={adultCount === max}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        <IconPlus size="1rem" stroke={1.5} />
                      </ActionIcon>
                  </div>
                </Input.Wrapper>
                <Input.Wrapper ml={5} className={classes.countInput}>
                  <label htmlFor="">How many kids?</label> 
                  <div className={classes.selectWrapper}>
                    <ActionIcon<'button'>
                      size={28}
                      variant="transparent"
                      onClick={() => childCountInputHandlers.current?.decrement()}
                      disabled={childCount === min}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <IconMinus size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <NumberInput
                      variant="unstyled"
                      min={min}
                      max={max}
                      handlersRef={childCountInputHandlers}
                      value={childCount}
                      onChange={(count: number) => setChildCount(count)}
                    />
                    <ActionIcon<'button'>
                      size={28}
                      variant="transparent"
                      onClick={() => childCountInputHandlers.current?.increment()}
                      disabled={childCount === max}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <IconPlus size="1rem" stroke={1.5} />
                    </ActionIcon>
                  </div>
                </Input.Wrapper>
              </div>
              <Text py={20}>Total Participate : {adultCount + childCount}</Text>
              <div style={{marginBottom : 20}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text size={16}>Menu</Text>
                  <Text size={16} underline className={classes.closeMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {!isMenuOpen ? 'Close' : 'Open'} Menu
                  </Text>
                </div>
                <Text size={14}>Server will take your order on the wedding day</Text>
                {!isMenuOpen && (
                  <div>
                    <ul style={{padding: 20, border: '1px solid #ddd', borderRadius: 5}}>
                      <li>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">STARTER</Text>
                          <Text size={16} weight={700}>
                            Shaughnessy Green Salad
                            <Text size={12} weight={400}>crispy quinoa, julienne apple and carrots, pickled radish, goat feta, toasted sunflower seeds, herb vinaigrette</Text>
                          </Text>
                        </div>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">MAIN (Choose One)</Text>
                          <Text size={16} weight={700}>Herb Pesto Steelhead
                            <Text size={12} weight={400}>chive jasmine rice, seasonal vegetables, herb pumpkin seed pesto, lemon bay laurel vin blanc</Text>
                          </Text>
                          <Text size={16} weight={700}>New York Striploin
                            <Text size={12} weight={400}>grilled asparagus, rosemary whipped potato, natural jus, crispy onions, chives</Text>
                          </Text>
                          <Text size={16} weight={700}>Roast Supreme Chicken
                            <Text size={12} weight={400}>olive oil crushed potato, seasonal vegetables, savory honey dijon glaze, bordelaise natural jus</Text>
                          </Text>
                        </div>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">DESSERT</Text>
                          <Text size={16} weight={700}>Chocolate Peppermint Mousse
                            <Text size={12} weight={400}>fress berries, hazelnut praline</Text>
                          </Text>
                        </div>
                      </li>
                      <hr/>
                      <li>
                        <Text size={18} weight={700} mb={10}>KID MENU</Text>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">APPETIZER</Text>
                          <Text size={16} weight={700}>
                            Crudite and house made dip
                          </Text>
                        </div>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">ENTREE CHOICE OF</Text>
                          <Text size={16} weight={700}>
                            Chicken fingers and fries
                          </Text>
                          <Text size={16} weight={700}>
                            Pasta with cheese, plain, or tomato sauce
                          </Text>
                          <Text size={16} weight={700}>
                            Roast chicken with vegetables and potato
                          </Text>
                          <Text size={16} weight={700}>
                            Steelhead with vegetables and rice
                          </Text>
                        </div>
                        <div className={classes.menu}>
                          <Text size={16} color="#2C4032">DESSERT</Text>
                          <Text size={16} weight={700}>
                            Ice Cream
                          </Text>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <span className="input-wrap">
                <label htmlFor="note">Note for Food Restriction</label>
                <textarea
                  name="note"
                  id="note"
                  cols={30}
                  rows={10}
                  value={note}
                  placeholder="Please provide us any food restriction you have "
                  onChange={(e) => setNote(e.currentTarget.value)}
                  className={classes.textarea}
                ></textarea>
              </span>
              <button className={classes.customButton} type="submit">SUBMIT</button>
            </form>
          </Container>
          <Container py={50} px={0} style={{position: 'relative'}}>
            <div className={classes.sectionTitWrap}>
              <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>gallery</Text>
              <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>our moments</Text>
            </div>
            <figure style={{fontSize: 0, textAlign: 'center'}} className={classes.galleryDeco}>
              <Image 
                src={require('../assets/img/samhan/sam-gallery-deco.png')} 
                alt="galleryDeco" 
                width={RESPONSIVE_MOBILE ? 106 : 212}
                height={RESPONSIVE_MOBILE ? 140 : 280}
              />
            </figure>
            <span>
              <figure className={classes.titleDecoFigure}>
                <Image 
                  src={require('../assets/img/samhan/section-tit-deco-sam.png')}
                  className={classes.titleDecoImg}
                  width={RESPONSIVE_MOBILE ? 60 : 120}
                  height={RESPONSIVE_MOBILE ? 33 : 66}
                  alt="titleDeco" />
              </figure>
            </span>
            <Container size={550}>
              <div className={classes.carouselWrap}>
                <Carousel
                  showArrows={true}
                  useKeyboardArrows={true}
                  dynamicHeight={true}
                  showStatus={false}
                  showIndicators={false}
                  swipeable={false}
                >
                  {slides}
                </Carousel>
              </div>
            </Container>
          </Container>
          <Container py={50} px={0} style={{position: 'relative'}}>
            <div className={classes.sectionTitWrap}>
              <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>contact</Text>
              <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>Where to celebrate?</Text>
            </div>
            <figure style={{fontSize: 0, textAlign: 'center'}} className={classes.contactDeco}>
              <Image 
                src={require('../assets/img/samhan/sam-contact-deco.png')} 
                alt="contactDeco" 
                width={RESPONSIVE_MOBILE ? 106 : 210}
                height={RESPONSIVE_MOBILE ? 167 : 334}
              />
            </figure>
            <span>
              <figure className={classes.titleDecoFigure}>
                <Image 
                  src={require('../assets/img/samhan/section-tit-deco-sam.png')}
                  className={classes.titleDecoImg}
                  width={RESPONSIVE_MOBILE ? 60 : 120}
                  height={RESPONSIVE_MOBILE ? 33 : 66}
                  alt="titleDeco" />
              </figure>
            </span>
            <Container size={550} py={50}>
              <ul>
                <li className={classes.contactList}>
                  <div className={classes.contactListLeft}>
                    <figure>
                      <Image 
                        src={imgEunhee} 
                        alt="brideImg" 
                        width={80}
                        height={80}
                      />
                    </figure>
                    <ul style={{marginLeft: 15}}>
                      <li>
                        <Text size={20} className={classes.contactInfoName} color="#888">
                          EUNHEE JO
                          <Text className="position" size={12}> / Bride</Text>
                        </Text>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}}>
                        <ImPhone size={RESPONSIVE_MOBILE ? 14 : 16} color='#888'/>
                        <Text size={RESPONSIVE_MOBILE ? 14 : 16} color="#555" ml={5}><a href={`tel:778-686-9067`}>778. 686. 9067</a></Text>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}}>
                        <MdEmail size={RESPONSIVE_MOBILE ? 14 : 16} color='#888'/>
                        <Text size={RESPONSIVE_MOBILE ? 14 : 16} color="#555" ml={5}><a href={`mailto:dpqy135@gmail.com`}>dpqy135@gmail.com</a></Text>
                      </li>
                    </ul>
                  </div>
                  <ul style={{display: 'flex'}}>
                    <li className={classes.contactIcon}>
                      <figure>
                        <a href={`tel:778-686-9067`}>
                          <ImPhone />
                        </a>
                      </figure>
                    </li>
                    <li className={classes.contactIcon}>
                      <figure>
                        <a href={`mailto:dpqy135@gmail.com`}>
                          <MdEmail />
                        </a>
                      </figure>
                    </li>
                  </ul>
                </li>
                <li className={classes.contactList}>
                  <div className={classes.contactListLeft}>
                    <figure>
                      <Image 
                        src={imgSam} 
                        alt="groomImg" 
                        width={80}
                        height={80}
                      />
                    </figure>
                    <ul style={{marginLeft: 15}}>
                      <li>
                        <Text size={20} className={classes.contactInfoName} color="#888">
                          SAM HAN
                          <Text className="position" size={12}> / Groom</Text>
                        </Text>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}}>
                        <ImPhone size={RESPONSIVE_MOBILE ? 14 : 16} color='#888'/>
                        <Text size={RESPONSIVE_MOBILE ? 14 : 16} color="#555" ml={5}><a href={`tel:604-802-9953`}>604. 802. 9953</a></Text>
                      </li>
                      <li style={{display: 'flex', alignItems: 'center'}}>
                        <MdEmail size={RESPONSIVE_MOBILE ? 14 : 16} color='#888'/>
                        <Text size={RESPONSIVE_MOBILE ? 14 : 16} color="#555" ml={5}><a href={`mailto:zeta815@gmail.com`}>zeta815@gmail.com</a></Text>
                      </li>
                    </ul>
                  </div>
                  <ul style={{display: 'flex'}}>
                    <li className={classes.contactIcon}>
                      <figure>
                        <a href={`tel:604-802-9953`}>
                          <ImPhone />
                        </a>
                      </figure>
                    </li>
                    <li className={classes.contactIcon}>
                      <figure>
                        <a href={`mailto:zeta815@gmail.com`}>
                          <MdEmail />
                        </a>
                      </figure>
                    </li>
                  </ul>
                </li>
              </ul>
            </Container>
          </Container>
          <Container size={550} py={50}>
            <div className={classes.sectionTitWrap}>
              <Text className={classes.sectionTit} size={RESPONSIVE_MOBILE ? 100 : 200} align='center'>location</Text>
              <Text className={classes.sectionSubTit} color='#2C4032' align='center' size={RESPONSIVE_MOBILE ? 20 : 40}>please join us at?</Text>
            </div>
            <span>
              <figure className={classes.titleDecoFigure}>
                <Image 
                  src={require('../assets/img/samhan/section-tit-deco-sam2.png')} 
                  alt="titleDeco2" 
                  width={RESPONSIVE_MOBILE ? 72 : 145}
                  height={RESPONSIVE_MOBILE ? 54 : 108}
                  className={classes.titleDecoImg2}
                />
              </figure>
            </span>
            <div>
              <figure className={classes.map}>
                <Image 
                  src={map} 
                  alt="map" 
                  width="268"
                  height="174"
                />
              </figure>
              <div>
                <Text size={RESPONSIVE_MOBILE ? 20 : 25} color="#555" align='center'>SHAUGHNESSY RESTAURANT</Text>
                <Text size={RESPONSIVE_MOBILE ? 16 : 18} color="#555" align='center'>5251 Oak St, Vancouver, BC V6M 4H1</Text>
                <Text size={RESPONSIVE_MOBILE ? 16 : 18} color="#555" align='center'>604. 261. 0011</Text>
              </div>
              <button className={classes.customButton}>
                <a href="https://goo.gl/maps/tsQhscDwvcvjx25KA">
                  Find place on map
                </a>
              </button>
            </div>
          </Container>
          <div className={classes.sound} onClick={() => handleMusicPlaying()}>
            {!isMusicPlaying ? (
              <img src={soundOff} alt="sound-off" />
            ) : (
              <img src={soundOn} alt="sound-on" />
            )}
          </div>
        </main>
      </MantineProvider>
    </>
  );
};

export default SamHan;
