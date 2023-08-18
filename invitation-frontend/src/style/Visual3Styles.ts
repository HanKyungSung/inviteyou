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
      width: '100%',
      padding: '0 0 50px 0',
      background: `url(${imgVisual}) no-repeat center / cover`,
      marginTop: '15vh',
      height: '100vh'
    },
    weddingMainDate: {
      lineHeight: '1.2',
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '16vw',
      marginTop: '-15vh',
      height: '16vw',
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
      fontSize: '2.3rem',
      marginBottom: '10px'
    },
    weddingMainDateStrong: {
      fontSize: '3.5rem'
    },
    weddingDetails: {
      width: '70%',
      position: 'absolute',
      left: '40%',
      top: '30%',
      transform: 'translate(-50%)',
      padding: '1em 0',
      fontSize: '1.5rem',
      color: '#fff'
    },
    weddingCharacter: {
      textTransform: 'uppercase'
    },
    newIntro: {
      width: '100%',
      height: '60vh'
    },
    sectionTitWrap: {
      position: 'relative'
    },
    sectionSubTit: {
      position: 'absolute',
      left: '50%',
      bottom: '20%',
      transform: 'translateX(-50%)',
      textTransform: 'uppercase',
      fontWeight: 500,
      width: '100%'
    },
    introMessage: {
      width: '100%',
      margin: '0 auto',
      marginTop: '20px',
      marginLeft: '20px'
    },
    calendarTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2em',
      fontSize: '1rem',
      paddingBottom: '20px',
      borderBottom: '0.1rem solid rgb(102, 102, 102)'
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
    contactList: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30
    },
    contactListLeft: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    contactIcon: {
      width: 40,
      height: 40,
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
    }
  }));

export { Visual3Styles };
