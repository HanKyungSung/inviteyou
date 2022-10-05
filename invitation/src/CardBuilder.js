const CardBuilder = ({ children }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'fixed', left: 0, backgroundColor: 'whitesmoke', width: '300px', height: '100%' }}>
                Left Column
            </div>
            <div>{children}</div>
            <div style={{ position: 'fixed', right: 0, backgroundColor: 'whitesmoke', width: '300px', height: '100%' }}>
                <div>Right Column</div>
                <div style={{ backgroundColor: 'red', width: '100%', height: '500px' }}>Color Picker</div>
            </div>
        </div>
    );
};

export default CardBuilder;