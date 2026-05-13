import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseField =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 ' +
  'bg-white dark:bg-slate-900 px-4 py-2.5 text-sm ' +
  'placeholder:text-slate-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ' +
  'transition disabled:opacity-50';

type FieldProps = { label?: string; error?: string; hint?: string };

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & FieldProps
>(({ label, error, hint, className, id, ...props }, ref) => {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input ref={ref} id={inputId} className={cn(baseField, error && 'border-red-500', className)} {...props} />
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps
>(({ label, error, hint, className, id, ...props }, ref) => {
  const fieldId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        rows={4}
        className={cn(baseField, 'resize-y min-h-[96px]', error && 'border-red-500', className)}
        {...props}
      />
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & FieldProps
>(({ label, error, hint, className, id, children, ...props }, ref) => {
  const fieldId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={fieldId}
        className={cn(baseField, 'pr-8 appearance-none', error && 'border-red-500', className)}
        {...props}
      >
        {children}
      </select>
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
Select.displayName = 'Select';
