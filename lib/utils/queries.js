module.exports = {
  GET_ALL: 'SELECT * FROM Users',
  GET_FILTERED_USERS: 'SELECT * FROM Users WHERE {{searchCondition}}',
  GET_USER_BY_ID: 'SELECT * FROM Users WHERE userId = ?',
  INSERT_USER: 'INSERT INTO Users (name, lastName, birthday, dni) VALUES (?,?,?,?)',
  DELETE_USER: 'DELETE FROM Users WHERE userId = ?',
  UPDATE_USER: 'UPDATE Users SET {{modification}} WHERE userId = ?'
}
