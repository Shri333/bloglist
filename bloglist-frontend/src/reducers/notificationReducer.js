let id

const notify = (message, type) => dispatch => {
  if (id) {
    clearTimeout(id)
  }
  dispatch({
    type: 'NOTIFY',
    data: { message, type },
  })
  id = setTimeout(() => {
    dispatch({
      type: 'CLEAR',
    })
  }, 5000)
}

const clear = () => dispatch => {
  if (id) {
    clearTimeout(id)
  }
  dispatch({
    type: 'CLEAR'
  })
}


const notificationReducer = (
  state = { message: 'EMPTY', type: null },
  action
) => {
  switch (action.type) {
    case 'NOTIFY':
      return {...action.data}
    case 'CLEAR':
      return { message: 'EMPTY', type: null }
    default:
      return state
  }
}

export { notify, clear }
export default notificationReducer
