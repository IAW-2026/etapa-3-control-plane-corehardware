import Link from "next/link";

interface Props {
  basePath: string;
  current?: string;
  estados: readonly string[];
}

export default function FiltroEstado({ basePath, current, estados }: Props) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      <Link
        href={basePath}
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
          !current
            ? "bg-cyan-500 text-gray-950 border-cyan-500"
            : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
        }`}
      >
        Todos
      </Link>
      {estados.map((e) => (
        <Link
          key={e}
          href={`${basePath}?estado=${e}`}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
            current === e
              ? "bg-cyan-500 text-gray-950 border-cyan-500"
              : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
          }`}
        >
          {e}
        </Link>
      ))}
    </div>
  );
}
