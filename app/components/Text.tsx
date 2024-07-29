import { CSSProperties, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties | undefined;
};

export const Text = ({ children, className, style }: Props) => {
    return (
        <p className={`${className}`} style={style}>
            {children}
        </p>
    );
};
