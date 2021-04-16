import styled from 'styled-components';
import { animated } from 'react-spring';

export const EditorContainer = styled.div`
    position: relative;

    background: white;
    color: #222;
`;

interface PopupContainerProps {
    x: number;
    y: number;
}

export const PopupContainer = styled(animated.div)<PopupContainerProps>`
    position: absolute;

    left: ${props => props.x}px;
    top: ${props => props.y}px;

    padding: 5px;
    border-radius: 10px;

    background: #222;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    &::after {
        content: '';
        width: 10px;
        height: 10px;

        background: #222;

        position: absolute;
        left: 50%;
        transform: rotateZ(45deg) translateX(-50%);
        top: 0px;
    }
`;

export const PopupButton = styled.button`
    border: none;
    outline: none;
    background: transparent;

    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 5px;

    cursor: pointer;

    svg {
        fill: #CCC;
        transition: fill 0.3s ease;
    }
    
    &:hover svg {
        fill: #FFF;
    }
`;

export const PopupSeparator = styled.span`
    width: 1px;
    height: 24px;

    background: #CCC;

    margin: 0 10px;
`;
