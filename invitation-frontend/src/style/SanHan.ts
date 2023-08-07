import { createStyles } from '@mantine/core';
// import imgVisual from '../assets/img/samhan/samhan-visual-bg.jpg';
import imgVisual from '../assets/img/samhan/samhan-visual-bg.jpg';

const SamHanStyles = () =>
  createStyles(() => ({
    // Select Style
    selectWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 5,
      justifyContent: 'space-between',
      padding: `1px 5px`,
      borderRadius: 5,
      border: '1px solid #ddd',
      backgroundColor: '#fff'
    },
    control: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      '&:disabled': {
        borderColor: '1px solid #ddd',
        opacity: 0.8,
        backgroundColor: 'transparent'
      }
    },
    'selectWrapper input': {
      textAlign: 'center',
      paddingRight: 10,
      paddingLeft: 10,
      height: 28,
      flex: 1
    },
    // Visual
    invitationSam: {
      position: 'relative'
    },
    invitationWrap: {
      maxWidth: 800,
      margin: '0 auto',
      boxShadow: '-1px -1px 14px rgba(0,0,0,0.08)'
    },
    inr: {
      maxWidth: 770,
      padding: '0 15px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between'
    },
    newVisual: {
      width: '100%',
      padding: '30px 0 50px 0',
      background: `url(${imgVisual}) no-repeat center / cover`,
      height: '100vh'
    },
    invitationTit: {
      margin: 0,
      textAlign: 'center',
      color: '#fff'
    },
    characterInfo: {
      position: 'relative',
      color: '#fff',
      marginBottom: 50
    },
    and: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 400,
      fontFamily: 'Rouge Script!important',
      opacity: 0.5,
      textAlign: 'center',
      display: 'block',
      '&::before': {
        content: `""`,
        width: '30%',
        height: 1,
        background: '#fff',
        opacity: 0.3,
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      },
      '&::after': {
        content: `""`,
        width: '30%',
        height: 1,
        background: '#fff',
        opacity: 0.3,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
      }
    },
    // Intro
    newIntro: {
      position: 'relative'
    },
    sectionTitWrap: {
      position: 'relative'
    },
    sectionTit: {
      fontFamily: 'Rouge Script!important',
      opacity: 0.1,
      lineHeight: 1
    },
    sectionSubTit: {
      position: 'absolute',
      left: '50%',
      bottom: '10%',
      transform: 'translateX(-50%)',
      textTransform: 'uppercase',
      width: '100%'
    },
    titleDecoFigure: {
      margin: '30px 0',
      textAlign: 'center',
      fontSize: 0
    },
    titleDecoImg: {
      maxWidth: '100%',
      margin: '0 auto'
    },
    titleDecoImg2: {
      maxWidth: '100%',
      margin: '0 auto'
    },
    introMessage: {
      width: '70%',
      margin: '0 auto'
    },
    introDeco1Figure: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    introDeco2Figure: {
      position: 'absolute',
      right: 0,
      bottom: 0
    },
    newCalendar: {
      position: 'relative'
    },
    calendarTable: {
      width: '100%',
      marginBottom: 50,
      fontFamily: 'Crimson Text!important',
      th: {
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#666',
        padding: '0.5em 0',
        textAlign: 'center',
        verticalAlign: 'middle'
      },
      td: {
        width: 'calc(100%/7)',
        textAlign: 'center',
        verticalAlign: 'middle',
        position: 'relative',
        fontSize: 18,
        color: '#666',
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
    current: {
      background: '#2C4032',
      borderRadius: '100%',
      color: '#fff!important',
      fontSize: 18,
      textAlign: 'center'
    },
    calendarWeddingSummary: {
      padding: '20px 0',
      fontSize: 20,
      color: '#2C4032',
      textAlign: 'center',
      borderTop: '1px solid #eee',
      borderBottom: '1px solid #eee'
    },
    calendarDecoImg: {
      margin: '0 auto'
    },
    contactList: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30
    },
    contactListLeft: {
      display: 'flex'
    },
    contactInfoName: {
      display: 'flex',
      alignItems: 'end'
    },
    contactIcon: {
      width: 40,
      height: 40,
      background: '#2C4032',
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
    carouselWrap: {
      '.slide': {
        img: {
          width: '100%',
          height: 500,
          objectFit: 'contain'
        }
      },
      '.thumb': {
        img: {
          height: 100,
          objectFit: 'contain'
        }
      }
    },
    map: {
      marginBottom: 50
    },
    customButton: {
      width: '100%',
      height: 60,
      fontSize: 20,
      fontWeight: 500,
      color: '#fff',
      background: '#2C4032',
      border: 'none',
      outline: 'none',
      marginTop: 50,
      cursor: 'pointer'
    },
    customAddCalendarButton: {
      width: '100%',
      height: 60,
      fontSize: 20,
      fontWeight: 500,
      color: '#fff',
      background: '#2C4032',
      border: 'none',
      outline: 'none',
      marginTop: 50,
      marginBottom: 50,
      cursor: 'pointer'
    },
    countInput: {
      input: {
        textAlign: 'center'
      }
    },
    textarea: {
      width: '100%',
      height: 150,
      display: 'block',
      marginTop: 5,
      borderColor: '#ddd',
      outline: 'none',
      fontSize: 16,
      padding: '15px 20px',
      borderRadius: 5,
      '::placeholder': {
        fontSize: 16
      }
    },
    closeMenu: {
      cursor: 'pointer'
    },
    menu: {
      marginBottom: 20,
      width: '70%'
    },
    hr: {
      borderColor: '#ddd'
    },
    galleryDeco: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    contactDeco: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    sound: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 55,
      height: 55,
      padding: 6,
      border: '2px solid #aaa',
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      img: {
        width: 35,
        height: 35
      }
    }
  }));

export { SamHanStyles };
