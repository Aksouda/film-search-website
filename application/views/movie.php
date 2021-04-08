<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Grabber</title>
    <link rel="stylesheet" href="<?php echo base_url();?>/css/style.css">
</head>
<body>



<div class="container">
    <div class="heading">
            <h1><a href="index.php"> Movie Grabber</a></h1>
            <form id="search-film">
                <input id="search-word" type="text" name="name" placeholder="search movies...">
                <input id="search-btn" type="submit" name="submit">
            </form>
    </div>

    <div id="search-result"></div>
   
    <div class="films"></div>
        
       
    

</div>



    
</body>
<script src="<?php echo base_url();?>/js/movie.js"></script>
</html>