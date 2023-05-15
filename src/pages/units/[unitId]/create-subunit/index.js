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
const SUBUNIT_TYPES = ['Departamento', 'Escuela', 'Institutos']

export default function CreateSubunit() {
  const router = useRouter()
  const [type, setType] = useState('')
  const { unitId } = router.query

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    formData.unidadAcademica = { idAcademicUnit: parseInt(unitId) }
    fetch(`${BASE_API_URL}/academicSubUnit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Error al crear la subunidad académica')
      })
      .then((data) => {
        if (data && event.nativeEvent.submitter.name === 'addProgram') {
          router.push(`/subunits/${data.idAcademicSubUnit}/create-program`)
        } else {
          router.push(`/subunits/${data.idAcademicSubUnit}`)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function handleCancel(event) {
    event.preventDefault()
    window.confirm('¿Está seguro que desea cancelar?') &&
      router.push(`/units/${unitId}`)
  }

  return (
    <>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton
            color="yellow"
            handler={() => router.push(`/units/${unitId}`)}
          >
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Crear Subunidad Académica</h1>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <h2>Información general</h2>
          <fieldset className="subContainer">
            <Input
              id="nameAcademicSubUnit"
              placeholder="Nombre de la subunidad académica"
              label="Nombre de la subunidad académica"
              pattern={PATTERNS.name}
              title={TITLES.name}
              required
            />
            <Input
              id="codeAcademicSubUnit"
              placeholder="Código de la subunidad académica"
              label="Código de la subunidad académica"
              pattern={PATTERNS.code}
              title={TITLES.code}
              required
            />
            <Select
              id="typeAcademicSubUnit"
              name="typeAcademicSubUnit"
              onChange={setType}
              value={type}
              options={SUBUNIT_TYPES}
              placeholder="Tipo de subunidad académica"
              label="Tipo de subunidad académica"
              required
            />
            <Input
              id="headName"
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
              <Card name="addProgram" handleAddCard={() => {}} />
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
