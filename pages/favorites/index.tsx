import { Grid, Card } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui"
import { localFavorites } from "../../utils"

const FavoritesPage = () => {

    const [favoritesPokemos, SetFavoritesPokemos] = useState<number[]>([])

    useEffect(() => {
        SetFavoritesPokemos( localFavorites.pokemons )
    }, [])

    const router = useRouter();

    const onClick = ( id: number ) => {
        router.push(`/pokemon/${ id }`)
    }

    return (
        <Layout title="Pokémon - Favoritos">
            {
                favoritesPokemos.length === 0
                ? ( <NoFavorites></NoFavorites> )
                : (
                    <Grid.Container gap={ 2 } direction="row" justify="flex-start">
                        {
                            favoritesPokemos.map( id => (
                                <Grid key={ id } xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }>
                                    <Card
                                        onClick={ () => onClick( id ) }
                                        hoverable
                                        clickable
                                        css={{ padding: 10 }}
                                    >
                                        <Card.Image
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                            width={'100%'}
                                            height={ 140 }
                                        ></Card.Image>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                )
            }
        </Layout>
    )
}

export default FavoritesPage