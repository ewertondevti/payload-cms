// API GETS ----------------------------------------------------------------------------------------------------
export const getUserServiceOrder = async ({ userId, serviceId }) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/getOpenedOrders?serviceId=${serviceId}&userId=${userId}`,
    )
      .then((res) => res.json())
      .then((data) => data)
    return data[0]
  } catch (e) {
    console.error(e)
  }
}

export const getServiceOrderById = async (orderId: number) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/get/${orderId}`)
      .then((res) => res.json())
      .then((data) => data)
    return data
  } catch (e) {
    console.error(e)
  }
}

export const getServiceStepsById = async (serviceId: string) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/services/${serviceId}?depth=1&draft=false&locale=pt`,
      { mode: 'no-cors' },
    )
      .then((res) => res.json())
      .then((data) => data)
    return data
  } catch (e) {
    console.error(e)
  }
}

export const getStepsByArgs = async (
  stepId: string,
  serviceId: string,
  userId: string,
  orderId: string,
) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/steps/getStepsByArgs?stepId=${stepId}&serviceId=${serviceId}&userId=${userId}&orderId=${orderId}`,
      { mode: 'no-cors' },
    )
      .then((res) => res.json())
      .then((data) => data)
    return data
  } catch (e) {
    console.error(e)
  }
}

// API POSTS ----------------------------------------------------------------------------------------------------
export const postNewServiceOrder = async (order: any) => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => data)
    return data
  } catch (e) {
    console.error(e)
  }
}

// API PUTS ----------------------------------------------------------------------------------------------------
export const putOrderById = async (order: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/update`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(order),
    })
  } catch (e) {
    console.error(e)
  }
}

export const updateStepsByArgs = async ({ formData, stepId, serviceId, userId, orderId }) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/updateStepByArgs?stepId=${stepId}&serviceId=${serviceId}&userId=${userId}&orderId=${orderId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(formData),
      },
    )
  } catch (e) {
    console.error(e)
  }
}

// API DELETES ----------------------------------------------------------------------------------------------------
export const deleteOrderbId = async (orderId: number) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/delete/${orderId}`, {
      method: 'DELETE',
    })
  } catch (e) {
    console.error(e)
  }
}

// ORDER STEP

// API GETS ----------------------------------------------------------------------------------------------------
export const getGetStepInfoServiceOrder = async ({ userId, serviceId, stepIndex, orderId }) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/steps/getStepByArgs?serviceId=${serviceId}&userId=${userId}&stepId=${stepIndex}&orderId=${orderId}`,
    )
      .then((res) => res.json())
      .then((data) => data)
    return data
  } catch (e) {
    console.error(e)
  }
}
// API POSTS ----------------------------------------------------------------------------------------------------

// export const submitSteps = async (steps: any) => {
//     try {
//       const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/steps`, {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify(steps),
//       }).then((res) => res.json())
//       .then((data) => data)
//     return data
//     } catch (e) {
//       console.error(e)
//     }
//   }

export const postCreateStepServiceOrder = async (orderStep: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/steps`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(orderStep),
    })
  } catch (e) {
    console.error(e)
  }
}

export const postUpdateStepServiceOrder = async (orderStep: any) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/steps/updateStepByArgs`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(orderStep),
    })
  } catch (e) {
    console.error(e)
  }
}
