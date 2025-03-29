import { AdminSetUserPasswordCommand } from '@aws-sdk/client-cognito-identity-provider'

const setRandomPassword = (cognitoIdentityProviderClient, userPoolId, username) => {
  const input = {
    UserPoolId: userPoolId,
    Username: username,
    Permanent: true,
    Password: generatePassword()
  }
  const command = new AdminSetUserPasswordCommand(input)
  return cognitoIdentityProviderClient.send(command)
}

const generatePassword = () => {
  let password = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789^$*.[]{}()?!@#%&,><:;|_~`=+-'
  for (let i = 1; i <= 16; i++) {
    const char = Math.floor(Math.random() * characters.length + 1)
    password += characters.charAt(char)
  }
  return password
}

const buildSetRandomPasswordFunction = cognitoIdentityProviderClient => (userPoolId, username) => setRandomPassword(cognitoIdentityProviderClient, userPoolId, username)

export { buildSetRandomPasswordFunction }
