import { AdminCreateUserCommand, MessageActionType } from '@aws-sdk/client-cognito-identity-provider'

const createUser = (cognitoIdentityProviderClient, userPoolId, email) => {
  const input = {
    UserPoolId: userPoolId,
    Username: email,
    MessageAction: MessageActionType.SUPPRESS,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'email_verified', Value: 'true' }
    ]
  }
  const command = new AdminCreateUserCommand(input)
  return cognitoIdentityProviderClient.send(command)
}

const buildCreateUserFunction = cognitoIdentityProviderClient => (userPoolId, email) => createUser(cognitoIdentityProviderClient, userPoolId, email)

export { buildCreateUserFunction }
