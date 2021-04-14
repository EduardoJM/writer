import styled from 'styled-components'

export const EditorContainer = styled.div`
    position: relative;

    background: white;
    color: #222;
`
interface PopupContainerProps {
    x: number;
    y: number;
}

export const PopupContainer = styled.div<PopupContainerProps>`
    position: absolute;

    padding: 20px;

    background: red;

    left: ${props => props.x}px;
    top: ${props => props.y}px;
    
    transform: translate(-50%, 30px)
`
