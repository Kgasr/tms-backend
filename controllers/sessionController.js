//Validates if session exists 
const checkSession = async (req, res) => {
  try {
    if (req.session && req.session.sessionInfo && req.session.sessionInfo.userId) {
      res.status(200).json({ success: true, message: 'Session is valid', session: req.session});
    }
    else {
      res.status(200).json({ success: false, message: 'Session is invalid'});
    }
  } catch (err) {
    res.status(200).json({ success: false, message: 'Session is invalid'});
  }
}

module.exports = {
    checkSession
}
