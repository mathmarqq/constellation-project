import LoadingContext from 'contexts/LoadingContext'
import React, { ReactElement, useContext } from 'react'
import styles from './GeneralLoading.module.scss'

function GeneralLoading(): ReactElement | null {
    const { loading } = useContext(LoadingContext)

    function renderLoading() {
        if (loading) {
            return (
                <div className={styles.overlay}>
                    <div data-testid="loader" className={styles.loader} />
                </div>
            )
        }

        return null
    }

    return renderLoading()
}

export default GeneralLoading
