console.log('Loading function');

// dependencies
var AWS = require('aws-sdk');
var crypto = require('crypto');

// Get reference to AWS clients
var dynamodb = new AWS.DynamoDB({ region: process.env.SERVERLESS_REGION });

function computeHash(password, salt, fn) {
	// Bytesize
	var len = 128;
	var iterations = 4096;

	if (3 == arguments.length) {
		crypto.pbkdf2(password, salt, iterations, len, function(err, derivedKey) {
			if (err) return fn(err);
			else fn(null, salt, derivedKey.toString('base64'));
		});
	} else {
		fn = salt;
		crypto.randomBytes(len, function(err, salt) {
			if (err) return fn(err);
			salt = salt.toString('base64');
			computeHash(password, salt, fn);
		});
	}
}

function getUser(email, fn) {
	dynamodb.getItem({
		TableName: process.env.DDB_TABLE,
		Key: {
			email: {
				S: email
			}
		}
	}, function(err, data) {
		if (err) return fn(err);
		else {
			if ('Item' in data) {
				var hash = data.Item.passwordHash.S;
				var salt = data.Item.passwordSalt.S;
				var verified = data.Item.verified.BOOL;
				fn(null, hash, salt, verified);
			} else {
				fn(null, null); // User not found
			}
		}
	});
}

exports.handler = function(event, context) {
	var email = event.email;
	var clearPassword = event.password;

	getUser(email, function(err, correctHash, salt, verified) {
		if (err) {
			context.fail('Error in getUser: ' + err);
		} else {
			if (correctHash == null) {
				// User not found
				console.log('User not found: ' + email);
				context.succeed({
					login: false
				});
			} else if (!verified) {
				// User not verified
				console.log('User not verified: ' + email);
				context.succeed({
					login: false
				});
			} else {
				computeHash(clearPassword, salt, function(err, salt, hash) {
					if (err) {
						context.fail('Error in hash: ' + err);
					} else {
						console.log('correctHash: ' + correctHash + ' hash: ' + hash);
						if (hash == correctHash) {
							// Login ok
							console.log('User logged in: ' + email);
              context.succeed({
                login: true,
                email: event.email,
                token: 'zygqDAi9bxatkEaMfUbSt1wAxOvIFmc33oprfn7G' // Hardcode API key for now
              });
						} else {
							// Login failed
							console.log('User login failed: ' + email);
							context.succeed({
								login: false
							});
						}
					}
				});
			}
		}
	});
}
