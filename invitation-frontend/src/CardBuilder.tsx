import { useState } from 'react';
import { Grid, Stack, Box, Container, Text } from '@mantine/core';
import { ChromePicker, ColorResult } from 'react-color';
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
    <Grid className="cardbuilder">
      <Grid.Col lg={3} className="cardbuilder-left">
        <Stack
          className="cardbuilder-right"
          style={{ position: 'fixed', top: 20 }}
        >
          <Text component="h1" size={25} mb={10}>
            Choose the Visual Type
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col lg={6} className="cardbuilder-container">
        <Container className="invitation-wrap type01">
          <Intro mainColor={mainColor} />
          <Calendar mainColor={mainColor} secondColor={secondColor} />
          <Rsvp mainColor={mainColor} />
          <Gallery mainColor={mainColor} />
          <Contact mainColor={mainColor} />
        </Container>
      </Grid.Col>
      <Grid.Col lg={3}>
        <Stack
          className="cardbuilder-right"
          style={{ position: 'fixed', top: 20 }}
        >
          <Text component="h1" size={25} mb={10}>
            Custom Builder
          </Text>
          <Box className="cardbuilder-right-item">
            <Text component="h2" size={16} weight={400} mb={10}>
              Primary Color
            </Text>
            <ChromePicker
              color={mainColor.rgb}
              onChangeComplete={(color) => setMainColor(color)}
            />
          </Box>
          <Box className="cardbuilder-right-item">
            <Text component="h2" size={16} weight={400} mb={10}>
              Second Color
            </Text>
            <ChromePicker
              color={secondColor.rgb}
              onChangeComplete={(color) => setSecondColor(color)}
            />
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default CardBuilder;
