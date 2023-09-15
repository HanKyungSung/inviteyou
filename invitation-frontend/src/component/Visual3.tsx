import { Container, Image, MantineProvider, Modal, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ImPhone } from 'react-icons/im';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import { Visual3Styles } from '../style/Visual3Styles';
import imgBride from '../assets/img/visual3/img-bride.png';
import imgGroom from '../assets/img/visual3/img-groom.png';
import surveyDeco from '../assets/img/visual3/modal-deco.png';
import map from '../assets/img/visual3/map.svg';
import { getIcsFile } from '../utils/calendarUtils';
import { SubmitInfo } from '../common/interfaces';
import {
  initModalInfo,
  calendarContainer,
  Visual3RSVPForm
} from './Visual3RSVPForm';

export const useStyles = Visual3Styles();

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

export interface ModalInfo {
  opened: boolean;
  submitInfo: SubmitInfo;
}

const Visual3 = (props: Visual3Props) => {
  const { subdomain } = props;
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

  const [modalInfo, setModalInfo] = useState<ModalInfo>(initModalInfo);
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [hisPhoneNumberText, setHisPhoneNumberText] = useState(
    'Check His Phone number'
  );
  const [herPhoneNumberText, setHerPhoneNumberText] = useState(
    'Check Her Phone number'
  );

  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');

  const responsiveContainer = {
    size: RESPONSIVE_MOBILE ? 550 : 450
  };

  const responsiveTitleText = {
    size: RESPONSIVE_MOBILE ? 20 : 25
  };

  const imgs: string[] = [
    require('../assets/img/visual3/moment_pics/1.png'),
    require('../assets/img/visual3/moment_pics/2.png'),
    require('../assets/img/visual3/moment_pics/3.png'),
    require('../assets/img/visual3/moment_pics/4.png'),
    require('../assets/img/visual3/moment_pics/5.png')
  ];

  const slides: JSX.Element[] = imgs.map((img, index) => {
    return (
      <div key={`slide-${img}`} onClick={() => handleOpen(img)}>
        <img src={img} alt={`Slide ${index}`} />
      </div>
    );
  });
  const handleOpen = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setOpened(true);
  };

  const handleClose = () => setOpened(false);

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
              Attendance: {modalInfo.submitInfo.participate}
              <br />
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
                      <Text
                        className={classes.textWithPointerCursor}
                        color="#888"
                        underline
                        onClick={() =>
                          setHerPhoneNumberText('+1) 778. 727. 9067')
                        }
                      >
                        {herPhoneNumberText}
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
                      <Text
                        className={classes.textWithPointerCursor}
                        color="#888"
                        underline
                        onClick={() =>
                          setHisPhoneNumberText('+1) 778. 723. 8027')
                        }
                      >
                        {hisPhoneNumberText}
                      </Text>
                    </li>
                  </ul>
                </div>
                <ul className={classes.flexDisplay}>
                  <li className={classes.contactIcon}>
                    <figure>
                      <a href={`tel:778-723-8027`}>
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
              <Visual3RSVPForm
                subdomain={subdomain}
                actionType="PUT"
                onSubmit={(submitInfo: SubmitInfo) => {
                  setModalInfo({
                    opened: true,
                    submitInfo: submitInfo
                  });
                }}
              />
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
              <Modal opened={opened} onClose={handleClose} size="xl">
                <img
                  src={selectedImage}
                  alt="Selected preview"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Modal>
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
