import React from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const Home: React.FC = () => {
  usePageTitle('Home')

  useGSAP(() => {
    gsap.from('.home-title', {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power1.out',
    })

    gsap.from('.home-paragraph', {
      x: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power1.out',
    })

    gsap.from('.tech-paragraph', {
      y: -20,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power1.out',
    })

    gsap.from('.footer-parapgrah', {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power1.out',
    })

    gsap.from('.git-hub-link', {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power1.out',
    })
  })

  return (
    <main className="container flex flex-col gap-8 justify-center items-start min-h-screen p-8 text-left mx-auto">
      <div className="container max-w-2xl mx-auto p-4">
        <h2 className="home-title text-7xl font-bold mb-4">
          WELCOME TO MY CLOTHING STORE
        </h2>
        <p className="home-paragraph text-3xl text-justify">
          This is a full stack application displaying a minimalist storefront
          for an online clothing store, everything is hosted on a monorepo and
          uses the following technologies:
        </p>
        <br />
        <p className="tech-paragraph">
          <span className="text-2xl font-bold">Back End:</span>
          <ul className="list-disc list-inside mt-2">
            <li className="text-xl">Express</li>
            <li className="text-xl">Prisma</li>
            <li className="text-xl">TypeScript</li>
          </ul>
          <span className="text-2xl font-bold">Front End:</span>
          <ul className="list-disc list-inside mt-2">
            <li className="text-xl">React + TypeScript</li>
            <li className="text-xl">Tailwind CSS</li>
            <li className="text-xl">GSAP</li>
          </ul>
        </p>
        <br />
        <p className="footer-parapgrah text-2xl">
          Test it out by clicking on the search icon above!
        </p>
        <p className="git-hub-link text-2xl">
          <a
            href="https://github.com/evelasco93/store-front"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </p>
      </div>
    </main>
  )
}
