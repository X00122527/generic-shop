import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";


function GooglePayComponent() {

    const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"]
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example"
              }
            }
          }
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant"
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: "100.00",
          currencyCode: "USD",
          countryCode: "US"
        }
      };


  return (
    <div>
        <GooglePayButton
          environment="TEST"
          buttonColor={"default"}
          buttonType={"buy"}
          buttonSizeMode={"static"}
          paymentRequest={paymentRequest}
          onLoadPaymentData={paymentRequest => {
            console.log("load payment data", paymentRequest);
          }}
          style={{ width: "400px", height: "40px" }}
        />        
    </div>
  )
}

export default GooglePayComponent