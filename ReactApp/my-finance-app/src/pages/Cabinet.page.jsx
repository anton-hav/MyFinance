import { useState } from "react";
// Import third party libraries
import {
  CategoryIcon,
  SummarizeIcon,
  PointOfSaleIcon,
  ScheduleIcon,
} from "../imports/icons.imports";
import { Box } from "../imports/ui.imports";

// Import custom components
import {
  CabinetDrawer,
  CategoriesSection,
  SummarySection,
  RecordsSection,
  ScheduleSection,
} from "../components/topLevel/index";

import "./cabinet.page.css";

const sections = [
  [
    {
      title: "Summary",
      icon: <SummarizeIcon />,
      component: <SummarySection />,
    },
    {
      title: "Records",
      icon: <PointOfSaleIcon />,
      component: <RecordsSection />,
    },
  ],
  [
    {
      title: "Schedule",
      icon: <ScheduleIcon />,
      component: <ScheduleSection />,
    },
    {
      title: "Categories",
      icon: <CategoryIcon />,
      component: <CategoriesSection />,
    },
  ],
];

export default function CabinetPage() {
  const [selectedSection, setSelectedSection] = useState("Summary");

  const handleDrawerItemSelect = (itemTitle) => {
    setSelectedSection(itemTitle);
  };

  const Section = () => {
    const selected = sections.reduce((result, section) => {
      const item = section.find((section) => section.title === selectedSection);
      if (item) result = item;
      return result;
    }, null);
    const component = selected.component;
    return component;
  };

  return (
    <>
      <Box className="cabinet-wrapper">
        <CabinetDrawer
          sections={sections}
          onItemSelect={handleDrawerItemSelect}
        />
        <Box className="container" component="main">
          {selectedSection ? <Section /> : null}
        </Box>
      </Box>
    </>
  );
}
