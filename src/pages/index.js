import { Button } from '@/components/Buttons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logosimboloUdea from '@/assets/logosimbolo-vertical.png'
import Head from 'next/head'
import React from 'react'

/**
 * Componente para la página de inicio de la plataforma.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio.
 */
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
        style={{
          height: 'calc(100vh - 4rem)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image src={logosimboloUdea} width={300} alt="Logosimbolo - UdeA" />
        <div style={{ height: '4rem' }}>
          <Button handler={() => router.push('/units')}>Conectar</Button>
        </div>
      </main>
    </>
  )
}
