import { readExternalIdpUser } from '../lib/readExternalIdpUser.mjs'

const preSignRequestGoogle = {
  version: '1',
  region: 'us-east-1',
  userPoolId: 'us-east-1_a1b2c3d4e',
  userName: 'google_209384756123098457612',
  callerContext: {
    awsSdkVersion: 'aws-sdk-unknown-unknown',
    clientId: '5xyzhud8d6aekdssc4mnopqr67'
  },
  triggerSource: 'PreSignUp_ExternalProvider',
  request: {
    userAttributes: {
      email_verified: 'true',
      'cognito:email_alias': '',
      'cognito:phone_number_alias': '',
      email: 'alex.green@example.com'
    },
    validationData: {}
  },
  response: {
    autoConfirmUser: false,
    autoVerifyEmail: false,
    autoVerifyPhone: false
  }
}

const preSignRequestFacebook = {
  version: '1',
  region: 'us-west-2',
  userPoolId: 'us-west-2_x9y8z7w6v5',
  userName: 'facebook_9182736455647382910',
  callerContext: {
    awsSdkVersion: 'aws-sdk-unknown-unknown',
    clientId: '7abcdhud8d6aekdssc4efghij89'
  },
  triggerSource: 'PreSignUp_ExternalProvider',
  request: {
    userAttributes: {
      email_verified: 'false',
      'cognito:email_alias': '',
      'cognito:phone_number_alias': '',
      email: 'emma.blue@example.net'
    },
    validationData: {}
  },
  response: {
    autoConfirmUser: false,
    autoVerifyEmail: false,
    autoVerifyPhone: false
  }
}

const dataSet = [
  [
    preSignRequestGoogle,
    {
      userPoolId: 'us-east-1_a1b2c3d4e',
      providerName: 'Google',
      providerUserId: '209384756123098457612',
      email: 'alex.green@example.com'
    }
  ],
  [
    preSignRequestFacebook,
    {
      userPoolId: 'us-west-2_x9y8z7w6v5',
      providerName: 'Facebook',
      providerUserId: '9182736455647382910',
      email: 'emma.blue@example.net'
    }
  ]
]

it.each(dataSet)('returns the external idp user', (preSignRequest, externalIdpUser) => {
  const result = readExternalIdpUser(preSignRequest)
  expect(result).toEqual(externalIdpUser)
})
