import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'

const BASE_API_URL = 'http://localhost:3000/api'
const UNIT_TYPES = ['Facultad', 'Escuela', 'Institutos', 'Corporación']

export default function CreateUnit() {
  const [type, setType] = useState('')
  const [subunits, setSubunits] = useState([])
  const router = useRouter()

  function addUnit(event, subunit) {
    event.preventDefault()
    setSubunits([
      ...subunits,
      { name: 'Nueva subunidad', code: subunits.length + 1 }
    ])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    formData.subunits = subunits
    fetch(`${BASE_API_URL}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        router.push('/units')
      })
  }

  function handleCancel(event) {
    event.preventDefault()
    window.confirm('¿Está seguro que desea cancelar?') && router.push('/units')
  }

  return (
    <>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={() => router.push('/units')}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Crear Unidad Académica</h1>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <h2>Información general</h2>
          <fieldset className="subContainer">
            <Input
              id="name"
              placeholder="Nombre de la unidad académica"
              label="Nombre de la unidad académica"
              required
            />
            <Input
              id="code"
              placeholder="Código de la unidad académica"
              label="Código de la unidad académica"
              required
            />
            <Select
              id="type"
              name="type"
              onChange={setType}
              value={type}
              options={UNIT_TYPES}
              placeholder="Tipo de unidad académica"
              label="Tipo de unidad académica"
              required
            />
            <Input
              id="decane"
              placeholder="Nombre del decano"
              label="Nombre del decano"
              required
            />
            <Input
              id="description"
              placeholder="Descripción"
              label="Descripción"
              required
            />
            <Input
              id="creationUrl"
              placeholder="Enlace de acuerdo de creación"
              label="Enlace de acuerdo de creación"
            />
            <Input
              id="costCenter"
              placeholder="Código de centro de costos"
              label="Código de centro de costos"
              required
            />
          </fieldset>

          <h2>Subunidades académicas</h2>
          <fieldset className="subContainer">
            <div className="gridContainer">
              {subunits.map((subunit) => (
                <Card
                  key={`${subunit.code}`}
                  id={`/units/${subunit.code}`}
                  content={subunit.name}
                />
              ))}
              <Card handleAddCard={addUnit} />
            </div>
          </fieldset>
          <div className="fixedContainer">
            <RoundButton color="green">
              <CheckIcon width="2rem" height="2rem" color="white" />
            </RoundButton>
            <RoundButton color="red" handler={handleCancel}>
              <XIcon width="2rem" height="2rem" color="white" />
            </RoundButton>
          </div>
        </form>
      </main>
    </>
  )
}
