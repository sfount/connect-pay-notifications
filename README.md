# Connect GOV.UK Pay and GOV.UK Notify

> **Warning**
> This is an experimental integration and should not be used for live data

Use GOV.UK Pay webhooks to send emails for payment events to a provided email address.

It is your responsibility to host and maintain this integration, you can do this using a number of providers:

* Heroku
* GOV.UK PaaS
* AWS Lambda

Before you get started, you will need:

* A GOV.UK Pay account
* A GOV.UK Notify account


## Setting up Notify

You will need a GOV.UK Notify account, service and template in order to send emails with this integration.

An email will be sent for the provided template whenever a payment is successfully processed.

This integration allows you to personalise your template with these fields

* `((reference))` - the payment reference
* `((cardholder_name))` - the name provided by the paying user


## Getting started with Heroku

To host on Heroku you will need:

* A Heroku account

You can deploy to Heroku using the button below, you will be asked to enter: 
* Your Notify API key
* The Notify template ID for the email you would like to be sent
* The email address which should receive emails when payments are made

Once you have provided this information and deployed your app, click `View` to check the status of your integration. You can then [set up your webhook](#setting-up-your-webhook)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sfount/connect-pay-notifications)

## Setting up your webhook

With the URL of your integration , follow the steps to [create a webhook](https://docs.payments.service.gov.uk/webhooks/#create-a-webhook) with GOV.UK Pay.

> **Note**
> Make sure to select the "Payment succeeded" event for the integration to send email when new payments are complete
