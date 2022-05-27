import { Grid, Card, Text, Button, Container, Image } from "@nextui-org/react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useState, useEffect } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { PokemonListResponse } from "../../interfaces";
import { localFavorites, getPokemonInfo } from "../../utils";

interface Pros {
    pokemon: any;
}

const PokemonPageName: NextPage<Pros> = ({ pokemon }) => {

    const [isInFavorite, setIsInFavorite] = useState( localFavorites.existInFavorites( pokemon.id ) )
    
    const onToggleFAvorite = () => {
        localFavorites.toggleFavorite( pokemon.id )
        setIsInFavorite(!isInFavorite)
    }

    useEffect(() => {
        setIsInFavorite(localFavorites.existInFavorites( pokemon.id ))
    }, [pokemon.id]) 

    return (
        <Layout title={ `Pokémon | ${ pokemon.name }` }>
            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card hoverable css={{ padding: '30px'}}>
                        <Card.Body>
                            <Card.Image
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={ pokemon.name }
                                width="100%"
                                height={ 200 }
                            ></Card.Image>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform="capitalize">{ pokemon.name }</Text>
                            <Button
                                onClick={ onToggleFAvorite }
                                color="gradient"
                                ghost={ !isInFavorite }
                            >
                                { isInFavorite ? "En favoritos" : "Guardar en favoritos" }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container display="flex" direction="row" gap={ 0 }>
                                <Image
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                ></Image>
                                <Image
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                ></Image>
                                <Image
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                ></Image>
                                <Image
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                ></Image>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data  } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
    const pokemonsPath: string[] = data.results.map( pokemon => pokemon.name);

    return {

        paths: pokemonsPath.map( name => ({
            params: { name }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string }

    const pokemon = await getPokemonInfo( name )

    if(!pokemon) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      }
    }
}

export default PokemonPageName;