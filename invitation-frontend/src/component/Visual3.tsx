import { Container, MantineProvider } from '@mantine/core';
import { Visual3Styles } from '../style/Visual3Styles';

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
  // mainColor: ColorResult;
}

const Visual3 = (props: Visual3Props) => {
  const { classes } = useStyles();
  const { year, monthNum, day, bride, groom, month, location, time } = props;

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
