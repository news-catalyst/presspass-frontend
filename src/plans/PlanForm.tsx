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

    const createPaymentMethodAndCustomer = function(stripe, card) {
      stripe
        .createPaymentMethod('card', card, {
          billing_details: {
            email: props.user.email
          }
        })
        .then(function(result) {
          if (result.error) {
            notify(
              `failed creating payment method with stripe ${result.error}`,
              'danger'
            );
            console.log(
              'Failed creating payment method with Stripe:',
              result.error
            );
          } else {
            createCustomer(stripe, result.paymentMethod.id, props.user.email);
          }
        });
    };

    // this function calls Stripe's API to create a customer there
    //  it requires the customer's email address an a reference to their payment method,
    //  which is created with `createPaymentMethod` above
    async function createCustomer(stripe, paymentMethod, cardholderEmail) {
      return fetch('http://dev.presspass.com:4242/create-customer', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: cardholderEmail,
          payment_method: paymentMethod
        })
      })
        .then(response => {
          return response.json();
        })
        .then(subscription => {
          handleSubscription(stripe, subscription);
        });
    }

    function handleSubscription(stripe, subscription) {
      const { latest_invoice } = subscription;
      const { payment_intent } = latest_invoice;

      if (payment_intent) {
        const { client_secret, status } = payment_intent;

        if (status === 'requires_action') {
          notify(
            'Stripe requires confirmation of card payment before order is complete',
            'warning'
          );
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
              notify(
                `Failed to confirm card payment with stripe: ${result.error}`,
                'danger'
              );
            } else {
              // Show a success message to your customer
              confirmSubscription(subscription.id);
            }
          });
        } else {
          // No additional information was needed
          // Show a success message to your customer
          notify(
            `No additional info was required, order is complete! ${subscription}`,
            'success'
          );
        }
      } else {
        notify(
          `No payment intent found (why?) but I think order is complete! ${subscription}`,
          'success'
        );
      }
    }

    function confirmSubscription(subscriptionId) {
      return fetch('http://dev.presspass.com:4242/subscription', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          subscriptionId: subscriptionId
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(subscription) {
          notify(
            `subscription is confirmed, order is complete! ${subscription}`,
            'success'
          );
        });
    }

    createPaymentMethodAndCustomer(stripe, cardElement);
    // NOTE/TODO: this API POST to create a subscription with token is failing:
    //      stripe.error.InvalidRequestError: Request req_oBO1S8WwwZF2Qs: No such token: pm_1GODQbBxz3xP5jBmD7qhlYGl
    //
    // createPaidSubscription(
    //   props.plan.id,
    //   props.organization,
    //   paymentId,
    //   props.actions
    // ).then(status => {
    //   if (status.ok) {
    //     console.log('success', status);
    //   } else {
    //     console.log('error', status);
    //   }
    // });

    // // stripe.createToken(cardElement).then(function(result) {
    // //   if (result.error) {
    // //     console.log('[token error]', result.error);
    // //   } else {
    // //     // TODO pass the token to create a subscription for this plan
    // //     console.log('[Token]', result.token);
    // //   }
    // });
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
