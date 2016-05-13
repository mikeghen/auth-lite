# Sample Serverless `_meta` Directory

This is a sample directory that demonstrates how to configure auth-lite for your needs.

## `_meta` Directory?

I suggest familiarizing yourself with [Serverless's Documentation](http://docs.serverless.com/). specifically, check out what the `_meta` directory is for.

## How to configure auth-lite
Open up the `variables/s-variables-dev.json` and replace the variables with your own values.

`DDB_TABLE`: DynamoDB table to store authentication information
:warning: You'll need to create this table manually until it's automated. Just create a DynamoDB table with a hash key `email` that is a string.
`EXTERNAL_NAME`: The name exposed to user authenticating through auth-lite
`EMAIL_SOURCE`: The email to use to send confirmation emails
`VERIFICATION_PAGE`: The page where users can verify their email address. See `www` for demo authentication pages.
