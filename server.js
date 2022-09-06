const process = require('process')
const express = require('express')
const { NotifyClient } = require('notifications-node-client')

const notifications = require('./notifications')

const PORT = process.env.PORT || 80
const { NOTIFY_API_KEY, NOTIFY_TEMPLATE_ID, NOTIFY_EMAIL_ADDRESS } = process.env

const app = express()

const notify = new NotifyClient(NOTIFY_API_KEY || '')

app.use(express.json())
app.set('view engine', 'pug')

app.get('/', async (req, res, next) => {
  let connectedToNotify, verifiedNotifyTemplateIDExists
  if (NOTIFY_API_KEY) {
    try {
      const response = await notify.getAllTemplates()
        .then((httpResponse) => httpResponse.data)

      connectedToNotify = response && response.templates && response.templates.length
      verifiedNotifyTemplateIDExists = connectedToNotify && response.templates.map((template) => template.id).includes(NOTIFY_TEMPLATE_ID)
    } catch (error) {
      // no op
    }
  }
  res.render('status', {
    connectedToNotify,
    verifiedNotifyTemplateIDExists,
    foundNotifyApiKey: NOTIFY_API_KEY !== undefined,
    foundNotifyTemplateKey: NOTIFY_TEMPLATE_ID !== undefined,
    foundTargetEmailAddress: NOTIFY_EMAIL_ADDRESS !== undefined,
    host: req.get('host')
  })
})


app.post('/', async (req, res, next) => {
  try {
    const response = await notifications.handle(req.body)
    console.log('got response', response)
    if (response && response.data && response.data.id) {
      res.status(200).send()
    } else {
      console.log('Did not get ID confirmation from sending email')
      console.log(response)
      res.status(424).send()
    }
  } catch (error) {
    next(error)
  }
})

app.listen(PORT)
