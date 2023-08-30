import {
  Button,
  Container,
  Image,
  Input,
  MantineProvider,
  Radio,
  Text
} from '@mantine/core';
import { Visual3Styles } from '../style/Visual3Styles';
import { useMediaQuery } from '@mantine/hooks';
import imgBride from '../assets/img/visual3/img-bride.png';
import imgGroom from '../assets/img/visual3/img-groom.png';
import { ImPhone } from 'react-icons/im';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import map from '../assets/img/visual3/map.svg';

const useStyles = Visual3Styles();

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

interface Visual3Props {
  year: number;
  monthNum: number;
  day: number;
  bride: string;
  groom: string;
  location: string;
  time: string;
  subdomain: string;
  // mainColor: ColorResult;
}

const Visual3 = (props: Visual3Props) => {
  const { classes } = useStyles();
  const { year, monthNum, day, bride, groom, location, time } = props;

  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');
  const responsiveContainer = {
    size: RESPONSIVE_MOBILE ? 550 : 450
  };
  const responsiveTitleText = {
    size: RESPONSIVE_MOBILE ? 20 : 25
  };

  const [isFirstOptionClicked, setIsFirstOptionClicked] = useState(false);
  const [isSecondOptionClicked, setIsSecondOptionClicked] = useState(false);

  const optionStyle = (theme: any, isClicked: boolean) => ({
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

  const handleOptionClick = (option: 'firstOption' | 'secondOption') => {
    if (option === 'firstOption') {
      setIsFirstOptionClicked(true);
      setIsSecondOptionClicked(false);
    } else if (option === 'secondOption') {
      setIsSecondOptionClicked(true);
      setIsFirstOptionClicked(false);
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
        <main
          className={`${classes.invitationWrap} ${classes.invitationVisual}`}
        >
          <Container
            className={classes.newVisual}
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
          <Container
            style={{
              border: '40px solid rgb(180, 152, 133)',
              color: '#bbbbbb',
              padding: '20px'
            }}
            {...responsiveContainer}
          >
            <div className={classes.calendarTop}>
              <strong className={classes.weddingMonth}>
                October, <span className={classes.weddingYear}>2023</span>
              </strong>
              <span>
                <span className={classes.weddingDayOfWeek}>Fri,</span>
                <span>01:30 PM</span>
              </span>
            </div>
            <table className={classes.calendarTable}>
              <thead>
                <tr>
                  <th style={{ color: 'rgb(180, 152, 133)' }}>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th style={{ color: 'rgb(0, 0, 0)' }}>Sat</th>
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
                    <span style={{ color: 'rgb(0,0,0)' }}>4</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: 'rgb(180, 152, 133)' }}>5</span>
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
                    <span style={{ color: 'rgb(0,0,0)' }}>11</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: 'rgb(180, 152, 133)' }}>12</span>
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
                    <span style={{ color: 'rgb(0,0,0)' }}>18</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: 'rgb(180, 152, 133)' }}>19</span>
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
                    <span style={{ color: 'rgb(0, 0, 0)' }}>25</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: 'rgb(180, 152, 133)' }}>26</span>
                  </td>
                  <td>
                    <span>27</span>
                  </td>
                  <td>
                    <span className={classes.current}>28</span>
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
                  <ul style={{ marginLeft: 15 }}>
                    <li>
                      <Text weight={'bold'}>Call To Bride</Text>
                    </li>
                    <li>
                      <Text
                        color="#888"
                        style={{ textDecoration: 'underline' }}
                      >
                        Check Her Phone number
                      </Text>
                    </li>
                  </ul>
                </div>
                <ul style={{ display: 'flex' }}>
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
                  <ul style={{ marginLeft: 15 }}>
                    <li>
                      <Text weight={'bold'}>Call To Groom</Text>
                    </li>
                    <li>
                      <Text
                        color="#888"
                        style={{ textDecoration: 'underline' }}
                      >
                        Check His Phone number
                      </Text>
                    </li>
                  </ul>
                </div>
                <ul style={{ display: 'flex' }}>
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
            <div style={{ marginTop: '40px' }}>
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <Input.Wrapper
                  id="name-input"
                  label="NAME"
                  styles={{
                    root: {
                      marginBottom: '16px !important' // why !important used? mantine Input 컴포넌트의 기본 스타일을 무시하기 위해?
                    },
                    required: {
                      color: 'rgb(44, 69, 87) !important'
                    },
                    label: {
                      fontFamily: 'KoPub Batang',
                      fontSize: '16px'
                    },
                    error: {
                      color: 'rgb(44, 69, 87) !important',
                      marginTop: '10px !important'
                    }
                  }}
                >
                  <Input
                    id="name-input"
                    placeholder="Please enter your full name"
                    variant="unstyled"
                    name="name"
                    styles={{
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
                    }}
                  />
                </Input.Wrapper>
                <Radio.Group label="INVITED FROM" styles={radioGroupStyle}>
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
                </Radio.Group>
                <div>
                  <div>
                    <Text size={16}>MENU</Text>
                  </div>
                  <div
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div
                      className={`${classes.menu} ${
                        isFirstOptionClicked ? classes.clickedMenu : ''
                      }`}
                      onClick={() => handleOptionClick('firstOption')}
                    >
                      <Text size={12} mb={10}>
                        OPTION 01
                      </Text>
                      <Text size={12}>Tomato Pasta</Text>
                      <Text size={12}>Turkey Salad</Text>
                      <Text size={12}>Chicken Wings</Text>
                      <Text size={12}>Fruit Plater</Text>
                      <Text size={12} mb={10}>
                        Chocolate Cake
                      </Text>
                      <Text size={12} mb={10}>
                        Free Drink
                      </Text>
                    </div>
                    <div
                      className={`${classes.menu} ${
                        isSecondOptionClicked ? classes.clickedMenu : ''
                      }`}
                      onClick={() => handleOptionClick('secondOption')}
                    >
                      <Text size={12} mb={10}>
                        OPTION 02
                      </Text>
                      <Text size={12}>Tomato Pasta</Text>
                      <Text size={12}>Turkey Salad</Text>
                      <Text size={12}>Chicken Wings</Text>
                      <Text size={12}>Fruit Plater</Text>
                      <Text size={12} mb={10}>
                        Chocolate Cake
                      </Text>
                      <Text size={12} mb={10}>
                        Free Drink
                      </Text>
                    </div>
                  </div>
                  <div
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
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
                </div>
                {/* Menu End */}
                <div style={{ marginTop: '40px' }}>
                  <label htmlFor="note">Allegetic Note</label>
                  <textarea
                    name="note"
                    id="note"
                    cols={30}
                    rows={10}
                    placeholder="Please provide us any food restriction you have "
                    className={classes.textarea}
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
                      The Name Of Wedding Hall
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
              <ul style={{ display: 'flex' }}>
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
              Direct with google map
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
  location: '0000 Vancouver St. Vancouver, BC, Canada',
  time: '01:30 PM'
};

export default Visual3;
