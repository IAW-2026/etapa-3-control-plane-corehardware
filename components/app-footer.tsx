export function AppFooter() {
    return (
        <footer className="px-4 sm:px-10 py-6 border-t border-[#D3D2C9] dark:border-[#2A2A26] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-center sm:text-left z-20 relative bg-[#EBEAE3] dark:bg-[#141412]">
            <span className="flex items-baseline gap-2 text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                <span>CoreHardware</span>
                <span aria-hidden="true">·</span>
                <span>Control Plane</span>
            </span>
            <span className="text-xs text-[#5C5E56] dark:text-[#8C8E82]">
                © {new Date().getFullYear()}
            </span>
        </footer>
    )
}