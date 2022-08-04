import { FC } from "react";
import { Slide } from 'react-slideshow-image';

import styles from './ProductSlideshow.module.css';

interface PropsSlideshow {
    images: string[];
}

export const ProductsSlideshow:FC<PropsSlideshow> = ({images}) => {
    return (
        <Slide
            easing="ease"
            duration={10000}
            indicators
        >
            {
                images.map(image => {
                    const url = `/products/${image}`;
                    return (
                        <div key={image} className={styles['each-slide']}>
                            <div style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover',
                            }}>
                            </div>
                        </div>
                    )})
            }
        </Slide>
    )
}
