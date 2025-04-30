import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useEffect, useState } from "react";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";

import fileSvg from "../assets/file.svg";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
  name: z.string().min(2, "Informe um nome claro para sua solicitação"),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  amount: z.coerce
    .number({ message: "Informe um valor válido" })
    .positive("Informe um valor válido"),
});

export function Refund() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true)

      if (!fileName) {
        return alert("Selecione um comprovante");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", fileName);

      const response = await api.post("/uploads", fileUploadForm)

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      })

      await api.post("/refunds", {
        ...data, filename: response.data.filename
      })

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if(error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message) 
      }

      alert("Ocorreu um erro inesperado, tente novamente mais tarde");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRefund(id: string) {
    try {
      const response = await api.get<RefundAPIResponse>(`/refunds/${id}`)

      setName(response.data.name);
      setCategory(response.data.category);
      setAmount(formatCurrency(response.data.amount));
      setFileURL(response.data.filename);
    } catch (error) {
      console.log(error);

      if(error instanceof AxiosError) {
        alert(error.response?.data.message)
      }

      alert("Não foi possível carregar a solicitação")
      
    }
  }

  useEffect(() => {
    if(params.id) {
      fetchRefund(params.id)
    }
  },[params.id])

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

      {params.id && fileURL ? (
        <a
          href={`https://refundapi.onrender.com/uploads/${fileURL}`}
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
