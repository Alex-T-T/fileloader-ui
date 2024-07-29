import { ReactNode } from 'react';

export type ActionButtonProps = {
    type?: 'button' | 'submit' | 'reset' | undefined;
    onSubmit?: () => void;
    onClick?:() => void
    className?: string;
    children: ReactNode;
};

export default function ActionButton({
    type,
    onSubmit,
    onClick,
    className,
    children,
}: ActionButtonProps) {
    return (
        <button type={type} onSubmit={onSubmit} onClick={onClick} className={className}>
            {children}
        </button>
    );
}

