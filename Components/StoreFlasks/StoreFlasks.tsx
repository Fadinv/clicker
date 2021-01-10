import React from 'react'
import styles from './StoreFlasks.module.css'

interface StoreFlasksProps {

}

const StoreFlasks: React.FC<StoreFlasksProps> = ({
                                                     children,
                                                 }) => {
    return (
        <div className={styles.heightContainer}>
            <div className={styles.StoreFlasks}>
                {children}
            </div>
        </div>
    )
}

export default StoreFlasks