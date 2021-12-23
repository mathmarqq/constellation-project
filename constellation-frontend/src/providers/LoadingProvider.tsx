import React, { useState, ReactNode, useCallback } from 'react'
import LoadingContext from '../contexts/LoadingContext'

type LoadingProviderProps = {
    children: ReactNode
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [loading, setloading] = useState<boolean>(false)

    const showLoading = useCallback(function showLoading() {
        setloading(true)
    }, [])

    const closeLoading = useCallback(function closeLoading() {
        setloading(false)
    }, [])

    const value = React.useMemo(
        () => ({
            loading,
            showLoading,
            closeLoading,
        }),
        [showLoading, closeLoading, loading]
    )

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

export default LoadingProvider
