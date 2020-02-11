# rcr-attendance-data

## To do list

### Store dates properly
When we fetch events for today, we pass `isToday=true`.  This fails to return correctly as the events are in US/Pacific and the server is in GMT.  I've hacked around this by returning "more than just today" ...the underlying problem is likely that we are storing dates as Javascript Date objects.  It might help to store as timestamp + offset.

### Allow CSV Upload --OR-- connect to Wild Apricot database
See adam for the current CSV importer, which parses the CSV and creates nedb text files.  We should modify this to parse the CSV and create/update records in the db.

Aternatively, we can attempt to interface direclty with the Wild Apricot ("Apex") API.
