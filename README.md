# Connect GOV.UK Pay and GOV.UK Notify

> **Warning**
> <br />This is an experimental integration and should not be used for live data

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

|   | Deployment steps |
| ------------- | ------------- |
| | With a Heroku account, you can deploy this integration to Heroku.<br /><br /> [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sfount/connect-pay-notifications) |
|  ![dashboard heroku com_new_button-url=https%3A%2F%2Fsfount github io%2F template=https%3A%2F%2Fgithub com%2Fsfount%2Fconnect-pay-notifications (1)](https://user-images.githubusercontent.com/2844572/188918410-973b00fc-fdbf-4733-8677-bf00802693e3.png) | Enter the Notify configuration for your integration |
| ![dashboard heroku com_new_button-url=https%3A%2F%2Fsfount github io%2F template=https%3A%2F%2Fgithub com%2Fsfount%2Fconnect-pay-notifications (2)](https://user-images.githubusercontent.com/2844572/188919162-84f3b412-532c-4f11-9296-20beeaf639b4.png) | Deploy your integration  |
| ![dashboard heroku com_new_button-url=https%3A%2F%2Fsfount github io%2F template=https%3A%2F%2Fgithub com%2Fsfount%2Fconnect-pay-notifications (4)](https://user-images.githubusercontent.com/2844572/188919559-8b7458ac-2c59-4453-98b5-ed79a7df4db4.png) | Once complete, open the deployed app  
 |  ![quiet-eyrie-84605 herokuapp com_](https://user-images.githubusercontent.com/2844572/188919970-33ed340d-5a14-4e0d-951a-314b1898ea2e.png) | You can now use the URL of this deployed app to receive webhooks from GOV.UK Pay |

You can now [set up your webhook](#setting-up-your-webhook) with your integration URL.

## Setting up your webhook

With the URL of your integration , follow the steps to [create a webhook](https://docs.payments.service.gov.uk/webhooks/#create-a-webhook) with GOV.UK Pay.

> **Note**
> <br />Make sure to select the "Payment succeeded" event for the integration to send email when new payments are complete
