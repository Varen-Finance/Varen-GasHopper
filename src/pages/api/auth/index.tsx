export default function handler(req, res) {
  const superSecretPassword = 'superSecretPassword'
  if (req.body.password === superSecretPassword) {
    res.status(200).json('success')
  } else {
    res.status(401).json('error')
  }
}
