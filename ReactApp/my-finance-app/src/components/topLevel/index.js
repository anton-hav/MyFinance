// Wrapper for top-level component imports.
// This file reexports all TopLevel components that can be used in other TopLevel components or in Pages directly.

// IMPORTS ----------------------------------------------------------------
import { CabinetDrawer } from "./cabinetDrawer/CabinetDrawer.component";
import { CategoriesSection } from "./categoriesSection/CategoriesSection.component";
import { SummarySection } from "./summarySection/SummarySection.component";
import { RecordsSection } from "./recordsSection/RecordsSection.component";
import { Login } from "./login/Login.component";
import { Register } from "./register/Register.component";
import { ScheduleSection } from "./scheduleSection/ScheduleSection.component";

// EXPORTS ----------------------------------------------------------------
export {
  CabinetDrawer,
  CategoriesSection,
  SummarySection,
  RecordsSection,
  Login,
  Register,
  ScheduleSection,
};
