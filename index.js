const process = require('process')

const express = require('express')
const { NotifyClient } = require('notifications-node-client')

const PORT = process.env.PORT || 80
const { NOTIFY_API_KEY, NOTIFY_TEMPLATE_ID, NOTIFY_EMAIL_ADDRESS } = process.env

const app = express()
const notify = new NotifyClient(NOTIFY_API_KEY)

app.use(express.json())

app.get('/', (req, res, next) => res.status(200).send())

app.post('/', async (req, res, next) => {
  const { resource } = req.body
  try {
    if (resource.event_type === 'CARD_PAYMENT_SUCCEEDED') {
      const response = await notify.sendEmail(
        NOTIFY_TEMPLATE_ID,
        NOTIFY_EMAIL_ADDRESS,
        {
          personalisation: {
            reference: resource.reference || '',
            cardholder_name: (resource.card_details && resource.card_details.cardholder_name) || ''
          },
          reference: resource.reference
        }
      )
    }
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

app.listen(PORT)
