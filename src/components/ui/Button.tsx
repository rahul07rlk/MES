import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:   'bg-gradient-brand text-white shadow-glow hover:shadow-glass-lg hover:-translate-y-0.5',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100',
  outline:   'border border-ink-300 dark:border-white/15 text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/5',
  ghost:     'text-ink-900 dark:text-white hover:bg-ink-100 dark:hover:bg-white/10',
  accent:    'bg-cyan-500 text-white hover:bg-cyan-600 shadow-glow',
  gold:      'bg-gradient-gold text-ink-950 shadow-glow-gold hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
      'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variants[variant], sizes[size], className
    );

    if ('href' in props && props.href !== undefined) {
      const { href, ...rest } = props as AnchorProps;
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...(props as ButtonProps)}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
