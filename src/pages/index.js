import { Button } from '@/components/Buttons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logosimboloUdea from '@/assets/logosimbolo-vertical.png'
import Head from 'next/head'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>PLA | UdeA</title>
        <meta
          name="description"
          content="Plataforma de Gestión del Plan de Estudios - Universidad de Antioquia"
        />
      </Head>
      <main
        className="container"
        style={{ alignItems: 'center', marginTop: '20vh' }}
      >
        <Image src={logosimboloUdea} width={300} alt="Logosimbolo - UdeA" />
        <Button handler={() => router.push('/units')}>Conectar</Button>
      </main>
    </>
  )
}
