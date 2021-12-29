import Head from 'next/head'
import Image from 'next/image'

import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('Michael')
  const [surname, setSurname] = useState('Jackson')
  const [age, setAge] = useState(69)

  const [result, setResult] = useState('Result of API goes here...')

  async function handleSubmit(fetcher) {
    setResult('Submitting...')

    try {
      const response = await fetcher({ name, surname, age })
      const json = await response.json()
      setResult(JSON.stringify(json, null, 2))
    } catch (err) {
      setResult(`There was an error: ${err.message}`)
    }
  }

  return (
    <main>
      <form>
        <h2>Test Form</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)} />
        <input
          type="text"
          placeholder="Surname"
          name="surname"
          value={surname}
          onChange={e => setSurname(e.target.value)} />
        <input
          type="number"
          name="age"
          value={age}
          onChange={e => setAge(e.target.value)} />

        <button
          type="button"
          onClick={() => handleSubmit(fetchJson)}>
          Submit (JSON)
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(fetchUrlEncoded)}>
          Submit (url-encoded)
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(fetchMultipart)}>
          Submit (multipart)
        </button>

        <textarea readOnly={true} value={result} />

        <p>
          Once you click either "Submit" button, a request will be made to
          the API (at /api/submit) of this website. The response will be
          displayed in the textarea.
        </p>
        <p>
          In all cases, the body should contain three fields: name, surname
          and age. So req.body should itself be an object with those three
          fields, if the body was indeed parsed.
        </p>
        <p>
          Note that the url-encoded version converts every field into a
          string, but that's inevitable, so I'm not concerned with that. The
          multipart version, on the other hand, doesn't work at all.
        </p>
      </form>
    </main>
  )
}

function fetchJson(data) {
  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

function fetchUrlEncoded(data) {
  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data),
  })
}

function fetchMultipart(data) {
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
}
