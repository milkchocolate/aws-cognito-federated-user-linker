import { isLinked } from '../lib/isLinked.mjs'

const cognitoUser = {
  $metadata: {
    httpStatusCode: 200,
    requestId: 'a1b2c3d4-5678-9101-1121-314151617181',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Enabled: true,
  UserAttributes: [
    { Name: 'sub', Value: '12345678-90ab-cdef-1234-567890abcdef' },
    {
      Name: 'identities',
      Value: '[{"userId":"98765432101234567890","providerName":"Facebook","providerType":"Facebook","issuer":null,"primary":false,"dateCreated":1824098349210}]'
    },
    { Name: 'email_verified', Value: 'true' },
    { Name: 'email', Value: 'peterparker@dailybugle.com' }
  ],
  UserCreateDate: '2025-04-15T10:30:00.000Z',
  UserLastModifiedDate: '2025-04-16T12:45:00.000Z',
  UserStatus: 'CONFIRMED',
  Username: '12345678-90ab-cdef-1234-567890abcdef'
}

describe('when the idp user is linked to the cognito user', () => {
  const providerUserId = '98765432101234567890'
  const providerName = 'Facebook'

  it('returns true', () => {
    const result = isLinked(providerUserId, providerName, cognitoUser)
    expect(result).toEqual(true)
  })
})

describe('when the idp user is not linked to the cognito user', () => {
  const dataSet = [['22222222222222222222', 'Facebook'], ['98765432101234567890', 'Twitter']]

  it.each(dataSet)('returns false', (providerUserId, providerName) => {
    const result = isLinked(providerUserId, providerName, cognitoUser)
    expect(result).toEqual(false)
  })
})
