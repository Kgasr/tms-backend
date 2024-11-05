const loginService = require("../services/loginService")

// Validates user credentials and stores session info
const login = async (req, res) => {
  try {
    if (!req && !req.data && (!req.data.userId || !req.data.password)) {
      return res.status(400).json({ message: 'UserId and Password are required' });
    }
    const result = await loginService.login(req.body);
    if (result && result.recordset) {
      isAuthenticated = result.recordset[0]['Authenticated'] == 1 ? true : false;

      if (isAuthenticated) {
        const sessionInfo = {
          userId: result.recordset[0]['UserId'],
          roleId: result.recordset[0]['RoleId'],
          pic: result.recordset[0]['Pic']
        }
        req.session.sessionInfo = sessionInfo;
        res.status(200).json({ auth: true, message: 'Login successful', session: req.session });
      } else {
        res.status(401).json({ auth: false, message: 'Invalid credentials' });
      }
    }
    else {
      res.status(401).json({ auth: false, message: 'Login unsuccessful' });
    }
  } catch (err) {
    res.status(500).json({ auth: false, message: 'Failed to validate user : ', error: err.message });
  }
}


module.exports = { login };
