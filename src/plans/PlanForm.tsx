import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.css';
import { createPaidSubscription } from '../store/subscriptions/api';
import { notify } from '../utils';

export default function PlanForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement)!;

    stripe.createToken(cardElement).then(function(result) {
      if (result.error) {
        notify(
          `An error occurred while trying to request a payment token from Stripe: ${result.error}`,
          'danger'
        );
        console.log('[token error]', result.error);
      } else {
        // TODO pass the token to create a subscription for this plan
        console.log('[Token]', result.token);
        createPaidSubscription(
          props.plan.id,
          props.organization,
          result.token ? result.token.id : '',
          props.actions
        ).then(status => {
          if (status.ok) {
            console.log('success', status);
          } else {
            console.log('error', status);
            notify(
              `An error occurred while trying to create a paid subscription in Squarelet: ${status}`,
              'danger'
            );
          }
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <button className="button is-success" disabled={!stripe}>
        Submit
      </button>
    </form>
  );
}
