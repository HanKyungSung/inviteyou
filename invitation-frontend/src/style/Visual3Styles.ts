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
      bottom: '30px',
      transform: 'translate(-50%)',
      padding: '1em 0',
      fontSize: '1.5rem',
      color: '#fff'
    },
    weddingCharacter: {
      textTransform: 'uppercase'
    }
  }));

export { Visual3Styles };
