import useTodo from "../contexts/TodoContext";
import * as _ from "lodash";

function Filter() {
  const { filterValue, filter, search } = useTodo();

  const searching = _.debounce(handleSearch, 800);

  function handleSearch(value: string) {
    search(value);
  }

  return (
    <div className="d-flex flex-column flex-md-row">
      <input
        type="text"
        className="searchFilter flex-grow-1 mr-md-5"
        placeholder="Search"
        onChange={(e) => searching(e.target.value)}
      />
      <div className="mt-2 mt-md-0 d-flex justify-content-between">
        <button
          className={`filterBtn ml-2 ${filterValue == "all" ? "active" : ""}`}
          onClick={() => filter("all")}>
          All
        </button>
        <button
          className={`filterBtn ml-2 ${
            filterValue == "completed" ? "active" : ""
          }`}
          onClick={() => filter("completed")}>
          Completed
        </button>
        <button
          className={`filterBtn ml-2 ${
            filterValue == "incomplete" ? "active" : ""
          }`}
          onClick={() => filter("incomplete")}>
          Incomplete
        </button>
      </div>
    </div>
  );
}

export default Filter;
