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

export default function CreateUnit() {
  const [type, setType] = useState('')
  const router = useRouter()

  function addUnit(event) {
    event.preventDefault()
    router.push('/create-subunit')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    fetch(`${BASE_API_URL}/academicUnit`, {
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
      alert('Error al crear la unidad académica')
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
              id="nameAcademicUnit"
              placeholder="Nombre de la unidad académica"
              label="Nombre de la unidad académica"
              pattern={PATTERNS.name}
              title={TITLES.name}
              required
            />
            <Input
              id="codeAcademicUnit"
              placeholder="Código de la unidad académica"
              label="Código de la unidad académica"
              pattern={PATTERNS.code}
              title={TITLES.code}
              required
            />
            <Select
              id="typeAcademicUnit"
              name="typeAcademicUnit"
              onChange={setType}
              value={type}
              options={UNIT_TYPES}
              placeholder="Tipo de unidad académica"
              label="Tipo de unidad académica"
              required
            />
            <Input
              id="deanName"
              placeholder="Nombre del decano"
              label="Nombre del decano"
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
            <Input
              id="ubicationAcademicUnit"
              placeholder="Ubicación de la unidad académica"
              label="Ubicación de la unidad académica"
              pattern={PATTERNS.address}
              title={TITLES.address}
              required
            />
            <Input
              id="urlCreationAcademicUnit"
              placeholder="Enlace de acuerdo de creación"
              label="Enlace de acuerdo de creación"
              type="url"
            />
            <Input
              id="costCenterCode"
              placeholder="Código de centro de costos"
              label="Código de centro de costos"
              pattern={PATTERNS.centerCode}
              title={TITLES.centerCode}
              required
            />
          </fieldset>

          <h2>Subunidades académicas</h2>
          <fieldset className="subContainer">
            <Card handleAddCard={addUnit} />
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
