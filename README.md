# AWS Cognito Federated User Linker

## Overview

Often, the same user has a profile with multiple identity providers (IdPs) connected to your AWS Cognito user pool. Amazon Cognito allows linking these multiple identities to a single user profile, ensuring a seamless experience across different IdPs.

For more details, refer to the AWS documentation: [Cognito User Pools Identity Federation - Consolidate Users](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation-consolidate-users.html).

## Functionality

This Lambda function links user profiles based on their email address. If multiple identity providers (such as Google or Facebook) return the same email, the function ensures they are treated as a single user in Cognito.

### When does linking occur?

- When a user **signs up**.
- When a user **logs in** via a federated identity provider.

## How to Use

1. Deploy this repository as an AWS Lambda function.
2. Set the Lambda function as the **Cognito Pre Sign-Up Trigger**. See the AWS documentation for more details: [Pre Sign-Up Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-sign-up.html).

## Formatting the Code

To ensure consistent code style, run the following command:

```sh
npx standard --fix
```

## License

[MIT](LICENSE)

