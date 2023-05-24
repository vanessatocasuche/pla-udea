import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useEffect, useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'
import Swal from 'sweetalert2'
import { ALERT_CFG } from '@/constants/alerts'
import Loader from '@/components/Loader'

const BASE_API_URL = process.env.BASE_API_URL
const SUBUNIT_TYPES = ['Departamento', 'Escuela', 'Instituto']

export default function EditSubunit() {
  const router = useRouter()
  const { subunitId } = router.query
  const [type, setType] = useState('')
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [subunit, setSubunit] = useState({})

  const getSubunitData = async (code) => {
    fetch(`${BASE_API_URL}/academicSubUnit/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const dataFilter = data.filter(
          (subunit) => subunit.idAcademicSubUnit === parseInt(subunitId)
        )
        setSubunit(dataFilter[0])
        setLoading(false)
        setType(data.typeAcademicUnit)
        console.log(data)
        setPrograms(data.subunits)
      })
  }

  useEffect(() => {
    if (subunitId) {
      getSubunitData(subunitId)
    }
  }, [subunitId])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    formData.subunits = programs
    fetch(`${BASE_API_URL}/api`, {
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
                name="type"
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
