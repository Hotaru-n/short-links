import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../api/api";
import type { Link } from "../api/api";
import { LinkForm } from "../components/LinkForm";
import { LinkTable } from "../components/LinkTable";

export const DashboardTable = () => {
  const [order, setOrder] = useState<string>("asc_short");
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const { data, isLoading } = useQuery<
    { data: Link[]; total: number },
    unknown
  >({
    queryKey: ["statistics", order, offset, limit],
    queryFn: () => getStatistics(order, offset, limit),
  });

  const links: Link[] = data?.data || [];
  const total: number = data?.total || 0;

  return (
    <div>
      <div
        style={{
          marginLeft: "30px",
        }}
      >
        <h2>Dashboard</h2>
        <button
          className="default-button"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          logout
        </button>
        <LinkForm order={order} />
      </div>
      <div
        style={{
          minWidth: "800px",
          marginTop: "30px",
          padding: "20px",
          borderRadius: "14px",
          backgroundColor: "#1f1e33",
        }}
      >
        <div>
          <LinkTable
            links={links}
            isLoading={isLoading}
            order={order}
            onSort={setOrder}
          />
        </div>
      </div>
      <div
        style={{
          margin: "20px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="pagination-button"
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          ◀
        </button>
        <span style={{ margin: "0 10px" }}>
          {offset + 1} - {Math.min(offset + limit, total)} из {total}
        </span>
        <button
          className="pagination-button"
          onClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= total}
        >
          ▶
        </button>
      </div>
    </div>
  );
};
