import { AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider'

const findUser = (cognitoIdentityProviderClient, userPoolId, email) => {
  const input = {
    UserPoolId: userPoolId,
    Username: email
  }
  const command = new AdminGetUserCommand(input)
  return cognitoIdentityProviderClient.send(command)
}

const buildFindUserFunction = cognitoIdentityProviderClient => (userPoolId, email) => findUser(cognitoIdentityProviderClient, userPoolId, email)

export { buildFindUserFunction }
