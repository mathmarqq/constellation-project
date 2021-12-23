import { createContext } from 'react'

type LoadingContextType = {
    loading: boolean
    showLoading: () => void
    closeLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({
    loading: false,
    showLoading: () => {},
    closeLoading: () => {},
})

export default LoadingContext
