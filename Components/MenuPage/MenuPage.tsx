import React, {useEffect, useState} from 'react'
import styles from './MenuPage.module.sass'

interface MenuPageProps {
    text: string
}

const MenuPage: React.FC<MenuPageProps> = ({text, children}) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true)
    })

    return (
        <div style={{opacity: isLoaded ? '1' : '0'}}
            className={styles.MenuPage}>

            <div className={styles.Text}>
                {text}
            </div>

            {children}
        </div>
    )
}

export default MenuPage