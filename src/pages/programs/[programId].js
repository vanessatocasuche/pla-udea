import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon, SearchIcon } from '@/components/Icons'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ViewProgram = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { programId } = router.query
  const [program, setProgram] = useState({
    idAcademicProgram: 1,
    nameAcademicProgram: 'nombre',
    codeAcademicProgram: '43',
    description: 'Una des....',
    deanName: 'Un nombre',
    typeAcademicProgram: 'Pregrado',
    modalityAcademicProgram: 'Presencial',
    sniesCode: '555'
  })
  const [loading, setLoading] = useState(false)

  function getProgram(programId) {
    fetch(`${BASE_API_URL}/api?code=${programId}`, {
      method: 'GET', // Get, post, put, delete
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProgram(data)
        return data
      })
  }

  useEffect(() => {
    if (programId) {
      getProgram(programId)
      setLoading(false)
    }
  }, [programId])

  return (
    <>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : program ? (
        <main className="container">
          <div style={{ display: 'flex', gNp: '1rem' }}>
            <RoundButton color="yellow" handler={() => router.back()}>
              <ArrowIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
            <h1>Visualización de programas</h1>
          </div>
          <section className="subContainer">
            <div>
              <h3>Nombre del programa</h3>
              <p>
                {program.nameAcademicProgram} - {program.codeAcademicProgram}
              </p>
            </div>
            <div>
              <h3>Descripcion del programa</h3>
              <p>{program.description}</p>
            </div>
            <div>
              <h3>Nombre del encargado</h3>
              <p>{program.deanName}</p>
            </div>
            <div>
              <h3>Tipo de programa</h3>
              <p>{program.typeAcademicProgram}</p>
            </div>
            <div>
              <h3>Modalidad</h3>
              <p>{program.modalityAcademicProgram}</p>
            </div>
            <div>
              <h3>Código SNIES</h3>
              <p>{program.sniesCode}</p>
            </div>
          </section>
          <section
            className="subContainer"
            style={{ width: 'min(30rem, 100%)' }}
          >
            <Card id={`/versions/${programId}`} content="Plan de Estudios">
              <SearchIcon color="white" />
            </Card>
          </section>
          <RoundButton
            fixed
            color="purple"
            handler={() => router.push(`/edit-unit/${programId}`)}
          >
            <EditIcon color="white" width="2rem" height="2rem" />
          </RoundButton>
        </main>
      ) : (
        <p>No hay datos registrados para el programa académico solicitada</p>
      )}
    </>
  )
}

export default ViewProgram
