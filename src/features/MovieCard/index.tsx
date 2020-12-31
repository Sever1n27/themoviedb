import React from "react";
import styled from "styled-components";

const Wrapper = styled.a`
  width: 22%;
`;

const Title = styled.h3``;
const Head = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  display: block;
  border-radius: 4px;
`;

export function MovieCard(props: any) {
  const { movie } = props;
  return (
    <Wrapper>
      <Head>
        <Image
          src={`${process.env.RAZZLE_IMAGES_URL_SMALL}${movie.poster_path}`}
        />
        <Title>{movie.title}</Title>
      </Head>
    </Wrapper>
  );
}
