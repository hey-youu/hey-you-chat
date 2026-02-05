import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  fallback?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const Avatar = ({
  src,
  alt,
  size = "md",
  isOnline,
  fallback,
  className,
}: AvatarProps) => {
  const initials = fallback || alt.charAt(0).toUpperCase();

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full bg-soft flex items-center justify-center overflow-hidden",
          sizeClasses[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-heading font-semibold text-primary">
            {initials}
          </span>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface",
            isOnline ? "bg-mint" : "bg-muted"
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
