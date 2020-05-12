 <head>
	<title>Average Age of Athletes</title>
 </head>
 <body>

<link rel="stylesheet" href="styles.css">

  <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">


 <?php


function outputResultsTableHeader() {
    echo "<tr>";
    echo "<th> Country </th>";
    echo "<th> Athlete Name </th>";
    echo "<th> Age </th>";
    echo "<th> Year Competed </th>";
    echo "<th> Sport </th>";
    echo "<th> Event </th>";
    echo "</tr>";
}

include '../open.php';


$sex = $_POST['gender'];
$season = $_POST['season'];
$sport = $_POST['sport'];

// PARSE THE STRING


// Call the stored procedure named ShowRawScores
// "multi_query" executes given (multiple-statement) MySQL query
// It returns true if first statement executed successfully; false otherwise.
// Results of first statement are retrieved via $mysqli->store_result()
// from which we can call ->fetch_row() to see successive rows
if ($mysqli->multi_query("CALL Q13('$sex', '$season', '$sport');")) {

    // Check if a result was returned after the call
    if ($result = $mysqli->store_result()) {

        echo "<table border=\"1px solid black\">";
        $row = $result->fetch_row();

        // If the first row of result begins with 'ERROR: ', then our
        // stored procedure produced a relation that indicates error(s)
        if (strcmp($row[0], 'ERROR: ') == 0) {
            echo "<tr><th> Result </th></tr>";
            do {
                echo "<tr><td>" ;
                for($i = 0; $i < sizeof($row); $i++){
                    echo $row[$i];
                }
                echo "</td></tr>";
            } while ($row = $result->fetch_row());


        // Otherwise, we received real results, so output table
        } else {

            // Output appropriate table header row
            outputResultsTableHeader();
	    
            // Output each row of resulting relation
            do {
                echo "<tr>";
                for($i = 0; $i < sizeof($row); $i++){
                    echo "<td>" . $row[$i] . "</td>";
                }
                echo "</tr>";
            } while($row = $result->fetch_row());
        }

        echo "</table>";
        $result->close();

    }

// The "multi_query" call did not end successfully, so report the error
// This might indicate we've called a stored procedure that does not exist,
// or that database connection is broken
} else {
        printf("<br>Error: %s\n", $mysqli->error);
}

// Close the connection created above by including 'open.php' at top of this file
mysqli_close($mysqli);


 ?>
 </body>
