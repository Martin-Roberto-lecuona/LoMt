import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
    valid: boolean;
    text: string;
    dataTestIdWrong: string;
    dataTestIdRight: string;
}

const IconRightOrWrong = ({valid, text, dataTestIdWrong , dataTestIdRight}:Props) =>  {
  return (
    <div>
        {!valid && text && <FontAwesomeIcon icon={faTimes} className="iconWrong" data-testid={dataTestIdWrong}/>}
        {valid && text && <FontAwesomeIcon icon={faCheck} className="iconRight" data-testid={dataTestIdRight}/>}
    </div>
  )
}

export default IconRightOrWrong