import { useState, useEffect } from "react";
// Import third party libraries
import { Grid, Paper, Typography } from "../../../imports/ui.imports";
// Import custom part components
import { CategoriesTable } from "../../partLevel/index";
// Import services
import CategoryService from "../../../services/category.service";
// Import types and utils
import CategoryDto from "../../../types/dto/category.dto";
import useToken from "../../../utils/hooks/useToken.hook";
import CategoryTypes from "../../../utils/categoryTypes";
import ConflictError from "../../../types/errors/conflict.error";

const _categoryService = new CategoryService();

export default function CategoriesSection() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expendituresCategories, setExpendituresCategories] = useState([]);
  const { token } = useToken();
  const [existingIncomeCategoryNames, setExistingIncomeCategoryNames] =
    useState([]);
  const [
    existingExpendituresCategoryNames,
    setExistingExpendituresCategoryNames,
  ] = useState([]);

  useEffect(() => {
    /**
     * Get income categories from the server and set to the state.
     */
    const setIncomeCategoriesFromServer = async () => {
      const categories =
        await _categoryService.getIncomeCategoriesByUserIdFromApi(token.userId);
      if (categories !== undefined) {
        setIncomeCategories(categories);
      }
    };

    if (incomeCategories.length === 0) {
      setIncomeCategoriesFromServer();
    }
  }, [incomeCategories]);

  useEffect(() => {
    /**
     * Get expense categories from the server and set to the state.
     */
    const setExpendituresCategoriesFromServer = async () => {
      const categories =
        await _categoryService.getExpensesCategoriesByUserIdFromApi(
          token.userId
        );
      if (categories !== undefined) {
        setExpendituresCategories(categories);
      }
    };

    if (expendituresCategories.length === 0) {
      setExpendituresCategoriesFromServer();
    }
  }, [expendituresCategories]);

  /**
   * Handle submit click event from the add new category form.
   * @param {Object} values - data from the add new category form
   * @param {Object} categoryType - type of the category (see CategoryTypes module)
   */
  const handleAddCategorySubmit = async (values, categoryType) => {
    try {
      // Try add new category
      const result = await _categoryService.createNewCategory(
        values.name,
        categoryType.value
      );

      // If new category was created clean up the category list.
      // This is necessary to get the actual categories from the server.
      if (result.id !== null) {
        if (categoryType.value === CategoryTypes.getIncomeType().value) {
          setIncomeCategories([]);
        } else if (
          categoryType.value === CategoryTypes.getExpensesType().value
        ) {
          setExpendituresCategories([]);
        }
      }
    } catch (error) {
      // If creation failed check if the category already exists
      if (error instanceof ConflictError) {
        // add the category name to existingCategoryNames (to reduce the number of requests to the API)
        if (categoryType.value === CategoryTypes.getIncomeType().value) {
          let existing = existingIncomeCategoryNames.slice();
          existing.push(values.name);
          setExistingIncomeCategoryNames(existing);
        } else if (
          categoryType.value === CategoryTypes.getExpensesType().value
        ) {
          let existing = existingExpendituresCategoryNames.slice();
          existing.push(values.name);
          setExistingExpendituresCategoryNames(existing);
        }
      }
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Typography variant="h4">Income categories</Typography>
          <CategoriesTable
            rows={incomeCategories.map((category) => {
              return { name: category.name, records: 1 };
            })}
            onAddCategorySubmit={(values) =>
              handleAddCategorySubmit(values, CategoryTypes.getIncomeType())
            }
            existingCategoryNames={existingIncomeCategoryNames}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Paper>
            <Typography variant="h4">Expenditures categories</Typography>
            <CategoriesTable
              rows={expendituresCategories.map((category) => {
                return { name: category.name, records: 1 };
              })}
              onAddCategorySubmit={(values) =>
                handleAddCategorySubmit(values, CategoryTypes.getExpensesType())
              }
              existingCategoryNames={existingExpendituresCategoryNames}
            />
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
}
