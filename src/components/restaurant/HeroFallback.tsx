import heroImage from "@/assets/hero-restaurant.jpg";

export default function HeroFallback({ className = "" }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={heroImage}
                alt=""
                className="h-full w-full object-cover"
                loading="eager"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
    );
}