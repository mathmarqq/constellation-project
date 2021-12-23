import React from 'react'
import styles from 'styles/index.module.scss'
import GeneralLoading from 'components/GeneralLoading/GeneralLoading'
import Providers from './Providers'
import Routes from './Routes'

function App() {
    return (
        <div className={styles.defaultTheme}>
            <Providers>
                <Routes />
                <GeneralLoading />
            </Providers>
        </div>
    )
}

export default App
