import {
  Button,
  Container,
  Image,
  Input,
  MantineProvider,
  MantineTheme,
  Modal,
  Radio,
  Text
} from '@mantine/core';
import { Visual3Styles } from '../style/Visual3Styles';
import { useMediaQuery } from '@mantine/hooks';
import imgBride from '../assets/img/visual3/img-bride.png';
import imgGroom from '../assets/img/visual3/img-groom.png';
import { ImPhone } from 'react-icons/im';
import surveyDeco from '../assets/img/visual3/modal-deco.png';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import map from '../assets/img/visual3/map.svg';
import { getIcsFile } from '../utils/calendarUtils';

const useStyles = Visual3Styles();

interface Visual3Props {
  year: number;
  monthNum: number;
  day: number;
  bride: string;
  groom: string;
  location: string;
  specificLocation: string;
  time: string;
  subdomain: string;
  // mainColor: ColorResult;
}

interface SubmitInfo {
  name: string;
  side: string;
  menu: string;
  note?: string;
}

interface ModalInfo {
  opened: boolean;
  submitInfo: SubmitInfo;
}

const radioGroupStyle = {
  root: {
    marginBottom: '20px !important'
  },
  required: {
    color: 'red !important'
  },
  label: {
    fontSize: 16,
    marginBottom: '16px !important',
    marginTop: '16px !important'
  },
  error: {
    color: 'red !important',
    marginTop: '10px !important'
  }
};

const radioButtonStyle = {
  body: {
    cursor: 'pointer'
  },
  icon: {
    color: 'rgb(180, 152, 133)',
    width: '12px',
    height: '12px',
    top: 'calc(50% - 6px)',
    left: 'calc(50% - 6px)',
    cursor: 'pointer'
  },
  radio: {
    cursor: 'pointer',
    ':checked': {
      backgroundColor: '#fff',
      border: '1px solid rgb(180, 152, 133)'
    },
    '&::after': {
      backgroundColor: 'rgb(180, 152, 133)',
      borderColor: 'rgb(180, 152, 133)'
    }
  }
};

const optionStyle = (theme: MantineTheme, isClicked: boolean) => ({
  root: {
    flex: 1,
    marginRight: 10,
    marginTop: '3px',
    '&:not([data-disabled])': theme.fn.hover({
      backgroundColor: theme.fn.darken('#B39884', 0.05)
    }),
    backgroundColor: isClicked ? 'rgb(180, 152, 133)' : 'rgb(204, 204, 204)'
  }
});

const calendarContainer = {
  border: '40px solid rgb(180, 152, 133)',
  color: '#bbbbbb',
  padding: '20px'
};

const inputWrapperStyle = {
  root: {
    marginBottom: '16px !important' // why !important used? mantine Input 컴포넌트의 기본 스타일을 무시하기 위해?
  },
  required: {
    color: 'red !important'
  },
  label: {
    fontFamily: 'KoPub Batang',
    fontSize: '16px'
  },
  error: {
    color: 'red !important',
    marginTop: '10px !important'
  }
};

const inputStyle = {
  wrapper: {
    'input::placeholder': {
      margin: '16px 0',
      fontSize: '16px'
    },
    padding: '16px 0 10px 0 !important',
    borderBottom: '1px solid #ddd !important'
  },
  input: {
    fontSize: '16px'
  }
};

const NAME_INPUT_ERROR = 'Please enter your name';
const SIDE_INPUT_ERROR = 'Please choose your side';
const MENU_INPUT_ERROR = 'Please select an option';

const initModalInfo: ModalInfo = {
  opened: false,
  submitInfo: {
    name: '',
    side: '',
    menu: '',
    note: ''
  }
};

