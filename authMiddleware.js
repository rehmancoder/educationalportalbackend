export const authMiddleware = (req, res, next) => {
    console.log("auth middleware executed");
  
    const authToken = req.headers.authtoken;
    console.log("auth middleware token:", authToken);
  
    // Paths that do not require authentication
    const openPaths = ['/api/user/login','http://localhost:3001/api/user\//', /^\/api\/user\//, /^\/api\/student\//];
    const isPathOpen = openPaths.some(path => typeof path === 'string' ? req.path === path : path.test(req.path));
  
    if (isPathOpen) {
      return next();
    }
  
    // User should not be able to access 
    if (authToken && req.path === 'http://localhost:3000/teacher') {
      return res.redirect('http://localhost:3000/teacher/teacherprofile');
    }
  
    // // User without a token should not be able to access
    // if (!authToken && req.path === 'http://localhost:3000/teacher/teacherprofile') {
    //   return res.redirect('http://localhost:3000/teacher');
    // }
  
    // Protected routes
    if (!authToken) {
      if (req.path.startsWith('http://localhost:3000/api')) {
        return res.status(401).json({
          message: "Access Denied!!",
          success: false
        });
      }
      return res.redirect('/teacher');
    }
  
    next();
  };