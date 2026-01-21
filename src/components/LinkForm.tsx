import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { squeezeLink } from "../api/api";

export const LinkForm = ({ order }: { order: string }) => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");

  const mutation = useMutation({
    mutationFn: (link: string) => squeezeLink(link),
    onSuccess: () => {
      // Инвалидируем кэш, чтобы Dashboard обновил список
      queryClient.invalidateQueries({ queryKey: ["statistics", order] });
      setInputValue("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) mutation.mutate(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: "200px",
            height: "30px",
            marginRight: "8px",
            marginTop: "22px",
            paddingLeft: "10px",
            borderRadius: "14px",
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите ссылку"
        />
        <button
          style={{
            width: "100px",
            height: "30px",
            marginRight: "8px",
            marginTop: "8px",
            borderRadius: "14px",
          }}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Сжимаем..." : "Сократить"}
        </button>
      </form>
    </div>
  );
};
