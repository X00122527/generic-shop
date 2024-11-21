import json
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
import stripe
# This is a public sample test API key.
# Don’t submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.

stripe.api_key = 'sk_test_zzPhAh8sZkhmI4JDtzTNnhGl'

def calculate_order_amount(items):
    return 1400


@api_view(['POST'])
def create_payment(request):
    try:
        data = request.data

        # Create a PaymentIntent with Stripe
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data.get('items', [])),
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )

        return JsonResponse({
            'clientSecret': intent['client_secret'],
            'dpmCheckerLink': f'https://dashboard.stripe.com/settings/payment_methods/review?transaction_id={intent["id"]}',
        })

    except Exception as e:
        raise APIException(str(e))

