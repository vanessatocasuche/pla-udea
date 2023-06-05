import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import React, { useEffect, useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'
import Swal from 'sweetalert2'
import { ALERT_CFG } from '@/constants/alerts'
import Loader from '@/components/Loader'
import Head from 'next/head'

const BASE_API_URL = process.env.BASE_API_URL
const SUBUNIT_TYPES = ['Departamento', 'Escuela', 'Instituto']
/**
 * Página de edición de subunidad académica.
 * Permite editar la información de una subunidad académica que se encuentra registrada.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de edición de subunidad académica.
 */
export default function EditSubunit() {
  const router = useRouter()
  const { subunitId } = router.query
  const [type, setType] = useState('')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [subunit, setSubunit] = useState({})

  /**
   * Obtiene los datos de la subunidad académica desde el servidor.
   *
   * @param {string} code - El código de la subunidad académica.
   */
  const getSubunitData = async (code) => {
    fetch(`${BASE_API_URL}/academicSubUnit/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setSubunit(data)
        setLoading(false)
        setType(data.typeAcademicSubUnit)
        setPrograms(data.programs)
      })
  }

  useEffect(() => {
    if (subunitId) {
      getSubunitData(subunitId)
    }
  }, [subunitId])

  /**
   * Maneja la submisión del formulario de edición de subunidad académica.
   *
   * @param {Event} event - Evento de formulario.
   */
  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    fetch(`${BASE_API_URL}/academicSubUnit/${subunitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire(ALERT_CFG.success).then(() => {
            router.push(`/subunits/${subunitId}`)
          })
          return response.json()
        }
        throw new Error('Error al editar la subunidad académica')
      })
      .catch(() => {
        Swal.fire(ALERT_CFG.error)
      })
  }

  /**
   * Maneja la cancelación de la edición de la subunidad académica.
   *
   * @param {Event} event - Evento de formulario.
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
        <title>Editar Subunidad Académica</title>
      </Head>
      <NavBar />
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={handleCancel}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Editar Subunidad Académica</h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <form className="container" onSubmit={handleSubmit}>
            <h2>Información general</h2>
            <fieldset className="subContainer">
              <Input
                id="nameAcademicSubUnit"
                placeholder="Nombre de la subunidad académica"
                label="Nombre de la subunidad académica"
                pattern={PATTERNS.name}
                title={TITLES.name}
                initialValue={subunit.nameAcademicSubUnit}
                required
              />
              <Input
                id="codeAcademicSubUnit"
                label="Código de la subunidad académica"
                initialValue={subunit.codeAcademicSubUnit}
                disabled
                required
              />
              <Select
                id="typeAcademicSubUnit"
                name="typeAcademicSubUnit"
                onChange={setType}
                value={type}
                options={SUBUNIT_TYPES}
                label="Tipo de subunidad académica"
                required
              />
              <Input
                id="headName"
                placeholder="Nombre del Jefe de la subunidad académica"
                label="Nombre del Jefe de la subunidad académica"
                pattern={PATTERNS.name}
                title={TITLES.name}
                initialValue={subunit.headName}
                required
              />
              <Input
                id="description"
                placeholder="Descripción"
                label="Descripción"
                pattern={PATTERNS.description}
                title={TITLES.description}
                initialValue={subunit.description}
                required
              />
            </fieldset>

            <h2>Programas académicos</h2>
            <fieldset className="subContainer">
              <div className="gridContainer">
                {programs &&
                  programs.map((program) => (
                    <Card
                      key={`${program}`}
                      id={`/programs/${program}`}
                      content={program}
                    />
                  ))}
                <Card
                  handleAddCard={(evt) => {
                    evt.preventDefault()
                    router.push(`/subunits/${subunitId}/create-program`)
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
