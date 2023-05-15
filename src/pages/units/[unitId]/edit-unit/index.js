import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { useEffect, useState } from 'react'
import { CheckIcon, XIcon, ArrowIcon } from '@/components/Icons'
import { RoundButton } from '@/components/Buttons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { PATTERNS, TITLES } from '@/constants/forms'

const BASE_API_URL = process.env.BASE_API_URL
const UNIT_TYPES = ['Facultad', 'Escuela', 'Institutos', 'Corporación']

export default function EditUnit() {
  const router = useRouter()
  const { unitId } = router.query
  const [type, setType] = useState('')
  const [subunits, setSubunits] = useState([])
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState({})

  const getUnitData = async (id) => {
    fetch(`${BASE_API_URL}/academicUnit/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUnit(data)
        setLoading(false)
        setType(data.typeAcademicUnit)
        setSubunits(data.subunits)
      })
  }

  useEffect(() => {
    if (unitId) {
      getUnitData(unitId)
    }
  }, [unitId])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    formData.subunits = subunits
    fetch(`${BASE_API_URL}/academicUnit/${unitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response) => {
      if (response.ok) {
        router.push(`/units/${unitId}`)
        return response.json()
      }
      alert('Error al editar la unidad académica')
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
          <h1>Editar Unidad Académica</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="container" onSubmit={handleSubmit}>
            <h2>Información general</h2>
            <fieldset className="subContainer">
              <Input
                id="nameAcademicUnit"
                placeholder="Nombre de la unidad académica"
                label="Nombre de la unidad académica"
                pattern={PATTERNS.name}
                title={TITLES.name}
                initialValue={unit.nameAcademicUnit}
                required
              />
              <Input
                id="codeAcademicUnit"
                label="Código de la unidad académica"
                initialValue={unit.codeAcademicUnit}
                disabled
                required
              />
              <Select
                id="typeAcademicUnit"
                name="type"
                onChange={setType}
                value={type}
                options={UNIT_TYPES}
                label="Tipo de unidad académica"
                disabled
                required
              />
              <Input
                id="deanName"
                placeholder="Nombre del decano"
                label="Nombre del decano"
                pattern={PATTERNS.name}
                title={TITLES.name}
                initialValue={unit.deanName}
                required
              />
              <Input
                id="description"
                placeholder="Descripción"
                label="Descripción"
                pattern={PATTERNS.description}
                title={TITLES.description}
                initialValue={unit.description}
                required
              />
              <Input
                id="ubicationAcademicUnit"
                placeholder="Ubicación de la unidad académica"
                label="Ubicación de la unidad académica"
                pattern={PATTERNS.address}
                title={TITLES.address}
                initialValue={unit.ubicationAcademicUnit}
                required
              />
              <Input
                id="urlCreationAcademicUnit"
                placeholder="Enlace de acuerdo de creación"
                label="Enlace de acuerdo de creación"
                type="url"
                initialValue={unit.urlCreationAcademicUnit}
              />
              <Input
                id="costCenterCode"
                label="Código de centro de costos"
                initialValue={unit.costCenterCode}
                disabled
                required
              />
            </fieldset>

            <h2>Subunidades académicas</h2>
            <fieldset className="subContainer">
              {subunits ? (
                <div className="gridContainer">
                  {subunits.map(
                    ({ nameAcademicSubUnit, idAcademicSubUnit }) => (
                      <Card
                        key={`${nameAcademicSubUnit}${idAcademicSubUnit}`}
                        content={nameAcademicSubUnit}
                        id={`/subunits/${idAcademicSubUnit}`}
                      />
                    )
                  )}
                  <Card
                    name="addUnit"
                    handleAddCard={(e) => {
                      e.preventDefault()
                      router.push(`/units/${unitId}/create-subunit`)
                    }}
                  />
                </div>
              ) : (
                <div className="gridContainer">
                  <Card
                    name="addUnit"
                    handleAddCard={(e) => {
                      e.preventDefault()
                      router.push(`/units/${unitId}/create-subunit`)
                    }}
                  />
                </div>
              )}
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
