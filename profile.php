<?php
include "db.php";

include "header.php";


                         
?>

<style>

.row-checkout {
  display: -ms-flexbox; 
  display: flex;
  -ms-flex-wrap: wrap; 
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; 
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; 
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%;
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container-checkout {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.checkout-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.checkout-btn:hover {
  background-color: #45a049;
}



hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

@media (max-width: 800px) {
  .row-checkout {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>

					
<section class="section">       
	<div class="container-fluid">
		<div class="row-checkout">
		<?php
		if(isset($_SESSION["uid"])){
			$sql = "SELECT * FROM orders_info WHERE user_id='$_SESSION[uid]'";
			$query = mysqli_query($con,$sql);
			$row=mysqli_fetch_array($query);
		
		echo'
			<div class="col-75">
				<div class="container-checkout">
				<form id="checkout_form" action="checkout_process.php" method="POST" class="was-validated">

					<div class="row-checkout">
					
					<div class="col-50">
						<h3>Profile</h3>
						<label for="fname"><i class="fa fa-user" ></i> Full Name</label>
						<input type="text" id="fname" class="form-control" name="firstname" pattern="^[a-zA-Z ]+$"  value="'.$row["f_name"].' ">
						<label for="email"><i class="fa fa-envelope"></i> Email</label>
						<input type="text" id="email" name="email" class="form-control" pattern="^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9]+(\.[a-z]{2,4})$" value="'.$row["email"].'" required>
						<label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
						<input type="text" id="adr" name="address" class="form-control" value="'.$row["address"].'" required>
						<label for="city"><i class="fa fa-institution"></i> City</label>
						<input type="text" id="city" name="city" class="form-control" value="'.$row["city"].'" pattern="^[a-zA-Z ]+$" required>

					
					
					
					';
				
					
				echo'	
				
				</form>
				</div>
			</div>
			';
		}else{
			echo"<script>window.location.href = 'index.php'</script>";
		}
		?>
<br>
			<div class="col-25">
				<div class="container-checkout">
				
				<?php
				if (isset($_SESSION["uid"])) {
				
				
					echo
					"
					<br>
					<h4>Previous Orders 
					<span class='price' style='color:black'>
					 
					<b></b>
					</span>
				</h4>

					<table class='table table-condensed'>
					<thead><tr>
					
					<th >Product title</th>
					<th >Quantity</th>
					<th >Amount</th></tr>
					</thead>
					<tbody>
					";
					$total=0;
					// while($i<=$total_count){
					//	$sql1="SELECT sum(oo.total_amt) ta from orders_info oo where oo.user_id='$_SESSION[uid]' ";
						//$sql = "SELECT p.product_title, op.qty,op.amt FROM products p JOIN order_products op ON p.product_id=op.product_id JOIN orders_info o ON o.order_id=op.order_id WHERE o.user_id='$_SESSION[uid]' ";
						$sql="SELECT p.product_title, SUM(op.qty) AS qty, SUM(op.amt) AS amt FROM products p JOIN order_products op ON p.product_id=op.product_id 
						JOIN orders_info o ON o.order_id=op.order_id  where o.user_id='$_SESSION[uid]' GROUP BY p.product_title";
						$query = mysqli_query($con,$sql);
					
						while($row=mysqli_fetch_array($query)){
						
						$product_title=$row["product_title"];
						$product_qty=$row["qty"];
						$product_amt=$row["amt"];
						 $total+=$row["amt"];
						echo "	

						<tr><td><p>$product_title</p></td><td ><p>$product_qty</p></td><td ><p>$product_amt</p></td></tr>";
					
						
					}

				echo"

				</tbody>
				</table>
				<hr>
				
				<h3>Total Amount Paid:<span class='price' style='color:black'><b>$total</b></span></h3>";
					
				}
				?>
				</div>
			</div>
		</div>
	</div>
</section>
		<div id="newsletter" class="section">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="newsletter">
							<p>Sign Up for the <strong>NEWSLETTER</strong></p>
							<form >
								<input class="input" type="email" placeholder="Enter Your Email">
								<button class="newsletter-btn"><i class="fa fa-envelope"></i> Subscribe</button>
							</form>
							<ul class="newsletter-follow">
								<li>
									<a href="#"><i class="fa fa-facebook"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-twitter"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-instagram"></i></a>
								</li>
								<li>
									<a href="#"><i class="fa fa-pinterest"></i></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
<?php
include "footer.php";
?>