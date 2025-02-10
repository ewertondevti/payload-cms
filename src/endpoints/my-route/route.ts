// // import config from '@payload-config'
// // import { getPayload } from 'payload'

// // receive the service id
// export const GET = async () => {
//     // const payload = await getPayload({ config })
    
    
//     return {
//         status: 200,
//         body: {
//             result: 'ok' // testCase === "valid" ? "success" : "fail"
//         }
//     }
// }

import { type PayloadHandler, commitTransaction, initTransaction } from 'payload'

// import { seed as seedScript } from '@/endpoints/seed'

export const myRouteHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload, user } = req

//   if (!user) {
//     return Response.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
    // Create a transaction so that all seeding happens in one transaction
    // await initTransaction(req)

    // await seedScript({ payload, req })

    // Finalise transactiojn
    // await commitTransaction(req)

    return Response.json({ success: true })
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error'
//     payload.logger.error(message)
//     return Response.json({ error: message }, { status: 500 })
//   }
}
