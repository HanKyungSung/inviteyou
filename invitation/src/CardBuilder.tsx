import Color from "./component/Color";
interface CardBuilderProps {
    children: JSX.Element
};

const CardBuilder = ({ children }: CardBuilderProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>{children}</div>
            <div style={{ position: 'fixed', right: 0, backgroundColor: 'whitesmoke', width: '300px', height: '100%' }}>
                <Color />
            </div>
        </div>
    );
};

export default CardBuilder;
