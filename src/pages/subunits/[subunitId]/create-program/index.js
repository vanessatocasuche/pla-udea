import { useState } from 'react'
import Swal from 'sweetalert2'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'
import { ALERT_CFG } from '@/constants/alerts'

const BASE_API_URL = process.env.BASE_API_URL
const PROGRAM_TYPES = ['Departamento', 'Escuela', 'Instituto']
const MODALITIES = ['Presencial', 'Virtual', 'Mixto', 'Distancia']

/**
 * Componente para el formulario de creación de un programa académico.
 * En está página se puede crear una programa académico, cumpliendo las validaciones especificadas.
 *
 * @returns {JSX.Element} Elemento JSX que representa el formulario de creación de un programa académico.
 */
export default function CreateProgram() {
  const router = useRouter()
  const [type, setType] = useState('')
  const [modality, setModality] = useState('')
  const { subunitId } = router.query

  /**
   * Maneja el envío del formulario de creación del programa académico.
   *
   * @param {Event} event Evento de envío del formulario.
   */
  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    formData.academicSubUnit = { idAcademicSubUnit: parseInt(subunitId) }
    fetch(`${BASE_API_URL}/academicProgram`, {
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
        if (response.status === 400) {
          throw new Error('Ya existe un programa académico con ese código')
        }
        throw new Error('Error al crear el programa académico')
      })
      .then((data) => {
        if (data && event.nativeEvent.submitter.name === 'AddCurriculum') {
          router.push(`/programs/${data.idAcademicProgram}/curriculum`)
        } else {
          Swal.fire(ALERT_CFG.success).then(() => {
            router.push(`/programs/${data.idAcademicProgram}`)
          })
        }
      })
      .catch((error) => {
        const alertCfg = ALERT_CFG.error
        alertCfg.text = error.message
        Swal.fire(alertCfg)
      })
  }

  /**
   * Maneja el evento de cancelación y muestra una confirmación al usuario.
   *
   * @param {Event} event Evento del botón de cancelar.
   */
  function handleCancel(event) {
    event.preventDefault()
    Swal.fire(ALERT_CFG.cancel).then((result) => {
      if (result.isConfirmed) {
        router.push(`/subunits/${subunitId}`)
      }
    })
  }

  return (
    <>
      <Head>
        <title>Crear Programa Académico</title>
      </Head>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={handleCancel}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Crear Programa Académico</h1>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <h2>Información general</h2>
          <fieldset className="subContainer">
            <Input
              id="nameAcademicProgram"
              placeholder="Nombre del programa académico"
              label="Nombre del programa académico"
              pattern={PATTERNS.name}
              title={TITLES.name}
              required
            />
            <Input
              id="codeAcademicProgram"
              placeholder="Código del programa académico"
              label="Código del programa académico"
              pattern={PATTERNS.code}
              title={TITLES.code}
              required
            />
            <Input
                id="sniesCode"
                placeholder="Código SNIES del programa académico"
                label="Código SNIES del programa académico"
                pattern={PATTERNS.snies}
                title={TITLES.snies}
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
            <Select
              id="typeAcademicProgram"
              name="typeAcademicProgram"
              onChange={setType}
              value={type}
              options={PROGRAM_TYPES}
              placeholder="Tipo de programa académico"
              label="Tipo de programa académico"
              required
            />
            <Select
              id="modalityAcademicProgram"
              name="modalityAcademicProgram"
              onChange={setModality}
              value={modality}
              options={MODALITIES}
              placeholder="Modalidad del programa académico"
              label="Modalidad del programa académico"
              required
            />
          </fieldset>
          <h2>Plan de Estudios</h2>
          <fieldset className="subContainer">
            <div className="gridContainer">
              <Card name="AddCurriculum" handleAddCard={() => {}} />
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
