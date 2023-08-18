import { Container, Image, MantineProvider, Text } from '@mantine/core';
import { Visual3Styles } from '../style/Visual3Styles';
import { useMediaQuery } from '@mantine/hooks';
import imgBride from '../assets/img/visual3/img-bride.png';
import imgGroom from '../assets/img/visual3/img-groom.png';
import { ImPhone } from 'react-icons/im';

const useStyles = Visual3Styles();

interface Visual3Props {
  year: number;
  monthNum: number;
  day: number;
  bride: string;
  groom: string;
  month: string;
  location: string;
  time: string;
  subdomain: string;
  // mainColor: ColorResult;
}

const Visual3 = (props: Visual3Props) => {
  const { classes } = useStyles();
  const { year, monthNum, day, bride, groom, month, location, time } = props;
  const RESPONSIVE_MOBILE = useMediaQuery('(max-width: 767px)');
  return (
    <>
      <MantineProvider
        theme={{
          globalStyles: (_theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              fontFamily: 'Kopub Batang'
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
          <Container className={classes.newVisual} fluid px={0}>
            <div className={classes.weddingMainDate}>
              <small className={classes.weddingMainDateSmall}>{year}</small>
              <strong className={classes.weddingMainDateStrong}>
                {monthNum}/{day}
              </strong>
            </div>
            <div className={classes.weddingDetails}>
              <p className={classes.weddingCharacter}>
                {bride} & {groom}
              </p>
              <p>@ {location}</p>
              <p>
                {monthNum}.{day}.{year} / {time}
              </p>
            </div>
          </Container>
          <Container className={classes.newIntro} py={100} px={0}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                color="rgb(180, 152, 133)"
                align="left"
                size={RESPONSIVE_MOBILE ? 20 : 40}
              >
                Forever together
              </Text>
            </div>
            <div className={classes.introMessage}>
              <Text
                size={RESPONSIVE_MOBILE ? 16 : 26}
                color="#555"
                align="left"
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
                size={RESPONSIVE_MOBILE ? 16 : 28}
                color="#555"
                align="left"
                pt={50}
              >
                Daniel Han & Anna Smith
              </Text>
            </div>
          </Container>
          <Container
            style={{ border: '40px solid rgb(180, 152, 133)', padding: '20px' }}
            size={RESPONSIVE_MOBILE ? 550 : 450}
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
                  <th style={{ color: '#FF0000' }}>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th style={{ color: '#0000FF' }}>Sat</th>
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
                    <span style={{ color: '#0000FF' }}>4</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: '#FF0000' }}>5</span>
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
                    <span style={{ color: '#0000FF' }}>11</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: '#FF0000' }}>12</span>
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
                    <span style={{ color: '#0000FF' }}>18</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: '#FF0000' }}>19</span>
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
                    <span style={{ color: '#0000FF' }}>25</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ color: '#FF0000' }}>26</span>
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
          <Container size={550} py={100}>
            <div className={classes.sectionTitWrap}>
              <Text
                className={classes.sectionSubTit}
                color="rgb(180, 152, 133)"
                align="left"
                size={RESPONSIVE_MOBILE ? 20 : 40}
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
                      <Text>Call To Bride</Text>
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
                      <Text>Call To Groom</Text>
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
