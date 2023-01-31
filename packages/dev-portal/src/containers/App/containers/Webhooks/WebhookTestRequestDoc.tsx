export const WebhookTestRequestDoc = () => {
  const payloadExample = `
  {
    "networkId": "ph0Mjn78U5",
    "context": "NETWORK",
    "currentSettings": [],
    "type": "TEST",
    "data": {
      "challenge": "fa1d461f1912801af99c56e0193659b2926cfab3"
    }
  }
  `
  const responseExample = `
  HTTP 200 OK
  Content-type: application/json
  {
    "type": "TEST",
    "status": "SUCCEEDED",
    "data": {
      "challenge": "fa1d461f1912801af99c56e0193659b2926cfab3"
    }
  }
  `

  return (
    <>
      The payload you&apos;ll receive is similar to this JSON:
      <pre>
        <code>{payloadExample}</code>
      </pre>
      Once you receive the event, verify the request&apos;s authenticity and
      then respond in json with the challenge attribute value. In this example,
      that might be:
      <pre>
        <code>{responseExample}</code>
      </pre>
    </>
  )
}
