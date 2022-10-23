import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import { ChromePicker } from "react-color";
interface CardBuilderProps {
    children: JSX.Element,
    mainColor : string,
    setMainColor : (color: any) => void,
    secondColor : string,
    setSecondColor : (color: string) => void,
};

const CardBuilder = ({ children, mainColor, setMainColor, secondColor, setSecondColor }: CardBuilderProps) => {
    return (
        <Grid container className="cardbuilder">
            <Grid lg={3} className="cardbuilder-left">This is left column 22</Grid>
            <Grid lg={6} className="cardbuilder-container">
                {children}
            </Grid>
            <Grid lg={3}>
                <Stack className="cardbuilder-right" style={{position: 'fixed', top: 20}}>
                    <h1>Custom Builder</h1>
                    <Item className="cardbuilder-right-item">
                        <h2>Primary Color</h2>
                        <ChromePicker 
                            color={mainColor}
                            onChangeComplete={(color) => setMainColor(color.rgb)}
                            />
                    </Item>
                    <Item className="cardbuilder-right-item">
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
