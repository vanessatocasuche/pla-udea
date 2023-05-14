import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'

const BASE_API_URL = process.env.BASE_API_URL
const UNIT_TYPES = ['Facultad', 'Escuela', 'Institutos', 'Corporación']

export default function CreateSubunit() {
  const [type, setType] = useState('')
  const [subunits, setSubunits] = useState([])
  const router = useRouter()

  function addUnit(event, subunit) {
    event.preventDefault()
    setSubunits([
      ...subunits,
      { name: 'Nueva subsubunidad', code: subunits.length + 1 }
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
    }).then((response) => {
      if (response.ok) {
        router.push('/units')
        return response.json()
      }
      alert('Error al crear la subunidad académica')
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
          <h1>Crear Subunidad Académica</h1>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <h2>Información general</h2>
          <fieldset className="subContainer">
            <Input
              id="nameAcademicUnit"
              placeholder="Nombre de la subunidad académica"
              label="Nombre de la subunidad académica"
              pattern={PATTERNS.name}
              title={TITLES.name}
              required
            />
            <Input
              id="codeAcademicUnit"
              placeholder="Código de la subunidad académica"
              label="Código de la subunidad académica"
              pattern={PATTERNS.code}
              title={TITLES.code}
              required
            />
            <Select
              id="typeAcademicUnit"
              name="type"
              onChange={setType}
              value={type}
              options={UNIT_TYPES}
              placeholder="Tipo de subunidad académica"
              label="Tipo de subunidad académica"
              required
            />
            <Input
              id="deanName"
              placeholder="Nombre del jefe"
              label="Nombre del jefe"
              pattern={PATTERNS.name}
              title={TITLES.name}
              required
            />
            <Input
              id="description"
              placeholder="Descripción"
              label="Descripción"
              pattern={PATTERNS.description}
              title={TITLES.description}
              required
            />
          </fieldset>

          <h2>Programas Académicos</h2>
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
