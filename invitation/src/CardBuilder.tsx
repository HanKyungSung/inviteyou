import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
interface CardBuilderProps {
    children: JSX.Element
};

const CardBuilder = ({ children }: CardBuilderProps) => {
    return (
        <Grid container>
            <Grid lg={3}>left</Grid>
            <Grid lg={6}>
                {children}
            </Grid>
            <Grid lg={3}>
                <Container style={{position: 'fixed', top: 20}}>
                    right
                </Container>
            </Grid>
        </Grid>
    );
};

export default CardBuilder;
