import { useState } from "react";
// Import third party libraries
import { CategoryIcon, SummarizeIcon } from "../imports/icons.imports";
import { Box } from "../imports/ui.imports";

// Import custom components
import CabinetDrawer from "../components/topLevel/cabinetDrawer/CabinetDrawer.component";
import SummarySection from "../components/topLevel/summarySection/SummarySection.component";
import CategoriesSection from "../components/topLevel/categoriesSection/CategoriesSection.component";

import "./cabinet.page.css";

const sections = [
  [
    {
      title: "Summary",
      icon: <SummarizeIcon />,
      component: <SummarySection />,
    },
  ],
  [
    {
      title: "Categories",
      icon: <CategoryIcon />,
      component: <CategoriesSection />,
    },
  ],
];

export default function CabinetPage() {
  const [selectedSection, setSelectedSection] = useState();

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
