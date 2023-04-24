import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { PlusIcon, SearchIcon } from '@/components/Icons'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const BASE_API_URL = 'http://localhost:3000/api'

const Units = () => {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await fetch(`${BASE_API_URL}/api`)
      const data = await response.json()
      setUnits(data)
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
      const filteredUnits = units.filter((unit) =>
        unit.name.toLowerCase().includes(search.toLowerCase())
      )
      setUnits(filteredUnits)
    } else {
      const fetchUnits = async () => {
        const response = await fetch(`${BASE_API_URL}/api`)
        const data = await response.json()
        setUnits(data)
        setLoading(false)
      }
      fetchUnits()
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
            {units.map((unit) => (
              <Card
                key={`${unit.code}`}
                id={`/units/${unit.code}`}
                content={unit.name}
              />
            ))}
            {units.length === 0 && (<p> No hay unidades que coincidan con la búsqueda </p>)}
            <RoundButton fixed color="purple" handler={handleCreate}>
              <PlusIcon color="white" height="2rem" width="2rem" />
            </RoundButton>
          </div>
        </main>
      )}
    </>
  )
}

export default Units
