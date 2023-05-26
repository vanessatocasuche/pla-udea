import { RoundButton } from '@/components/Buttons'
import Card from '@/components/Card'
import { PlusIcon, SearchIcon } from '@/components/Icons'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

const BASE_API_URL = process.env.BASE_API_URL

/**
 * Componente para la página de visualización del listado de unidades académicas.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página del listado de unidades académicas.
 */
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

  /**
   * Maneja el evento de creación de una nueva unidad académica y redirige a la página de creación.
   */
  const handleCreate = () => {
    router.push('/create-unit')
  }

  /**
   * Maneja el evento de búsqueda de unidades académicas.
   * Si el campo de búsqueda está vacío, se muestran todas las unidades académicas.
   * Si el campo de búsqueda no está vacío, se filtran las unidades académicas que coincidan con la búsqueda, aplicando varios procesos de limpieza.
   *
   * @param {Event} event Evento de envío del formulario de búsqueda.
   */
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

  /**
   * Maneja el evento de cambio en el campo de búsqueda y restaura la lista de unidades académicas si el campo está vacío.
   *
   * @param {Event} event Evento de cambio en el campo de búsqueda.
   */
  const handleChange = (event) => {
    if (event.target.value === '') {
      setUnits(backUpUnits)
    }
  }

  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
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
