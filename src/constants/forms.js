export const PATTERNS = {
  name: '^[a-zA-ZÀ-ÿ ]{2,}$',
  code: '^[0-9]{1,2}$',
  description: '^[a-zA-ZÀ-ÿ0-9 ]*$',
  centerCode: '^[0-9]{8,12}$',
  address: '^[a-zA-ZÀ-ÿ0-9 ]*$'
}

export const TITLES = {
  name: 'El nombre debe tener mínimo 2 letras y no debe contener números o caracteres especiales',
  code: 'El código debe tener mínimo 1 número y máximo 2 números',
  description: 'La descripción no debe contener caracteres especiales',
  centerCode: 'El código debe tener mínimo 8 números y máximo 12 números',
  address: 'La dirección no debe contener caracteres especiales'
}
