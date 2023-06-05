import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon, TrashIcon } from '@/components/Icons'
import Loader from '@/components/Loader'
import NavBar from '@/components/NavBar'
import { ALERT_CFG } from '@/constants/alerts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

/**
 * Componente página para mostrar los detalles de una subunidad académica.
 *
 * @returns {JSX.Element} Elemento JSX que muestra los detalles de la subunidad académica.
 */
const ViewSubunit = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { subunitId } = router.query
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  /**
   * Obtiene los datos de la subunidad académica desde el servidor.
   *
   * @param {string} id - El ID de la subunidad académica.
   */
  function getSubunit(id) {
    fetch(`${BASE_API_URL}/academicSubUnit/${subunitId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (subunitId === '2') {
          data.programs = [
            { id: 1, name: 'Ingeniería de Sistemas' },
            { id: 2, name: 'Ingeniería de Sistemas - Virtual' }
          ]
        } else {
          data.programs = []
        }
        setData(data)
        setLoading(false)
      })
  }

  /**
   * Maneja el evento de eliminación de la subunidad académica y muestra una confirmación al usuario.
   */
  const deleteSubUnit = () => {
    if (data.programs.length === 0) {
      Swal.fire(ALERT_CFG.delete).then((result) => {
        if (result.isConfirmed) {
          fetch(`${BASE_API_URL}/academicSubUnit/${subunitId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            if (response.status === 200) {
              router.push(
                data.academicUnitId ? `/units/${data.academicUnitId}` : '/units'
              )
            } else {
              Swal.fire(ALERT_CFG.error)
            }
          })
        }
      })
    } else {
      const alertConfig = ALERT_CFG.error
      alertConfig.text =
        'No se puede eliminar una subunidad académica que tiene programas académicos asociados'
      Swal.fire(alertConfig)
    }
  }

  useEffect(() => {
    if (subunitId) {
      getSubunit(subunitId)
    }
  }, [subunitId])

  return (
    <>
      <Head>
        <title>Subunidad Académica</title>
      </Head>
      <NavBar />
      {loading ? (
        <Loader />
      ) : data ? (
        <main className="container">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <RoundButton
              color="yellow"
              handler={() =>
                router.push(
                  data.academicUnitId
                    ? `/units/${data.academicUnitId}`
                    : '/units'
                )
              }
            >
              <ArrowIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
            <h1>{data.nameAcademicSubUnit}</h1>
          </div>
          <section className="subContainer">
            <div>
              <h3>Descripción de la Subunidad académica</h3>
              <p>{data.description}</p>
            </div>
            <div>
              <h3>Tipo de Subunidad académica</h3>
              <p>{data.typeAcademicSubUnit}</p>
            </div>
            <div>
              <h3>Jefe de la Subunidad académica</h3>
              <p>{data.headName}</p>
            </div>
            <div>
              <h3>Código de la Subunidad académica</h3>
              <p>{data.codeAcademicSubUnit}</p>
            </div>
          </section>
          <section className="subContainer">
            <h2>Programas Académicos</h2>
            {data.programs.length > 0 ? (
              <div className="gridContainer">
                {data.programs.map(({ id, name }) => (
                  <Card id={`/programs/${id}`} key={`${id}`} content={name} />
                ))}
              </div>
            ) : (
              <p>No hay programas académicos registrados</p>
            )}
          </section>
          <div className="fixedContainer">
            <RoundButton color="red" handler={deleteSubUnit}>
              <TrashIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
            <RoundButton
              color="purple"
              handler={() => router.push(`/subunits/${subunitId}/edit-subunit`)}
            >
              <EditIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
          </div>
        </main>
      ) : (
        <p>No hay datos registrados para el programa académico solicitado</p>
      )}
    </>
  )
}

export default ViewSubunit
