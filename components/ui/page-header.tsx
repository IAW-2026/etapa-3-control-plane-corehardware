import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface PageHeaderProps {
    breadcrumb: string;
    title: string;
    linkLabel?: string;
    href?: string;
}

export function PageHeader({
    breadcrumb,
    title,
    linkLabel = "Ver en Dashboard",
    href = process.env.NEXT_PUBLIC_ANALYTICS_APP_URL!,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#5C5E56] dark:text-[#8C8E82]">
                    {breadcrumb}
                </span>

                <h1 className="mt-1 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                    {title}
                </h1>
            </div>

            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#5C5E56] transition-colors hover:text-[#C1440E] dark:text-[#8C8E82] dark:hover:text-[#E0662B]"
            >
                {linkLabel}
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
        </div>
    );
}