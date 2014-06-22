<?php
	$SERVER_URL = "http://localhost/ayudaresfacil/api/";
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<title>AyudarEsFácil - Api</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta charset="utf-8">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
</head>
<body>
	<br/>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="jumbotron">
					<h1>AyudarEsFácil - Api</h1>
					<p>Hi! This is the AyudarEsFácil's api documentation.</p> 
					<p>AyudarEsFácil Api is a restfull PHP application. 
						Below you can find the list of available services.</p>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-12">
				
				<!--Service Group-->
				<div class="list-group">
					<a href="#" class="list-group-item active">
						<h4 class="list-group-item-heading">User</h4>
					</a>
					
					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">GetAll</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user <br>
							<strong>Method:</strong> <code>GET</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">GetById</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user?id=1 <br>
							<strong>Method:</strong> <code>GET</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">GetByUsername</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user?username=foo <br>
							<strong>Method:</strong> <code>GET</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">Add</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user <br>
							<strong>Method:</strong> <code>PUT</code> <br>
							<strong>Params:</strong> 
							<code>
							{
								name:'foo',
								username:'bar',
								lastname: 'baz'
							}
							</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">Update</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user <br>
							<strong>Method:</strong> <code>POST</code> <br>
							<strong>Params:</strong> 
							<code>
							{
								name:'foo',
								username:'bar',
								lastname: 'baz'
							}
							</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">DeleteById</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>user?id=1 <br>
							<strong>Method:</strong> DELETE
						</p>
					</a>
				</div>
				<!--End of Service Group-->

				<!--Service Group-->
				<div class="list-group">
					<a href="#" class="list-group-item active">
						<h4 class="list-group-item-heading">Publication</h4>
					</a>
					
					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">GetAll</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>publication <br>
							<strong>Method:</strong> <code>GET</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">GetById</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>publication?id=1 <br>
							<strong>Method:</strong> <code>GET</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">Add</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>publication <br>
							<strong>Method:</strong> <code>PUT</code> <br>
							<strong>Params:</strong> 
							<code>
							{
								name:'foo'
							}
							</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">Update</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>publication <br>
							<strong>Method:</strong> <code>POST</code> <br>
							<strong>Params:</strong> 
							<code>
							{
								name:'foo'
							}
							</code>
						</p>
					</a>

					<a href="#" class="list-group-item">
						<h4 class="list-group-item-heading">DeleteById</h4>
						<p class="list-group-item-text">
							<strong>Url:</strong> <?php echo $SERVER_URL?>publication?id=1 <br>
							<strong>Method:</strong> DELETE
						</p>
					</a>
				</div>
				<!--End of Service Group-->

			</div>
		</div>
	</div>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

	<script>
		$(function(){
			$(".list-group-item").on('click', function(){
				event.preventDefault();
			});
		});
	</script>
</body>
</html>