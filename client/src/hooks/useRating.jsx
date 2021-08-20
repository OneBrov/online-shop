import React from 'react'

import fullStar from '../assets/fullStar.svg'
import halfStar from '../assets/halfStar.svg'
import emptyStar from '../assets/emptyStar.svg'

export const useRating = (rating) => {
    let acc = []
    for (let i=1; i<=5; i++) {
        if (rating >= i) {
            acc.push( <img key={i} src={fullStar} alt='' /> )
        } else if (rating < i && rating > i - 1 ){
            acc.push( <img key={i} src={halfStar} alt='' /> )
        } else {
            acc.push( <img key={i} src={emptyStar} alt='' /> )
        }
    }
    return acc
}
