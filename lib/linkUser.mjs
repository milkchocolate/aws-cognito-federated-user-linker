import { AdminLinkProviderForUserCommand } from '@aws-sdk/client-cognito-identity-provider'

const linkUser = (cognitoIdentityProviderClient, userPoolId, providerName, destinationUser, sourceUser) => {
  const input = {
    UserPoolId: userPoolId,
    DestinationUser: {
      ProviderName: 'Cognito',
      ProviderAttributeValue: destinationUser
    },
    SourceUser: {
      ProviderName: providerName,
      ProviderAttributeName: 'Cognito_Subject',
      ProviderAttributeValue: sourceUser
    }
  }
  const command = new AdminLinkProviderForUserCommand(input)
  return cognitoIdentityProviderClient.send(command)
}

const buildLinkUserFunction = cognitoIdentityProviderClient => (userPoolId, providerName, destinationUser, sourceUser) => linkUser(cognitoIdentityProviderClient, userPoolId, providerName, destinationUser, sourceUser)

export { buildLinkUserFunction }
