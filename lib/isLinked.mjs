const isLinked = (providerUserId, providerName, cognitoUser) => {
  const attributes = cognitoUser.UserAttributes
  if (!attributes) {
    return false
  }

  const identitiesAttribute = attributes.find(it => it.Name === 'identities')
  if (!identitiesAttribute) {
    return false
  }

  const identitiesString = identitiesAttribute.Value
  if (!identitiesString) {
    return false
  }

  let identities = null
  try {
    identities = JSON.parse(identitiesString)
  } catch {
    return false
  }

  return identities.filter(it => it.userId === providerUserId && it.providerName === providerName).length > 0
}

export { isLinked }
