import { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import { ChromePicker } from "react-color";
interface CardBuilderProps {
    children: JSX.Element,
    mainColor : string,
    setMainColor : (color: string) => void,
    secondColor : string,
    setSecondColor : (color: string) => void,
};

const CardBuilder = ({ children, mainColor, setMainColor, secondColor, setSecondColor }: CardBuilderProps) => {
    return (
        <Grid container>
            <Grid lg={3}>left</Grid>
            <Grid lg={6}>
                {children}
            </Grid>
            <Grid lg={3}>
                <Stack style={{position: 'fixed', top: 20}}>
                    <h1>Custom Builder</h1>
                    <Item>
                        <h2>Primary Color</h2>
                        <ChromePicker 
                            color={mainColor}
                            onChangeComplete={(color) => setMainColor(color.hex)}
                            />
                    </Item>
                    <Item>
                        <h2>Second Color</h2>
                        <ChromePicker 
                            color={secondColor}
                            onChangeComplete={(color) => setSecondColor(color.hex)}
                        />
                    </Item>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default CardBuilder;
