# Static Website Sample for Auth Light
These files contain example signup, verify, and login pages that can be deployed to AWS S3 using Static Web Hosting.

:warning: You'll need to replace the Auth Lite API Endpoint URLs with the URLs for your API

For example, consider the AJAX call in `login.html`:

```javascript
// Auth Lite API Call
$.ajax({
    contentType: "application/json",
    type: "POST",
    crossDomain: true,
    // Replace with your API Gateway Endpoint
    url: 'https://jd03xn8ts0.execute-api.us-east-1.amazonaws.com/dev/login',
    data: JSON.stringify(input),
    success: function(response) {
      console.log(response);
      if (!response.login) {
        info.innerHTML = '<b>Not</b> logged in';
      } else {
        info.innerHTML = 'Logged in with email: ' + response.email + '<br>';
      }
    },
    error: function(err) {
      console.error(err);
    }
});
```