const Visual3 = (props: Visual3Props) => {
  const { classes } = useStyles();
  const {
    year,
    monthNum,
    day,
    bride,
    groom,
    location,
    specificLocation,
    time
  } = props;

  const [name, setName] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [isFirstOptionClicked, setIsFirstOptionClicked] = useState(false);
  const [isSecondOptionClicked, setIsSecondOptionClicked] = useState(false);

  const [isNameValidated, setIsNameValidated] = useState<boolean>(false);
  const [isSideValidated, setIsSideValidated] = useState<boolean>(false);
  const [isMenuValidated, setIsMenuValidated] = useState<boolean>(false);

  const [initForm, setInitForm] = useState<boolean>(true);
  const [initNameInput, setInitNameInput] = useState<boolean>(true);
  const [initMenuInput, setInitMenuInput] = useState<boolean>(true);

  const [modalInfo, setModalInfo] = useState<ModalInfo>(initModalInfo);

  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');
  const responsiveContainer = {
    size: RESPONSIVE_MOBILE ? 550 : 450
  };

  const responsiveTitleText = {
    size: RESPONSIVE_MOBILE ? 20 : 25
  };

  const menuFontSize = {
    size: 12
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setInitForm(false);

    if (!isNameValidated) setName('');
    if (!isSideValidated) setSide('');
    if (!isMenuValidated) setMenu('');

    if (isNameValidated && isSideValidated && isMenuValidated) {
      setModalInfo({
        opened: true,
        submitInfo: {
          name: name,
          side: side,
          menu: menu,
          note: note
        }
      });

      // TODO: send api
      console.log(name, side, menu, note);
    }
  };

  const handleOnChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    setName(newName);
    setInitNameInput(false);

    if (newName === '') {
      setIsNameValidated(false);
    } else {
      setIsNameValidated(true);
    }
  };

  const handleOnchangeSideInput = (side: string) => {
    setSide(side);

    if (side === '') {
      setIsSideValidated(false);
    } else {
      setIsSideValidated(true);
    }
  };

  const handleOptionClick = (option: 'firstOption' | 'secondOption') => {
    setInitMenuInput(false);

    if (option === 'firstOption') {
      setMenu('MENU_OPTION_1');
      setIsFirstOptionClicked(true);
      setIsSecondOptionClicked(false);
      setIsMenuValidated(true);
    } else if (option === 'secondOption') {
      setMenu('MENU_OPTION_2');
      setIsSecondOptionClicked(true);
      setIsFirstOptionClicked(false);
      setIsMenuValidated(true);
    }
  };

  const imgs: string[] = [
    require('../assets/img/visual3/moment_pics/1.png'),
    require('../assets/img/visual3/moment_pics/2.png'),
    require('../assets/img/visual3/moment_pics/3.png'),
    require('../assets/img/visual3/moment_pics/4.png'),
    require('../assets/img/visual3/moment_pics/5.png')
  ];

  const slides: JSX.Element[] = imgs.map((img) => {
    return (
      <div key={`side-${img}`}>
        <img src={img} alt={`Slide $(item)`} />
      </div>
    );
  });

  return (
    <>
      <MantineProvider
        theme={{
          globalStyles: (_theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              fontFamily: 'Kopub Batang!important'
            },
            body: {
              color: '#222'
            },
            a: {
              color: 'inherit!important',
              textDecoration: 'none'
            },
            figure: {
              margin: 0
            },
            ul: {
              listStyle: 'none',
              padding: 0
            },
            dl: {
              margin: 0
            },
            dd: {
              margin: 0
            }
          })
        }}
      >
        <Modal
          centered
          onClose={() => setModalInfo({ ...initModalInfo, opened: false })}
          opened={modalInfo.opened}
          title={`Hello ${modalInfo.submitInfo.name},`}
          styles={{
            title: {
              fontSize: '16px',
              fontWeight: 700,
              margin: 0,
              color: 'rgb(180, 152, 133)'
            },
            body: {
              fontSize: '14px',
              lineHeight: '1.5',
              color: 'rgb(0, 0, 0)'
            }
          }}
        >
          <div className="survey-comment">
            <p>
              Thank you for attendance at our wedding.
              <br />
              <br />
              If you have any inquiries, <br />
              please contact us at{' '}
              <a
                href="tel:778-727-9067"
                style={{ color: 'rgb(180, 152, 133)', textDecoration: 'none' }}
              >
                '778-727-9067'
              </a>
              .
            </p>
            <p
              style={{
                color: 'rgb(180, 152, 133',
                fontWeight: 900,
                marginTop: 20,
                fontSize: 16
              }}
            >
              Invite from: {modalInfo.submitInfo.side}
              <br />
              Menu: {modalInfo.submitInfo.menu}
              <br />
              Allergic note: {modalInfo.submitInfo.note}
            </p>
            <figure
              style={{ position: 'absolute', right: 0, bottom: 0, margin: 0 }}
            >
              <img
                src={surveyDeco}
                alt="surveyDeco"
                style={{ maxHeight: 180 }}
              />
            </figure>
          </div>
        </Modal>
        <main
          className={`${classes.invitationWrap} ${classes.invitationVisual}`}
        >
          <Container
            className={`${classes.newVisual} ${
              RESPONSIVE_MOBILE ? '' : classes.newVisualOnLaptopView
            }`}
            fluid
            px={0}
            size={RESPONSIVE_MOBILE ? 550 : 450}
          >
            <div
              className={`${classes.weddingMainDate} ${
                RESPONSIVE_MOBILE ? '' : classes.weddingMainDateOnLaptopView
              }`}
            >
              <Text size={RESPONSIVE_MOBILE ? 20 : 35} align="center">
                {year}
              </Text>
              <Text
                size={RESPONSIVE_MOBILE ? 50 : 60}
                align="center"
                weight={900}
              >
                {monthNum}/{day}
              </Text>
            </div>
            <div className={classes.weddingDetailsContainer}>
              <div className={classes.weddingDetails}>
                <Text
                  transform="uppercase"
                  size={RESPONSIVE_MOBILE ? 22 : 26}
                  weight={900}
                  pb={13}
                >
                  {bride} & {groom}
                </Text>
                <Text size={RESPONSIVE_MOBILE ? 12 : 20}>@ {location}</Text>
                <Text size={RESPONSIVE_MOBILE ? 12 : 20}>
                  {monthNum}.{day}.{year} / {time}
                </Text>
              </div>
            </div>
          </Container>
          <Container className={classes.newIntro} py={50} mt={50}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                color="rgb(180, 152, 133)"
                align="center"
                size={RESPONSIVE_MOBILE ? 20 : 26}
                weight={900}
              >
                Forever together
              </Text>
            </div>
            <div className={classes.introMessage}>
              <Text
                size={RESPONSIVE_MOBILE ? 16 : 20}
                color="#555"
                align="center"
              >
                Lorem Ipsum is simply dummy
                <br />
                text of the printing
                <br />
                and typesetting industry.
                <br />
                Lorem Ipsum has been the industry's
                <br />
                standard dummy text ever
                <br />
                since the 1500s, when an unknown
                <br />
                printer tooka galley of type and
                <br />
                scrambled it to make a type specimen book.
              </Text>
              <Text
                underline
                size={RESPONSIVE_MOBILE ? 16 : 20}
                color="#555"
                align="center"
                pt={50}
              >
                Daniel Han & Anna Smith
              </Text>
            </div>
          </Container>
          <Container style={calendarContainer} {...responsiveContainer}>
            <div className={classes.calendarTop}>
              <strong className={classes.weddingMonth}>
                October, <span className={classes.weddingYear}>2023</span>
              </strong>
              <span>
                <span className={classes.weddingDayOfWeek}>MON,</span>
                <span>01:30 PM</span>
              </span>
            </div>
            <table className={classes.calendarTable}>
              <thead>
                <tr>
                  <th className="sun">Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th className="sat">Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <span>2</span>
                  </td>
                  <td>
                    <span>3</span>
                  </td>
                  <td>
                    <span className="sat">4</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="sun">5</span>
                  </td>
                  <td>
                    <span>6</span>
                  </td>
                  <td>
                    <span>7</span>
                  </td>
                  <td>
                    <span>8</span>
                  </td>
                  <td>
                    <span>9</span>
                  </td>
                  <td>
                    <span>10</span>
                  </td>
                  <td>
                    <span className="sat">11</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="sun">12</span>
                  </td>
                  <td>
                    <span>13</span>
                  </td>
                  <td>
                    <span>14</span>
                  </td>
                  <td>
                    <span>15</span>
                  </td>
                  <td>
                    <span>16</span>
                  </td>
                  <td>
                    <span>17</span>
                  </td>
                  <td>
                    <span className="sat">18</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="sun">19</span>
                  </td>
                  <td>
                    <span>20</span>
                  </td>
                  <td>
                    <span>21</span>
                  </td>
                  <td>
                    <span>22</span>
                  </td>
                  <td>
                    <span>23</span>
                  </td>
                  <td>
                    <span>24</span>
                  </td>
                  <td>
                    <span className="sat">25</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="sun">26</span>
                  </td>
                  <td>
                    <span
                      className={classes.current}
                      onClick={() => getIcsFile({ subdomain: 'visual' })}
                    >
                      27
                    </span>
                  </td>
                  <td>
                    <span>28</span>
                  </td>
                  <td>
                    <span>29</span>
                  </td>
                  <td>
                    <span>30</span>
                  </td>
                  <td>
                    <span>31</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
          <Container {...responsiveContainer} py={85}>
            <div className={classes.sectionTitWrap}>
              {/* TODO: need to adjust padding with contact list */}
              <Text
                className={classes.sectionSubTit}
                {...responsiveTitleText}
                color="rgb(180, 152, 133)"
                align="left"
              >
                Contact Us
              </Text>
            </div>
            <ul>
              <li className={classes.contactList}>
                <div className={classes.contactListLeft}>
                  <figure>
                    <Image
                      src={imgBride}
                      alt="brideImg"
                      width={80}
                      height={80}
                    />
                  </figure>
                  <ul className={classes.marginLeftFifteen}>
                    <li>
                      <Text weight={'bold'}>Call To Bride</Text>
                    </li>
                    <li>
                      <Text color="#888" underline>
                        Check Her Phone number
                      </Text>
                    </li>
                  </ul>
                </div>
                <ul className={classes.flexDisplay}>
                  <li className={classes.contactIcon}>
                    <figure>
                      <a href={`tel:778-727-9067`}>
                        <ImPhone />
                      </a>
                    </figure>
                  </li>
                </ul>
              </li>
              <li className={classes.contactList}>
                <div className={classes.contactListLeft}>
                  <figure>
                    <Image
                      src={imgGroom}
                      alt="groomImg"
                      width={80}
                      height={80}
                    />
                  </figure>
                  <ul className={classes.marginLeftFifteen}>
                    <li>
                      <Text weight={'bold'}>Call To Groom</Text>
                    </li>
                    <li>
                      <Text color="#888" underline>
                        Check His Phone number
                      </Text>
                    </li>
                  </ul>
                </div>
                <ul className={classes.flexDisplay}>
                  <li className={classes.contactIcon}>
                    <figure>
                      <a href={`tel:778-727-9067`}>
                        <ImPhone />
                      </a>
                    </figure>
                  </li>
                </ul>
              </li>
            </ul>
          </Container>
          <Container {...responsiveContainer} py={70} mt={-20}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                {...responsiveTitleText}
                color="rgb(180, 152, 133)"
                align="left"
              >
                Apply to <br />
                join our wedding
              </Text>
            </div>
            <div className={classes.marginTopForty}>
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <Input.Wrapper
                  label="NAME"
                  styles={inputWrapperStyle}
                  required
                  error={
                    name === '' && (!initNameInput || !initForm)
                      ? NAME_INPUT_ERROR
                      : ''
                  }
                >
                  <Input
                    id="name-input"
                    placeholder="Please enter your full name"
                    variant="unstyled"
                    name="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleOnChangeNameInput(e)
                    }
                    styles={inputStyle}
                  />
                </Input.Wrapper>
                <Radio.Group
                  label="INVITED FROM"
                  styles={radioGroupStyle}
                  required
                  value={side}
                  onChange={(side) => handleOnchangeSideInput(side)}
                  error={side === '' && !initForm ? SIDE_INPUT_ERROR : ''}
                >
                  <Radio
                    name="INVITED FROM"
                    label="Bride Side"
                    value="bride"
                    styles={radioButtonStyle}
                  />
                  <Radio
                    name="INVITED FROM"
                    label="Groom Side"
                    value="groom"
                    styles={radioButtonStyle}
                  />
                  <Radio
                    name="INVITED FROM"
                    label="Both Side"
                    value="both"
                    styles={radioButtonStyle}
                  />
                </Radio.Group>
                <div>
                  <div>
                    <Text size={16}>
                      MENU<span className={classes.asteriskColor}> *</span>
                    </Text>
                  </div>
                  <div className={classes.menuContainer}>
                    <div
                      className={`${classes.menu} ${
                        isFirstOptionClicked ? classes.clickedMenu : ''
                      }`}
                      onClick={() => handleOptionClick('firstOption')}
                    >
                      <Text {...menuFontSize} mb={10}>
                        OPTION 01
                      </Text>
                      <Text {...menuFontSize}>Tomato Pasta</Text>
                      <Text {...menuFontSize}>Turkey Salad</Text>
                      <Text {...menuFontSize}>Chicken Wings</Text>
                      <Text {...menuFontSize}>Fruit Plater</Text>
                      <Text {...menuFontSize} mb={10}>
                        Chocolate Cake
                      </Text>
                      <Text {...menuFontSize} mb={10}>
                        Free Drink
                      </Text>
                    </div>
                    <div
                      className={`${classes.menu} ${
                        isSecondOptionClicked ? classes.clickedMenu : ''
                      }`}
                      onClick={() => handleOptionClick('secondOption')}
                    >
                      <Text {...menuFontSize} mb={10}>
                        OPTION 02
                      </Text>
                      <Text {...menuFontSize}>Tomato Pasta</Text>
                      <Text {...menuFontSize}>Turkey Salad</Text>
                      <Text {...menuFontSize}>Chicken Wings</Text>
                      <Text {...menuFontSize}>Fruit Plater</Text>
                      <Text {...menuFontSize} mb={10}>
                        Chocolate Cake
                      </Text>
                      <Text {...menuFontSize} mb={10}>
                        Free Drink
                      </Text>
                    </div>
                  </div>
                  <div className={classes.menuContainer}>
                    <Button
                      onClick={() => handleOptionClick('firstOption')}
                      styles={(theme) =>
                        optionStyle(theme, isFirstOptionClicked)
                      }
                      radius="xs"
                      uppercase
                    >
                      Select This Menu
                    </Button>
                    <Button
                      onClick={() => handleOptionClick('secondOption')}
                      styles={(theme) =>
                        optionStyle(theme, isSecondOptionClicked)
                      }
                      radius="xs"
                      uppercase
                    >
                      Select This Menu
                    </Button>
                  </div>

                  {menu === '' && (!initMenuInput || !initForm) ? (
                    <Text size={12} mt={10} className={classes.error}>
                      {MENU_INPUT_ERROR}
                    </Text>
                  ) : (
                    ''
                  )}
                </div>
                {/* Menu End */}
                <div className={classes.marginTopForty}>
                  <label htmlFor="note">Allegetic Note</label>
                  <textarea
                    name="note"
                    id="note"
                    cols={30}
                    rows={10}
                    placeholder="Please provide us any food restriction you have "
                    className={classes.textarea}
                    onChange={(e) => setNote(e.currentTarget.value)}
                  ></textarea>
                </div>
                <button className={classes.customButton} type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </Container>
          <Container {...responsiveContainer} py={70} mt={-20}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                {...responsiveTitleText}
                color="rgb(180, 152, 133)"
                align="left"
                mb={40}
              >
                Our Gallery
              </Text>
            </div>
            <Container {...responsiveContainer}>
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
          <Container {...responsiveContainer} py={100} mt={-50}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                {...responsiveTitleText}
                color="rgb(180, 152, 133)"
                align="left"
              >
                Location
              </Text>
            </div>
            <li className={classes.locationList}>
              <div className={classes.locationListLeft}>
                <ul>
                  <li>
                    <Text
                      weight={'bold'}
                      pb={5}
                      size={RESPONSIVE_MOBILE ? 16 : 18}
                    >
                      {specificLocation}
                    </Text>
                  </li>
                  <li>
                    <Text size={RESPONSIVE_MOBILE ? 12 : 15}>{location}</Text>
                  </li>
                  <li>
                    <Text size={RESPONSIVE_MOBILE ? 12 : 15}>
                      TEL: +1) 778. 000. 0000
                    </Text>
                  </li>
                </ul>
              </div>
              <ul className={classes.flexDisplay}>
                <li className={classes.contactIcon}>
                  <figure>
                    <a href={`tel:778-727-9067`}>
                      <ImPhone />
                    </a>
                  </figure>
                </li>
              </ul>
            </li>
            <figure>
              <Image src={map} alt="map" width="268" height="174" />
            </figure>
            <button
              className={`${classes.customButton} ${classes.customButtonWithSmallFont}`}
              type="submit"
            >
              <a href="https://goo.gl/maps/S936VaQr6rtAhYpF6" target="_blank">
                Direct with google map
              </a>
            </button>
          </Container>
        </main>
      </MantineProvider>
    </>
  );
};

Visual3.defaultProps = {
  year: '2023',
  monthNum: '10',
  day: '27',
  bride: 'Daniel',
  groom: 'Anna',
  month: 'October',
  location: '438 Seymour St, Vancouver, BC V6B 6H4',
  specificLocation: 'Conference Plaza',
  time: '01:30 PM'
};

export default Visual3;
