import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useEffect, useState } from 'react'
import { PlusIcon, CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { Router } from 'next/router'

const BASE_API_URL = 'http://localhost:3000/api'

export default function CreateUnit() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [type, setType] = useState('')
  const [decane, setDecane] = useState('')
  const [description, setDescription] = useState('')
  const [creationUrl, setCreationUrl] = useState('')
  const [costCenter, setCostCenter] = useState('')
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await fetch(`${BASE_API_URL}/api`)
      const data = await response.json()
      setUnits(data)
      setLoading(false)
    }
    fetchUnits()
  }, [])

  return (
    <>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={() => Router.back()}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Crear Unidad Académica</h1>
        </div>
        <form
          style={{
            width: 'min(55rem, 100%)',
            display: 'flex',
            gap: '1.5rem',
            flexDirection: 'column',
            margin: 'auto'
          }}
        >
          <h2>Información general</h2>
          <Input
            onChange={setName}
            value={name}
            id="name"
            placeholder="Nombre de la unidad académica"
            label=""
            required
          />
          <Input
            onChange={setCode}
            value={code}
            id="code"
            placeholder="Código de la unidad académica"
            label=""
            required
          />
          <Select
            onChange={setType}
            value={type}
            options={[]}
            id="type"
            placeholder="Tipo de unidad académica"
            required
          />
          <Input
            onChange={setDecane}
            value={decane}
            id="dedcane"
            placeholder="Nombre del decano"
            label=""
            required
          />
          <Input
            onChange={setDescription}
            value={description}
            id="description"
            placeholder="Descripción"
            label=""
            required
          />
          <Input
            onChange={setCreationUrl}
            value={creationUrl}
            id="creationUrl"
            placeholder="Enlace de acuerdo de creación"
            label=""
            required
          />
          <Input
            onChange={setCostCenter}
            value={costCenter}
            id="costCenter"
            placeholder="Código de centro de costos"
            label=""
            required
          />
        </form>
        <h2>Subunidades académicas</h2>

        <div className="gridContainer">
          {units.map((unit) => (
            <Card
              key={`${unit.code}`}
              id={`/units/${unit.code}`}
              content={unit.name}
            />
          ))}
          <Card>
            <PlusIcon color="white" height="2rem" width="2rem" />
          </Card>
        </div>
      </main>
      <div
        style={{
          position: 'absolute',
          right: '20px',
          top: '80vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <RoundButton color="green">
          <CheckIcon width="2rem" height="2rem" color="white" />
        </RoundButton>
        <RoundButton color="red">
          <XIcon width="2rem" height="2rem" color="white" />
        </RoundButton>
      </div>
    </>
  )
}
