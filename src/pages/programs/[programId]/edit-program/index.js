import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Head from 'next/head'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import NavBar from '@/components/NavBar'
import Loader from '@/components/Loader'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'
import { ALERT_CFG } from '@/constants/alerts'

const BASE_API_URL = process.env.BASE_API_URL
const PROGRAM_TYPES = ['Departamento', 'Escuela', 'Instituto']
const MODALITIES = ['Presencial', 'Virtual', 'Mixto', 'Distancia']
/**
 * Página de edición de programa académico.
 * Permite editar la información de un programa académico que se encuentra registrado.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de edición de programa académico.
 */
export default function EditProgram() {
  const router = useRouter()
  const { programId } = router.query
  const [type, setType] = useState('')
  const [modality, setModality] = useState('')
  const [loading, setLoading] = useState(true)
  const [program, setProgram] = useState({})

  /**
   * Obtiene los datos del programa académico desde el servidor.
   *
   * @param {string} code - El código del programa académico.
   */
  const getProgramData = async (code) => {
    fetch(`${BASE_API_URL}/academicProgram/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProgram(data)
        setLoading(false)
        setType(data.typeAcademicUnit)
        setModality(data.modalityAcademicProgram)
      })
  }

  useEffect(() => {
    if (programId) {
      getProgramData(programId)
    }
  }, [programId])

  /**
   * Maneja la submisión del formulario de edición de programa académico.
   *
   * @param {Event} event - Evento de formulario.
   */
  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    fetch(`${BASE_API_URL}/programs/${programId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire(ALERT_CFG.success).then(() => {
            router.push(`/programs/${programId}`)
          })
          return response.json()
        }
        throw new Error('Error al editar el programa académico')
      })
      .catch(() => {
        Swal.fire(ALERT_CFG.error)
      })
  }

  /**
   * Maneja la cancelación de la edición del programa académico.
   *
   * @param {Event} event - Evento de formulario.
   */
  function handleCancel(event) {
    event.preventDefault()
    Swal.fire(ALERT_CFG.cancel).then((result) => {
      if (result.isConfirmed) {
        router.push(`/programs/${programId}`)
      }
    })
  }

  return (
    <>
      <Head>
        <title>Editar Programa Académico</title>
      </Head>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={handleCancel}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Editar Programa Académico</h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <form className="container" onSubmit={handleSubmit}>
            <h2>Información general</h2>
            <fieldset className="subContainer">
              <Input
                id="nameAcademicProgram"
                placeholder="Nombre del programa académico"
                label="Nombre del programa académico"
                pattern={PATTERNS.name}
                title={TITLES.name}
                initialValue={program.nameAcademicProgram}
                required
              />
              <Input
                id="codeAcademicProgram"
                label="Código del programa académico"
                initialValue={program.codeAcademicProgram}
                disabled
                required
              />
              <Input
                id="sniesCode"
                label="Código SNIES del programa académico"
                initialValue={program.sniesCode}
                disabled
                required
              />
              <Input
                id="description"
                placeholder="Descripción"
                label="Descripción"
                pattern={PATTERNS.description}
                title={TITLES.description}
                initialValue={program.description}
                required
              />
              <Select
                id="typeAcademicProgram"
                name="typeAcademicProgram"
                onChange={setType}
                value={type}
                options={PROGRAM_TYPES}
                label="Tipo de programa académico"
                required
              />
              <Select
                id="modalityAcademicProgram"
                name="modalityAcademicProgram"
                onChange={setModality}
                value={modality}
                options={MODALITIES}
                label="Modalidad del programa académico"
                required
              />
            </fieldset>

            <h2>Programas académicos</h2>
            <fieldset className="subContainer">
              <div className="gridContainer">
                <Card
                  handleAddCard={(evt) => {
                    evt.preventDefault()
                    router.push(`/subunits/${programId}/create-program`)
                  }}
                />
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
        )}
      </main>
    </>
  )
}
