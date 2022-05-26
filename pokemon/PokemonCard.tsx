import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Result } from "../interfaces";

interface Pros {
    pokemon: Result
}

export const PokemonCard: FC<Pros> = ({ pokemon }) => {

    const router = useRouter();

    const onClick = () => {
      router.push(`/name/${ pokemon.name }`)
    }

    return (
        <Grid key={ pokemon.id } xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 }>
        <Card hoverable clickable onClick={ onClick }>
          <Card.Body css={{ p: 1}}>
            <Card.Image
              src={ pokemon.img }
              width="100%"
              height={ 140 }
            ></Card.Image>
            <Card.Footer>
              <Row justify='space-between'>
                <Text transform='capitalize'>{ pokemon.name }</Text>
                <Text>#{ pokemon.id }</Text>
              </Row>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Grid>
    )
}