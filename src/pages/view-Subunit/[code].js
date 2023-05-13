import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon } from '@/components/Icons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ViewSubunit = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { code } = router.query
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  function getSubunit(code) {
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
      getSubunit(code)
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
            <h1>{data.nameAcademicSubunit}</h1>
          </div>
          <section className="subContainer">
            <div>
              <h3>Descripción de la Subunidad académica</h3>
              <p>{data.description}</p>
            </div>
            <div>
              <h3>Tipo de Subunidad académica</h3>
              <p>{data.typeAcademicSubunit}</p>
            </div>
            <div>
              <h3>Juefe de la Subunidad académica</h3>
              <p>{data.deanName}</p>
            </div>
            <div>
              <h3>Código de la Subunidad académica</h3>
              <p>{data.codeAcademicSubunit}</p>
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
            handler={() => router.push(`/edit-subunit/${code}`)}
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
