"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn } from "@clerk/nextjs";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/usuarios", label: "Usuarios" },
  { href: "/operadores", label: "Operadores" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/envios", label: "Envíos" },
  { href: "/pagos", label: "Pagos" },
  { href: "/disputas", label: "Disputas" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <SignedIn>
      <nav className="bg-gray-900 border-b border-cyan-900 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛰️</span>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-white">CONTROL</span>
              <span className="text-cyan-400">PLANE</span>
            </span>
          </Link>
          <div className="flex gap-5">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${
                  pathname === link.href
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <UserButton />
      </nav>
    </SignedIn>
  );
}
