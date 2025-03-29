const processEvent = async (readExternalIdpUser, signUp, event) => {
  if (event.triggerSource === 'PreSignUp_ExternalProvider') {
    await verifyThenSignUpExternalIdpUser(readExternalIdpUser, signUp, event)
  }
}

const verifyThenSignUpExternalIdpUser = async (readExternalIdpUser, signUp, event) => {
  const externalIdpUser = readExternalIdpUser(event)
  if (externalIdpUser.email) {
    return await signUp(externalIdpUser)
  } else {
    throw new InvalidUserError(buildMessageForTheEmailAbsenceScenario(externalIdpUser.providerName))
  }
}

const buildMessageForTheEmailAbsenceScenario = (providerName) => {
  return `Continue with ${providerName} failed! Email is required, but your ${providerName} account doesn't provide us your email. Please check your ${providerName} account settings, Sign in with other identity providers or sign up with your email directly.`
}

const buildProcessEventFunction = (readExternalIdpUser, signUp) => event => processEvent(readExternalIdpUser, signUp, event)

class InvalidUserError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InvalidUserError'
  }
}

export { buildProcessEventFunction, InvalidUserError }
