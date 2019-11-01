import React from 'react'

const Message = ({ message, author }) => {
    return (
        <p>
          <i>{author}</i>: {message}
        </p>
    )
}

export default Message;
