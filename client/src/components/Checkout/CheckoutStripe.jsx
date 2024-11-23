import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ServerUrl from '../../api/serverUrl';
// import "./App.css"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe("pk_test_OkJAbpCYKOtDIINu3s3PqEwA"); // this is test id

function CheckoutStripe() {

  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(ServerUrl.BASE_URL + "api/v1/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    clientSecret ? (
      <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    ) : (
      <div>Loading...</div> // Fallback UI while fetching clientSecret
    )
    )
    
  
}

export default CheckoutStripe