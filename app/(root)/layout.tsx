import Navbar from "../../components/Navbar";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

// Navbar layout
export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <main className="font-work-sans">
            <Navbar />
            {children}
            <SanityLive />
        </main>
    )
}