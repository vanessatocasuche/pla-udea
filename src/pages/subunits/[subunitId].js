import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon } from '@/components/Icons'
import Loader from '@/components/Loader'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
    fetch(`${BASE_API_URL}/academicSubUnit/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const dataFilter = data.filter(
          (subunit) => subunit.idAcademicSubUnit === parseInt(id)
        )
        setData(dataFilter[0])
        return data
      })
  }

  useEffect(() => {
    if (subunitId) {
      getSubunit(subunitId)
      setLoading(false)
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
              handler={() => router.push(`/units${'/'}`)}
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
            {data.programs ? (
              <div className="gridContainer">
                {data.programs.map((program) => (
                  <Card key={`${program}`} content={program} />
                ))}
              </div>
            ) : (
              <p>No hay programas académicos registrados</p>
            )}
          </section>
          <RoundButton
            fixed
            color="purple"
            handler={() => router.push(`/subunits/${subunitId}/edit-subunit`)}
          >
            <EditIcon color="white" width="2rem" height="2rem" />
          </RoundButton>
        </main>
      ) : (
        <p>No hay datos registrados para el programa académico solicitado</p>
      )}
    </>
  )
}

export default ViewSubunit
