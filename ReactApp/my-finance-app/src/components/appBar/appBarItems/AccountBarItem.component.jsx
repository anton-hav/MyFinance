import { useState } from "react";
// Import icons
import { AccountCircleIcon } from "../../../imports/icons.imports";
// Import third party libraries
import {
  Box,
  Avatar,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "../../../imports/ui.imports";
import { useNavigate } from "../../../imports/navigation.imports";
// Import services
import UserService from "../../../services/user.service";
// Import custom types and utils
import useToken from "../../../utils/hooks/useToken.hook";
import TokenDto from "../../../types/dto/token.dto";

import "./accountBarItem.component.css";

const _userService = new UserService();

const authorizedSettings = ["Dashboard", "Logout"];
const adminSettings = ["Admin panel", ...authorizedSettings];
const nonAuthorizedSettings = ["Login", "Register"];

export default function AccountTools() {
  const { token, setToken } = useToken();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const revokeToken = () => {
    _userService.revokeRefreshToken(token.refreshToken);
  };

  /**
   * Handler for the Logout menu item.
   */
  const handleLogout = () => {
    revokeToken();
    const newToken = new TokenDto();
    setToken(newToken);
  };

  /**
   * Handler for the close menu.
   */
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    let menu = event.target.textContent;
    if (menu === "Logout") {
      handleLogout();
    } else if (menu !== "") {
      navigate(`${menu}/`);
    }
  };

  /**
   * Get menu items depending on the token state of authorization.
   * @returns React component with menu items.
   */
  const getMenuItems = () => {
    let items = [];
    if (token.accessToken !== null) {
      if (token.role === "Admin") {
        items = adminSettings.slice();
      } else {
        items = authorizedSettings.slice();
      }
    } else {
      items = nonAuthorizedSettings.slice();
    }
    return (
      <Box>
        {items.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          {token.accessToken ? (
            <Avatar alt={token.role} src="/static/images/avatar/1.jpg" />
          ) : (
            <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {getMenuItems()}
      </Menu>
    </>
  );
}
