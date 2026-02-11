import { ReactNode } from "react";
import { Toaster } from "sonner";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-linear-to-br via-custom-sidebar-accent from-custom-sidebar to-emerald-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>
            {children}
            <Toaster theme="light" />
        </div>
    )
}