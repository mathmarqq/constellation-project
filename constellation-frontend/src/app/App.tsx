import BoardProvider from 'domains/board/providers/BoardProvider'
import React from 'react'
import styles from 'styles/index.module.scss'
import Routes from './Routes'

function App() {
    return (
        <div className={styles.defaultTheme}>
            <BoardProvider>
                <Routes />
            </BoardProvider>
        </div>
    )
}

export default App
