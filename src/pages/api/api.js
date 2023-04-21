// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const DATA = [
  {
    id: 1,
    code: '08',
    name: 'Facultad de Ingeniería',
    decane: 'Carlos Alfonso López Mazariegos',
    type: 'Facultad',
    location: 'Campus Central',
    description:
      'La Facultad de Ingeniería es una de las 13 facultades de la Universidad de San Carlos de Guatemala. Fue fundada en 1917 y es la facultad más antigua de la Universidad de San Carlos de Guatemala. La Facultad de Ingeniería es la facultad más grande de la Universidad de San Carlos de Guatemala, con más de 10,000 estudiantes y 500 profesores. La Facultad de Ingeniería ofrece 12 programas de pregrado, 10 programas de maestría y 2 programas de doctorado. La Facultad de Ingeniería tiene 6 departamentos académicos, 2 centros de investigación y 1 centro de extensión.',
    creationUrl: 'https://www.ingenieria.usac.edu.gt/historia',
    costCenter: '23898923829323892',
    subunits: [
      'Departamento de Ingeniería de Sistemas',
      'Departamento de Ingeniería Mecánica',
      'Departamento de Ingeniería Eléctrica',
      'Departamento de Ingeniería Electrónica',
      'Departamento de Ingeniería Industrial',
      'Departamento de Ingeniería en Mecatrónica'
    ]
  },
  {
    id: 2,
    code: '09',
    name: 'Facultad de Ciencias Económicas',
    decane: 'Carlos Alfonso López Mazariegos',
    type: 'Facultad',
    location: 'Campus Central',
    description: 'Facultad de Ciencias Económicas',
    creationUrl: 'https://fce.usac.edu.gt/historia/',
    costCenter: '343894893498374',
    subunits: [
      'Departamento de Contaduría Pública y Auditoría',
      'Departamento de Economía',
      'Departamento de Administración de Empresas',
      'Departamento de Estadística'
    ]
  },
  {
    id: 3,
    code: '10',
    name: 'Facultad de Ingeniería',
    decane: 'Carlos Alfonso López Mazariegos',
    type: 'Facultad',
    location: 'Campus Central',
    description:
      'La Facultad de Ingeniería es una de las 13 facultades de la Universidad de San Carlos de Guatemala. Fue fundada en 1917 y es la facultad más antigua de la Universidad de San Carlos de Guatemala. La Facultad de Ingeniería es la facultad más grande de la Universidad de San Carlos de Guatemala, con más de 10,000 estudiantes y 500 profesores. La Facultad de Ingeniería ofrece 12 programas de pregrado, 10 programas de maestría y 2 programas de doctorado. La Facultad de Ingeniería tiene 6 departamentos académicos, 2 centros de investigación y 1 centro de extensión.',
    creationUrl: 'https://www.ingenieria.usac.edu.gt/historia',
    costCenter: '2382938273892',
    subunits: [
      'Departamento de Ingeniería de Sistemas',
      'Departamento de Ingeniería Mecánica',
      'Departamento de Ingeniería Eléctrica',
      'Departamento de Ingeniería Electrónica',
      'Departamento de Ingeniería Industrial',
      'Departamento de Ingeniería en Mecatrónica'
    ]
  },
  {
    id: 4,
    code: '11',
    name: 'Facultad de Ciencias Económicas',
    decane: 'Carlos Alfonso López Mazariegos',
    type: 'Facultad',
    location: 'Campus Central',
    description: 'Facultad de Ciencias Económicas',
    creationUrl: 'https://fce.usac.edu.gt/historia/',
    costCenter: '343892938792838',
    subunits: [
      'Departamento de Contaduría Pública y Auditoría',
      'Departamento de Economía',
      'Departamento de Administración de Empresas',
      'Departamento de Estadística'
    ]
  }
]

export default function handler(req, res) {
  if (req.query?.code) {
    res.status(200).json(DATA.filter((item) => item.code === req.query.code))
  } else {
    res.status(200).json(DATA)
  }
}
