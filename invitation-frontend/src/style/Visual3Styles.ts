import { createStyles } from '@mantine/core';
import imgVisual from '../assets/img/visual-02.jpg';

const Visual3Styles = () =>
  createStyles(() => ({
    invitationVisual: {
      position: 'relative'
    },
    invitationWrap: {
      maxWidth: 800,
      margin: '0 auto'
    },
    newVisual: {
      padding: '0 0 50px 0',
      background: `url(${imgVisual}) no-repeat center / cover`,
      marginTop: '21vh',
      height: '75vh'
    },
    weddingMainDate: {
      lineHeight: '1.2',
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '15.5vw',
      height: '17.6vh',
      marginTop: '-21vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: '#fff',
      minWidth: '250px',
      minHeight: '250px',
      backgroundColor: 'rgb(180, 152, 133)',
      '&::after': {
        content: '""',
        width: '90%',
        height: '90%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #fff'
      }
    },
    weddingMainDateSmall: {
      fontSize: '2rem',
      marginBottom: '10px'
    },
    weddingMainDateStrong: {
      fontSize: '3rem',
      fontWeight: 900
    },
    // TODO: Need to adjust text inside image
    weddingDetails: {
      width: '70%',
      position: 'absolute',
      left: '7%',
      top: '11%',
      padding: '1em 0',
      fontSize: '0.75rem',
      color: '#fff'
    },
    weddingCharacter: {
      textTransform: 'uppercase',
      fontSize: '1.3rem',
      fontWeight: 900
    },
    newIntro: {
      position: 'relative'
    },
    sectionTitWrap: {
      position: 'relative'
    },
    sectionSubTit: {
      position: 'absolute',
      left: '50%',
      bottom: '10%',
      lineHeight: '1.4',
      transform: 'translateX(-50%)',
      textTransform: 'uppercase',
      fontWeight: 900,
      width: '100%'
    },
    introMessage: {
      width: '100%',
      marginTop: '35px'
    },
    calendarTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2em',
      fontSize: '1rem',
      paddingBottom: '20px',
      borderBottom: '0.1rem solid #aaaaaa',
      color: 'rgb(0, 0, 0)'
    },
    weddingMonth: {
      fontSize: '1.2em',
      fontWeight: 500
    },
    weddingYear: {
      fontSize: '0.9rem'
    },
    weddingDayOfWeek: {
      textTransform: 'uppercase',
      display: 'inline-block',
      marginRight: '7px'
    },
    current: {
      backgroundColor: 'rgb(180, 152, 133)',
      color: '#fff',
      fontWeight: 700,
      borderRadius: '50%'
    },
    calendarTable: {
      width: '100%',
      fontFamily: 'Crimson Text!important',
      th: {
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: 15,
        color: '#aaaaaa',
        padding: '0.5em 0',
        textAlign: 'center',
        verticalAlign: 'middle'
      },
      td: {
        width: 'calc(100%/7)',
        textAlign: 'center',
        verticalAlign: 'middle',
        position: 'relative',
        fontSize: 15,
        color: '#aaaaaa',
        '&::after': {
          content: `''`,
          display: 'block',
          marginTop: '100%'
        },
        span: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    },
    contactList: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 45
    },
    contactListLeft: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    contactIcon: {
      width: 45,
      height: 45,
      background: 'rgb(180, 152, 133)',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      borderRadius: '100%',
      margin: '0 5px',
      fontSize: 18,
      figure: {
        width: 18,
        height: 18
      }
    },
    menu: {
      flex: 1,
      marginRight: 10,
      border: '2px solid rgb(204, 204, 204)',
      padding: 10,
      textAlign: 'center'
    },
    clickedMenu: {
      border: '2px solid rgb(180, 152, 133)',
      color: 'rgb(180, 152, 133)'
    },
    inputWrap: {
      paddingTop: '20px'
    },
    textarea: {
      width: '100%',
      height: 150,
      display: 'block',
      marginTop: 5,
      borderColor: '#ddd',
      outline: 'none',
      fontSize: 14,
      padding: '15px 20px',
      borderRadius: 5,
      color: 'rgb(180, 152, 133)',

      '::placeholder': {
        fontSize: 16
      }
    },
    customButton: {
      width: '100%',
      height: 60,
      fontSize: 18,
      fontWeight: 900,
      color: '#fff',
      background: 'rgb(180, 152, 133)',
      border: 'none',
      outline: 'none',
      marginTop: 25,
      cursor: 'pointer',
      textTransform: 'uppercase'
    },
    customButtonWithSmallFont: {
      fontSize: 16
    },
    carouselWrap: {
      '.slide': {
        img: {
          margin: 0,
          width: '100%',
          height: 300,
          objectFit: 'contain'
        }
      },
      '.thumb': {
        marginRight: 0,
        padding: 0,
        img: {
          height: 80,
          objectFit: 'cover'
        }
      },
      '.carousel .thumbs-wrapper': {
        margin: 0
      },
      '.carousel .thumb': {
        marginRight: 0,
        padding: 0
      }
    },
    locationList: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    },
    locationListLeft: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }));

export { Visual3Styles };
