interface Props {
  basePath: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchInput({ basePath, defaultValue, placeholder }: Props) {
  return (
    <form method="GET" action={basePath} className="flex gap-2 mb-6 flex-wrap">
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder ?? "Buscar..."}
        className="flex-1 min-w-[200px] bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-6 py-2 rounded-lg font-semibold transition"
      >
        Buscar
      </button>
      {defaultValue && (
        <a
          href={basePath}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
        >
          Limpiar
        </a>
      )}
    </form>
  );
}
