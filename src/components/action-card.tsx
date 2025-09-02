'use client';

import { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actionCardVariants = cva(
  "grid grid-rows-[auto_1fr_auto] h-full",
  {
    variants: {
      size: {
        sm: "col-span-1",
        md: "md:col-span-2", 
        lg: "md:col-span-2 lg:col-span-3",
        xl: "md:col-span-2 lg:col-span-4"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
);

interface ActionCardProps extends VariantProps<typeof actionCardVariants> {
  // Content
  icon?: ReactNode;
  title: string;
  description?: string;
  content?: ReactNode;
  
  // Button
  buttonText: string;
  onButtonClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  
  // Layout
  className?: string;
}

export function ActionCard({
  icon, 
  title, 
  description, 
  content,
  buttonText, 
  onButtonClick, 
  disabled, 
  loading, 
  variant = 'default',
  size = 'sm', 
  className
}: ActionCardProps) {
  return (
    <Card className={cn(actionCardVariants({ size }), className)}>
      <CardHeader>
        {icon ? (
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle>{title}</CardTitle>
          </div>
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      {content && <CardContent>{content}</CardContent>}
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onButtonClick}
          disabled={disabled || loading}
          variant={variant}
        >
          {loading ? 'Loading...' : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}