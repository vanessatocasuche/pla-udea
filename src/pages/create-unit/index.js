import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'
import Swal from 'sweetalert2'
import { ALERT_CFG } from '@/constants/alerts'
import Head from 'next/head'

const BASE_API_URL = process.env.BASE_API_URL
const UNIT_TYPES = ['Facultad', 'Escuela', 'Institutos', 'Corporación']

/**
 * Página de creación de unidad académica.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de creación de unidad académica.
 */
export default function CreateUnit() {
  const [type, setType] = useState('')
  const router = useRouter()

  /**
   * Maneja el envío del formulario de creación de unidad académica.
   * Envía los datos al servidor y redirige a la página de la unidad creada.
   *
   * @param {Event} event Evento de envío del formulario.
   */
  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    fetch(`${BASE_API_URL}/academicUnit`, {
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
          throw new Error('Ya existe una unidad académica con ese código')
        }
        throw new Error('Error al crear la unidad académica')
      })
      .then((data) => {
        if (data && event.nativeEvent.submitter.name === 'addUnit') {
          router.push(`/units/${data.idAcademicUnit}/create-subunit`)
        } else {
          Swal.fire(ALERT_CFG.success).then(() => {
            router.push(`/units/${data.idAcademicUnit}`)
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
   * Maneja el evento de cancelar y muestra una confirmación al usuario.
   *
   * @param {Event} event Evento del botón de cancelar.
   */
  function handleCancel(event) {
    event.preventDefault()
    Swal.fire(ALERT_CFG.cancel).then((result) => {
      if (result.isConfirmed) {
        router.push('/units')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Crear Unidad Académica</title>
      </Head>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={handleCancel}>
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
            <div className="gridContainer">
              <Card name="addUnit" handleAddCard={() => {}} />
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
