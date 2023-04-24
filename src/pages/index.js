import { Button } from '@/components/Buttons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logosimboloUdea from '@/assets/logosimbolo-vertical.png'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <main
        className="container"
        style={{ alignItems: 'center', marginTop: '20vh' }}
      >
        <Image src={logosimboloUdea} width={300} />
        <Button handler={() => router.push('/units')}>Conectar</Button>
      </main>
    </>
  )
}
