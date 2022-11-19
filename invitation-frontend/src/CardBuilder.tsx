import { useState } from 'react';
import { Grid, Stack, Box, Container, Text, Select } from '@mantine/core';
import { ChromePicker, ColorResult } from 'react-color';
import Visual from './component/Visual';
import Visual3 from './component/Visual3';
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
  const [selectVisual, setSelectVisual] = useState<HTMLDivElement | string>();

  const visuals: JSX.Element[] = [
    <Visual />,
    <Visual2 mainColor={mainColor} />,
    <Visual3 />
  ];

  const visual = visuals.map((item) => {
    const mainColor = `mainColor={mainColor}`;
    if (selectVisual === null) {
      return 'Please select visual component';
    }
    return { item };
  });

  // const VisualComponent: React.FC<HTMLDivElement> = function (){
  //   if (selectVisual === 'visual01') return <Visual />;
  //   else if (selectVisual === 'visual02')
  //     return <Visual2 mainColor={mainColor} />;
  //   else if (selectVisual === 'visual03') return <Visual3 />;
  //   else return <Visual />;
  // }

  return (
    <Grid
      className="cardbuilder"
      // style={{
      //   maxWidth: 1400,
      //   marginLeft: 'auto',
      //   marginRight: 'auto'
      // }}
    >
      <Grid.Col lg={3} className="cardbuilder-left">
        <Stack
          className="cardbuilder-right"
          style={{ position: 'fixed', top: 20 }}
        >
          <Text component="h1" size={25} mb={10}>
            Choose the Visual Type
          </Text>
          <Select
            label="Your favorite framework/library"
            placeholder="Choose the Visual Type"
            // onChange={setSelectVisual}
            data={[
              { value: 'visual01', label: 'Visual Type 01' },
              { value: 'visual02', label: 'Visual Type 02' },
              { value: 'visual03', label: 'Visual Type 03' }
            ]}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col lg={6} className="cardbuilder-container">
        <Container className="invitation-wrap type01">
          <div></div>
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
