export default function handler(req, res) {
  // Body should be filled with the form data no matter which Content-Type is used.
  // That is, so long as the Content-Type is supported by Next/Vercel...

  if (typeof req.body !== 'object') {
    console.log('I received something that is not an object:')
    console.log('============================================')
    console.log(req.body)
    console.log('============================================')
    console.log('In other words, Next did NOT parse the body.')
    console.log('I will now send a custom 500 error response.')
    res.status(500).json({
      error: 'The body was not parsed.',
      type: typeof req.body,
    })
    return
  }

  res.status(200).json(req.body)
}
