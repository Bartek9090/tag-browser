import CustomizedDataTable from "../components/tableComponent/DataTable";
import "../components/tableComponent/dataTableStyle.css";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/CustomizedDataTable",
  component: CustomizedDataTable,
};

const columns = [
  { field: "name", headerName: "Name" },
  { field: "popular", headerName: "Count" },
];

const Template = (args) => <CustomizedDataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  onSearchAll: action("Search all tags"),
};
