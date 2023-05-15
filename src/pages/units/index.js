import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { PlusIcon, SearchIcon } from '@/components/Icons'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const BASE_API_URL = process.env.BASE_API_URL

const Units = () => {
  const [units, setUnits] = useState([])
  const [backUpUnits, setBackUpUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await fetch(`${BASE_API_URL}/academicUnit/all`)
      const data = await response.json()
      setUnits(data)
      setBackUpUnits(data)
      setLoading(false)
    }
    fetchUnits()
  }, [])

  const handleCreate = () => {
    router.push('/create-unit')
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (search) {
      const filter = backUpUnits.filter(({ nameAcademicUnit }) => {
        const name = nameAcademicUnit
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        return name.includes(
          search
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        )
      })
      setUnits(filter)
    } else {
      setUnits(backUpUnits)
    }
  }

  const handleChange = (event) => {
    if (event.target.value === '') {
      setUnits(backUpUnits)
    }
  }

  return (
    <>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main className="container">
          <h2>Unidades Académicas</h2>
          <form
            onSubmit={handleSearch}
            onChange={handleChange}
            style={{
              alignSelf: 'center',
              width: 'min(45rem, 100%)',
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'space-evenly'
            }}
          >
            <Input
              type="search"
              value={search}
              onChange={setSearch}
              placeholder="Buscar unidad"
              style={{ width: '100%', alignSelf: 'stretch' }}
            />
            <RoundButton>
              <SearchIcon width="2rem" height="2rem" color="white" />
            </RoundButton>
          </form>
          <div className="gridContainer">
            {units.map(({ idAcademicUnit, nameAcademicUnit }) => (
              <Card
                key={`${idAcademicUnit}`}
                id={`/units/${idAcademicUnit}`}
                content={nameAcademicUnit}
              />
            ))}
            <RoundButton fixed color="purple" handler={handleCreate}>
              <PlusIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
          </div>
          {units.length === 0 && (
            <p> No existen unidades que coincidan con la búsqueda </p>
          )}
        </main>
      )}
    </>
  )
}

export default Units
