import React from 'react'

const AddMessage = ({ addNewMessage, a }) => {
    let input;
    return (
        <section id="new-message">
          <input
            onKeyPress={e => {
              if (e.key === 'Enter') {
                addNewMessage(input.value, 'Me');
                input.value = '';
              }
            }}
            ref={node => {
              input = node;
            }}
          />
        </section>
    )
}

export default AddMessage;
