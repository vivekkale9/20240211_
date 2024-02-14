/**We have to create a database
 * use node to create a Folder which will be = database
 * also create a file which will be = table
 * also create lines which will be = records
 * and perform all the CRUD operations on it
 */
const fs = require("fs");
const path = require("path");

/**This is function to create a database
 * @param {String} Database_Name the name of the database
 * @throws {Error} if there is problem while creating database
 */
function createDB(Database_Name) {
  fs.mkdir(Database_Name, (err) => {
    if (err) {
      console.error("There is some error while creating database", err);
    } else {
      console.log("Database created successfully");
    }
  });
}

/**This is a function to read a database
 * @param {String} Database the database that you want to read
 * @throws {Error} if there is some issue while reading the file
 */
function readDatabase(Database) {
  fs.readdir(Database, (err, files) => {
    if (err) {
      console.error("There was some error while reading the database");
    } else {
      console.log("Database read successfully", files);
    }
  });
}

/**This is a function to update a database
 * @param {String} Database the current name of the database
 * @param {String} newName the new name that you want to keep
 * @throws {Error} when there is some error while updating the database
 */
function updateDB(Database, newName) {
  fs.rename(Database, newName, (err) => {
    if (err) {
      console.error(
        `Error renaming folder '${DBstring}' to '${newNameString}':`,
        err
      );
    } else {
      console.log(
        `Folder '${DBstring}' renamed to '${newNameString}' successfully!`
      );
    }
  });
}

/**This is a function to delete a database
 * @param {String} Database the database that you want to delete
 * @throws {Error} when there is some error while deleting the database
 */
function deleteDatabase(Database) {
  // Delete the database folder
  fs.rmdir(Database, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error deleting database '${DBstring}':`, err);
    } else {
      console.log(`Database '${DBstring}' deleted successfully!`);
    }
  });
}

/**This is a function to create a table in the specified database
 * @param {String} Database the database where you want to create the table
 * @param {String} Table_Name the name of the table you want to create
 * @throws {Error} if there is some error while creating the table
 */
function createTable(Database, Table_Name) {
  // create a path where the table has to be created
  const filePath = path.join(Database, Table_Name);

  fs.writeFile(filePath, "", "utf8", (err) => {
    if (err) {
      console.error(`Error creating table '${filePath}':`, err);
    } else {
      console.log(`Table '${filePath}' created successfully!`);
    }
  });
}

/**Function to read the table
 * @param {String} Database the db in which the table is present
 * @param {String} Table_Name the table that you want to read
 * @throws {Error} when there is some issue while reading the table
 */
function readTable(Database, Table_Name) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Read the content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file '${filePath}':`, err);
    } else {
      console.log(`File '${filePath}' read successfully!`, data);
    }
  });
}

/**Function to update the table
 * @param {String} Database the database that has your folder
 * @param {String} Table_Name the table that you want to update
 * @param {Object} newRecord the new record that you want to add
 * @throws {Error} when there is some error while updating the record
 */
function updateTable(Database, Table_Name, newRecord) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Read the existing content of the file
  fs.readFile(filePath, "utf8", (err, existingRecord) => {
    if (err) {
      console.error(`Error reading file '${filePath}' for update:`, err);
    } else {
      let existingData;

      try {
        // Try parsing existing data as JSON
        existingData = JSON.parse(existingRecord);

        // Check if existingData is an array
        if (!Array.isArray(existingData)) {
          // If not an array, create an array with the existing data
          existingData = [existingData];
        }

        // Add the new record to the array
        existingData.push(newRecord);

        // Convert the updated array to JSON string
        const updatedData = JSON.stringify(existingData, null, 2);

        // Write the updated data to the file
        fs.writeFile(filePath, updatedData, "utf8", (writeErr) => {
          if (writeErr) {
            console.error(`Error updating file '${filePath}':`, writeErr);
          } else {
            console.log(`File '${filePath}' updated successfully!`);
          }
        });
      } catch (parseError) {
        // If parsing fails, assume existingData is not an array
        console.error(`Error parsing JSON in file '${filePath}':`, parseError);
      }
    }
  });
}

/**This is a function to delete a table from a database
 * @param {String} Database the database where the table exists
 * @param {String} Table_Name the name of the table you want to delete
 * @throws {Error} when there is some error while deleting the table
 */
