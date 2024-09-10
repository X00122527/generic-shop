import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PayPalComponent = () => {

    const styles = {
        shape: "rect",
        layout: "vertical",
        disableMaxWidth: true,
        label: "checkout",
        disableFunding: "credit",
        tagline: false,
    };

    const initialOptions = {
        clientId: "test",
        disableFunding: "card"
    };


    return (
        <div className="w-[240px] h-[40px]">
        <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={styles} />
        </PayPalScriptProvider>
        </div>

    );
};

export default PayPalComponent;