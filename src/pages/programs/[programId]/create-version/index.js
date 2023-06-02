import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import { Button, RoundButton } from '@/components/Buttons'
import { ArrowIcon, CheckIcon, XIcon } from '@/components/Icons'
import Input from '@/components/Input'
import { PATTERNS, TITLES } from '@/constants/forms'
import Card from '@/components/Card'
import Swal from 'sweetalert2'
import { ALERT_CFG } from '@/constants/alerts'

export default function CreateVersion() {
  const router = useRouter()
  const { programId } = router.query
  const [versionName, setVersionName] = useState('')
  const [levels, setLevels] = useState([])
  const [emphasisLines, setEmphasisLines] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = {
      nameVersion: versionName,
      levels,
      emphasisLines
    }
    console.log(formData)
    router.push(`/programs/${programId}`)
  }

  function handleCancel(event) {
    event.preventDefault()
    Swal.fire(ALERT_CFG.cancel).then((result) => {
      if (result.isConfirmed) {
        router.push(`/programs/${programId}`)
      }
    })
  }

  function addLevel() {
    setLevels((prev) => [...prev, { id: prev.length + 1, subjects: [] }])
  }

  function deleteLevel(levelIdx) {
    const newLevels = [...levels]
    newLevels.splice(levelIdx, 1)
    setLevels(newLevels)
  }

  function addEmphasisLine() {
    setEmphasisLines((prev) => [...prev, { id: prev.length + 1, subjects: [] }])
  }

  async function getSubjectFormValues() {
    const { value: formValues } = await Swal.fire({
      ...ALERT_CFG.addSubject,
      preConfirm: () => {
        const subjectName = document.getElementById('subjectName').value
        const subjectCode = document.getElementById('subjectCode').value
        const type = document.getElementById('subjectType').value
        const modality = document.getElementById('subjectModality').value
        const credits = document.getElementById('subjectCredits').value
        if (!subjectName || !subjectCode || !type || !modality || !credits) {
          Swal.showValidationMessage('Todos los campos son requeridos')
        } else {
          return {
            name: subjectName,
            code: subjectCode,
            type,
            modality,
            credits
          }
        }
      }
    })

    return formValues
  }

  async function addSubject(levelIdx, type) {
    const formValues = await getSubjectFormValues()
    if (!formValues) return
    if (type === 'level') {
      const newLevels = [...levels]
      const subjectId = newLevels[levelIdx].subjects.length + 1
      newLevels[levelIdx].subjects.push({
        id: subjectId,
        ...formValues
      })
      setLevels(newLevels)
    } else {
      const newEmphasisLines = [...emphasisLines]
      const subjectId = newEmphasisLines[levelIdx].subjects.length + 1
      newEmphasisLines[levelIdx].subjects.push({
        id: subjectId,
        ...formValues
      })
      setEmphasisLines(newEmphasisLines)
    }
  }

  function deleteSubject(levelIdx, subjectIdx, type) {
    if (type === 'level') {
      const newLevels = [...levels]
      let { subjects } = newLevels[levelIdx]
      subjects = subjects.filter((subject) => subject.id !== subjectIdx)
      newLevels[levelIdx].subjects = subjects
      setLevels(newLevels)
    } else {
      const newEmphasisLines = [...emphasisLines]
      let { subjects } = newEmphasisLines[levelIdx]
      subjects = subjects.filter((subject, idx) => idx !== subjectIdx)
      newEmphasisLines[levelIdx].subjects = subjects
      setEmphasisLines(newEmphasisLines)
    }
  }

  function showSubject(event, subject) {
    event.preventDefault()
    Swal.fire({
      title: subject.name,
      html: `
          <p>Código: ${subject.code}</p>
          <p>Tipo: ${subject.type}</p>
          <p>Modalidad: ${subject.modality}</p>
          <p>Créditos: ${subject.credits}</p>
        `,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#43b649'
    })
  }

  useEffect(() => {
    if (programId) {
      console.log(programId)
    }
  }, [programId])

  return (
    <>
      <NavBar />
      <Head>
        <title>Crear versión - Plan de Estudios</title>
      </Head>

      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton color="yellow" handler={handleCancel}>
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Crear versión - Plan de Estudios</h1>
        </div>
        <form
          className="container"
          onSubmit={handleSubmit}
          style={{ marginBottom: 0 }}
        >
          <h2>Información de la version</h2>
          <fieldset className="subContainer">
            <Input
              id="codeAcademicVersion"
              placeholder="Número de la versión"
              label="Número de la versión"
              pattern={PATTERNS.code}
              title={TITLES.code}
              value={versionName}
              onChange={setVersionName}
              required
            />
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
        <form
          className="container"
          onSubmit={(evt) => evt.preventDefault()}
          style={{ marginTop: 0 }}
        >
          <h2>Niveles</h2>
          <fieldset className="subContainer">
            {levels.map((level, idx) => (
              <div key={level.id}>
                <h3>Nivel {idx + 1}</h3>
                <br />
                <div className="gridContainer">
                  {level.subjects.map((subject) => (
                    <Card
                      key={subject.id}
                      handleDeleteCard={() => {
                        deleteSubject(idx, subject.id, 'level')
                      }}
                      onClick={(event) => showSubject(event, subject)}
                    >
                      <h3>{subject.name}</h3>
                      <h4>{subject.code}</h4>
                    </Card>
                  ))}
                  <Card
                    handleAddCard={() => {
                      addSubject(idx, 'level')
                    }}
                  />
                </div>
                <button className="deleteButton" onClick={deleteLevel}>
                  Eliminar el Nivel {idx + 1}
                </button>
              </div>
            ))}
            <Button secondary handler={addLevel}>
              Agregar nivel
            </Button>
          </fieldset>
          <h2>Líneas de énfasis</h2>
          <fieldset className="subContainer">
            {emphasisLines.map((emphasisLine, idx) => (
              <div key={emphasisLine.id}>
                <Input
                  id="emphasisLineName"
                  placeholder="Nombre de la línea de énfasis"
                  label="Nombre de la línea de énfasis"
                  pattern={PATTERNS.name}
                  title={TITLES.name}
                  initialValue={'Línea de énfasis'}
                  required
                />
                <br />
                <div className="gridContainer">
                  {emphasisLine.subjects.map((subject) => (
                    <Card
                      key={subject.id}
                      handleDeleteCard={() => {
                        deleteSubject(idx, subject.id, 'emphasisLine')
                      }}
                      onClick={(evt) => {
                        showSubject(evt, subject)
                      }}
                    >
                      <h3>{subject.name}</h3>
                      <h4>{subject.code}</h4>
                    </Card>
                  ))}
                  <Card
                    handleAddCard={() => {
                      addSubject(idx, 'emphasisLine')
                    }}
                    handleDeleteCard={() => {
                      deleteSubject(idx, 'emphasisLine')
                    }}
                  />
                </div>
              </div>
            ))}
            <Button secondary handler={addEmphasisLine}>
              Agregar línea de énfasis
            </Button>
          </fieldset>
        </form>
      </main>
    </>
  )
}
