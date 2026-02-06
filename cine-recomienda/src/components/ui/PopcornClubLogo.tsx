import { Link } from "react-router-dom"
import { GiPopcorn } from "react-icons/gi"

export const PopcornClubLogo = ({ className = "" }: { className?: string }) => {
    return (
        <Link
        to="/"
        aria-label="Popcorn Club - Go to homepage"
        className={`flex flex-col items-center justify-center mx-auto ${className}`}
        >
        {/* Top decorative line + icon + line */}
        {/* Top lines + icon */}
            <div className="flex items-center gap-3">
                <div className="h-[2px] bg-[#F472B6] w-8 rounded-full" />

                <GiPopcorn
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    style={{ color: "#F472B6" }}
                />

                <div className="h-[2px] bg-[#F472B6] w-8 rounded-full" />
            </div>


            {/* POPCORN */}
            <span
                className="text-lg sm:text-2xl font-bold leading-none"
                style={{
                color: "#ffffff",
                textShadow: `
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px  1px 0 #000,
                1px  1px 0 #000,
                0 3px 0 #38BDF8`,
                fontFamily: "'Poppins', sans-serif",
                }}
            >
                Popcorn
            </span>

            {/* CLUB */}
            <span
                className="mt-1 mb-1 text-xs sm:text-sm font-semibold uppercase tracking-widest leading-none"
                style={{
                color: "#ffffff",
                textShadow: `
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px  1px 0 #000,
                1px  1px 0 #000,
                0 3px 0 #F472B6`,
                fontFamily: "'Poppins', sans-serif",
                }}
            >
                Club
            </span>
        </Link>
    )
}