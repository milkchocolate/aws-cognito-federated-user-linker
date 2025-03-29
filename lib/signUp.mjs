import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider'
import { isLinked } from './isLinked.mjs'

const signUp = async (linkUser, findUser, createUser, setRandomPassword, externalIdpUser) => {
  try {
    const foundUser = await findUser(externalIdpUser.userPoolId, externalIdpUser.email)
    if (!isLinked(externalIdpUser.providerUserId, externalIdpUser.providerName, foundUser)) {
      await linkUser(externalIdpUser.userPoolId, externalIdpUser.providerName, foundUser.Username, externalIdpUser.providerUserId)
    }
  } catch (e) {
    if (e instanceof UserNotFoundException) {
      const createdUser = await createUser(externalIdpUser.userPoolId, externalIdpUser.email)
      await Promise.all([
        setRandomPassword(externalIdpUser.userPoolId, createdUser.User.Username), // Without the step, the user will be in the Force Change Password status which leads to the Forgot Password function doesn't work.
        linkUser(externalIdpUser.userPoolId, externalIdpUser.providerName, createdUser.User.Username, externalIdpUser.providerUserId)
      ])
    } else {
      throw e
    }
  }
}

const buildSignUpFunction = (linkUser, findUser, createUser, setRandomPassword) => async event => signUp(linkUser, findUser, createUser, setRandomPassword, event)

export { buildSignUpFunction }
