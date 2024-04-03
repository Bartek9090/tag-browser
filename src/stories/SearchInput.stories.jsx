import SearchInput from "../components/homeCompoments/SearchInput";
import { action } from "@storybook/addon-actions";
import "../components/homeCompoments/SearchInputStyle.css";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {},
  argsTypes: {},
};

export const Default = () => (
  <SearchInput onSearchAll={action("Search all tags")}>
    <div className="tagContainer">
      <div className="tagRow">
        <p className="tag">Tag: Example Tag</p>
        <p className="count">Count: 5</p>
      </div>
    </div>
  </SearchInput>
);
