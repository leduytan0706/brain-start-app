import Navbar from "../../components/Navbar";

// Navbar layout
export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <main className="font-work-sans">
            <Navbar />
            {children}
        </main>
    )
}