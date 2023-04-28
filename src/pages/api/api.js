// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const DATA = [
  {
    idAcademicUnit: 1,
    codeAcademicUnit: '08',
    nameAcademicUnit: 'Facultad de Ingeniería',
    deanName: 'Carlos Alfonso López Mazariegos',
    typeAcademicUnit: 'Facultad',
    ubicationAcademicUnit: 'Campus Central',
    description:
      'La Facultad de Ingeniería es una de las 13 facultades de la Universidad de San Carlos de Guatemala. Fue fundada en 1917 y es la facultad más antigua de la Universidad de San Carlos de Guatemala. La Facultad de Ingeniería es la facultad más grande de la Universidad de San Carlos de Guatemala, con más de 10,000 estudiantes y 500 profesores. La Facultad de Ingeniería ofrece 12 programas de pregrado, 10 programas de maestría y 2 programas de doctorado. La Facultad de Ingeniería tiene 6 departamentos académicos, 2 centros de investigación y 1 centro de extensión.',
    urlCreationAcademicUnit: 'https://www.ingenieria.usac.edu.gt/historia',
    costCenterCode: '23898923829323892',
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
    idAcademicUnit: 2,
    codeAcademicUnit: '09',
    nameAcademicUnit: 'Facultad de Ciencias Económicas',
    deanName: 'Carlos Alfonso López Mazariegos',
    typeAcademicUnit: 'Facultad',
    ubicationAcademicUnit: 'Campus Central',
    description: 'Facultad de Ciencias Económicas',
    urlCreationAcademicUnit: 'https://fce.usac.edu.gt/historia/',
    costCenterCode: '343894893498374',
    subunits: [
      'Departamento de Contaduría Pública y Auditoría',
      'Departamento de Economía',
      'Departamento de Administración de Empresas',
      'Departamento de Estadística'
    ]
  },
  {
    idAcademicUnit: 3,
    codeAcademicUnit: '10',
    nameAcademicUnit: 'Facultad de Ingeniería',
    deanName: 'Carlos Alfonso López Mazariegos',
    typeAcademicUnit: 'Facultad',
    ubicationAcademicUnit: 'Campus Central',
    description:
      'La Facultad de Ingeniería es una de las 13 facultades de la Universidad de San Carlos de Guatemala. Fue fundada en 1917 y es la facultad más antigua de la Universidad de San Carlos de Guatemala. La Facultad de Ingeniería es la facultad más grande de la Universidad de San Carlos de Guatemala, con más de 10,000 estudiantes y 500 profesores. La Facultad de Ingeniería ofrece 12 programas de pregrado, 10 programas de maestría y 2 programas de doctorado. La Facultad de Ingeniería tiene 6 departamentos académicos, 2 centros de investigación y 1 centro de extensión.',
    urlCreationAcademicUnit: 'https://www.ingenieria.usac.edu.gt/historia',
    costCenterCode: '2382938273892',
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
    idAcademicUnit: 4,
    codeAcademicUnit: '11',
    nameAcademicUnit: 'Facultad de Ciencias Económicas',
    deanName: 'Carlos Alfonso López Mazariegos',
    typeAcademicUnit: 'Facultad',
    ubicationAcademicUnit: 'Campus Central',
    description: 'Facultad de Ciencias Económicas',
    urlCreationAcademicUnit: 'https://fce.usac.edu.gt/historia/',
    costCenterCode: '343892938792838',
    subunits: [
      'Departamento de Contaduría Pública y Auditoría',
      'Departamento de Economía',
      'Departamento de Administración de Empresas',
      'Departamento de Estadística'
    ]
  }
]

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query?.code) {
      res.status(200).json(DATA.filter((item) => item.codeAcademicUnit === req.query.code))
    } else {
      res.status(200).json(DATA)
    }
  } else if (req.method === 'POST') {
    const data = req.body
    const newUnit = {
      idAcademicUnit: DATA.length + 1,
      ...data
    }
    DATA.push(newUnit)
    res.status(201).json(newUnit)
    console.log(DATA)
  }
}
