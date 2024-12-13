import React from 'react'

function Alert(props) {
  return (
    <div style={{height:'30px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismiss fade show`} role="alert">
          <strong>{props.alert.msg}</strong>
      </div>}
    </div>
  )
}

export default Alert
