$( document ).ready(function() {

	if(window.localStorage.getItem('x-access-token')){
		$.ajax({
			  headers: {'x-access-token' : window.localStorage.getItem('x-access-token')},
				  dataType: 'json',
				  type: 'GET',
				  url: '/api/auth/verify',
				  	success: function(data) {
				 		$('#home').show();
			    	},
			    	error: function(data){
			    		$('#login').show();	
			    	}
		});		
	}
	else{
		$('#login').show();	
	}

	function appLogin(){
		$.ajax({
		  headers: {'x-access-token' : window.localStorage.getItem('x-access-token')},
		  dataType: 'json',
		  type: 'GET',
		  url: '/api/auth/login',
		  data: {username: $('#username').val(), password: $('#password').val()},
		  success: function(data) {
        	window.localStorage.setItem('x-access-token', data.token);
        	//alert(window.localStorage.getItem('x-access-token'));
        	$('#login').hide();
        	$('#home').show();
    	  }
		});
	}


	function appLogout(){
		localStorage.removeItem('x-access-token');
		window.location = '/';
	}

	function signup(){
		$('#login').hide();
		$('#signup').show();
	}

	$( "#loginBtn" ).click(function() {
  		appLogin();
	});

	$( "#logoutBtn" ).click(function() {
  		appLogout();
	});

	$( "#signupBtn" ).click(function() {
  		signup();
	});
});