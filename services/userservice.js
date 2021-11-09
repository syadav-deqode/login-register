const fs = require('fs')
const path = require('path')

module.exports.addUser = (body) => {
  let returnObj = { error: null, success: null, message: null, users: [], redirectUrl: null }
  // Get the email from body
  const { email } = body
  // Get the file content
  const filePath = path.join(__base, '/users/' + 'users.json').toString()
  const users = fs.readFileSync(filePath, 'utf-8')
  // Will return null if not found
  const parsedUser = this.parseJson(users)
  if (!parsedUser) {
    // Add new user
    let obj = { users: [] };
    obj.users.push({ id: 1, email });
    const stringData = this.stringifyJson(obj)
    this.writeInFile(filePath, stringData)
    const { users } = this.getUsers()
    returnObj = { ...returnObj, success: true, message: "New user added", users, redirectUrl: "/users/list/user-list" }
  } else {
    // Check file have some users or not
    const found_emails = parsedUser.users.filter(v => v.email === email);
    if (found_emails.length <= 0) {
      // Get the last user from users
      const lastUser = parsedUser.users[parsedUser.users.length - 1]
      const id = lastUser.id
      // Add new user object
      const u = { id: id + 1, email }
      parsedUser.users.push(u)
      const stringData = JSON.stringify(parsedUser);
      this.writeInFile(filePath, stringData)
      const { users } = this.getUsers()
      returnObj = { ...returnObj, success: true, message: "New user added", users, redirectUrl: "/users/list/user-list" }
    } else {
      returnObj = { ...returnObj, error: true, message: "Email already in use" }
    }
  }
  return { user: returnObj }
}

module.exports.writeInFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf-8');
  return "Data added"
}

module.exports.parseJson = (stringify) => {
  let result
  try {
    result = JSON.parse(stringify)
  } catch (_) {
    result = null
  }
  return result
}

module.exports.stringifyJson = (json) => {
  let result
  try {
    result = JSON.stringify(json)
  } catch (_) {
    result = null
  }
  return result
}

module.exports.getUsers = () => {
  const filePath = path.join(__base, '/users/' + 'users.json').toString()
  const users = fs.readFileSync(filePath, 'utf-8')
  // Will return null if not found
  const parsedUser = this.parseJson(users)
  return { users: parsedUser }
}

module.exports.loginUser = (body) => {
  let returnObj = { error: null, success: null, message: null, users: [], redirectUrl: null }
  const { email } = body

  const filePath = path.join(__base, '/users/' + 'users.json').toString()
  const users = fs.readFileSync(filePath, 'utf-8')
  // Will return null if not found
  const parsedUser = this.parseJson(users)
  // Filter the id
  const found_user = parsedUser.users.filter(v => v.email == email);

  if (found_user && found_user.length <= 0) {
    returnObj = { ...returnObj, error: true, message: "Requested email not found" }
  } else {
    returnObj = { ...returnObj, success: true, message: "List of users.", users: parsedUser, redirectUrl: "/users/list/user-list" }
  }

  return returnObj
}
