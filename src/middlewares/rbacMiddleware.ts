import { Request, Response, NextFunction } from "express"
import { Role } from '../models/role';
import { Permissions } from '../models/permissions';
import { CustomRequest } from "./authMiddleware";

// Check if the user has the required permission for a route
exports.checkPermission = (permission: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {

    //we use req.user from the authMiddleware so that we can get our user as
    //{email ,role}
    const userRole = req.user ? req.user.role : 'anonymous';
    const userPermissions = new Permissions().getPermissionsByRoleName(userRole);

    if (userPermissions.includes(permission)) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
};
