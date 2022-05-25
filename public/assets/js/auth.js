function login()
{
    var email = $("#signin-email").val();
    var password = $("#signin-password").val();
    $.ajax({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-type":"application/json",
      },
        data: '{"email": "'+email+'", "password": "'+password+'"}'
      }).done((data) => {
        if(data.success == false)
        {
          $("#wrongLogin").html("Wrong email or password");
        }
        else
        {
          localStorage.setItem('auth', data.accessToken);
          window.location.href = "/dashboard";
        }
      });
}
function register()
{
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    $.ajax({
        url: "/auth/register",
        method: "POST",
        headers: {
          "Content-type":"application/json",
      },
        data: '{"email": "'+email+'", "password": "'+password+'"}'
      }).done((data) => {
        if(data.success == false)
        {
          $("#registered").html("Email Already Registered");
        }
        else
        {
          localStorage.setItem('auth', data.accessToken);
          window.location.href = "/dashboard";
        }
      });
}