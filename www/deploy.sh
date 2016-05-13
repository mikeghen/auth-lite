#!./bin/bash
# Sample command to deploy static web pages to S3
#
# Usage: Set up a bucket in S3 for static webhosting. Replace S3_BUCKET with the
# name of that bucket then replace PROFILE with the AWS CLI profile you're using
# for your Serverless project (see `admin.env` for your profile(s)).

S3_BUCKET=path-to-static-webhosting-bucket
PROFILE=my-profile

aws s3 sync . s3://$S3_BUCKET/ --profile $PROFILE
