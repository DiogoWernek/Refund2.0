import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Input } from "../components/input";
import { Select } from "../components/Select";
import { useState } from "react";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";

import fileSvg from "../assets/file.svg";

export function Refund() {
  const [name, setName] = useState("Teste");
  const [amount, setAmount] = useState("23");
  const [category, setCategory] = useState("transport");
  const [isloading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    navigate("/confirm", { state: { fromSubmit: true } });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-2-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          legend="Valor"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>

      {params.id ? (
        <a
          href="https://www.instagram.com/dioggo.wernek/"
          target="_blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone do arquivo" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={fileName && fileName.name}
          onChange={(e) => e.target.files && setFileName(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isloading}>
        {params.id ? "Voltar" : "Enviar"}
      </Button>
    </form>
  );
}
