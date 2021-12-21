import React from 'react'
import styles from 'styles/index.module.scss'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    (Story) => (
        <div className={styles.defaultTheme}>
            <Story />
        </div>
    ),
]
