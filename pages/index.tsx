import { Grid, Image } from '@nextui-org/react';
import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, Result } from '../interfaces'
import { PokemonCard } from '../pokemon';

interface props {
  pokemons: Result[];
}

const Home: NextPage<props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokémones'>
      <Image src="img/banner.png"></Image>
      <Grid.Container gap={ 2 } justify='center'>
        {
          pokemons.map(( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon }></PokemonCard>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: Result[] = data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default Home
