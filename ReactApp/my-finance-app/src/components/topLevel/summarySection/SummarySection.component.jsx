import { useEffect, useState } from "react";
// Import third party libraries
import { Typography, Grid, Masonry, Paper } from "../../../imports/ui.imports";
import { dayjs } from "../../../imports/utils.import";
// Import custom part-level components
import {
  PieChartCategory,
  BarChartCategory,
  ColumnChartRecord,
  SelectPeriodForRecords,
} from "../../partLevel/index";
// Import services
import RecordService from "../../../services/record.service";
import CategoryService from "../../../services/category.service";
// Import custom types and utils
import CategoryInPieChartViewModel from "../../../types/model/view/categoryInPieChartView.model";
import CategoryTypes from "../../../utils/categoryTypes";
import { formatter } from "../../../utils/formatter";
import RecordStatus from "../../../utils/recordStatus.utils";
import RecordAmountInColumnViewModel from "../../../types/model/view/recordAmountInColumnView.model";
import Periods from "../../../utils/periods.utils";

//#region LOCAL UTILS

const _recordService = new RecordService();
const _categoryService = new CategoryService();

/**
 * Get the records count specified by category id from the storage via API
 * @param {string} categoryId - category unique identifier
 * @returns count of records specified by category id
 */
const getRecordsCountByCategoryId = async (categoryId) => {
  const count = await _recordService.getRecordsCountBySearchParametersFromApi({
    categoryId: categoryId,
    recordStatus: RecordStatus.getApprovedStatus().value,
  });
  return count;
};

/**
 * Get category with records count for the pie chart component
 * @param {array} dtos - array of CategoryDto
 * @returns category view models as an array of CategoryInPieChartViewModel
 */
const getCategoryWithRecordsCountViewModels = async (dtos) => {
  const models = await Promise.all(
    dtos.map(async (dto) => {
      const count = await getRecordsCountByCategoryId(dto.id);
      let model = CategoryInPieChartViewModel.fromCategoryDto(dto);
      model.value = count;
      return model;
    })
  );

  return models;
};

/**
 * Get the amount of records specified by category id from the storage via API
 * @param {string} categoryId - category unique identifier
 * @returns amount of records specified by category id
 */
const getRecordsAmountByCategoryId = async (categoryId) => {
  const count = await _recordService.getRecordsAmountBySearchParametersFromApi({
    categoryId: categoryId,
    recordStatus: RecordStatus.getApprovedStatus().value,
  });
  return count;
};

/**
 * Get the amount of records specified by date interval from the storage via API
 * @param {*} dateFrom - start of the date interval
 * @param {*} dateTo - end of the date interval
 * @param {CategoryType} type - type of the record category
 * @returns amount of records specified by parameters.
 */
const getRecordsAmountByDateIntervalAndRecordType = async ({
  dateFrom,
  dateTo,
  type,
}) => {
  const count = await _recordService.getRecordsAmountBySearchParametersFromApi({
    dateFrom: dateFrom,
    dateTo: dateTo,
    recordStatus: RecordStatus.getApprovedStatus().value,
    categoryType: type,
  });
  return count;
};

/**
 * Get category with the amount of records for the pie chart component
 * @param {array} dtos - array of CategoryDto
 * @returns category view models as an array of CategoryInPieChartViewModel
 */
const getCategoryWithRecordsAmountViewModels = async (dtos) => {
  const models = await Promise.all(
    dtos.map(async (dto) => {
      const amount = await getRecordsAmountByCategoryId(dto.id);
      let model = CategoryInPieChartViewModel.fromCategoryDto(dto);
      model.value = amount;
      return model;
    })
  );

  return models;
};

/**
 * Get amount of records by date interval
 * @param {*} startData - date from
 * @param {*} endData - date to
 * @param {CategoryTypes} type - type of the record category
 * @returns models as an array of RecordAmountInColumnViewModel
 */
const getDailyRecordAmountViewModelsByDateIntervalAndType = async (
  startData,
  endData,
  type
) => {
  const models = [];
  let tempData = startData;
  while (tempData < endData) {
    const amount = await getRecordsAmountByDateIntervalAndRecordType({
      dateFrom: tempData.startOf("date"),
      dateTo: tempData.endOf("date"),
      type: type,
    });
    let model = new RecordAmountInColumnViewModel(
      type.typeName,
      tempData.format("DD"),
      amount
    );
    models.push(model);
    tempData = tempData.add(1, "day");
  }

  return models;
};

/**
 * Format the number price to local currency
 * @param {*} plannedTransaction
 * @returns
 */
function priceFormatter(value) {
  return value.category.type === 0
    ? `+ ${formatter.format(value)}`
    : `- ${formatter.format(value)}`;
}

//#endregion LOCAL UTILS

