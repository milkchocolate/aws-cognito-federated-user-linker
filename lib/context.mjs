import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider'
import { readExternalIdpUser } from './readExternalIdpUser.mjs'
import { buildLinkUserFunction } from './linkUser.mjs'
import { buildFindUserFunction } from './findUser.mjs'
import { buildCreateUserFunction } from './createUser.mjs'
import { buildSetRandomPasswordFunction } from './setRandomPassword.mjs'
import { buildSignUpFunction } from './signUp.mjs'
import { buildProcessEventFunction, InvalidUserError } from './processEvent.mjs'

const processEvent = (() => {
  const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({})
  const linkUser = buildLinkUserFunction(cognitoIdentityProviderClient)
  const findUser = buildFindUserFunction(cognitoIdentityProviderClient)
  const createUser = buildCreateUserFunction(cognitoIdentityProviderClient)
  const setRandomPassword = buildSetRandomPasswordFunction(cognitoIdentityProviderClient)
  const signUp = buildSignUpFunction(linkUser, findUser, createUser, setRandomPassword)
  return buildProcessEventFunction(readExternalIdpUser, signUp)
})()

export { processEvent, InvalidUserError }
