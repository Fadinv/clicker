import React from 'react'
import styles from './StoreBar.module.sass'

interface StoreBarProps {
    itemsIsLoaded: boolean
}

const StoreBar: React.FC<StoreBarProps> = ({
                                               children,
                                               itemsIsLoaded,
                                           }) => {
    return (
        <div style={{
            opacity: itemsIsLoaded ? '1' : '0',
        }} className={styles.StoreBar}>
            {children}
        </div>
    )
}

export default StoreBar