export function SummarySection() {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);
  // States for pie chart of the income records counts
  const [incomePieChartModels, setIncomePieChartModels] = useState([]);
  // States for pie chart of the expenses records counts
  const [expensesPieChartModels, setExpensesPieChartModels] = useState([]);
  // States for pie chart of the amount of the income records
  const [pieChartIncomeAmountsModels, setPieChartIncomeAmountsModels] =
    useState([]);
  // States for pie chart of the amount of the expense records
  const [pieChartExpenseAmountsModels, setPieChartExpenseAmountsModels] =
    useState([]);
  // States for clolumn chart of the daily transactions amount
  const [dailyTransactionAmounts, setDailyTransactionAmounts] = useState([]);
  const [columnChartPeriod, setColumnChartPeriod] = useState(
    Periods.getPeriodNameByDefault()
  );

  //#region COMMON FUNCTIONS

  /**
   * Use effect that uploads categories from the database
   */
  useEffect(() => {
    /**
     * Get income categories from the database
     */
    const getIncomeCategoriesFromStorage = async () => {
      const data = await _categoryService.getIncomeCategoriesFromApi();
      setIncomeCategories(data);
    };

    /**
     * Get expense categories from the database
     */
    const getExpensesCategoriesFromStorage = async () => {
      const data = await _categoryService.getExpensesCategoriesFromApi();
      setExpensesCategories(data);
    };

    if (incomeCategories.length === 0) {
      getIncomeCategoriesFromStorage();
    }
    if (expensesCategories.length === 0) {
      getExpensesCategoriesFromStorage();
    }
  }, []);

  //#endregion COMMON FUNCTIONS

  //#region PIE CHART FOR COUNT OF INCOME RECORDS
  useEffect(() => {
    /**
     * Get income categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getIncomeCategoriesFromApi = async (dtos) => {
      const data = await getCategoryWithRecordsCountViewModels(dtos);
      const models = data.filter((model) => model.value !== 0);
      setIncomePieChartModels(models);
    };

    getIncomeCategoriesFromApi(incomeCategories);
  }, [incomeCategories]);

  //#endregion PIE CHART FOR COUNT OF INCOME RECORDS

  //#region PIE CHART FOR COUNT OF EXPENSES RECORDS

  useEffect(() => {
    /**
     * Get expenses categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getExpensesCategoriesFromApi = async (dtos) => {
      const data = await getCategoryWithRecordsCountViewModels(dtos);
      const models = data.filter((model) => model.value !== 0);
      setExpensesPieChartModels(models);
    };

    getExpensesCategoriesFromApi(expensesCategories);
  }, [expensesCategories]);
  //#endregion PIE CHART FOR COUNT OF EXPENSES RECORDS

  //#region PIE CHART FOR AMOUNT OF INCOME RECORDS
  useEffect(() => {
    /**
     * Get income categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getModels = async (dtos) => {
      const data = await getCategoryWithRecordsAmountViewModels(dtos);
      const models = data.filter((model) => model.value !== 0);
      setPieChartIncomeAmountsModels(models);
    };

    getModels(incomeCategories);
  }, [incomeCategories]);

  //#endregion PIE CHART FOR AMOUNT OF INCOME RECORDS

  //#region PIE CHART FOR AMOUNT OF EXPENSES RECORDS

  useEffect(() => {
    /**
     * Get expenses categories view models through API
     * @param {array} dtos - array of the CategoryDto objects
     */
    const getModels = async (dtos) => {
      const data = await getCategoryWithRecordsAmountViewModels(dtos);
      const models = data.filter((model) => model.value !== 0);
      setPieChartExpenseAmountsModels(models);
    };

    getModels(expensesCategories);
  }, [expensesCategories]);
  //#endregion PIE CHART FOR AMOUNT OF EXPENSES RECORDS

  //#region COLUMN CHART FOR DAILY TRANSACTION AMOUNT

  useEffect(() => {
    const getModels = async () => {
      // const firstDayOfMonth = dayjs().startOf("month");
      // const lastDayOfMonth = dayjs().endOf("month");
      const [firstDayOfMonth, lastDayOfMonth] =
        Periods.convertPeriodNameToSearchParameters(columnChartPeriod);
      const incomeModels =
        await getDailyRecordAmountViewModelsByDateIntervalAndType(
          firstDayOfMonth,
          lastDayOfMonth,
          CategoryTypes.getIncomeType()
        );
      const expenseModels =
        await getDailyRecordAmountViewModelsByDateIntervalAndType(
          firstDayOfMonth,
          lastDayOfMonth,
          CategoryTypes.getExpensesType()
        );

      const models = [...incomeModels, ...expenseModels];
      setDailyTransactionAmounts(models);
    };

    getModels();
  }, [columnChartPeriod]);

  //#endregion COLUMN CHART FOR DAILY TRANSACTION AMOUNT

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1, mb: 2 }}>
            <Typography variant="h1">Records panel</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Masonry columns={4} spacing={2}>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Number of income records</Typography>
              <Typography variant="body1">
                This chart shows the number of records for each of the income
                categories. Categories without entries are not shown.
              </Typography>
              <BarChartCategory data={incomePieChartModels} />
            </Paper>

            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Number of expense records</Typography>
              <Typography variant="body1">
                This chart shows the number of records for each of the expense
                categories. Categories without entries are not shown.
              </Typography>
              <BarChartCategory data={expensesPieChartModels} />
            </Paper>

            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Amount of income records</Typography>
              <Typography variant="body1">
                This chart shows the amount of records for each of the income
                categories. Categories without entries are not shown.
              </Typography>
              <PieChartCategory data={pieChartIncomeAmountsModels} />
            </Paper>

            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Amount of expense records</Typography>
              <Typography variant="body1">
                This chart shows the amount of records for each of the expense
                categories. Categories without entries are not shown.
              </Typography>
              <PieChartCategory data={pieChartExpenseAmountsModels} />
            </Paper>
          </Masonry>

          <Masonry columns={2} spacing={2}>
            <Paper sx={{ padding: 1 }}>
              <Typography variant="h2">Transaction chart</Typography>
              <Typography variant="body1">
                This graph shows the total inflow and outflow for each day for
                the selected period.
              </Typography>
              <SelectPeriodForRecords
                periods={Periods.getPeriodsAsArrayOfString()}
                period={columnChartPeriod}
                onChange={(value) => setColumnChartPeriod(value)}
              />
              <ColumnChartRecord data={dailyTransactionAmounts} />
            </Paper>
          </Masonry>
        </Grid>
      </Grid>
    </>
  );
}