function deleteTable(Database, Table_Name) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Delete the table file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting table '${filePath}':`, err);
    } else {
      console.log(`Table '${filePath}' deleted successfully!`);
    }
  });
}

/**Function to write records in a table
 * @param {String} Database the database that has the table
 * @param {String} Table_Name the table that you want to write the records in
 * @param {Object} record the record that you want to put in the table
 */
function createRecord(Database, Table_Name, record) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Convert JSON objects to a JSON string
  const jsonString = JSON.stringify(record, null, 2); // The third parameter (2) is for indentation

  // Write the JSON string to the file
  fs.writeFile(filePath, jsonString, "utf8", (err) => {
    if (err) {
      console.error(`Error writing record to table '${filePath}':`, err);
    } else {
      console.log(`record written to table '${filePath}' successfully!`);
    }
  });
}

/**Function to read the record
 * @param {String} Database the database that you want to read
 * @param {String} Table_Name the table that you want to read
 * @param {Number} targetId the id of record that you want to read
 * @throws {Error} when there is some error while reading the record
 */
function readRecord(Database, Table_Name, targetId) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, "utf8");
  let dataArray = [];

  try {
    // Try parsing existing data as JSON
    dataArray = JSON.parse(existingData);

    // Check if existingData is an array
    if (!Array.isArray(dataArray)) {
      // If not an array, create an array with the existing data
      dataArray = [dataArray];
    }

    // Find the record with the target ID
    const targetRecord = dataArray.find((item) => item.id === targetId);

    // If the target record is found, log it
    if (targetRecord) {
      console.log(
        `Record with id '${targetId}' found in the '${Table_Name}' table in the '${Database}' database:`,
        targetRecord
      );
    } else {
      console.log(
        `Record with id '${targetId}' not found in the '${Table_Name}' table in the '${Database}' database.`
      );
    }
  } catch (parseError) {
    // If parsing fails, log an error
    console.error(`Error parsing JSON in file '${filePath}':`, parseError);
  }
}

/**Function to update the records
 * @param {String} Database the database that you want to update
 * @param {String} Table_Name the table that you want to update
 * @param {Number} targetId the id of record that you want to update
 * @param {Object} newData the new record to put
 * @throws {Error} when there is some error while creating the record
 */
function updateRecord(Database, Table_Name, targetId, newData) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, "utf8");
  let dataArray = [];

  try {
    // Try parsing existing data as JSON
    dataArray = JSON.parse(existingData);

    // Check if existingData is an array
    if (!Array.isArray(dataArray)) {
      // If not an array, create an array with the existing data
      dataArray = [dataArray];
    }

    // Find the index of the target data based on some identifier (e.g., id)
    const targetIndex = dataArray.findIndex((item) => item.id === targetId);

    // If the target data is found, update it
    if (targetIndex !== -1) {
      dataArray[targetIndex] = { ...dataArray[targetIndex], ...newData };
      // Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), "utf8");
      console.log(
        `Data with id '${targetId}' has been updated in the '${Table_Name}' table in the '${Database}' database.`
      );
    } else {
      console.log(
        `Data with id '${targetId}' not found in the '${Table_Name}' table in the '${Database}' database.`
      );
    }
  } catch (parseError) {
    // If parsing fails, log an error
    console.error(`Error parsing JSON in file '${filePath}':`, parseError);
  }
}

/**This is a function to delete records from a table
 * @param {String} Database the database where the table exists
 * @param {String} Table_Name the name of the table
 * @param {Number} targetId the id of the record you want to delete
 * @throws {Error} when there is some error while deleting the record
 */
function deleteRecord(Database, Table_Name, targetId) {
  // Construct the full path to the file
  const filePath = path.join(Database, Table_Name);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, "utf8");
  let dataArray = [];

  try {
    // Try parsing existing data as JSON
    dataArray = JSON.parse(existingData);

    // Check if existingData is an array
    if (!Array.isArray(dataArray)) {
      // If not an array, create an array with the existing data
      dataArray = [dataArray];
    }

    // Filter out the record to delete
    const updatedData = dataArray.filter((item) => item.id !== targetId);

    // Convert the updated array to JSON string
    const updatedDataString = JSON.stringify(updatedData, null, 2);

    // Write the updated data back to the file
    fs.writeFile(filePath, updatedDataString, "utf8",(err) => {
      if (err) {
        console.error(`Error creating table '${filePath}':`, err);
      } else {
        console.log(`Table '${filePath}' created successfully!`);
      }
    });
    console.log(
      `Record with id '${targetId}' deleted from the '${Table_Name}' table in the '${Database}' database.`
    );
  } catch (parseError) {
    // If parsing fails, log an error
    console.error(`Error parsing JSON in file '${filePath}':`, parseError);
  }
}

// this is a function to call all the functions
function testing() {
  // createDB('new');

  // createTable('new', 'latest.json')

  // // creating a record in json format
  // const record = {
  //     id: 1,
  //     key1: 'vivek',
  //     key2: 'kale',
  //     key3: [1, 2,3],
  //   };
  // createRecord('new','latest.json',record)

  // readDatabase('new')

  // readTable('new','latest.json')

  // updateDB('innovapptive','lol')

  // let newRecord = {key1: 'name'}
  // updateRecord('aspire','employee.json',1,newRecord)
	
  // deleteRecord('innovapptive', 'employee.json', 1);
  readRecord('new','latest.json',1)
}

testing();
