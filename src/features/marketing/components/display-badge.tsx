import { cn } from "@/lib/utils";

interface DisplayBadgeProps {
    title: string;
    variant?: "default" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    icon?: React.ReactNode;
}

export default function DisplayBadge({ 
    title, 
    variant = "default", 
    size = "md",
    className,
    icon 
}: DisplayBadgeProps) {
    const baseClasses = "group mx-auto flex w-fit items-center rounded-full border shadow-md transition-all duration-300";
    
    const variantClasses = {
        default: "bg-muted hover:bg-background border-border shadow-zinc-950/5 dark:border-t-white/5 dark:shadow-zinc-950 dark:hover:border-t-border",
        secondary: "bg-secondary hover:bg-secondary/80 border-secondary-foreground/20 text-secondary-foreground",
        outline: "bg-transparent hover:bg-accent border-border hover:border-accent-foreground/50"
    };
    
    const sizeClasses = {
        sm: "px-3 py-1.5 gap-2 text-xs",
        md: "px-4 py-2 gap-3 text-sm", 
        lg: "px-6 py-3 gap-4 text-base"
    };

    return (
        <div 
            className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            role="status"
            aria-label={`Badge: ${title}`}
        >
            {icon && (
                <span className="flex-shrink-0" aria-hidden="true">
                    {icon}
                </span>
            )}
            <span className="font-medium text-foreground">
                {title}
            </span>
        </div>
    );
}
