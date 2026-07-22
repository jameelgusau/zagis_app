import { ModeToggle } from "@/components/mode-toggle";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <div className='absolute right-1.5 top-1.5 '>
        <ModeToggle />
    </div>{children}</section>
}