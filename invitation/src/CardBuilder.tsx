import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ChromePicker } from "react-color";
interface CardBuilderProps {
    children: JSX.Element,
    mainColor : string,
    setMainColor : (color: string) => void,
};

const CardBuilder = ({ children, mainColor, setMainColor }: CardBuilderProps) => {
    return (
        <Grid container>
            <Grid lg={3}>left</Grid>
            <Grid lg={6}>
                {children}
            </Grid>
            <Grid lg={3}>
                <Container style={{position: 'fixed', top: 20}}>
                   <ChromePicker 
                        color={mainColor}
                        onChangeComplete={(color) => setMainColor(color.hex)}
                   />
                </Container>
            </Grid>
        </Grid>
    );
};

export default CardBuilder;
