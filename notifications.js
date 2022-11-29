const process = require('process')
const { NotifyClient } = require('notifications-node-client')

const { NOTIFY_API_KEY, NOTIFY_TEMPLATE_ID, NOTIFY_EMAIL_ADDRESS } = process.env
const notify = new NotifyClient(NOTIFY_API_KEY || '')

function handle(webhookMessage) {
  const { resource } = webhookMessage
  // @TODO spec will be finalised
  const eventType = webhookMessage.event_type || webhookMessage.event_type_name

  if (eventType === 'card_payment_succeeded') {

    // notify expect all personalisation fields to be flat
    const flatMetadata = Object.keys(resource.metadata).reduce((aggregate, key) => {
      aggregate[`metadata.${key}`] = resource.metadata[key]
      return aggregate
    }, {})
    return notify.sendEmail(
      NOTIFY_TEMPLATE_ID,
      NOTIFY_EMAIL_ADDRESS,
      {
        personalisation: {
          reference: resource.reference || '',
          cardholder_name: (resource.card_details && resource.card_details.cardholder_name) || '',
          ...flatMetadata
        },
        reference: resource.reference
      }
    )
  }
}

module.exports = { handle }
