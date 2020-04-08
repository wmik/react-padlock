import React from 'react';
import styled, { css } from 'styled-components';

export default function App() {
  return (
    <Flex align="center" justify="center" p="8px">
      <Padlock animation="flip" color="black" width="24px" height="21px" />
    </Flex>
  );
}

const Flex = styled.div`
  align-items: ${props => props.align};
  display: flex;
  height: ${props => props.h};
  justify-content: ${props => props.justify};
  padding: ${props => props.p};
  width: ${props => props.w};
`;

function getOpenStyles(props) {
  return css`
    transform: ${props.animation === 'flip' ? 'scaleX(-1)' : 'rotate(-45deg)'};
    bottom: 130%;
    left: -${props.animation === 'flip' ? 55 : 25}%;
  `;
}

const PadlockIcon = styled.span`
  border: 3px solid ${props => props.bgColor};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  height: ${props => props.h};
  padding: 0;
  position: relative;
  transition: all 0.1s ease-in-out;
  width: ${props => props.w};
  &::after {
    background: ${props => props.bgColor};
    content: '';
    display: block;
    height: 7px;
    left: 42%;
    position: absolute;
    top: 35%;
    transition: all 0.1s ease-in-out;
    width: 3px;
  }
  &::before {
    border: 3px solid ${props => props.bgColor};
    border-bottom: 0;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    bottom: 100%;
    content: '';
    display: block;
    height: 10px;
    left: 7%;
    position: absolute;
    transition: all 0.1s ease-in-out;
    width: 10px;
    ${props => (props.state === 'open' ? getOpenStyles(props) : '')};
  }
  &:hover::before {
    ${props => (props.state === 'closed' ? 'height: 12px' : '')};
  }
`;

const noop = () => {};

function Padlock({ animation, color, width, height, onClick = noop }) {
  let [state, setState] = React.useState('open');
  return (
    <PadlockIcon
      animation={animation}
      bgColor={color}
      w={width}
      h={height}
      onClick={e => {
        e.preventDefault();
        setState(prevState => (prevState === 'open' ? 'closed' : 'open'));
        onClick(e, state);
      }}
      state={state}
    />
  );
}
