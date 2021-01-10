import React, {useRef, useState} from 'react'
import styles from './Store.module.sass'

interface StoreProps {

}

const Store: React.FC<StoreProps> = ({children}) => {
    const [storePage, setStorePage] = useState<0 | 1>(0)

    const storeRef = useRef<HTMLDivElement>(null)

    let startX

    const goToLeft = () => {
        if (storePage === 0) return
        setStorePage(0)
    }

    const goToRight = () => {
        if (storePage === 1) return
        setStorePage(1)
    }

    const touchGoToMove = (e) => {
        const pageX = e.touches[0].clientX

        if (startX - pageX >= 50) {
            goToRight()
            storeRef.current.removeEventListener('touchmove', touchGoToMove)
        } else if (pageX - startX >= 50) {
            goToLeft()
            storeRef.current.removeEventListener('touchmove', touchGoToMove)
        }
    }

    const refreshTouch = () => {
        document.documentElement.removeEventListener('touchend', refreshTouch)
        storeRef.current.removeEventListener('touchend', refreshTouch)
    }

    const touchGoToStart = (e) => {
        startX = e.touches[0].clientX

        storeRef.current.addEventListener('touchmove', touchGoToMove)
        document.documentElement.addEventListener('touchend', refreshTouch)
    }

    return (
        <div className={styles.Store}>
            <div
                style={{
                    left: -100 * storePage + 'vw',
                }}
                ref={storeRef}
                onTouchStart={touchGoToStart}
                className={styles.ScrollContainer}
            >{children}
            </div>

            <button onClick={goToLeft} className={styles.LeftArrow}>
                &#10094;
            </button>
            <button onClick={goToRight} className={styles.RightArrow}>
                &#10095;
            </button>
        </div>
    )
}

export default Store