import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon, TrashIcon } from '@/components/Icons'
import Loader from '@/components/Loader'
import NavBar from '@/components/NavBar'
import { ALERT_CFG } from '@/constants/alerts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

/**
 * Componente para la página de visualización de una unidad académica específica.
 * En está página se puede ver la información de la unidad académica, así como las subunidades académicas que la componen.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de visualización de una unidad académica.
 */
const ViewUnit = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { unitId } = router.query
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)

  /**
   * Obtiene los datos de la unidad académica mediante una solicitud al servidor.
   *
   * @param {string} id Identificador de la unidad académica.
   */
  function getUnit(id) {
    fetch(`${BASE_API_URL}/academicUnit/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }

  /**
   * Realiza una solicitud al servidor para eliminar la unidad académica.
   */
  function deleteUnitApi() {
    fetch(`${BASE_API_URL}/academicUnit/${unitId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        router.push('/units')
      } else {
        Swal.fire(ALERT_CFG.error)
      }
    })
  }

  /**
   * Maneja el evento de eliminación de la unidad académica y muestra una confirmación al usuario.
   */
  const deleteUnit = () => {
    if (data.academicSubUnits?.length > 0) {
      const alertConfig = ALERT_CFG.error
      alertConfig.text =
        'No se puede eliminar una unidad académica que tiene subunidades académicas'
      Swal.fire(alertConfig)
    } else {
      Swal.fire(ALERT_CFG.delete).then((result) => {
        if (result.isConfirmed) {
          deleteUnitApi()
        }
      })
    }
  }

  useEffect(() => {
    if (unitId) {
      getUnit(unitId)
    }
  }, [unitId])

  return (
    <>
      <Head>
        <title>Unidad Académica</title>
      </Head>
      <NavBar />
      {loading ? (
        <Loader />
      ) : data ? (
        <main className="container">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <RoundButton color="yellow" handler={() => router.push('/units')}>
              <ArrowIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
            <h1>{data.nameAcademicUnit}</h1>
          </div>
          <section className="subContainer">
            <div>
              <h3>Descripción de la unidad académica</h3>
              <p>{data.description}</p>
            </div>
            <div>
              <h3>Tipo de unidad académica</h3>
              <p>{data.typeAcademicUnit}</p>
            </div>
            <div>
              <h3>Decano</h3>
              <p>{data.deanName}</p>
            </div>
            <div>
              <h3>Código de la unidad académica</h3>
              <p>{data.codeAcademicUnit}</p>
            </div>
            <div>
              <h3>Enlace de acuerdo de creación de la unidad académica</h3>
              <p>
                {data.urlCreationAcademicUnit
                  ? data.urlCreationAcademicUnit
                  : '- Información no sumistrada - '}
              </p>
            </div>
            <div>
              <h3>Código de centro de costos de la unidad académica</h3>
              <p>{data.costCenterCode}</p>
            </div>
          </section>
          <section className="subContainer">
            <h2>Subunidades Académicas</h2>
            {data.academicSubUnits ? (
              <div className="gridContainer">
                {data.academicSubUnits.map(
                  ({ nameAcademicSubUnit, idAcademicSubUnit }) => (
                    <Card
                      key={`${nameAcademicSubUnit}${idAcademicSubUnit}`}
                      content={nameAcademicSubUnit}
                      id={`/subunits/${idAcademicSubUnit}`}
                    />
                  )
                )}
                {data.academicSubUnits.length === 0 && (
                  <p>No hay subunidades académicas registradas</p>
                )}
              </div>
            ) : (
              <p>No hay subunidades académicas registradas</p>
            )}
          </section>
          <div className="fixedContainer">
            <RoundButton color="red" handler={deleteUnit}>
              <TrashIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
            <RoundButton
              color="purple"
              handler={() => router.push(`/units/${unitId}/edit-unit`)}
            >
              <EditIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
          </div>
        </main>
      ) : (
        <p>No hay datos registrados para la unidad académica solicitada</p>
      )}
    </>
  )
}

export default ViewUnit
