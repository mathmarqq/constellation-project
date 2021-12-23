import React, { ReactElement, ReactNode } from 'react'
import BoardProvider from 'domains/board/providers/BoardProvider'
import LoadingProvider from '../providers/LoadingProvider'

type ProvidersProps = {
    children: ReactNode
}

function Providers({ children }: ProvidersProps): ReactElement {
    return (
        <LoadingProvider>
            <BoardProvider>{children}</BoardProvider>
        </LoadingProvider>
    )
}

export default Providers
