import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { ArrowIcon } from '@/components/Icons'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Version() {
  const router = useRouter()
  const { versionId, programId } = router.query
  const [version, setVersion] = useState({
    nameVersion: '1',
    levels: [
      {
        id: 1,
        subjects: [
          {
            id: 1,
            name: 'Cálculo 1',
            code: '3478123',
            type: 'COMUN',
            modality: 'PRESENCIAL',
            credits: '3'
          },
          {
            id: 2,
            name: 'Álgebra',
            code: '3478231',
            type: 'C',
            modality: 'P',
            credits: '3'
          }
        ]
      },
      {
        id: 2,
        subjects: [
          {
            id: 1,
            name: 'Cálculo 2',
            code: '3478124',
            type: 'd',
            modality: 'd',
            credits: '3'
          }
        ]
      }
    ],
    emphasisLines: [
      {
        id: 1,
        name: 'Materias socio humanísticas',
        subjects: [
          {
            id: 1,
            name: 'Materia',
            code: '3423231',
            type: 'a',
            modality: 'a',
            credits: '3'
          }
        ]
      },
      {
        id: 2,
        name: 'Materias Electivas',
        subjects: [
          {
            id: 1,
            name: 'Materia',
            code: '3423231',
            type: 'a',
            modality: 'a',
            credits: '3'
          }
        ]
      },
      {
        id: 3,
        name: 'Linea de énfasis 1',
        subjects: [
          {
            id: 1,
            name: 'Materia',
            code: '3423231',
            type: 'a',
            modality: 'a',
            credits: '3'
          }
        ]
      }
    ]
  })

  useEffect(() => {
    if (versionId === '2') {
      setVersion({
        nameVersion: '1',
        levels: [
          {
            id: 1,
            subjects: [
              {
                id: 1,
                name: 'Cálculo 1',
                code: '3478123',
                type: 'COMUN',
                modality: 'PRESENCIAL',
                credits: '3'
              },
              {
                id: 2,
                name: 'Álgebra',
                code: '3478231',
                type: 'C',
                modality: 'P',
                credits: '3'
              }
            ]
          }
        ],
        emphasisLines: [
          {
            id: 1,
            name: 'Materias socio humanísticas',
            subjects: [
              {
                id: 1,
                name: 'Socio Humanística 1',
                code: '3423231',
                type: 'a',
                modality: 'a',
                credits: '3'
              }
            ]
          }
        ]
      })
    }
  }, [versionId])

  return (
    <>
      <NavBar />
      <Head>
        <title>Versión del Plan de Estudios</title>
      </Head>
      <main className="container">
        <div style={{ display: 'flex', gap: '1rem' }}>
          <RoundButton
            color="yellow"
            handler={() => router.push(`/programs/${programId}`)}
          >
            <ArrowIcon color="white" height="2rem" width="2rem" />
          </RoundButton>
          <h1>Plan de Estudios - Versión {versionId}</h1>
        </div>
        <section className="subContainer">
          {version.levels.map((level) => (
            <div key={level.id}>
              <h2>Nivel {level.id}</h2>
              <br />
              <div className="gridContainer">
                {level.subjects.map((subject) => (
                  <Card key={subject.id}>
                    <h3>{subject.name}</h3>
                    <h4>{subject.code}</h4>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          {version.emphasisLines.map((line) => (
            <div key={line.id}>
              <h2>{line.name}</h2>
              <br />
              <div className="gridContainer">
                {line.subjects.map((subject) => (
                  <Card key={subject.id}>
                    <h3>{subject.name}</h3>
                    <h4>{subject.code}</h4>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
