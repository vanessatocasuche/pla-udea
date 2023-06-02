import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon, EditIcon, SearchIcon, TrashIcon } from '@/components/Icons'
import Loader from '@/components/Loader'
import NavBar from '@/components/NavBar'
import { ALERT_CFG } from '@/constants/alerts'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ViewProgram = () => {
  const BASE_API_URL = process.env.BASE_API_URL

  const router = useRouter()
  const { programId } = router.query
  const [program, setProgram] = useState({
    idAcademicProgram: 1,
    nameAcademicProgram: 'Ingeniería de Sistemas',
    codeAcademicProgram: '43',
    description:
      'El programa de Ingeniería de Sistemas retoma los principios curriculares y principios pedagógicos definidos en el documento rector de la Facultad. En el marco establecido por dicho documento, el funcionamiento del programa de Ingeniería de Sistemas se fundamenta en los siguientes elementos: un modelo pedagógico de tipo investigativo y centrado en tres ejes conceptuales: el "ser", el "saber" y el "hacer", un modelo curricular orientado a la solución de problemas y al logro de competencias.',
    deanName: 'Diego José Luis Botia Valderrama',
    typeAcademicProgram: 'Pregrado',
    modalityAcademicProgram: 'Presencial',
    sniesCode: '555'
  })
  const [loading, setLoading] = useState(false)
  const [versions, setVersions] = useState([])

  function getProgram(programId) {
    fetch(`${BASE_API_URL}/api?code=${programId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // setProgram(data)
        setProgram(program)
        return data
      })
  }

  function handleDeleteProgram() {
    let alertConfig = ALERT_CFG.delete
    if (versions.length !== 0) {
      alertConfig = ALERT_CFG.error
      alertConfig.text =
        'No se puede eliminar un programa con versiones activas'
    }
    Swal.fire(alertConfig).then((result) => {
      if (versions.length === 0) {
        if (result.isConfirmed) {
          deleteApiProgram()
        }
      }
    })
  }

  const deleteApiProgram = () => {
    fetch(`${BASE_API_URL}/academicProgram/${programId}`, {
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

  useEffect(() => {
    if (programId) {
      getProgram(programId)
      setLoading(false)
      setVersions([
        {
          id: 1,
          name: 'Versión 1'
        },
        {
          id: 2,
          name: 'Versión 2'
        }
      ])
    }
  }, [programId])

  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
      ) : program ? (
        <main className="container">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <RoundButton color="yellow" handler={() => router.push('/subunits/2')}>
              <ArrowIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
            <h1>{program.nameAcademicProgram}</h1>
          </div>
          <section className="subContainer">
            <h2>Información General</h2>
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
          <section className="subContainer">
            <h2>Versiones del plan de estudios</h2>
            <div className="gridContainer">
              {versions.map((version) => (
                <Card key={version.id} id={`/programs/${programId}/versions/${version.id}`}>
                  <h3>{version.name}</h3>
                </Card>
              ))}
              <Card
                handleAddCard={() =>
                  router.push(`/programs/${programId}/create-version`)
                }
              >
                <SearchIcon color="white" />
              </Card>
            </div>
          </section>
          <div className="fixedContainer">
            <RoundButton color="red" handler={handleDeleteProgram}>
              <TrashIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
            <RoundButton
              color="purple"
              handler={() => router.push(`/programs/${programId}/edit-program`)}
            >
              <EditIcon color="white" width="2rem" height="2rem" />
            </RoundButton>
          </div>
        </main>
      ) : (
        <p>No hay datos registrados para el programa académico solicitada</p>
      )}
    </>
  )
}

export default ViewProgram
