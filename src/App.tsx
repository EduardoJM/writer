import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Writer from './screens/Writer'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Writer />
        </>
    )
}

render(<App />, mainElement)
