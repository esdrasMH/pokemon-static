import { FC, ReactNode } from 'react'
import Head from "next/head"
import { NavBar } from '../ui';

interface Props {
    children: ReactNode;
    title?: string;
}

const origin = (typeof window === "undefined") ? "" : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title || "PokemonApp" }</title>
                <meta name="author" content="Esdras Malave"></meta>
                <meta name="description" content={`Información sobre el pokémon ${ title }`}></meta>
                <meta name="keywords" content="pokemon, pokedex,"></meta>
                <meta property="og:title" content={`Pokémon | ${ title }`} />
                <meta property="og:description" content={`Información sobre el pokémon ${ title }`} />
                <meta property="og:image" content={`${ origin }img/banner.png`} />
            </Head>

            <NavBar />

            <main>
                { children }
            </main>
        </>
    )
}