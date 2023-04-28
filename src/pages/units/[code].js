import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon } from '@/components/Icons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ViewUnit = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { code } = router.query
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  function getUnit(code) {
    fetch(`${BASE_API_URL}/api?code=${code}`, {
      method: 'GET', // Get, post, put, delete
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data[0])
        return data
      })
  }

  useEffect(() => {
    if (code) {
      getUnit(code)
      setLoading(false)
    }
  }, [code])

  return (
    <>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <main className="container">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <RoundButton color="yellow" handler={() => router.back()}>
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
              <p>{data.urlCreationAcademicUnit}</p>
            </div>
            <div>
              <h3>Código de centro de costos de la unidad académica</h3>
              <p>{data.costCenterCode}</p>
            </div>
          </section>
          <section className="subContainer">
            <h2>Subunidades Académicas</h2>
            {data.subunits ? (
              <div className="gridContainer">
                {data.subunits.map((subunit) => (
                  <Card key={`${subunit}`} content={subunit} />
                ))}
              </div>
            ) : (
              <p>No hay subunidades académicas registradas</p>
            )}
          </section>
          <RoundButton fixed color="purple">
            <EditIcon color="white" width="2rem" height="2rem" />
          </RoundButton>
        </main>
      ) : (
        <p>No hay datos registrados para la unidad académica solicitada</p>
      )}
    </>
  )
}

export default ViewUnit
