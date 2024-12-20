export const fetchUser = (query) => (dispatch) => {
  dispatch({ type: 'USER/FETCH/START' })
  try {
    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          dispatch({ type: 'USER/FETCH/SUCCESS', payload: user })
          localStorage.setItem('userId', user.id)
        } else {
          throw new Error('User not found')
        }
      })
  } catch (e) {
    console.error(e)
    dispatch({ type: 'USER/FETCH/ERROR', payload: e })
  }
}

export const fetchOnMount = () => async (dispatch) => {
  if (localStorage.getItem('userId')) {
    dispatch({ type: 'USER/FETCH/START' })
    try {
      await fetch(
        `http://localhost:5001/users?id=${localStorage.getItem('userId')}`
      )
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            dispatch({ type: 'USER/FETCH/SUCCESS', payload: user })
          } else {
            dispatch({ type: 'USER/NONE' })
          }
        })
    } catch (e) {
      dispatch({ type: 'USER/NONE' })
    }
  }
}

export const postUser = (email, password) => async (dispatch) => {
  await fetch('http://localhost:5001/users', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      date: new Date().toLocaleString(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  await fetch(`http://localhost:5001/users?email=${email}`)
    .then((r) => r.json())
    .then((users) => (users = users[0]))
    .then((user) => {
      dispatch({ type: 'USER/FETCH/SUCCESS', payload: user })
      localStorage.setItem('userId', user.id)
    })
}
