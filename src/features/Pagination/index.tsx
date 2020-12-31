import React from 'react';
import styled from 'styled-components';

type Props = {
    current: number;
    total: number;
    onClick: (number: number) => void;
    loading: boolean;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`;

type ButtonProps = {
    active?: boolean;
}

const Button = styled.button<ButtonProps>`
    border: 1px solid ${props => props.active ? 'black' : '#818181'};
    color: ${props => props.active ? 'black' : '#818181'};
    background: none;
    display: block;
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
    &+& {
        border-left: none;
    }
`;

export function Pagination(props: Props){
    const {current, total, onClick, loading} = props;
    const pages = Array.from(Array(total).keys()).map((number) => number + 1);
    const shownPages = pages.filter((number) => number >= current ? number - current < 6 : current - number < 6)
    return <Wrapper>
            {!shownPages.includes(1) && <Button disabled={loading} onClick={() => onClick(1)}>1</Button>}
            {shownPages.map((number) => <Button active={number === current} disabled={loading} onClick={() => onClick(number)} key={number}>{number}</Button>)}
            {!shownPages.includes(pages.length) && <Button disabled={loading} onClick={() => onClick(pages.length)}>{pages.length}</Button>}
        </Wrapper>
} 