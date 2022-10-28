import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import { ChromePicker, ColorResult } from 'react-color';
// import Visual from "./component/Visual";
import Visual2 from './component/Visual2';
import Intro from './component/Intro';
import Calendar from './component/Calendar';
import Rsvp from './component/Rsvp';
import Gallery from './component/Gallery';
import Contact from './component/Contact';

const CardBuilder = () => {
  const defaultColor: ColorResult = {
    hex: '#ccccc',
    hsl: {
      h: 0,
      s: 0,
      l: 0,
      a: 1
    },
    rgb: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }
  };

  const [mainColor, setMainColor] = useState<ColorResult>(defaultColor);
  const [secondColor, setSecondColor] = useState<ColorResult>(defaultColor);

  return (
    <Grid container className="cardbuilder">
      <Grid lg={3} className="cardbuilder-left">
        Second testing
      </Grid>
      <Grid lg={6} className="cardbuilder-container">
        <main className="invitation-wrap type01">
          <Visual2 mainColor={mainColor} />
          <Intro mainColor={mainColor} />
          <Calendar mainColor={mainColor} secondColor={secondColor} />
          <Rsvp mainColor={mainColor} />
          <Gallery mainColor={mainColor} />
          <Contact mainColor={mainColor} />
        </main>
      </Grid>
      <Grid lg={3}>
        <Stack
          className="cardbuilder-right"
          style={{ position: 'fixed', top: 20 }}
        >
          <h1>Custom Builder</h1>
          <Item className="cardbuilder-right-item">
            <h2>Primary Color</h2>
            <ChromePicker
              color={mainColor.rgb}
              onChangeComplete={(color) => setMainColor(color)}
            />
          </Item>
          <Item className="cardbuilder-right-item">
            <h2>Second Color</h2>
            <ChromePicker
              color={secondColor.rgb}
              onChangeComplete={(color) => setSecondColor(color)}
            />
          </Item>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CardBuilder;
