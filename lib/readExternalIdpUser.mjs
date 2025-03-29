const readExternalIdpUser = (preSignRequest) => {
  const [providerName, providerUserId] = preSignRequest.userName.split('_')
  return {
    userPoolId: preSignRequest.userPoolId,
    providerName: capitalizeWord(providerName),
    providerUserId,
    email: preSignRequest.request.userAttributes.email
  }
}

const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1)

export { readExternalIdpUser }
