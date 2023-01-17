import { useState } from "react";
// Import third party libraries
import {
  styled,
  Box,
  MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "../../../imports/ui.imports";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../imports/icons.imports";

import "./cabinetDrawer.component.css";

const drawerWidth = 240;

/**
 * Stylization of the box when deployed
 * @param {*} theme - global theme
 */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

/**
 * Styling the box when it is rolled up
 * @param {*} theme - global theme
 */
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

/**
 * Syled drawer component
 */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  zIndex: "2",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/**
 * 
 * @param {*} props Below presents the example of the sections props.
 * 
 * sections = [
  [
    { title: "Item 1", icon: \<InboxIcon \/\> },
    { title: "Item 2", icon: \<MailIcon \/\> },
  ],
  [
    { title: "Item 2.1", icon: \<InboxIcon \/\> },
    { title: "Item 2.2", icon: \<MailIcon \/\> },
    { title: "Item 2.3", icon: \<InboxIcon \/\> },
  ],
];
 * @returns CabinetDrawer component.
 */
export default function CabinetDrawer(props) {
  const { sections, onItemSelect } = props;
  const [open, setOpen] = useState(false);

  /**
   * Handle a chevron button click event.
   */
  const handleDrawerChevronClick = () => {
    setOpen(!open);
  };

  return (
    <Box className="wrapper">
      <Drawer variant="permanent" open={open}>
        <Box className="header">
          <IconButton onClick={handleDrawerChevronClick}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        {sections.length > 0
          ? sections.map((section, index) => (
              <Box key={`section-wrapper-${index}`}>
                <Divider />

                {section.length > 0 ? (
                  <List key={`section-${index}`}>
                    {section.map((item) => (
                      <ListItem
                        key={`${item.title.replace(/ /g, "_")}-${index}`}
                        disablePadding
                        sx={{ display: "block" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          onClick={() => onItemSelect(item.title)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                ) : null}
              </Box>
            ))
          : null}
      </Drawer>
    </Box>
  );
}
