import type { Link } from "../api/api";

interface LinkTableProps {
  links: Link[];
  isLoading?: boolean;
  order: string;
  onSort: (newOrder: string) => void;
}

export const LinkTable = ({
  links,
  isLoading = false,
  order,
  onSort,
}: LinkTableProps) => {
  if (isLoading) return <div>Загрузка...</div>;
  if (!links.length) return <div>Ссылок нет</div>;

  const handleHeaderClick = (field: "short" | "target" | "counter") => {
    const isAsc = order.startsWith("asc") && order.includes(field);
    onSort(`${isAsc ? "desc" : "asc"}_${field}`);
  };

  const renderArrow = (field: string) => {
    if (!order.includes(field)) return null;
    return order.startsWith("asc") ? " ↑" : " ↓";
  };

  const handleCopy = (link: string) => {
    const fullUrl = `https://front-test.hex.team/s/${link}`;
    navigator.clipboard.writeText(fullUrl);
    // alert(`Скопировано: ${fullUrl}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <table border={0} cellPadding={5} cellSpacing={10}>
        <thead
          style={{
            cursor: "pointer",
          }}
        >
          <tr>
            <th></th>
            <th onClick={() => handleHeaderClick("short")}>
              Короткая ссылка{renderArrow("short")}
            </th>
            <th onClick={() => handleHeaderClick("target")}>
              Длинная ссылка{renderArrow("target")}
            </th>
            <th onClick={() => handleHeaderClick("counter")}>
              <div style={{ display: "flex" }}>
                <span>Переходы</span>
                <span
                  style={{
                    marginLeft: "2px",
                  }}
                >
                  {renderArrow("counter")}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            const fullUrl = `https://front-test.hex.team/s/${link.short}`;
            return (
              <tr key={link.id}>
                <td>
                  <button
                    style={{
                      padding: "4px",
                      borderRadius: "8px",
                    }}
                    onClick={() => handleCopy(link.short)}
                  >
                    Copy
                  </button>
                </td>
                <td>
                  <a href={fullUrl} target="_blank" rel="noreferrer">
                    {fullUrl}
                  </a>
                </td>
                <td>{link.target}</td>
                <td>{link.counter}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
