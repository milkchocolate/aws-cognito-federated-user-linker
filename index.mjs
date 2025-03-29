import { processEvent, InvalidUserError } from './lib/context.mjs'

const handler = async (event, context) => {
  try {
    await processEvent(event)
  } catch (error) {
    if (error instanceof InvalidUserError) {
      throw error
    }
    console.debug(event)
    console.debug(context)
    console.error(error)
  }
  return event
}

export { handler }
