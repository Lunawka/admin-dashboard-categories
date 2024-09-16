import { useState } from 'react'

export const ImageWithFallback = ({ src, alt }) => {
    const [isImageError, setIsImageError] = useState(false)

    return (
        <div className='h-72 w-full'>
            {isImageError ? (
                <div className='h-full w-full rounded-sm bg-blue-500/15'></div>
            ) : (
                <img
                    className='h-full w-full rounded-sm'
                    src={src}
                    alt={alt}
                    onError={() => setIsImageError(true)}
                />
            )}
        </div>
    )
}
