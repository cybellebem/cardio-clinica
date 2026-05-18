import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

function Table({
  title,
  columns,
  data,
  onSearch,
  onNewClick,
  newButtonText,
  onEdit,
  onDelete,
}) {
  return (
    <section className="table">
      <div className="table-header">
        <h2>{title}</h2>

        <div className="table-actions">
          <button className="search-button" onClick={onSearch}>
            <FaSearch />
            <span>Pesquisar</span>
          </button>

          <button className="new-button" onClick={onNewClick}>
            <FaPlus />
            <span>{newButtonText}</span>
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}

            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.accessor}>{item[column.accessor]}</td>
              ))}

              <td className="table-buttons">
                <button className="edit-button" onClick={() => onEdit(item)}>
                  <FaEdit />
                </button>

                <button
                  className="delete-button"
                  onClick={() => onDelete(item)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;