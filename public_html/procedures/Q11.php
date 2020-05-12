 <head>
    <title>Effect of World Wars</title>
 </head>
  <p>
    Because of WWI the 1916 Olympics were cancelled. Similarly, WWII cancelled the 1940 and 1944 Olympics. We compared the countries that medaled in the Olympics prior to the war and those that medaled after to see what toll the war took on the medalist distribution. The table shows all countries that either only medaled prior to the war or after the war, but not in both years. Germany is notably a dominant competitor in the years prior to war, but did not medal in the immediate Olympics after. We also see some new countries able to break into the medals following the war.
</p>
 <body>

<link rel="stylesheet" href="styles.css">

  <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">


 <?php


function outputResultsTableHeader() {
    echo "<tr>";
    echo "<th> Year </th>";
    echo "<th> Country </th>";
    echo "<th> Number of Medals </th>";
    echo "</tr>";
}

include '../open.php';


$war = $_POST['war'];

// PARSE THE STRING


// Call the stored procedure named ShowRawScores
// "multi_query" executes given (multiple-statement) MySQL query
// It returns true if first statement executed successfully; false otherwise.
// Results of first statement are retrieved via $mysqli->store_result()
// from which we can call ->fetch_row() to see successive rows
if ($mysqli->multi_query("CALL Q8('$war');")) {

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
